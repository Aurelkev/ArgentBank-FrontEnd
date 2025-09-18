import './Header.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userSlice';

function Header() {
  const { userName, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.webp"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>

      <div>
        {token ? (
          <>
            <span className="main-nav-item nav-button">
              <i className="fa fa-user-circle"></i> {userName}
            </span>
            <button
              onClick={handleLogout}
              className="main-nav-item nav-button"
            >
              <i className="fa fa-sign-out"></i> Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="main-nav-item nav-button"
          >
            <i className="fa fa-user-circle"></i> Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Header;
