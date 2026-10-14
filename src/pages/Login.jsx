import "../styles/login.css";

function Login() {
    return (
        <div className="login-page">

            <div className="login-left">

                <div className="login-logo">
                    <div className="logo-box">N</div>
                    <span>NextRole</span>
                </div>

                <div className="login-left-content">

                    <div className="login-badge">
                        AI CAREER AGENT
                    </div>

                    <h1>
                        Make every
                        <br />
                        application your
                        <br />
                        strongest one.
                    </h1>

                    <p>
                        Your resume, preferences, matches, and applications —
                        organized in one intelligent workspace.
                    </p>

                </div>

                <div className="login-match-card">
                    <div className="match-icon">✓</div>

                    <div>
                        <strong>91% match found</strong>
                        <span>Java Backend Developer at Cisco</span>
                    </div>
                </div>

            </div>


            <div className="login-right">

                <div className="login-form-container">

                    <h2>Welcome back</h2>

                    <p className="login-subtitle">
                        Continue your job search with NextRole.
                    </p>


                    <form >

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                        />


                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                        />


                        <div className="login-options">

                            <label className="remember">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>

                            <a href="#">
                                Forgot password?
                            </a>

                        </div>


                        <button type="submit" className="login-button">
                            Log in
                            <span>→</span>
                        </button>

                    </form>


                    <p className="signup-text">
                        New to NextRole?
                        <a href="/signup">Create an account</a>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;