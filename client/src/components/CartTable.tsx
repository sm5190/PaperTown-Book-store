import React, { useContext } from "react";
import "../assets/css/carttable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
    faMinusCircle,
    faPlusCircle,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { CartStore } from "../reducers/CartContext";
import { CartTypes } from "../reducers/CartReducer";
import { BookItem, ShoppingCartItem } from "../types";
import {Link} from "react-router-dom";
import {asDollarsAndCents} from "../utils";

const bookImageFileName = (book: BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    return `${name}.jpg`;
};

const CartTable: React.FC = () => {
    const { cart, dispatch } = useContext(CartStore);

    const addBookToCart = (book: BookItem) => {
        dispatch({ type: CartTypes.ADD, item: book, id: book.bookId });
    };

    const removeBookFromCart = (cartItem: ShoppingCartItem) => {
        dispatch({ type: CartTypes.REMOVE, item: cartItem.book });
    };

    const clearCart = () => {
        dispatch({ type: CartTypes.CLEAR });
    };


    const storagekey2= "recent_cat";
    const storedCat = localStorage.getItem(storagekey2);
        console.log(storedCat)
 

    const totalQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const totalPrice = cart.reduce((total, cartItem) => total + cartItem.quantity * (cartItem.book?.price || 0), 0);

    return (
        <div >
            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty.</p>
                    <br/>
                    <br/>
                    <br/>
                    <Link to={`/categories/${(storedCat || '').replace(/["']/g, '')}`}>
                        <button className="continue-shopping-button">Continue Shopping</button>
                    </Link>
                </div>
            ) : (
                <>

                    <li className="list total">
                        <div>
                            <h2>
                                <b>Total Quantity</b>: {totalQuantity}
                                &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;{/* Add space between Total Quantity and Total Price */}
                                <b>Total Price</b>: ${totalPrice.toFixed(2)}
                            </h2>
                        </div>
                    </li>

                    {cart.length > 0 && (

                        <div className="button-style">
                            <Link to={'/checkout'}>
                                <button className="proceed-to-checkout-button">
                                    Proceed to Checkout
                                </button>

                            </Link>
                            </div>)}
                    <div className="button-style">
                        <Link to={`/categories/${(storedCat || '').replace(/["']/g, '')}`}>
                            <button className="continue-shopping-button">Continue Shopping</button>
                        </Link>
                    </div>


                    <div className="cart-table">
                    <ul className="cart2 unordered-list">
                        <li className=" list table-heading">
                            <div className="heading-book">Book</div>
                            <div className="heading-price">Price/Quantity </div>

                            <div className="heading-subtotal">Amount</div>
                        </li>



                        {cart.map((cartItem, index) => (
                            <React.Fragment key={index}>
                                <li className="list">
                                    <div className="cart-book-image">
                                        <img
                                            src={require(`../assets/images/Catagory/${bookImageFileName(cartItem.book)}`)}
                                            alt={cartItem.book?.title || "No Title"}
                                            width="110px"
                                            height="160px"
                                            style={{ display: "block", margin: "0 auto" }}
                                        />
                                    </div>
                                    <div className="cart-book-title">{cartItem.book?.title || "No Title"}</div>
                                    <div className="cart-book-price">${cartItem.book?.price || 0}</div>
                                    <div className="cart-book-quantity">
                                        <button onClick={() => removeBookFromCart(cartItem)} className="icon-button dec-arrow-button">
                                            <FontAwesomeIcon icon={faMinusCircle} />
                                        </button>
                                        <span className="quantity">&nbsp;&nbsp;&nbsp;{cartItem.quantity}&nbsp;&nbsp;</span>
                                        <button onClick={() => addBookToCart(cartItem.book)} className="icon-button inc-arrow-button">
                                            <FontAwesomeIcon icon={faPlusCircle} />
                                        </button>
                                    </div>
                                    <div className="cart-book-subtotal">${cartItem.quantity * (cartItem.book?.price || 0)}</div>
                                </li>





                                <li className=" list line-sep"></li>
                            </React.Fragment>
                        ))}



                        <li className=" list line-sep"></li>

                    </ul>

                </div>






                    <div className="button-style" >




                        <button className="clear-cart-button" onClick={clearCart}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>






                    </div>


                </>
            )}


        </div>



    );
};

export default CartTable;
