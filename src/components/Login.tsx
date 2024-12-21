import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const admin = { email: 'admin@meetupnow.com', password: 'IamSuperAdmin!' };

  const [input, setInput] = useState({ email: '', password: '' });
  const [isLoggedin, setIsLoggedin] = useState<Boolean>(false);

  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((pre) => ({ ...pre, [name]: value }));
  };

  const handleLogin = () => {
    if (input.email === admin.email && input.password === admin.password) {
      setIsLoggedin(true);
      navigate('/events');
    }
  };

  return (
    <div className="p-2">
      <p className="text-m font-semibold pl-2 mt-4 text-primary">Log in</p>
      <form
        className="flex flex-col gap-5 p-2 mt-4"
        onSubmit={(e) => {
          e.preventDefault;
          handleLogin();
        }}
      >
        <input
          type="email"
          placeholder="Email"
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
        {/* {loginError && <p>Email and password don't match</p>} */}
        <button className="bg-secodary text-white font-semibold p-3 rounded-md text-center text-s mt-4">
          Log In
        </button>
      </form>
    </div>
  );
};
