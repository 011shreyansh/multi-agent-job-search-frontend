function MatchCircle({ percentage }) {
    return (
        <div
            style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: `conic-gradient(#5b5cff ${percentage}%, #e5e7eb ${percentage}%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <div
                style={{
                    width: "84px",
                    height: "84px",
                    borderRadius: "50%",
                    background: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color:"black"

                }}
            >
                <strong>{percentage}%</strong>
                <span>Match</span>
            </div>
        </div>
    );
}

export default MatchCircle;