import { FormEvent, useState, useRef } from 'react';

const SignUp = () => {
  const [errMsg, setErrMsg] = useState('');
  const [input, setInput] = useState({ email: '', password: '', userName: '' });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const userRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="flex items-center justify-center mt-5 p-3 flex-col w-full">
      <h2>
        We're currently working on this feature that will allow community
        members like YOU to create and manage local events directly on our
        platform. It will be live soon!
      </h2>
      <section className="w-full">
        <h2 className="font-semibold text-primary text-m">Sign Up</h2>
        <form
          className="flex flex-col gap-5 mt-4 w-full"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            placeholder="User name"
            ref={userRef}
            value={input.userName}
            name="userName"
            className="border-2 rounded-md p-3 "
            required={true}
          ></input>
          <input
            type="email"
            placeholder="Email"
            ref={userRef}
            value={input.email}
            name="email"
            className="border-2 rounded-md p-3 "
            required={true}
          ></input>

          <input
            type="password"
            placeholder="Password"
            value={input.password}
            className="border-2 rounded-md p-3"
            name="password"
            required={true}
            autoComplete="on"
          ></input>
          <input
            type="password"
            placeholder="Confirmed password"
            value={input.password}
            className="border-2 rounded-md p-3"
            name="password"
            required={true}
            autoComplete="on"
          ></input>
          <p>{errMsg}</p>
          <button className="bg-secodary text-white font-semibold p-3 rounded-md text-center text-s mt-4">
            Sign Up
          </button>
        </form>
      </section>
    </div>
  );
};

export default SignUp;
