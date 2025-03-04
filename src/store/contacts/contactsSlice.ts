import {ApiContact, Contact} from "../../types";
import {RootState} from "../../app/store.ts";
import {createSlice} from "@reduxjs/toolkit";
import {createContact, deleteContact, fetchContacts, fetchOneContactById, updateContact} from "./contactsThunks.ts";


interface ContactsState {
    items: Contact[];
    fetchLoading: boolean;
    fetchOneLoading: boolean;
    deleteLoading: boolean | string;
    creatingLoading: boolean;
    updateLoading: boolean;
    oneContact: ApiContact | null;
}

const initialState: ContactsState = {
    items: [],
    fetchLoading: false,
    fetchOneLoading: false,
    deleteLoading: false,
    creatingLoading: false,
    updateLoading: false,
    oneContact: null,
};

export const selectContacts = (state: RootState) => state.contacts.items;
export const selectFetchContactsLoading = (state: RootState) => state.contacts.fetchLoading;
export const selectFetchOneContactLoading = (state: RootState) => state.contacts.fetchOneLoading;
export const selectDeleteContactsLoading = (state: RootState) => state.contacts.deleteLoading;
export const selectCreateContactLoading = (state: RootState) => state.contacts.creatingLoading;
export const selectUpdateContactLoading = (state: RootState) => state.contacts.updateLoading;
export const selectOneContact = (state: RootState) => state.contacts.oneContact;

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        clearOneContact: (state) => {
            state.oneContact = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchContacts.fulfilled, (state, {payload: contacts}) => {
                state.items = contacts;
                state.fetchLoading = false;
            })
            .addCase(fetchContacts.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(fetchOneContactById.pending, (state) => {
                state.oneContact = null;
                state.fetchOneLoading = true;
            })
            .addCase(fetchOneContactById.fulfilled, (state, {payload: contact}) => {
                state.oneContact = contact;
                state.fetchOneLoading = false;
            })
            .addCase(fetchOneContactById.rejected, (state) => {
                state.oneContact = null;
                state.fetchOneLoading = false;
            })

            .addCase(deleteContact.pending, (state, {meta}) => {
                state.deleteLoading = meta.arg;
            })
            .addCase(deleteContact.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteContact.rejected, (state) => {
                state.deleteLoading = false;
            })

            .addCase(createContact.pending, (state) => {
                state.creatingLoading = true;
            })
            .addCase(createContact.fulfilled, (state) => {
                state.creatingLoading = false;
            })
            .addCase(createContact.rejected, (state) => {
                state.creatingLoading = false;
            })

            .addCase(updateContact.pending, (state) => {
                state.updateLoading = true;
            })
            .addCase(updateContact.fulfilled, (state) => {
                state.updateLoading = false;
            })
            .addCase(updateContact.rejected, (state) => {
                state.updateLoading = false;
            })
    }
});


export const contactsReducer = contactsSlice.reducer;
export const {clearOneContact} = contactsSlice.actions;