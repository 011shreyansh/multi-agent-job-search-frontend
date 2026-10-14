import "../styles/herosection.css"
import UserCircle from "./User-circle";
import SkillBadge from "./SkillBadge";
import Button from "./button";
import MatchCircle from "./Match-circle";
function Herosection(){
    const features=["Java","Springboot","SQL","REST APIs","AWS"];
    return(
        <div className="main-container">
            <div className="container1">

<div className="strip">
    • Your career search, intelligently managed
</div>

<h1 className="main-para-block">
    Your AI Career Agent
</h1>

<p className="secondary-para">
    Find the right jobs, tailor your resume, and manage your
    applications with AI.
</p>

<div className="double-button">
    <Button name="Get started →" to="/dashboard" />
    <Button name="Explore the demo" to="/" />
</div>

<div className="candidate-feature">

    <div className="user-circles">
        <UserCircle name="N" />
        <UserCircle name="B" />
        <UserCircle name="A" />
    </div>

    <span>
        <b>12,400</b> candidates matched this month
    </span>

</div>

</div>

            <div className="container2">
    <div className="container2-card">

        <div className="card-header">
            <span className="live-match">LIVE MATCH</span>

            <span className="profile-synced">
                <span className="dot">•</span>
                Profile synced
            </span>
        </div>

        <div className="card-middle">
            <MatchCircle percentage={91} />

            <div className="role-box">
                <p className="opportunity-label">YOUR TOP OPPORTUNITY</p>
                <h2>Java Backend Developer</h2>
                <p className="job-meta">Cisco · Bangalore · Hybrid</p>
            </div>
        </div>

        <div className="skill-stripe">
            {features.map((item, idx) => (
                <SkillBadge
                    name={item}
                    id={idx}
                    key={idx}
                />
            ))}
        </div>

        <div className="end-para">
            <strong>AI insight</strong>
            <span>Your Spring Boot work makes this a strong fit.</span>
        </div>

        <div className="card-footer">
            <span>Resume can be tailored in seconds</span>
            <button>Customize</button>
        </div>

    </div>
</div>
        </div>
    );
}
export default Herosection;