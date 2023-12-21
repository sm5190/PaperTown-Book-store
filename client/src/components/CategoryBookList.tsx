import   '../types';
import '../assets/css/category-book-list.css';
import '../assets/css/category.css';

import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import  "../types";
import {BookItem, BookProp} from "../types";
import AppHeader from "./AppHeader";
import {CatProp} from '../types';
import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Category} from "../contexts/CategoryContext";
function CategoryBookList() {

    const {catId}=useParams();
    const [books, setBooks]  = useState<BookItem[]>([])
    useEffect(() => {
        axios.get(`/ShutonuBookstoreReactTransact/api/categories/name/${catId}/books`)
            .then((result) => setBooks(result.data))
            .catch(console.error);

        const storageKey2 = "recent_cat";
        localStorage.setItem(storageKey2, JSON.stringify(catId)); // Store only the category name
    }, [catId]);




    return (
        <div className='background'>
            <AppHeader/>
            <div className="category-page ">

                <CategoryNav/>
                <section className="category-book-list">
                    <ul id="book-boxes">
                        {books.map((book: BookItem)  => (
                            <CategoryBookListItem key={book.bookId}
                                                  bookId={book.bookId}
                                                  isPublic={book.isPublic}
                                                  price={book.price}
                                                  title={book.title}
                                                  author={book.author}
                                                  categoryId ={book.categoryId}
                            />))}
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default CategoryBookList;
