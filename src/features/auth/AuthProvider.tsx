import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextProps {
  jwt: string | null;
  setAuthToken: (token: string | null) => void;
  signout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [jwt, setJwt] = useState<string | null>(null);

  const signout = () => {
    setJwt(null);
    Cookies.remove('jwt');
  };

  const setAuthToken = (token: string | null) => {
    if (token) {
      setJwt(token);
      Cookies.set('jwt', token, { expires: 1 / 24 });
    } else {
      setJwt(null);
      Cookies.remove('jwt');
    }
  };

  useEffect(() => {
    const storedJwt = Cookies.get('jwt');
    if (storedJwt) {
      setJwt(storedJwt);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ jwt, setAuthToken, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


