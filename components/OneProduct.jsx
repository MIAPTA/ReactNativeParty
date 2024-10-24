import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { addToCart } from './cartUtils'; // Importa la función de utilidad

const OneProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Por defecto, 1 producto seleccionado
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URI_BACK}/api/producto/${id}`);
        setShowModal(false);
        setProduct(response.data);
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.msg || "Error desconocido";
          setModalContent(errorMessage);
          setShowModal(true);
        }
      }
    };
    fetchData();
  }, [id]);

  if (!product) {
    return null;
  }

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    // Validación: Evitar que el usuario añada 0 o menos productos al carrito
    if (quantity <= 0) {
      setModalContent("Debes añadir al menos 1 producto.");
      setShowModal(true);
      return;
    }

    addToCart(product, quantity, setModalContent, setShowModal); // Reutiliza la función de utilidad
  };

  const handleGoBack = () => {
    navigate(-1); // Esto regresa a la página anterior
  };

  return (
    <section className="oneproduct">
      <div className="columns productopromo">
        <div className="column is-6 columnimagen">
          <div className="image-product">
            <div className="centered-image">
              <img src={product.imagen} alt="" className="is-4 product-image" />
            </div>
          </div>
        </div>
        <div className="column has-background-black columnpromo containerdescrip">
          <div className="container-promo has-text-centered">
            <h2 className="title is-1 newh2">{product.nombre}</h2>
            <p className="has-text-white">{product.descripcion}</p>
            {product.cantidad > 0 && (
              <div>
                <div className="div-cantidad field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label has-text-white">Cantidad:</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={handleQuantityChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="p-precio has-text-white">${(product.precio)*quantity} COP</p>
                <div className="boton-productos">
                  <button className="button is-outlined is-info btncomprar" onClick={handleAddToCart}>
                    Añadir al carro
                  </button>
                  <br />
                  <button className="button is-outlined is-info btncomprar" onClick={handleGoBack}>
                    Seguir comprando
                  </button>
                  <br />
                  <Link to="/carrito" className="button is-outlined is-primary btncomprar">
                    Ir al carrito
                  </Link>
                </div>
              </div>
            )}
            {product.cantidad === 0 && (
              <p className="title p-agotado">Agotado</p>
            )}
          </div>
        </div>
      </div>
      <div className={`modal ${showModal ? "is-active" : ""}`}>
        <div className="modal-background" onClick={() => setShowModal(false)}></div>
        <div className="modal-card custom-modal">
          <header className="modal-card-head">
            <p className="modal-card-title">Mensaje</p>
            <button className="delete" aria-label="close" onClick={() => setShowModal(false)}></button> {/* Cambiado aquí */}
          </header>
          <section className="modal-card-body">
            <p>{modalContent}</p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default OneProduct;
