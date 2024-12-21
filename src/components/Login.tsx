import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const admin = { email: 'admin@meetupnow.com', password: 'IamSuperAdmin!' };
  const userRef = useRef<HTMLInputElement | undefined>();
  const [input, setInput] = useState({ email: '', password: '' });
  const [isLoggedin, setIsLoggedin] = useState<Boolean>(false);
  //   const navigate = useNavigate();

  useEffect(() => {
    userRef.current!.focus();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.email === admin.email && input.password === admin.password) {
      setIsLoggedin(true);
      console.log(input);
      //   navigate('/events');
    }
  };

  return (
    <>
      {isLoggedin ? (
        <section className="text-center bg-secodary p-3 m-2 text-white mt-10 rounded-md">
          <h1 className="font-bold text-m ">Log in successful</h1>
          <br></br>
          <Link to="/events" className="underline text-s font-semibold">
            Go to home page
          </Link>
        </section>
      ) : (
        <section className="p-2">
          <h2 className="text-m font-semibold pl-2 mt-4 text-primary">
            Log in
          </h2>
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

            <button className="bg-secodary text-white font-semibold p-3 rounded-md text-center text-s mt-4">
              Log In
            </button>
          </form>
        </section>
      )}
    </>
  );
};
