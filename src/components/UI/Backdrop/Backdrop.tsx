import React from "react";

interface BackdropProps {
    onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({onClose}) => {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: 100,
            }}
            onClick={onClose}
        />
    );
};

export default Backdrop;