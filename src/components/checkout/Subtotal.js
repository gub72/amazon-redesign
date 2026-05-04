import React, { useState } from "react";
import "../../styles/Subtotal.css";
import * as utils from "../../logic/utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { profile } = useSelector((state) => state.user);

  const [error, setError] = useState('');

  return (
    <div className="subtotal">
      <div className="subtotal__title">
        Subtotal ({!cart.length ? 'vazio' : `${cart.length} ${cart.length === 1 ? 'item' : 'itens'}` }):&nbsp;
        <strong>
          {utils.formatter.format(
            cart.reduce(
              (totalPrice, item) => (totalPrice += parseFloat(item.price)),
              0
            )
          )}
        </strong>
      </div>
      <div className="subtotal__gift">
        <input type="checkbox" name="gift" id="subtotal-gift" />
        <label htmlFor="subtotal-gift">Este pedido contém um presente</label>
      </div>
      <button
        onClick={() => {
          if (!cart.length) {
            setError('Seu carrinho está vazio');
            return;
          }
          profile ? navigate("/payment") : setError('Por favor, faça login primeiro');
        }}
        className="subtotal__button"
        aria-label="Fechar pedido e ir para o pagamento"
      >
        Fechar pedido
      </button>
      <div className="subtotal__error" role="alert">
        {error}
      </div>
    </div>
  );
}

export default Subtotal;
