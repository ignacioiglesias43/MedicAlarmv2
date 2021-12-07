import { Contact } from "../api/contact/model/Contact";

type ContactState = {
    contacts: Array<Contact>
}

type ContactAction = {
    type: string,
    payload: any;
}

type DispatchContactActionType = (args: ContactAction) => ContactAction;
