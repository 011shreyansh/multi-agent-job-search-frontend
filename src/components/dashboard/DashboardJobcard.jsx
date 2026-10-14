import { ArrowRight } from "lucide-react";

function DashboardJobCard({
    company,
    title,
    location,
    workMode,
    score
}) {
    return (
        <div className="dashboard-job-card">

            <div className="company-logo">
                {company.charAt(0)}
            </div>

            <div className="job-information">

                <h4>{title}</h4>

                <span>
                    {company} · {location}
                </span>

            </div>

            <span className="work-mode">
                {workMode}
            </span>

            <strong className="job-score">
                {score}%
            </strong>

            <ArrowRight size={20} />

        </div>
    );
}

export default DashboardJobCard;