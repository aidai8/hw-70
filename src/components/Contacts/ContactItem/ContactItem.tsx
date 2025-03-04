import {Link} from "react-router-dom";
import ButtonSpinner from "../../UI/Spinner/ButtonSpinner/ButtonSpinner.tsx";
import {Contact} from "../../../types";
import React from "react";

interface Props {
    contact: Contact;
    deleteLoading: string | boolean;
    onDeleteClick: React.MouseEventHandler;
}

const ContactItem: React.FC<Props> = ({contact, deleteLoading, onDeleteClick}) => {
    const defaultImage = 'https://pbs.twimg.com/media/GY5XoygXQAADvvQ.png';
    const imageUrl = contact.imageUrl || defaultImage;

    return (
        <div className="card mb-2 shadow-sm rounded-3 overflow-hidden">
            <div className="row g-0 align-items-center">
                <div className="col-sm-4 d-flex justify-content-center align-items-center p-3 border-end">
                    <div className="rounded-circle overflow-hidden shadow-sm" style={{ width: "150px", height: "150px" }}>
                        <img
                            src={imageUrl}
                            alt={contact.name}
                            className="img-fluid w-100 h-100"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="card-body">
                        <h5 className="card-title fw-bold">{contact.name}</h5>
                        <p className="card-text text-primary mb-1">{contact.number}</p>
                        <p className="card-text text-secondary">{contact.email}</p>
                        <div className="d-flex">
                            <Link to={`/edit-contact/${contact.id}`} className="btn btn-secondary btn-sm me-2">Edit</Link>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={onDeleteClick}
                            >
                                Delete {deleteLoading && deleteLoading === contact.id && <ButtonSpinner />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ContactItem;