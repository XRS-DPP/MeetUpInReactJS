import { CirclePlus, Menu } from 'lucide-react';
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
    <div className="flex justify-between items-center p-2 border-b-2 relative mt-4">
      <Link
        to="/events"
        className="mr-auto text-secodary font-bold tracking-widest font-Poppins text-m italic"
      >
        MeetUpNow
      </Link>
      <button
        className="md:hidden p-2"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      <div className="hidden md:flex space-x-6">
        <p className="text-purple-500">Debugging visible on small screen</p>
        <Link
          to="/events"
          className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
        >
          Find Events
        </Link>
        <Link
          to="/help"
          className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
        >
          Help Center
        </Link>
        {auth ? (
          <div className="flex items-center space-x-4">
            <Link className="pr-2" to="/events/create">
              <CirclePlus size={22} />
            </Link>
            <button
              onClick={handleLogOut}
              className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
            >
              Log Out
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {menuOpen && (
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'block' : 'hidden'
          } absolute top-16 left-0 w-full bg-white p-4 z-50`}
        >
          <div className="flex flex-col">
            <Link
              to="/events"
              className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
            >
              Find Events
            </Link>
            <Link
              to="/help"
              className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
            >
              Help Center
            </Link>
            {auth ? (
              <>
                <Link
                  to="/events/create"
                  className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
                >
                  <CirclePlus size={22} className="inline-block mr-2" /> Create
                  Event
                </Link>
                <button
                  onClick={handleLogOut}
                  className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
                >
                  Log Out
                </button>
              </>
            ) : (
              // Not Authenticated: Show Log In and Sign Up
              <>
                <Link
                  to="/login"
                  className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
