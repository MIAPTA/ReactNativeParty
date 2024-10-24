import { Link, useNavigate } from "react-router-dom";

const SidebarUser = ({ handleOptionChange, selectedOption, setId, setName, setLogin, setType }) => {
    const userId = localStorage.getItem("userId")
    const navigate = useNavigate();
    
    const handleCerrarSesion = async () =>{
      setId("");
      setName("");
      setLogin(false);
      setType("");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userType");
      navigate("/login");
  }

    return (
      <>
        <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile sidebar">
          <p className="menu is-hidden-touch">Menu</p>
          <ul className="menu-list">
            <li>
              <Link
                to="/cuenta/compras"
                className={selectedOption === "compras" ? "selected" : ""}
                onClick={() => handleOptionChange("compras")}
              >
                <span className="icon"><i className="fa fa-home"></i></span> Mis Compras
              </Link>
            </li>
            <li>
              <Link
                to="/cuenta/perfil"
                className={selectedOption === "perfil" ? "selected" : ""}
                onClick={() => handleOptionChange("perfil")}
              >
                <span className="icon"><i className="fa fa-table"></i></span> Mi Perfil
              </Link>
              
            </li>
            <li>
              <Link
                onClick={handleCerrarSesion}
              >
                <span className="icon"><i className="fa fa-table"></i></span> Cerrar Sesión
              </Link>
              
            </li>
          </ul>
        </aside>
      </>
    );
  };
  
  export default SidebarUser;