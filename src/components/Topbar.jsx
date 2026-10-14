import "../styles/topbar.css";

function Topbar() {
    return (
        <header className="topbar">

            <div>
                <h1>Good morning, Arjun</h1>
                <p>Here's where your job search stands today.</p>
            </div>

            <div className="topbar-right">
                <button className="icon-button">
                    ◷
                </button>

                <div className="topbar-avatar">
                    AM
                </div>
            </div>

        </header>
    );
}

export default Topbar;