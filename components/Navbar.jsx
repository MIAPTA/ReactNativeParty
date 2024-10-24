import React from "react";
import useNavbar from "../hooks/useSelectBurger";
import "../styles/style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar({ logged, userName, userType }) {
  const { menuActive, selectedItem, toggleMenu, handleMenuItemClick } = useNavbar();

  return (
    <nav
      className={`navbar is-black`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="/src/img/Logo192x192.png" width={40} alt="Logo" />
        </Link>
        <Link className="navbar-item namepage" to="/">
          <strong>Party Shop</strong>
        </Link>
        <a
          role="button"
          className={`navbar-burger ${menuActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={menuActive}
          onClick={toggleMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu ${menuActive ? "is-active" : ""}`}>
        <div className="navbar-end">
          <Link
            className={`navbar-item ${
              selectedItem === "Inicio" ? "selected" : ""
            }`}
            to="/"
            onClick={() => handleMenuItemClick("Inicio")}
          >
            Inicio
          </Link>
          <Link
            className={`navbar-item ${
              selectedItem === "Nosotros" ? "selected" : ""
            }`}
            to="/nosotros"
            onClick={() => handleMenuItemClick("Nosotros")}
          >
            Nosotros
          </Link>
          <Link
            className={`navbar-item ${
              selectedItem === "Contacto" ? "selected" : ""
            }`}
            to="/contacto"
            onClick={() => handleMenuItemClick("Contacto")}
          >
            Contacto
          </Link>
          <Link
            className={`navbar-item ${
              selectedItem === "Productos" ? "selected" : ""
            }`}
            to="/tienda"
            onClick={() => handleMenuItemClick("Productos")}
          >
            Tienda
          </Link>
          {logged == "true" ? (
            <>
              
              {userType == "Administrador" && (
              <Link
                  className={`navbar-item ${
                    selectedItem === "Administrar" ? "selected" : ""
                  }`}
                  to="/administracion"
                  onClick={() => handleMenuItemClick("Administrar")}
              >
                Administración
              </Link>
              )}
              <Link
                className={`navbar-item ${
                  selectedItem === "Login" ? "selected" : ""
                }`}
                to="/cuenta"
                onClick={() => handleMenuItemClick("Login")}
              >
                <p className="button is-outlined  is-danger">
                  {userName.split(' ')[0].charAt(0).toUpperCase() + userName.split(' ')[0].slice(1)}
                  </p>
              </Link>
            </>
          ) : (
            <Link
              className={`navbar-item ${
                selectedItem === "Login" ? "selected" : ""
              }`}
              to="/login"
              onClick={() => handleMenuItemClick("Login")}
            >
              <p className="button is-outlined  is-danger">Iniciar Sesión</p>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
