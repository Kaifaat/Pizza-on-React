import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from "../assets/img/empty-cart.png";

 const CartEmpty: React.FC = () => {
    return (
        <>
        <div className="cart cart--empty">
            <h2>Корзина пуста <span>=\</span></h2>
            <p>
                Вероятней всего, вы не заказывали пиццу. <br/>
                Для того, чтобы заказать пиццу, перейди на главную страницу
            </p>
            <img src={cartEmptyImg} alt="..."/>
            <Link to="/" className="button button-black">
                <span>Вернуться назад</span>
            </Link>
        </div>
            </>
    );
};
 export default CartEmpty;

