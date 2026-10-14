import { ArrowRight, CheckCircle } from "lucide-react";
import MatchCircle from "../Match-circle";

function DashboardHero() {
    return (
        <section className="dashboard-hero">

            <div className="hero-content">

                <div className="resume-ready">
                    <CheckCircle size={16} />
                    MASTER RESUME READY
                </div>

                <h2>
                    Your next strong match is waiting.
                </h2>

                <p>
                    Your profile is optimized for Backend Developer
                    and Software Engineer roles in Bangalore and remote.
                </p>

                <button className="find-jobs-button">
                    Find Jobs
                    <ArrowRight size={20} />
                </button>

            </div>

            <div className="hero-readiness">

                <MatchCircle percentage={92} />

                <span>PROFILE READINESS</span>

            </div>

        </section>
    );
}

export default DashboardHero;