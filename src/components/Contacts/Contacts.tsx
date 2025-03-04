import {Contact} from "../../types";
import * as React from "react";
import ContactItem from "./ContactItem/ContactItem.tsx";

interface Props {
    contacts: Contact[];
    onDeleteClick: (id: string) => void;
    deleteLoading: string | boolean;
}

const Contacts: React.FC<Props> = ({contacts,deleteLoading, onDeleteClick}) => {
    return (
        <>
            <h4>Contacts</h4>
            {contacts.length === 0 ? <p>No contacts yet</p> :
                <>
                    {contacts.map((contact) => (
                        <ContactItem
                            key={contact.id}
                            deleteLoading={deleteLoading}
                            contact={contact}
                            onDeleteClick={() => onDeleteClick(contact.id)}
                        />
                    ))}
                </>
            }
        </>
    );
};

export default Contacts;