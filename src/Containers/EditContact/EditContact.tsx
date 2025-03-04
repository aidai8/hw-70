import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {clearOneContact, selectUpdateContactLoading} from "../../store/contacts/contactsSlice.ts";
import {useEffect} from "react";
import {ContactMutation} from "../../types";
import {updateContact} from "../../store/contacts/contactsThunks.ts";
import ContactForm from "../../components/ContactForm/ContactForm.tsx";


const EditContact = () => {
    const navigate = useNavigate();
    const updateLoading = useAppSelector(selectUpdateContactLoading);
    const { idContact } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearOneContact());
    }, [dispatch]);

    const onEditContact = async (contactToUpdate: ContactMutation) => {
        if (idContact) {
            await dispatch(updateContact({id: idContact, contact: contactToUpdate}));
            navigate(`/`);
        }
    };

    return (
        <div className="row">
            <div className="col">
                <ContactForm onSubmitFormToAddContact={onEditContact} idContact={idContact} isEdit isLoading={updateLoading}/>
            </div>
        </div>
    );
};

export default EditContact;