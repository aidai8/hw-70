import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import Contacts from "../../components/Contacts/Contacts.tsx";
import {
    selectContacts,
    selectDeleteContactsLoading,
    selectFetchContactsLoading
} from "../../store/contacts/contactsSlice.ts";
import {deleteContact, fetchContacts} from "../../store/contacts/contactsThunks.ts";

const Home = () => {
    const contacts = useAppSelector(selectContacts);
    const contactsLoading = useAppSelector(selectFetchContactsLoading);
    const contactsDeleteLoading = useAppSelector(selectDeleteContactsLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const onDeleteContact = async (id: string) => {
        await dispatch(deleteContact(id));
        await dispatch(fetchContacts());
    };

    return (
        <>
            <div className="row mt-2">
                <div className="col-6">
                    {contactsLoading ? <Spinner/> :
                        <Contacts contacts={contacts} onDeleteClick={onDeleteContact} deleteLoading={contactsDeleteLoading} />
                    }
                </div>
            </div>

        </>

    );
};

export default Home;