import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth';

export const Login = () => {
  const admin = { email: 'admin@meetupnow.com', password: '123!' };
  const userRef = useRef<HTMLInputElement | undefined>();
  const [input, setInput] = useState({ email: '', password: '' });
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState('');
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    userRef.current!.focus();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrMsg('');
    const { name, value } = e.target;
    setInput((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.email === admin.email && input.password === admin.password) {
      setIsLoggedin(true);
      setAuth(true);
    }
    setErrMsg('Email and password do not match');
  };

  return (
    <>
      {isLoggedin ? (
        <section className="text-secodary">
          <h2 className="font-bold text-m ">Log in successful</h2>
          <br></br>
          <Link to="/events" className="underline text-s font-semibold">
            Go to home page
          </Link>
        </section>
      ) : (
        <section>
          <h2 className="font-semibold text-primary text-m">Log in</h2>
          <form
            className="flex flex-col gap-5 p-2 mt-4"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              type="email"
              placeholder="Email"
              ref={userRef}
              value={input.email}
              name="email"
              onChange={handleInput}
              className="border-2 rounded-md p-3 "
              required={true}
            ></input>

            <input
              type="password"
              placeholder="Password"
              value={input.password}
              className="border-2 rounded-md p-3"
              name="password"
              onChange={handleInput}
              required={true}
              autoComplete="on"
            ></input>
            <p>{errMsg}</p>
            <button className="bg-secodary text-white font-semibold p-3 rounded-md text-center text-s mt-4">
              Log In
            </button>
          </form>
        </section>
      )}
    </>
  );
};
