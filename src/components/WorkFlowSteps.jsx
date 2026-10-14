import "../styles/workflowSteps.css";

function WorkflowSteps() {
    const steps = [
        "Resume",
        "AI Preferences",
        "Job Matches",
        "Tailored Resume",
        "Application"
    ];

    return (
        <div className="workflow-box">
            <div className="workflow-title">
                ONE CONNECTED WORKFLOW
            </div>

            <div className="workflow-steps">
                {steps.map((step, index) => (
                    <div className="workflow-item" key={step}>
                        <div className="step-number">
                            {index + 1}
                        </div>

                        <span className="step-name">
                            {step}
                        </span>

                        {index < steps.length - 1 && (
                            <span className="step-arrow">→</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkflowSteps;