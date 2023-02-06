import React, {createContext, useContext, useState} from 'react';

const IdContext = createContext();
const IdContextProvider = ({children}) => {
  const [idContext, setIdContext] = useState('');
  return (
    <IdContext.Provider value={{idContext, setIdContext}}>
      {children}
    </IdContext.Provider>
  );
};

const useID = () => useContext(IdContext);

export {useID, IdContextProvider};
