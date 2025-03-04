import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {clearOneContact, selectCreateContactLoading} from "../../store/contacts/contactsSlice.ts";
import {ContactMutation} from "../../types";
import {createContact} from "../../store/contacts/contactsThunks.ts";
import {useEffect} from "react";
import ContactForm from "../../components/ContactForm/ContactForm.tsx";


const NewContact = () => {
    const navigate = useNavigate();
    const createContactLoading = useAppSelector(selectCreateContactLoading);
    const dispatch = useAppDispatch();

    const onCreateContact = async (newContact: ContactMutation) => {
        await dispatch(createContact(newContact));
        navigate('/');
    };

    useEffect(() => {
        dispatch(clearOneContact());
    }, [dispatch]);

    return (
        <div className="row">
            <div className="col">
                <ContactForm onSubmitFormToAddContact={onCreateContact} isLoading={createContactLoading}/>
            </div>
        </div>
    );
};

export default NewContact;