import "../styles/howItWorks.css";

import {
    CloudUpload,
    MessageSquare,
    FileCheck
} from "lucide-react";

function HowItWorks() {
    const steps = [
        {
            number: "01",
            icon: CloudUpload,
            title: "Bring your story",
            text: "Upload one master resume. We extract your skills, experience, education, and projects."
        },
        {
            number: "02",
            icon: MessageSquare,
            title: "Set your direction",
            text: "Talk naturally with your career agent about roles, locations, salary, and work style."
        },
        {
            number: "03",
            icon: FileCheck,
            title: "Apply with confidence",
            text: "Compare matches, tailor materials, approve every change, and track the result."
        }
    ];

    return (
        <section className="how-it-works">

            <div className="how-header">

                <div className="how-heading">
                    <p className="how-label">HOW IT WORKS</p>

                    <h2>
                        From resume to application,
                        <br />
                        without the busywork.
                    </h2>
                </div>

                <p className="how-description">
                    NextRole keeps your experience at the center while AI
                    handles the repetitive parts of job hunting.
                </p>

            </div>


            <div className="steps-container">

                {steps.map((step) => {
                    const Icon = step.icon;

                    return (
                        <div className="step-card" key={step.number}>

                            <div className="step-number">
                                {step.number}
                            </div>

                            <div className="step-icon">
                                <Icon size={30} />
                            </div>

                            <h3>{step.title}</h3>

                            <p>{step.text}</p>

                        </div>
                    );
                })}

            </div>

        </section>
    );
}

export default HowItWorks;