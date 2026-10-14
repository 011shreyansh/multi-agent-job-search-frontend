function StatCard({ icon: Icon, title, value, change }) {
    return (
        <div className="stat-card">

            <div className="stat-icon">
                <Icon size={24} />
            </div>

            <div className="stat-content">

                <span className="stat-title">
                    {title}
                </span>

                <strong className="stat-value">
                    {value}
                </strong>

                <span className="stat-change">
                    {change}
                </span>

            </div>

        </div>
    );
}

export default StatCard;