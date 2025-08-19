import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext({
  user: null,
  initializing: true,
  login: async (_email, _password) => {},
  signup: async (_email, _password, _displayName) => {},
  logout: async () => {},
  loginAsAdmin: async (_email) => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('demo_user');
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch (_) {}
    setInitializing(false);
  }, []);

  const login = async (email, _password) => {
    const demoUser = {
      email,
      displayName: email.split('@')[0],
      role: email.endsWith('@dot.gov') || email.endsWith('@transport.gov') ? 'admin' : 'applicant'
    };
    window.localStorage.setItem('demo_user', JSON.stringify(demoUser));
    setUser(demoUser);
    return demoUser;
  };

  const signup = async (email, _password, displayName) => {
    const demoUser = {
      email,
      displayName: displayName || email.split('@')[0],
      role: 'applicant'
    };
    window.localStorage.setItem('demo_user', JSON.stringify(demoUser));
    setUser(demoUser);
    return demoUser;
  };

  const loginAsAdmin = async (email) => {
    const demoUser = {
      email,
      displayName: email.split('@')[0],
      role: 'admin'
    };
    window.localStorage.setItem('demo_user', JSON.stringify(demoUser));
    setUser(demoUser);
    return demoUser;
  };

  const logout = async () => {
    window.localStorage.removeItem('demo_user');
    setUser(null);
  };

  const value = useMemo(() => ({ user, initializing, login, signup, logout, loginAsAdmin }), [user, initializing]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;

