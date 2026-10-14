import "../styles/dashboard.css";

import DashboardHero from "../components/dashboard/DashboardHero";
import StatCard from "../components/dashboard/StatCard";
import RecommendedJobs from "../components/dashboard/RecommendedJobs";
import NextSteps from "../components/dashboard/NextSteps";

import {
    Search,
    Heart,
    Briefcase,
    MessageSquare
} from "lucide-react";

function Dashboard() {
    const stats = [
        {
            icon: Search,
            title: "Jobs found",
            value: "128",
            change: "+18 today"
        },
        {
            icon: Heart,
            title: "Saved jobs",
            value: "12",
            change: "3 new updates"
        },
        {
            icon: Briefcase,
            title: "Applications",
            value: "7",
            change: "2 this week"
        },
        {
            icon: MessageSquare,
            title: "Interviews",
            value: "2",
            change: "Next on Friday"
        }
    ];

    return (
        <div className="dashboard">

            <DashboardHero />

            <div className="dashboard-stats">
                {stats.map((stat) => (
                    <StatCard
                        key={stat.title}
                        icon={stat.icon}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                    />
                ))}
            </div>

            <div className="dashboard-bottom">

                <RecommendedJobs />

                <NextSteps />

            </div>

        </div>
    );
}

export default Dashboard;
 