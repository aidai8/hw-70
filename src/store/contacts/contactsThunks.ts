import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiContact, Contact, ContactMutation, ContactsListApi} from "../../types";
import axiosApi from "../../axiosApi.ts";


export const fetchContacts = createAsyncThunk<Contact[], void>(
    'contacts/fetchAllContacts',
    async () => {
        const response = await axiosApi<ContactsListApi | null>('/contacts.json');
        const contactsListObject = response.data;

        if (!contactsListObject) {
            return [];
        } else {
            return Object.keys(contactsListObject).map((contactId) => {
                const contact = contactsListObject[contactId];
                return {
                    ...contact,
                    id: contactId,
                };
            });
        }
    }
);

export const fetchOneContactById = createAsyncThunk<ApiContact, string>(
    'contacts/fetchOneContactById',
    async (contact_id) => {
        const response = await axiosApi<ApiContact | null>(`contacts/${contact_id}.json`);
        const contact = response.data;

        if (!contact) {
            throw new Error('Not found');
        }
        return contact;
    }
);

export const updateContact = createAsyncThunk<void, {id: string, contact: ApiContact}>(
    'contacts/updateContact',
    async ({id, contact}) => {
        await axiosApi.put(`contacts/${id}.json`, contact);
    }
);

export const createContact = createAsyncThunk<void, ContactMutation>(
    'contacts/createContact',
    async (contactToCreate) => {
        await axiosApi.post(`contacts.json`, contactToCreate);
    }
);

export const deleteContact = createAsyncThunk<void, string>(
    'contacts/deleteContact',
    async (contactId) => {
        await axiosApi.delete(`contacts/${contactId}.json`);
    }
);