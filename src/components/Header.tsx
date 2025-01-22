import { CirclePlus, LogOut, Menu, User } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth';

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };
  const handleLogOut = () => {
    setAuth(false);
    setMenuOpen(false);
  };

  return (
    <div className="flex p-3 border-b-2 mb-2 mt-2">
      <Link
        to="/events"
        className="mr-auto text-secodary font-bold tracking-widest font-Poppins text-s italic"
      >
        MeetUpNow
      </Link>

      <div className="flex items-center space-x-4">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden p-2"
          onClick={() => {
            toggleMenu;
          }}
        >
          <Menu />
        </button>
        {auth ? (
          <div
            className={`flex items-center space-x-4 ${
              menuOpen ? 'block' : 'hidden'
            } md:flex`}
          >
            <Link className="pr-2" to="/events/create">
              <CirclePlus size={22} />
            </Link>
            <Link to="/login" onClick={handleLogOut}>
              Logout
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <User size={22} strokeWidth="2px" />
          </Link>
        )}
        {/* {auth ? (
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
        )} */}
      </div>
    </div>
  );
};

export default Header;
