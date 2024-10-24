import "../styles/style.css";

const Footer = () => {
  return (
    <>
      <footer className="footer has-background-black">
        <div className="container">
          <div className="column container-redes">
            <h4 className="title is-4 has-text-white has-text-centered">
              Redes Sociales
            </h4>
            <div className="columns is-mobile is-centered">
              <div className="column is-1 has-text-centered">
                <i className="fa-brands fa-facebook"></i>
              </div>
              <div className="column is-1 has-text-centered">
                <i className="fa-brands fa-instagram"></i>
              </div>
              <div className="column is-1 has-text-centered">
                <i className="fa-brands fa-twitter"></i>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="bd-notification column">
              <h4 className="title is-4 has-text-white has-text-left">
                Contactanos
              </h4>
              <div className="has-text-white">
                <p>Dirección: Calle 20 #11-20. Centro, Neiva – Colombia</p>
                <p>Comunícate: +57 (317) 8517589. contactenos@dominio.com</p>
              </div>
            </div>
            <div className="bd-notification column">
              <h4 className="title is-4 has-text-white has-text-right">
                Horarios de Atención
              </h4>
              <div className="has-text-white has-text-right">
                <p className="">Lunes a Viernes: 7:00AM – 3:00PM</p>
                <p className="">Sabado : 7:00AM – 1:00PM</p>
                <p className="">Domingos y Festivos: Cerrado</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
