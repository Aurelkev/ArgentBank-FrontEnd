import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>

      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="main-nav-item nav-button">
            <i className="fa fa-sign-out"></i> Logout
          </button>
        ) : (
          <button onClick={handleLogin} className="main-nav-item nav-button">
            <i className="fa fa-user-circle"></i> Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Header;
