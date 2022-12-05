import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {auth} from 'src/firebase/config';
import CircularProgress from '@mui/material/CircularProgress';

export const AuthContext = React.createContext();

function AuthProvider({children}) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const history = useNavigate();
  React.useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      console.log({user});
      if (user) {
        const {displayName, email, uid, photoURL} = user;
        console.log(displayName, email, uid, photoURL);
        setUser({displayName, email, uid, photoURL});
        history('/');
        setIsLoading(false);
      } else {
        // history('/login');
      }
    });

    // clean function
    return () => {
      unsubscribed();
    };
  }, [history]);

  return (
    <AuthContext.Provider value={{user}}>
      {children}
      {/* {isLoading ? <CircularProgress /> : children} */}
    </AuthContext.Provider>
  ); // value is the thing that all children can access
}

export default AuthProvider;
