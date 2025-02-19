import { X } from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router-dom';
type User = {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
};

type Event = {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  image: string;
  status: string;
  interestedCount: number;
  attendees: User[];
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
  setConfirmGoing: React.Dispatch<React.SetStateAction<Boolean>>;
  setEventList: React.Dispatch<React.SetStateAction<Event[]>>;
};

const Modal = ({
  user,
  setIsModalOpen,
  setUser,
  setConfirmGoing,
  setEventList,
}: Props) => {
  const { id } = useParams();
  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [field]: e.target.value });
    };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full h-full bg-white z-1000 flex justify-center items-start">
        <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[40%] bg-white rounded-lg relative py-5">
          <button
            className="absolute top-2 right-2 flex border-2 border-slate-500"
            onClick={() => setIsModalOpen(false)}
          >
            <X className="size=16px" strokeWidth={1.25} />
          </button>

          <h2 className="mt-12 mb-10 text-center text-primary font-semibold text-m">
            Register Attendance
          </h2>
          {/* <div className="w-full flex flex-row gap-2 bg-gray-500 "> */}
          <div className="w-[100%] p-3 mt-auto">
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(false), setConfirmGoing(true);
                setEventList((prev) => {
                  return prev.map((item) => {
                    if (item.id === +id!) {
                      return {
                        ...item,
                        interestedCount: item.interestedCount + 1,
                        attendees: [...item.attendees, user],
                      };
                    }
                    return item;
                  });
                });
              }}
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
      </div>
    </>
  );
};

export default Modal;
