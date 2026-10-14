import "../styles/masterResume.css";

import { Upload, FileText, CheckCircle, Pencil } from "lucide-react";

function MasterResume() {
    const profile = {
        skills: ["Java", "Spring Boot", "SQL", "REST APIs", "React", "Docker"],
        experience: [
            {
                duration: "2 years",
                role: "Software Engineer",
                company: "Nova Labs"
            }
        ],
        education: [
            {
                degree: "B.Tech Computer Science",
                university: "PES University",
                year: "2024"
            }
        ],
        projects: [
            "Payment API",
            "TaskFlow",
            "Cloud Monitor"
        ],
        roles: [
            "Backend Developer",
            "Software Engineer",
            "Platform Engineer"
        ]
    };
    return (
        <div className="master-resume">

            <div className="master-resume-header">
                <div>
                    <h1>Master Resume</h1>
                    <p>
                        The source of truth for every tailored application.
                    </p>
                </div>
            </div>


            <div className="resume-layout">

                <div className="resume-main">

                    <div className="resume-management-card">

                        <div className="resume-intro">

                            <div>
                                <div className="resume-status">
                                    <CheckCircle size={15} />
                                    MASTER RESUME READY
                                </div>

                                <h2>
                                    Keep your career story up to date.
                                </h2>

                                <p>
                                    Upload a PDF and NextRole will extract the
                                    details used to match and tailor your
                                    applications.
                                </p>
                            </div>


                            <div className="uploaded-file">

                                <FileText size={28} />

                                <div>
                                    <strong>
                                        Arjun_Mehta_Master_Resume.pdf
                                    </strong>

                                    <span>
                                        1.8 MB · Updated today, 9:42 AM
                                    </span>
                                </div>

                                <span className="parsed-badge">
                                    Parsed
                                </span>

                            </div>

                        </div>


                        <div className="resume-upload-area">

                            <Upload size={32} />

                            <h3>
                                Drop your resume here
                            </h3>

                            <p>
                                or click to browse · PDF up to 10 MB
                            </p>

                            <button>
                                Replace Resume
                            </button>

                        </div>


                        <div className="resume-preview">

                            <h2>ARJUN MEHTA</h2>

                            <p className="preview-summary">
                                Backend-focused software engineer with 2
                                years of experience building reliable
                                services and APIs.
                            </p>

                            <hr />

                            <h3>EXPERIENCE</h3>

                            <hr />

                            <strong>
                                Software Engineer · Nova Labs
                            </strong>

                            <p>
                                Built Spring Boot services and reduced
                                average API response time.
                            </p>

                        </div>

                    </div>

                </div>


                <ExtractedProfile profile={profile} />

            </div>

        </div>
    );
}

function ExtractedProfile({ profile }) {
    return (
        <aside className="extracted-profile">

            <div className="profile-header">
                <div>
                    <h2>Extracted profile</h2>
                    <p>
                        Review what your agent learned from this resume.
                    </p>
                </div>

                <button className="edit-profile">
                    <Pencil size={16} />
                    Edit details
                </button>
            </div>

            <div className="profile-section">
                <span className="profile-label">SKILLS</span>

                <div className="skill-list">
                    {profile.skills.map((skill, index) => (
                        <span key={index}>✓ {skill}</span>
                    ))}
                </div>
            </div>

            <div className="profile-section">
                <span className="profile-label">EXPERIENCE</span>

                {profile.experience.map((item, index) => (
                    <strong key={index}>
                        {item.duration} · {item.role} at {item.company}
                    </strong>
                ))}
            </div>

            <div className="profile-section">
                <span className="profile-label">EDUCATION</span>

                {profile.education.map((item, index) => (
                    <strong key={index}>
                        {item.degree} · {item.university} · {item.year}
                    </strong>
                ))}
            </div>

            <div className="profile-section">
                <span className="profile-label">PROJECTS</span>

                {profile.projects.map((project, index) => (
                    <strong key={index}>
                        {project}
                    </strong>
                ))}
            </div>

            <div className="profile-section">
                <span className="profile-label">ROLES</span>

                {profile.roles.map((role, index) => (
                    <strong key={index}>
                        {role}
                    </strong>
                ))}
            </div>

        </aside>
    );
}
export default MasterResume;