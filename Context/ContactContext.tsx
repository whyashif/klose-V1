import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from 'react';

import { PermissionsAndroid, Platform, } from 'react-native';
import Contacts from 'react-native-contacts';







const ContactContext = createContext<GlobalContext>();
const ContactContextProvider = ({ children }) => {
    const [contactsFromPhone, setContactsFromPhone] = useState<[]>([]);
    const [contactLoader, setContactLoader] = useState<boolean>(true)
    const loadContacts = useCallback(() => {
        Contacts.getAll()
            .then(contacts => {
                // console.log(contacts);
                setContactsFromPhone(contacts);
            })
            .catch(e => {
                // console.log("..........", e)
                alert('Permission to access contacts was denied');
                // console.warn('Permission to access contacts was denied');
            });
    }, [contactsFromPhone]);

    const getContacts = async () => {
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
    };
    useEffect(() => {
        getContacts();
    }, []);

    return (
        <ContactContext.Provider value={{ contactsFromPhone, setContactsFromPhone, contactLoader, setContactLoader }}>
            {children}
        </ContactContext.Provider>
    );
};

const useContacts = () => useContext(ContactContext);

export { useContacts, ContactContextProvider };