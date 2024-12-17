import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex p-3 border-b-2 mb-2 mt-2">
      <Link
        to="/events"
        className="mr-auto text-secodary font-bold tracking-widest font-mono italic"
      >
        MeetUpNow
      </Link>

      <User size={22} strokeWidth="2px" />
    </div>
  );
};

export default Header;
