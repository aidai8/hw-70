import React, {useCallback, useEffect, useState} from "react";
import {ContactMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import Spinner from "../UI/Spinner/Spinner.tsx";
import ButtonSpinner from "../UI/Spinner/ButtonSpinner/ButtonSpinner.tsx";
import {fetchOneContactById} from "../../store/contacts/contactsThunks.ts";
import {selectFetchOneContactLoading, selectOneContact} from "../../store/contacts/contactsSlice.ts";


interface Props {
    onSubmitFormToAddContact: (newContact: ContactMutation) => void;
    idContact?: string;
    isEdit?: boolean;
    isLoading?: boolean;
}

const initialForm = {
    name: '',
    number: '',
    email: '',
    imageUrl: '',
}

const ContactForm: React.FC<Props> = ({onSubmitFormToAddContact, idContact, isEdit = false, isLoading = false}) => {
    const dispatch = useAppDispatch();
    const fetchOneContactLoading = useAppSelector(selectFetchOneContactLoading);
    const oneContact = useAppSelector(selectOneContact);
    const [form, setForm] = useState<ContactMutation>(initialForm);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const fetchOneContact = useCallback(async (id: string | undefined) => {
        if (id) {
            await dispatch(fetchOneContactById(id));
        }
    }, [dispatch]);

    useEffect(() => {
        setForm(initialForm);

        if (!oneContact && idContact) {
            void fetchOneContact(idContact);
        } else if (oneContact && idContact) {
            setForm(oneContact);
            setPreviewImage(oneContact.imageUrl || null);
        }
    }, [fetchOneContact, idContact, oneContact])

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        setForm(prevState => ({...prevState, [name]: value}));

        if (name === "imageUrl") {
            setPreviewImage(value.trim() ? value : null);
        }
    };


    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || !form.number.trim() || !form.email.trim()) {
            alert("Please fill out the fields.");
            return;
        }

        onSubmitFormToAddContact({...form});
    };

    return (
        <>
            {fetchOneContactLoading ? <Spinner/> :
                <form onSubmit={onSubmit}>
                    <h4>{isEdit ? 'Edit' : 'Add new'} Contact</h4>
                    <hr/>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={form.name}
                            disabled={isLoading}
                            onChange={inputChangeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="number">Number</label>
                        <input
                            id="number"
                            name="number"
                            className="form-control"
                            value={form.number}
                            disabled={isLoading}
                            onChange={inputChangeHandler}
                        ></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={form.email}
                            disabled={isLoading}
                            onChange={inputChangeHandler}
                        />
                    </div>

                    <div className="form-group mt-2">
                        <label htmlFor="imageUrl">Image url</label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            className="form-control"
                            disabled={isLoading}
                            value={form.imageUrl}
                            onChange={inputChangeHandler}
                        />
                    </div>

                    {previewImage && (
                        <div className="mt-3 text-center">
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="rounded-circle"
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary mt-4" disabled={isLoading}>
                        <span className="me-2">{isEdit ? 'Edit' : 'Add'}</span>
                        {isLoading && <ButtonSpinner/>}
                    </button>
                </form>
            }
        </>

    );
};

export default ContactForm;