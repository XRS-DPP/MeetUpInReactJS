import { createContext, useState } from 'react';

type AuthContextProps = {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
};
export const AuthContext = createContext<AuthContextProps>({
  auth: false,
  setAuth: () => {},
});

type Props = { children: JSX.Element | JSX.Element[] };
export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState(false);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
