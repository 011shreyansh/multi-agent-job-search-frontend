import "../styles/profile.css";
import { Pencil, CheckCircle } from "lucide-react";

function Profile() {
    return (
        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-avatar-large">
                    AM
                </div>

                <div className="profile-header-info">
                    <h2>Arjun Mehta</h2>
                    <p>arjun.mehta@example.com</p>

                    <div className="profile-complete">
                        <CheckCircle size={15} />
                        Profile 92% complete
                    </div>
                </div>

                <button className="edit-profile">
                    <Pencil size={16} />
                    Edit profile
                </button>

            </div>


            <div className="profile-section">

                <div className="section-intro">
                    <h3>Personal details</h3>
                    <p>Basic information used on your applications.</p>
                </div>

                <div className="profile-fields">

                    <div className="field">
                        <label>Name</label>
                        <div className="field-value">
                            Arjun Mehta
                        </div>
                    </div>

                    <div className="field">
                        <label>Email</label>
                        <div className="field-value">
                            arjun.mehta@example.com
                        </div>
                    </div>

                    <div className="field">
                        <label>Experience</label>
                        <div className="field-value">
                            2 years
                        </div>
                    </div>

                    <div className="field">
                        <label>Work preference</label>
                        <div className="field-value">
                            Remote / Hybrid
                        </div>
                    </div>

                </div>

            </div>


            <div className="profile-section">

                <div className="section-intro">
                    <h3>Career preferences</h3>
                    <p>Your agent uses these to rank opportunities.</p>
                </div>

                <div className="preference-content">

                    <div>
                        <label>Preferred roles</label>

                        <div className="tag-list">
                            <span>Backend Developer</span>
                            <span>Software Engineer</span>
                        </div>
                    </div>

                    <div>
                        <label>Locations</label>

                        <div className="tag-list">
                            <span>Bangalore</span>
                            <span>Pune</span>
                            <span>Remote</span>
                        </div>
                    </div>

                </div>

            </div>


            <div className="profile-section">

                <div className="section-intro">
                    <h3>Skills</h3>
                    <p>Extracted from your master resume.</p>
                </div>

                <div className="tag-list">
                    <span>Java</span>
                    <span>Spring Boot</span>
                    <span>SQL</span>
                    <span>REST APIs</span>
                    <span>React</span>
                    <span>Docker</span>
                </div>

            </div>

        </div>
    );
}

export default Profile;