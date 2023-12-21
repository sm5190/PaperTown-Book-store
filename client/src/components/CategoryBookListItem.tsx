import '../types';
import '../assets/css/category-book-list.css';
import '../assets/css/category.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { CartTypes } from "../reducers/CartReducer";
import {CartContext, CartStore} from "../reducers/CartContext";
import { BookItem } from "../types";
import {Link} from "react-router-dom";

const bookImageFileName = (book: BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    return `${name}.jpg`;
};



function CategoryBookListItem(book : BookItem) {
    const imageFileName = bookImageFileName(book);

    const { dispatch } = useContext(CartStore);
   const addBookToCart = () => {
        dispatch({ type: CartTypes.ADD, item: book, id: book.bookId });
    };



    return (
        <li className="book-box">
            <div className="book-image">
                <div className="book-title">{book.title}</div>
                <div className="book-author">Author: {book.author}</div>
                <div className="book-price">Price: ${(book.price).toFixed(2)}</div>
                <img
                    src={require(`../assets/images/Catagory/${imageFileName}`)}
                    alt={book.title}
                    width="110px"
                    height="160px"
                    style={{ display: 'block', margin: '0 auto' }}
                />
            </div>

            {book.isPublic && (
                <div className="read-now-button">
                    <FontAwesomeIcon icon={faEye} />
                </div>
            )}
            <button className="cart-button" onClick={addBookToCart}>
                Add to Cart <FontAwesomeIcon icon={faCartPlus} className="icon-style" />
            </button>
        </li>
    );
}

export default CategoryBookListItem;

