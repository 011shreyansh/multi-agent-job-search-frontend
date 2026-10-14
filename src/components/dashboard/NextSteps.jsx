import {
    Target,
    FileText,
    ArrowRight
} from "lucide-react";

function NextSteps() {

    const steps = [
        {
            icon: Target,
            title: "Review Cisco match",
            text: "91% match"
        },
        {
            icon: FileText,
            title: "Finish tailored resume",
            text: "Resume customization"
        }
    ];

    return (
        <section className="next-steps">

            <div className="section-header">
                <div>
                    <h3>Next steps</h3>

                    <p>
                        Keep your momentum going.
                    </p>
                </div>
            </div>

            <div className="steps-list">

                {steps.map((step) => {

                    const Icon = step.icon;

                    return (
                        <div className="next-step" key={step.title}>

                            <div className="step-icon">
                                <Icon size={22} />
                            </div>

                            <div className="step-information">
                                <strong>{step.title}</strong>

                                <span>{step.text}</span>
                            </div>

                            <ArrowRight size={18} />

                        </div>
                    );
                })}

            </div>

        </section>
    );
}

export default NextSteps;