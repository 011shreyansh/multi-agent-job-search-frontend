import "../styles/button.css"

import { Link } from "react-router-dom";

function Button({ name, to }) {
    return (
        <Link to={to} className="button">
            {name}
        </Link>
    );
}

export default Button;