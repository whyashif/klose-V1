import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

import {PermissionsAndroid, Platform} from 'react-native';
import Contacts from 'react-native-contacts';

const ContactContext = createContext<GlobalContext>();
const ContactContextProvider = ({children}) => {
  const [contactsFromPhone, setContactsFromPhone] = useState<[]>([]);
  const [contactData, setContactData] = useState<[]>([]);
  const [updateContact, setUpdateContact] = useState<boolean>(false);
  const [contactLoader, setContactLoader] = useState<boolean>(true);
  const loadContacts = useCallback(() => {
    console.log('get contacts called');
    Contacts.getAll()
      .then(contacts => {
        const data = contacts.sort((a, b) => {
          if (a.displayName > b.displayName) {
            return 1;
          }
          if (a.displayName < b.displayName) {
            return -1;
          }
          return 0;
        });

        setContactsFromPhone(data);
        setContactData(data);
      })
      .catch(e => {
        // console.log("..........", e)
        alert('Permission to access contacts was denied');
        // console.warn('Permission to access contacts was denied');
      });
  }, [contactsFromPhone, updateContact]);

  const getContacts = useCallback(async () => {
    console.log('get contacts called');
    // We need to ask permission for Android only
    if (Platform.OS === 'android') {
      // Calling the permission function
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Example App Camera Permission',
          message: 'Example App needs access to your camera',
        },
      );
      // console.log('====================================');
      console.log('granted', granted);
      // console.log('====================================');
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission Granted
        loadContacts();
      } else {
        // Permission Denied
        alert('CAMERA Permission Denied');
      }
    } else {
      loadContacts();
    }
    setContactLoader(false);
    setUpdateContact(false);
  }, []);
  useEffect(() => {
    getContacts();
  }, [getContacts, updateContact]);

  return (
    <ContactContext.Provider
      value={{
        contactsFromPhone,
        setContactsFromPhone,
        contactLoader,
        setContactLoader,
        contactData,
        setContactData,
        setUpdateContact,
      }}>
      {children}
    </ContactContext.Provider>
  );
};

const useContacts = () => useContext(ContactContext);

export {useContacts, ContactContextProvider};
