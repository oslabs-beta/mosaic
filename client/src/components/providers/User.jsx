import {useContext, createContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const UserContext = createContext();

const Provider = ({children}) => {
  const [userState, setUserState] = useState({});

  const contextValues = {
    userState,
    setUserState,
  };

  const fetchUser = async () => {
    const {data} = await axios.get('http://localhost:8080/auth/current_user', {
      withCredentials: 'include',
    });
    setUserState(data ?? {});
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <UserContext.Provider value={contextValues}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  const contextValues = useContext(UserContext);
  if (!contextValues) {
    throw new Error('useUserContext must be used within UserContextProvider');
  }
  return contextValues;
};

Provider.propTypes = {
  children: PropTypes.array,
};

export {useUserContext};
export default {
  Provider,
  UserContext,
};
