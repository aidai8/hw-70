import React, {ReactElement} from "react";
import Backdrop from "../Backdrop/Backdrop.tsx";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: string | number | ReactElement | ReactElement[];
}

const Modal: React.FC<ModalProps> = ({show, onClose, children}) => {
    if (!show) return null;

    return (
        <>
            <Backdrop onClose={onClose} />
            <div style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 101,
                minWidth: "300px",
                maxWidth: "90%",
            }} onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "none",
                        border: "none",
                        fontSize: "20px",
                        cursor: "pointer",
                    }}
                >x</button>

                <div>{children}</div>
            </div>
        </>
    );
};

export default Modal;