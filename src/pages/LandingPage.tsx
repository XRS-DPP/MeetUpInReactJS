import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber((prevState) => prevState + 1);
    }, 30);

    const timeout = setTimeout(() => {
      setLoading(false);
      clearInterval(interval);
      navigate('/events');
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-screen justify-around">
        <div className="flex flex-col items-center p-3 flex-grow">
          <p
            className="box-progress text-s text-secodary"
            data-text="loading..."
          >
            loading... <span className="box-text text-m">{number}%</span>
          </p>

          <p className=" bg-secodary text-white mt-10 p-3 rounded-lg font-semibold">
            Discover our community events, and save it to your google calender!
          </p>
        </div>
        <div className="h-[27%]">
          <Footer />
        </div>
      </div>
    );
  }
  return <div>Welcome</div>;
};

export default LandingPage;
