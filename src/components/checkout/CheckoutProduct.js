import React from "react";
import "../../styles/CheckoutProduct.css";
import * as utils from "../../logic/utils";
import { useDispatch } from "react-redux";
import Star from "../common/Star";
import { removeItem } from "../../redux/features/cart/cartSlice";
import socials from "../../data/socials";

function CheckoutProduct({ index, image, title, price, rating }) {
  const dispatch = useDispatch();
  const handleRemoveItem = () => {
    dispatch(removeItem(index));
  }

  return (
    <div className="checkout__product">
      <div className="checkout__productImg">
        <img src={image} alt={title} width={256} height={256} />
      </div>

      <div className="checkout__productInfo">
        <div className="checkout__productTitlePrice">
          <div className="checkout__productTitle">{title}</div>
          <div className="checkout__productPrice">${price}</div>
        </div>

        <div className="checkout__productGift">
          <input type="checkbox" name="gift" id={`gift-${index}`} />
          <label htmlFor={`gift-${index}`}>Este item é para presente</label>
          <a href={socials.github} target="_blank" rel="noreferrer" aria-label="Saiba mais sobre presentes">
            Saiba mais
          </a>
        </div>

        <div className="checkout__productRating" aria-label={`Avaliação: ${rating} de 5 estrelas`}>
          {utils.renderRating(rating * 2).map((val, i) => (
            <Star key={i} text={val} />
          ))}
        </div>

        <div className="checkout__productButtons">
          <button type="button" onClick={handleRemoveItem} aria-label={`Excluir ${title} do carrinho`}>Excluir</button>
          <button type="button" aria-label={`Salvar ${title} para depois`}>Salvar para depois</button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutProduct;
