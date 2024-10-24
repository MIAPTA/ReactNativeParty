import { useState } from "react"
import SidebarAdmin from "./SidebarAdmin"
import Welcome from "./Welcome"
import Contactos from "./Contactos"
import Product from "./Product"
import Usuario from "./Usuario"
import Sales from "./Sales"
import { useParams } from "react-router-dom";

const Administrar = () => {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState(id);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  }
  const renderSelectedComponent = () => {
    switch(selectedOption) {
      case "contactos":
        return <Contactos />;
      case "productos":
        return <Product />;
      case "usuarios":
          return <Usuario />;
      case "ventas":
        return <Sales />;
      default:
        return <Welcome />;
    }
  }

  return (
    <>
      <section className="main-content columns is-fullheight">
        <SidebarAdmin handleOptionChange={handleOptionChange} selectedOption={selectedOption} />
        {renderSelectedComponent()}
      </section>
    </>
  )
}

export default Administrar