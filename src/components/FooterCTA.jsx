import "../styles/footer.css";
import Button from "./button";

function FooterCTA() {
    return (
        <footer className="footer-cta">
            <div className="footer-text">
                <p>READY WHEN YOU ARE</p>

                <h2>
                    Your next role starts with one resume.
                </h2>
            </div>

            <Button name="Start your search →" to="/" />
        </footer>
    );
}

export default FooterCTA;