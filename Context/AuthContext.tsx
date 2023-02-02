import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthenticationContext = createContext();
const AuthenticationContextProvider = ({children}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  const getAuth = useCallback(async () => {
    // console.log('inside getemail authProvider');
    try {
      // console.log('inside try getemail');
      const value = await AsyncStorage.getItem('@token');
      const data_output = JSON.parse(value);

      if (value !== null) {
        setToken(data_output);
        setAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, [authenticated]);

  useEffect(() => {
    getAuth();
  }, [getAuth]);

  return (
    <AuthenticationContext.Provider
      value={{authenticated, setAuthenticated, token}}>
      {children}
    </AuthenticationContext.Provider>
  );
};

const useAuth = () => useContext(AuthenticationContext);

export {useAuth, AuthenticationContextProvider};
