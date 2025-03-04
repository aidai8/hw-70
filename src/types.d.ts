export interface Contact {
    id: string;
    name: string;
    number: string;
    email: string;
    imageUrl: string;
}

export interface ApiContact {
    name: string;
    number: string;
    email: string;
    imageUrl: string;
}

export interface ContactsListApi {
    [id: string]: ApiContact;
}

export interface ContactMutation {
    name: string;
    number: string;
    email: string;
    imageUrl: string;
}