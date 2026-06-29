import { useState } from "react";
import { CaretLeft, CaretLeftFill } from "react-bootstrap-icons";
import '../css/ArrowButton.css'

function LeftButton({ onClick }) {
    const [ hovered, setHovered ] = useState(false);
    const [ pressed, setPressed ] = useState(false);

    const isFill = hovered || pressed;

    return (
        <button
            className={`border-0 arrow-button ${pressed ? "pressed" : ""}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false);
                setPressed(false);
            }}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onClick={onClick}
        >
            {isFill ? <CaretLeftFill /> : <CaretLeft />}
        </button>
    );
}

export default LeftButton;