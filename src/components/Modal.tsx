import { X } from 'lucide-react';

type User = {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
};
type Props = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    confirmEmail: string;
  };
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<Boolean>>;
};

const Modal = ({ user, setIsModalOpen, setUser }: Props) => {
  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [field]: e.target.value });
    };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full h-full bg-white z-1000">
        <button
          className="absolute top-2 right-2"
          onClick={() => setIsModalOpen(false)}
        >
          <X className="size=16px" strokeWidth={1.25} />
        </button>

        <h2 className="mt-10 mb-10 text-center text-primary font-semibold text-m">
          Register Attendance
        </h2>
        {/* <div className="w-full flex flex-row gap-2 bg-gray-500 "> */}
        <div className="w-[100%]  p-3">
          <form
            className="flex flex-col gap-3"
            onSubmit={() => console.log('submit')}
          >
            <input
              placeholder="First Name"
              value={user.firstName}
              onChange={handleChange('firstName')}
              className="border-2 rounded-md p-3 flex-1"
              required={true}
            ></input>
            <input
              placeholder="Last Name"
              value={user.lastName}
              onChange={handleChange('lastName')}
              className="border-2 rounded-md p-3 flex-1"
              required={true}
            ></input>
            {/* </div> */}

            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange('email')}
              className="border-2 rounded-md p-3"
              required={true}
            ></input>

            <input
              type="email"
              placeholder="Confirm Email"
              value={user.confirmEmail}
              onChange={handleChange('confirmEmail')}
              className="border-2 rounded-md p-3"
              required={true}
            ></input>
            <button
              type="submit"
              // onClick={() => setIsModalOpen(false)}
              className="mt-10 p-3 bg-secodary text-white text-s rounded-md"
            >
              Submit
            </button>
            {user.email &&
              user.confirmEmail &&
              user.email !== user.confirmEmail && <p>Emails don't match</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
