import { Link } from 'react-router-dom';
import { type MouseEvent} from 'react';
import Auth from '../utils/auth';
import logo from '../assets/logo.png'; 



const Header = () => {
    const logout = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      // Logs the user out by calling the logout method from Auth
      Auth.logout();
    };


 return (
    <header>
      <div>
        <div>
            <div id = "logoImg"> 
                <img src={logo} alt="Travel Journal Logo"/>
            </div>
            <Link to="/">
                    <h1>Nomad Notebook</h1>
            </Link>
          <p >Please login or sign up to begin your journal!</p>
        </div>
        <div>
          {/* Checking if the user is logged in to conditionally render profile link and logout button */}
          {Auth.loggedIn() ? (
            <>
            {/* no /me route so need to remove that linked our area */}
              <Link to="/mystories">
                My Stories
              </Link>
              <button onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                Login&nbsp; 
              </Link>
              <Link to="/signup">
                Signup&nbsp;
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
