import { ArrowRight } from "lucide-react";
import DashboardJobCard from "./DashboardJobcard";


function RecommendedJobs() {

    const jobs = [
        {
            company: "Cisco",
            title: "Java Backend Developer",
            location: "Bangalore",
            workMode: "Hybrid",
            score: 91
        },
        {
            company: "EY",
            title: "Java Spring Boot Developer",
            location: "Bangalore",
            workMode: "Hybrid",
            score: 65
        }
    ];

    return (
        <section className="recommended-jobs">

            <div className="section-header">

                <div>
                    <h3>Recommended for you</h3>

                    <p>
                        Top matches based on your resume and preferences.
                    </p>
                </div>

                <button className="view-all-button">
                    View all
                    <ArrowRight size={18} />
                </button>

            </div>

            <div className="job-list">

                {jobs.map((job) => (
                    <DashboardJobCard
                        key={job.title}
                        {...job}
                    />
                ))}

            </div>

        </section>
    );
}

export default RecommendedJobs;