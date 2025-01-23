import { CirclePlus, Menu } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth';

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleLogOut = () => {
    setAuth(false);
    setMenuOpen(false);
  };

  return (
    <div className="flex justify-between items-center px-3 py-1 border-b-2 relative mt-5 md:my-9">
      <Link
        to="/events"
        className="mr-auto text-secodary font-bold tracking-widest font-Poppins text-m "
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
        <Link
          to="/events"
          className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
          onClick={toggleMenu}
        >
          Find Events
        </Link>
        {auth ? (
          <div className="flex items-center space-x-4">
            <Link className="pr-2" to="/events/create" onClick={toggleMenu}>
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
              onClick={toggleMenu}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
              onClick={toggleMenu}
            >
              Sign Up
            </Link>
          </>
        )}
        <Link
          to="/help"
          className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
          onClick={toggleMenu}
        >
          Help Center
        </Link>
      </div>

      {menuOpen && (
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'block' : 'hidden'
          } absolute top-16 left-0 w-full bg-secodary text-white px-3 py-4 z-50 font-semibold`}
          ref={menuRef}
        >
          <div className="flex flex-col">
            <Link
              to="/events"
              className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
              onClick={toggleMenu}
            >
              Find Events
            </Link>
            {auth ? (
              <>
                <Link
                  to="/events/create"
                  className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
                  onClick={toggleMenu}
                >
                  {/* <CirclePlus size={22} className="inline-block mr-2" />  */}
                  Create Event
                </Link>
                <Link
                  to="/events/"
                  onClick={handleLogOut}
                  className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
                >
                  Log Out
                </Link>
              </>
            ) : (
              // Not Authenticated: Show Log In and Sign Up
              <>
                <Link
                  to="/login"
                  className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
                  onClick={toggleMenu}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link
              to="/help"
              className="text-primary text-xs font-Poppins p-2 hover:text-white hover:bg-secodary hover:rounded-lg"
              onClick={toggleMenu}
            >
              Help Center
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
