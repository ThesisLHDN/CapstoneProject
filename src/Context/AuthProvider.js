import React, {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {auth} from 'src/firebase/config';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

export const AuthContext = React.createContext();

function AuthProvider({children}) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const paths = useLocation();
  // console.log(paths.pathname);
  const pathName = paths.pathname;

  const history = useNavigate();

  const addUser = async () => {
    try {
      const res = await axios.post('/user', user);
      console.log(user);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getLastestWorkspace = async (uid) => {
    try {
      const res = await axios.get(`/lastworkspace/${uid}`);
      history(`/workspace-setting/${res.data.id}?user=${uid}`);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const {displayName, email, uid, photoURL} = user;
        // console.log(displayName, email, uid, photoURL);
        setUser({displayName, email, uid, photoURL});
        addUser();
        if (
          pathName === '/login' ||
          pathName === '/signup' ||
          pathName === '/forget' ||
          pathName === '/'
        ) {
          getLastestWorkspace(uid);
        }
        setIsLoading(false);
      } else {
        if (pathName !== '/signup' && pathName !== '/forget') {
          history('/login');
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    });

    // clean function
    return () => {
      unsubscribed();
    };
  }, [history]);

  return (
    <AuthContext.Provider value={{user}}>
      {/* {children} */}
      {isLoading ? (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
  // value is the thing that all children can access
}

export default AuthProvider;
