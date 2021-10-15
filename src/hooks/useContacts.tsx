import {useState} from 'react';
import {Contact} from '../api/contact/model/Contact';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'Ignacio Iglesias',
      phone: '6122192275',
    },
  ]);

  return {contacts};
};
