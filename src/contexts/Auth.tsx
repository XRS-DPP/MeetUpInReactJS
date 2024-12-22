import { createContext, useState } from 'react';

export const AuthContext = createContext();

type Props = { children: JSX.Element | JSX.Element[] };
export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState(false);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
