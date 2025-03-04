import {Link} from "react-router-dom";
import ButtonSpinner from "../../UI/Spinner/ButtonSpinner/ButtonSpinner.tsx";
import {Contact} from "../../../types";
import React, {useState} from "react";
import Modal from "../../UI/Modal/Modal.tsx";

interface Props {
    contact: Contact;
    deleteLoading: string | boolean;
    onDeleteClick: React.MouseEventHandler;
}

const ContactItem: React.FC<Props> = ({contact, deleteLoading, onDeleteClick}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    let imageUrl = 'https://pbs.twimg.com/media/GY5XoygXQAADvvQ.png';
    if (contact.imageUrl) {
        imageUrl = contact.imageUrl;
    }

    return (
        <div className="card mb-2 text-center" onClick={handleOpenModal} style={{cursor: 'pointer'}}>
            <div className="card-body d-flex align-items-center">
                <img src={imageUrl} alt={contact.name} className="rounded-circle me-5"
                     style={{width: '100px', height: '100px', objectFit: 'cover'}}/>
                <div className="d-flex flex-column text-start">
                <h2 className="card-title mt-2">{contact.name}</h2>
                <small className="text-muted">Click to see more</small>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={handleCloseModal}>
                <div className="text-center">
                    <h4 className="mb-3">Contact info</h4>
                    <img src={imageUrl} alt={contact.name} className="rounded-circle" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                    <h5 className="mt-3">{contact.name}</h5>
                    <p className="text-primary mb-1">{contact.number}</p>
                    <p className="text-secondary">{contact.email}</p>
                    <div>
                        <Link to={`/edit-contact/${contact.id}`} className="btn btn-secondary">Edit</Link>
                        <button className="btn btn-danger mx-3" onClick={onDeleteClick}>
                            Delete {deleteLoading && deleteLoading === contact.id && <ButtonSpinner/>}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};


export default ContactItem;