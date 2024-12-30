import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <div className="flex items-center justify-center">
        <h1
          className="box-progress text-s text-secodary"
          data-text="loading..."
        >
          loading...
        </h1>
        <span className="box-text text-secodary">{number}%</span>
      </div>
    );
  }
  return <div>Welcome</div>;
};

export default LandingPage;
