const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getToken = () => localStorage.getItem("token");
export const setToken = (token) => localStorage.setItem("token", token);
export const clearToken = () => localStorage.removeItem("token");

async function request(path, { method = "GET", body, form } = {}) {
    const headers = {};
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    if (body) headers["Content-Type"] = "application/json";

    let res;
    try {
        res = await fetch(`${BASE}${path}`, {
            method,
            headers,
            body: form || (body ? JSON.stringify(body) : undefined),
        });
    } catch {
        const err = new Error("Can't reach the server. Check that the backend is running.");
        err.status = 0;
        throw err;
    }

    if (res.status === 401 && path !== "/auth/login") {
        clearToken();
        window.location.assign("/login");
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const detail = Array.isArray(data.detail)
            ? data.detail.map((d) => d.msg).join(", ")
            : data.detail;
        const err = new Error(detail || `Request failed (${res.status})`);
        err.status = res.status;
        throw err;
    }
    return data;
}

export const api = {
    login: (email, password) =>
        request("/auth/login", { method: "POST", body: { email, password } }),

    getResume: () => request("/resume"),
    uploadResume: (file) => {
        const form = new FormData();
        form.append("file", file);
        return request("/resume/upload", { method: "POST", form });
    },

    startWorkflow: (resumeId) =>
        request("/workflow/start", { method: "POST", body: { resume_id: resumeId } }),
    sendWorkflowMessage: (threadId, message) =>
        request("/workflow/message", { method: "POST", body: { thread_id: threadId, message } }),
    getWorkflow: (threadId) => request(`/workflow/${threadId}`),
};