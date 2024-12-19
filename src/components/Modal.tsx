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
  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full h-full bg-white z-1000">
        <button
          className="absolute top-2 right-2"
          onClick={() => setIsModalOpen(false)}
        >
          <X className="size=16px" strokeWidth={1.25} />
        </button>

        <div className="w-[100%] flex flex-col gap-3 p-3">
          <h2 className="mt-10 mb-10 text-center text-primary font-semibold text-m">
            Register Attendance
          </h2>
          {/* <div className="w-full flex flex-row gap-2 bg-gray-500 "> */}
          <input
            placeholder="First Name"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            className="border-2 rounded-md p-3 flex-1"
          ></input>
          <input
            placeholder="Last Name"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            className="border-2 rounded-md p-3 flex-1"
          ></input>
          {/* </div> */}

          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border-2 rounded-md p-3"
          ></input>

          <input
            type="email"
            placeholder="Confirm Email"
            value={user.confirmEmail}
            onChange={(e) => setUser({ ...user, confirmEmail: e.target.value })}
            className="border-2 rounded-md p-3"
          ></input>
          <button className="mt-10 p-3 bg-secodary text-white text-s rounded-md">
            Confirm
          </button>
          {user.email &&
            user.confirmEmail &&
            user.email !== user.confirmEmail && <p>Emails don't match</p>}
        </div>
      </div>
    </>
  );
};

export default Modal;
