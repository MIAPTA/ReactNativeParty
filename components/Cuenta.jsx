import { useState } from "react";
import { useParams } from "react-router-dom";
import SidebarUser from "./SidebarUser";
import Welcome from "./Welcome";
import Perfil from "./Perfil";
import Compras from "./Compras";

const Cuenta = ({setId, setName, setLogin, setType }) => {
    const { id } = useParams();
    const [selectedOption, setSelectedOption] = useState(id);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
      }
      const renderSelectedComponent = () => {
        switch(selectedOption) {
          case "compras":
            return <Compras />;
          case "perfil":
            return <Perfil />;
          default:
            return <Welcome setName={setName}/>;
        }
      }

    return (
    <>
    <section className="main-content columns is-fullheight">
        <SidebarUser 
            handleOptionChange={handleOptionChange} selectedOption={selectedOption} 
            setId={setId} setName={setName} setLogin={setLogin} setType={setType} 
        />
        {renderSelectedComponent()}
      </section>
    </>
  )
}

export default Cuenta;
