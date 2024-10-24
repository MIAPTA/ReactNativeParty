import React from 'react';

const Welcome = () => {
  const userName = localStorage.getItem("userName")
  const userType = localStorage.getItem("userType")

  return (
    <section className="container section-register has-text-centered">
      <div className="container-welcome is-flex is-align-items-center is-justify-content-center">
        <div className="cont-welcome">
          <h1 className="title title-welcome">
            ¡Bienvenido, 
            { userName != "" ? 
              (" "+userName.split(' ')[0].charAt(0).toUpperCase() + userName.split(' ')[0].slice(1)) : ("")}
            !
          </h1>
          <h2 className="subtitle-welcome">
            Desde aquí podrás gestionar todo lo relacionado con
            { userType == "Administrador" ? 
              (" la página web") 
              : (" tus compras o tu perfil, así como también cerrar sesión.")}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
