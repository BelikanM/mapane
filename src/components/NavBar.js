import React from "react";
import { FaRegEdit, FaNewspaper, FaComments } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  return (
    <>
      <nav className="navbar">
        <Link
          to="/publication"
          className={`nav-link${location.pathname === "/publication" ? " active" : ""}`}
        >
          <FaRegEdit className="nav-icon" />
          <span>Publication</span>
        </Link>
        <Link
          to="/actualite"
          className={`nav-link${location.pathname === "/actualite" ? " active" : ""}`}
        >
          <FaNewspaper className="nav-icon" />
          <span>Actualité</span>
        </Link>
        <Link
          to="/chat"
          className={`nav-link${location.pathname === "/chat" ? " active" : ""}`}
        >
          <FaComments className="nav-icon" />
          <span>Chat</span>
        </Link>
      </nav>
      <style>{`
        .navbar {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          background: #111827;
          padding: 0.8rem 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07);
          border-radius: 1rem;
          margin: 1rem;
        }
        .nav-link {
          color: #e5e7eb;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: color 0.2s;
          padding: 0.4rem 0.6rem;
        }
        .nav-link.active,
        .nav-link:hover {
          color: #3b82f6;
        }
        .nav-icon {
          font-size: 1.8rem;
          margin-bottom: 0.2rem;
        }
      `}</style>
    </>
  );
};

export default NavBar;
