import { CirclePlus, LogOut, User } from 'lucide-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth';

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const handleLogOut = () => setAuth(false);

  return (
    <div className="flex p-3 border-b-2 mb-2 mt-2">
      <Link
        to="/events"
        className="mr-auto text-secodary font-bold tracking-widest font-mono italic"
      >
        MeetUpNow
      </Link>
      {auth ? (
        <div className="flex items-center ">
          <Link className="pr-2" to={'/events/create'}>
            <CirclePlus size={22} />
          </Link>
          <Link to="/login" onClick={handleLogOut}>
            <LogOut size={22} color="black" />
          </Link>
        </div>
      ) : (
        <Link to="/login">
          <User size={22} strokeWidth="2px" />
        </Link>
      )}
    </div>
  );
};

export default Header;
