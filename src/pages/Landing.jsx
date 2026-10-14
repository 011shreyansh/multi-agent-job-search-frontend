import Button from "../components/button";
import FeatureSection from "../components/FeatureSection";
import FooterCTA from "../components/FooterCTA";
import Herosection from "../components/Herosection";
import HowItWorks from "../components/HowItWorks";
import Logo from "../components/Logo";
import WorkflowSteps from "../components/WorkFlowSteps";
import "../styles/landingPage.css"
import { Link } from "react-router-dom";
function Landing(){
    return(
        <div className="landing-page">
            <div className="navbar">
                <Logo/>
                <nav className="nav-link">
                   <a href="#how-it-works">How it works</a>
                   <a href="#features">Features</a>
                   <a href="#worksflow">Workflow</a>
                </nav>
            <div className="pack">
               <div className="login-btn">
               <Link to="/login" className="login-link" style={{textDecoration:"none"}}>
    Log in 
</Link>
               </div>
               <Button name="Get started →" to="/dashboard"/>
            </div>
            </div>

            <Herosection/>
            <WorkflowSteps/>
            <div id="how-it-works"><HowItWorks/></div>
            <div id="features"><FeatureSection /></div>
            <FooterCTA/>
        </div>
    );
}
export default Landing;