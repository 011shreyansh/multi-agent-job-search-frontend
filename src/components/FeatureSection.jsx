import "../styles/featureSection.css";
import {
    Search,
    Target,
    FileText,
    MessageSquare,
    BarChart3,
    ArrowUpRight
} from "lucide-react";

function FeatureSection() {
    const features = [
        {
            icon: Target,
            title: "Smart Job Matching",
            text: "See exactly why each opportunity matches your experience and goals."
        },
        {
            icon: FileText,
            title: "Resume Customization",
            text: "Tailor your resume to every role while keeping your story authentic."
        },
        {
            icon: MessageSquare,
            title: "AI Cover Letters",
            text: "Create thoughtful letters grounded in your real experience."
        },
        {
            icon: BarChart3,
            title: "Application Tracking",
            text: "Keep every application, interview, and next step in one place."
        }
    ];

    return (
        <section className="feature-section">

            <div className="feature-heading">
                <p>EVERYTHING IN ONE AGENT</p>
                <h2>Built for a better job search.</h2>
            </div>

            <div className="feature-layout">

                <div className="feature-main-card  ">
                    <div className="feature-icon">
                        <Search size={28} />
                    </div>

                    <div className="feature-card-content">
                        <h3>AI Job Search</h3>

                        <p>
                            Turn a conversation into a focused search across
                            the roles that fit you.
                        </p>
                    </div>

                    <ArrowUpRight className="feature-arrow" size={24} />
                </div>


                <div className="feature-grid">

                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div className="feature-card  " key={feature.title}>

                                <div className="feature-icon">
                                    <Icon size={26} />
                                </div>

                                <h3>{feature.title}</h3>

                                <p>{feature.text}</p>

                                <ArrowUpRight
                                    className="feature-arrow"
                                    size={22}
                                />

                            </div>
                        );
                    })}

                </div>

            </div>

        </section>
    );
}

export default FeatureSection;