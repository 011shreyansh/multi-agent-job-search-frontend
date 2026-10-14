import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Copy, FileText, GitCompare, Mail, RotateCcw, Send, Upload } from "lucide-react";

import { api } from "../lib/api";
import { diffLines } from "../lib/diff";
import "../styles/workspace.css";

const THREAD_KEY = "nextrole_workflow_thread";

const STEPS = ["Preferences", "Matches", "Resume", "Cover letter"];
const STEP_INDEX = {
    preferences: 0,
    job_selection: 1,
    resume_feedback: 2,
    final_approval: 3,
};

const PROMPTS = {
    preferences: "What role and location should I search? I've filled in a suggestion from your resume.",
    job_selection: "These are your best matches. Pick one and I'll tailor your resume for it.",
    resume_feedback: "Your tailored resume is on the right. Approve it, or tell me what to change.",
    final_approval: "The cover letter is ready too. Approve the application, or tell me what to change.",
};

/* ---------------------------------------------------------------- */
/* Page                                                              */
/* ---------------------------------------------------------------- */

function WorkSpace() {
    const [phase, setPhase] = useState("loading"); // loading | no-resume | ready | error
    const [flow, setFlow] = useState(null);
    const [messages, setMessages] = useState([]);
    const [busy, setBusy] = useState("");
    const [error, setError] = useState("");
    const [docs, setDocs] = useState({ resume: "", prevResume: "", cover: "", prevCover: "" });
    const [tab, setTab] = useState("resume");
    const [showChanges, setShowChanges] = useState(true);

    const started = useRef(false);
    const msgId = useRef(0);
    const lastRun = useRef(null);
    const endRef = useRef(null);

    const addMessage = useCallback((role, text, extra = {}) => {
        setMessages((m) => [...m, { id: ++msgId.current, role, text, ...extra }]);
    }, []);

    const applyResponse = useCallback(
        (res) => {
            setFlow(res);

            setDocs((d) => {
                const next = { ...d };
                if (res.tailored_resume && res.tailored_resume !== d.resume) {
                    next.prevResume = d.resume;
                    next.resume = res.tailored_resume;
                }
                if (res.cover_letter && res.cover_letter !== d.cover) {
                    next.prevCover = d.cover;
                    next.cover = res.cover_letter;
                }
                return next;
            });

            if (res.input_type === "final_approval") setTab("cover");
            if (res.input_type === "resume_feedback") setTab("resume");

            if (res.status === "completed") {
                localStorage.removeItem(THREAD_KEY);
                addMessage("agent", "Approved. Your application is saved.", { done: true });
            } else {
                localStorage.setItem(THREAD_KEY, res.thread_id);
                addMessage(
                    "agent",
                    PROMPTS[res.input_type] || res.question || "What would you like to do next?",
                    res.input_type === "job_selection"
                        ? { jobs: res.payload?.jobs || res.jobs || [] }
                        : {}
                );
            }
        },
        [addMessage]
    );

    const run = useCallback(
        async (label, fn) => {
            lastRun.current = { label, fn };
            setBusy(label);
            setError("");
            try {
                applyResponse(await fn());
            } catch (e) {
                setError(e.message);
            } finally {
                setBusy("");
            }
        },
        [applyResponse]
    );

    const begin = useCallback(async () => {
        setPhase("loading");
        setError("");
        try {
            const saved = localStorage.getItem(THREAD_KEY);
            if (saved) {
                try {
                    const res = await api.getWorkflow(saved);
                    setPhase("ready");
                    addMessage("agent", "Welcome back. Picking up where you left off.");
                    applyResponse(res);
                    return;
                } catch (e) {
                    if (e.status !== 404) throw e;
                    localStorage.removeItem(THREAD_KEY);
                }
            }

            const { exists, resume } = await api.getResume();
            if (!exists) {
                setPhase("no-resume");
                return;
            }
            setPhase("ready");
            addMessage("agent", "Hi! I'll find roles that fit your resume, then tailor it for the one you pick.");
            await run("Reading your resume", () => api.startWorkflow(resume.id));
        } catch (e) {
            setPhase("error");
            setError(e.message);
        }
    }, [addMessage, applyResponse, run]);

    useEffect(() => {
        if (started.current) return; // StrictMode runs effects twice in dev
        started.current = true;
        begin();
    }, [begin]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages, busy, error]);

    const restart = () => {
        localStorage.removeItem(THREAD_KEY);
        setMessages([]);
        setFlow(null);
        setDocs({ resume: "", prevResume: "", cover: "", prevCover: "" });
        setTab("resume");
        begin();
    };

    /* ---- user actions ---- */

    const threadId = flow?.thread_id;

    const submitPreferences = ({ role, location }) => {
        addMessage("user", location ? `${role} in ${location}` : role);
        run("Searching and ranking jobs", () =>
            api.sendWorkflowMessage(threadId, { role, location })
        );
    };

    const pickJob = (item, index) => {
        const job = item.job || {};
        addMessage("user", `${job.title || "Job"} at ${job.company || "company"}`);
        run("Tailoring your resume", () =>
            api.sendWorkflowMessage(threadId, String(index + 1))
        );
    };

    const approve = () => {
        addMessage("user", "Approved");
        run(
            flow.input_type === "resume_feedback" ? "Writing your cover letter" : "Saving your application",
            () => api.sendWorkflowMessage(threadId, "approve")
        );
    };

    const requestChanges = (feedback) => {
        addMessage("user", feedback);
        run("Revising your draft", () =>
            api.sendWorkflowMessage(threadId, { approval: "revise", feedback })
        );
    };

    const uploadResume = async (file) => {
        setError("");
        setBusy("Uploading and reading your resume");
        try {
            await api.uploadResume(file);
            setBusy("");
            begin();
        } catch (e) {
            setBusy("");
            setError(e.message);
        }
    };

    /* ---- render ---- */

    if (phase === "no-resume") {
        return (
            <div className="workspace workspace-empty">
                <div className="ws-empty-card">
                    <Upload size={30} />
                    <h2>Upload your resume to get started</h2>
                    <p>The agent needs your master resume to find matches and tailor applications. PDF, up to 10 MB.</p>
                    <label className="ws-primary">
                        {busy || "Choose PDF"}
                        <input
                            type="file"
                            accept="application/pdf"
                            hidden
                            disabled={!!busy}
                            onChange={(e) => e.target.files[0] && uploadResume(e.target.files[0])}
                        />
                    </label>
                    {error && <p className="ws-error-text">{error}</p>}
                </div>
            </div>
        );
    }

    // if (phase === "error") {
    //     return (
    //         <div className="workspace workspace-empty">
    //             <div className="ws-empty-card">
    //                 <h2>Couldn't load the workspace</h2>
    //                 <p>{error}</p>
    //                 <button className="ws-primary" onClick={begin}>Try again</button>
    //             </div>
    //         </div>
    //     );
    // }

    const stepIndex = flow?.status === "completed" ? STEPS.length : STEP_INDEX[flow?.input_type] ?? -1;
    const lastJobsId = [...messages].reverse().find((m) => m.jobs)?.id;
    const job = flow?.selected_job;
    const hasJob = job && Object.keys(job).length > 0;

    return (
        <div className="workspace">
            {/* ---------- LEFT: conversation ---------- */}
            <section className="ws-panel ws-chat">
                <header className="ws-panel-head">
                    <div>
                        <h2>Career agent</h2>
                        <p>You review every step before anything is saved.</p>
                    </div>
                    <button className="ws-ghost" onClick={restart} disabled={!!busy} title="Start a new search">
                        <RotateCcw size={15} /> New search
                    </button>
                </header>

                <ol className="ws-steps">
                    {STEPS.map((label, i) => (
                        <li key={label} className={i < stepIndex ? "done" : i === stepIndex ? "current" : ""}>
                            <span>{i < stepIndex ? <Check size={12} /> : i + 1}</span>
                            {label}
                        </li>
                    ))}
                </ol>

                <div className="ws-messages">
                    {phase === "loading" && <p className="ws-muted">Loading…</p>}

                    {messages.map((m) => (
                        <div key={m.id} className={`ws-msg ${m.role}`}>
                            <div className="ws-bubble">
                                {m.text}
                                {m.done && (
                                    <Link to="/applications" className="ws-link">View applications</Link>
                                )}
                            </div>

                            {m.jobs && (
                                <div className="ws-jobs">
                                    {m.jobs.map((item, i) => {
                                        const j = item.job || {};
                                        const enabled = m.id === lastJobsId && flow?.input_type === "job_selection" && !busy;
                                        return (
                                            <button
                                                key={i}
                                                className="ws-job"
                                                disabled={!enabled}
                                                onClick={() => pickJob(item, i)}
                                            >
                                                <div className="ws-job-top">
                                                    <strong>{j.title}</strong>
                                                    {typeof item.score === "number" && (
                                                        <span className="ws-score">{Math.round(item.score)}% match</span>
                                                    )}
                                                </div>
                                                <span className="ws-job-meta">
                                                    {[j.company, j.location].filter(Boolean).join(" · ")}
                                                </span>
                                                {item.reason && <p>{item.reason}</p>}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}

                    {busy && (
                        <div className="ws-msg agent">
                            <div className="ws-bubble ws-working">
                                <span className="ws-dots"><i /><i /><i /></span>
                                {busy}…
                            </div>
                        </div>
                    )}

                    {error && !busy && (
                        <div className="ws-error">
                            <span>{error}</span>
                            {lastRun.current && (
                                <button onClick={() => run(lastRun.current.label, lastRun.current.fn)}>Retry</button>
                            )}
                        </div>
                    )}

                    <div ref={endRef} />
                </div>

                <footer className="ws-composer">
                    {!busy && flow?.input_type === "preferences" && (
                        <PreferencesForm key={flow.thread_id} profile={flow.payload?.profile} onSubmit={submitPreferences} />
                    )}
                    {!busy && flow?.input_type === "job_selection" && (
                        <p className="ws-hint">Choose a job above to continue.</p>
                    )}
                    {!busy &&
                        (flow?.input_type === "resume_feedback" || flow?.input_type === "final_approval") && (
                            <ReviewBar
                                key={`${flow.input_type}-${messages.length}`}
                                onApprove={approve}
                                onChanges={requestChanges}
                            />
                        )}
                    {!busy && flow?.status === "completed" && (
                        <button className="ws-primary" onClick={restart}>Tailor for another job</button>
                    )}
                    {busy && <p className="ws-hint">The agent is working. This can take a minute.</p>}
                </footer>
            </section>

            {/* ---------- RIGHT: resume / cover letter ---------- */}
            <DocumentPanel
                docs={docs}
                tab={tab}
                setTab={setTab}
                showChanges={showChanges}
                setShowChanges={setShowChanges}
                job={hasJob ? job : null}
            />
        </div>
    );
}

/* ---------------------------------------------------------------- */
/* Composer pieces                                                   */
/* ---------------------------------------------------------------- */

function PreferencesForm({ profile, onSubmit }) {
    const [role, setRole] = useState(profile?.suitable_roles?.[0] || "");
    const [location, setLocation] = useState(profile?.location?.city || "");

    const submit = (e) => {
        e.preventDefault();
        if (role.trim()) onSubmit({ role: role.trim(), location: location.trim() });
    };

    return (
        <form className="ws-prefs" onSubmit={submit}>
            <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role, e.g. Backend Engineer" aria-label="Role" />
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" aria-label="Location" />
            <button className="ws-primary" type="submit" disabled={!role.trim()}>
                <Send size={15} /> Search jobs
            </button>
        </form>
    );
}

function ReviewBar({ onApprove, onChanges }) {
    const [text, setText] = useState("");
    const send = () => text.trim() && onChanges(text.trim());

    return (
        <div className="ws-review">
            <textarea
                rows={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                    }
                }}
                placeholder="What should change? e.g. lead with my Spring Boot work"
            />
            <div className="ws-review-actions">
                <button className="ws-secondary" onClick={send} disabled={!text.trim()}>Request changes</button>
                <button className="ws-primary" onClick={onApprove}><Check size={15} /> Approve</button>
            </div>
        </div>
    );
}

/* ---------------------------------------------------------------- */
/* Document panel                                                    */
/* ---------------------------------------------------------------- */

function DocumentPanel({ docs, tab, setTab, showChanges, setShowChanges, job }) {
    const [copied, setCopied] = useState(false);

    const current = tab === "resume" ? docs.resume : docs.cover;
    const previous = tab === "resume" ? docs.prevResume : docs.prevCover;
    const canCompare = !!previous && previous !== current;
    const diff = useMemo(
        () => (canCompare && showChanges ? diffLines(previous, current) : null),
        [canCompare, showChanges, previous, current]
    );

    const copy = async () => {
        await navigator.clipboard.writeText(current);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <section className="ws-panel ws-docs">
            <header className="ws-panel-head">
                <div>
                    <h2>{job ? job.title : "Your application"}</h2>
                    <p>{job ? [job.company, job.location].filter(Boolean).join(" · ") : "Tailored documents appear here."}</p>
                </div>
            </header>

            <div className="ws-doc-bar">
                <div className="ws-tabs" role="tablist">
                    <button role="tab" aria-selected={tab === "resume"} className={tab === "resume" ? "active" : ""} onClick={() => setTab("resume")}>
                        <FileText size={15} /> Resume
                    </button>
                    <button role="tab" aria-selected={tab === "cover"} className={tab === "cover" ? "active" : ""} onClick={() => setTab("cover")} disabled={!docs.cover}>
                        <Mail size={15} /> Cover letter
                    </button>
                </div>

                <div className="ws-doc-actions">
                    {canCompare && (
                        <button className={`ws-ghost ${showChanges ? "on" : ""}`} onClick={() => setShowChanges((v) => !v)} aria-pressed={showChanges}>
                            <GitCompare size={15} /> Show changes
                        </button>
                    )}
                    {current && (
                        <button className="ws-ghost" onClick={copy}>
                            {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy"}
                        </button>
                    )}
                </div>
            </div>

            <div className="ws-doc-scroll">
                {!current ? (
                    <div className="ws-doc-empty">
                        <FileText size={28} />
                        <p>Pick a job and your tailored {tab === "resume" ? "resume" : "cover letter"} will show up here.</p>
                    </div>
                ) : (
                    <article className="ws-paper">
                        {diff
                            ? diff.map((l, i) => (
                                  <div key={i} className={`diff diff-${l.type}`}>
                                      <DocLine text={l.text} />
                                  </div>
                              ))
                            : current.split("\n").map((l, i) => <DocLine key={i} text={l} />)}
                    </article>
                )}
            </div>

            {diff && (
                <p className="ws-legend">
                    <span className="add">Added</span> <span className="del">Removed</span> since the previous draft
                </p>
            )}
        </section>
    );
}

// The model returns light markdown; render the parts that matter.
function inline(text) {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.length > 4 && part.startsWith("**") && part.endsWith("**")
            ? <strong key={i}>{part.slice(2, -2)}</strong>
            : part
    );
}

function DocLine({ text }) {
    const t = text.trimEnd();
    if (!t.trim()) return <div className="doc-gap" />;
    if (/^-{3,}$/.test(t.trim())) return <hr />;

    const h = t.match(/^(#{1,6})\s+(.*)$/);
    if (h) return <div className={`doc-h doc-h${Math.min(h[1].length, 3)}`}>{inline(h[2])}</div>;

    const b = t.match(/^\s*[-*•]\s+(.*)$/);
    if (b) return <div className="doc-li">{inline(b[1])}</div>;

    return <div className="doc-p">{inline(t)}</div>;
}

export default WorkSpace;