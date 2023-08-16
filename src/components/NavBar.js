import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styles from "./NavBar.module.css";
import logo from "./logo.svg";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className={`content-general ${styles.nav}`}>
      <div className={`max-width ${styles.headerContainer}`}>
        <Link className={styles.logo} to={user ? "/provider/list" : "/"}>
          <img className={styles.logoImg} src={logo} alt="logo" />
          <span className={styles.logoText}></span>
        </Link>
        <ul className={styles.navMenu}>
          {user ? (
            <>
              {user && (
                <span className={styles.userText}>Hello {user.email}</span>
              )}
              <li>
                <Link to="/provider/list">ListProv</Link>
              </li>
              <li>
                <Link to="/provider/posts">Add Post</Link>
              </li>
              <li>
                <a className="btn-link" onClick={logoutUser}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
