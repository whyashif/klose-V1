import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import axios from 'axios';
import {useAuth} from './AuthContext';

const DataContext = createContext();
const UserDataContextProvider = ({children}) => {
  // const [token, setToken] = useState('');
  const [loader, setLoader] = useState(true);
  const [email, setEmail] = useState('');
  const [cardData, setCardData] = useState([]);
  const [cardExists, setCardExists] = useState(false);
  const [newUser, setNewUser] = useState(true);
  const [oneCardData, setOneCardData] = useState(null);
  const [phoneContact, setPhoneContact] = useState([]);
  const [update, setUpdate] = useState(false);
  const {token} = useAuth();

  const getApi = useCallback(async () => {
    const header = {
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      await axios
        .get('http://3.109.143.227/api/new/card', header)
        .then(res => {
          console.log(res);
          console.log('message');
          setCardData(res.data.data);
          if (res.data.data.length > 0) {
            setCardExists(true);
          }
          setUpdate(false);
          setLoader(false);
        })
        .catch(err => console.log(err));
    }
  }, [token, update]);

  useEffect(() => {
    getApi();
  }, [getApi]);

  return (
    <DataContext.Provider
      value={{
        cardData,
        loader,
        cardExists,
        token,
        oneCardData,
        setOneCardData,
        update,
        setUpdate,
        phoneContact,
        setPhoneContact,
        newUser,
        setNewUser,
      }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export {useData, UserDataContextProvider};
