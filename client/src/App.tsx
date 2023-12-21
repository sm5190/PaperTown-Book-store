import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import './assets/css/banner.css'
import React, {useContext} from 'react';
import { Helmet } from 'react-helmet';
import {BookProp, CategoryItem, CatProp, BookItem} from "./types";
import CategoryBookList from './components/CategoryBookList';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"

import axios from "axios";
import {useEffect, useState} from "react";
import {Category} from "./contexts/CategoryContext";
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import CategoryBookListItem from "./components/CategoryBookListItem";
import Confirmation from "./components/confirmation";


function App() {
    const categories = useContext<CategoryItem[]>(Category);  // add this statment



    return (


        <Router basename={"ShutonuBookstoreReactTransact"}>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Yeon+Sung&display=swap"
                />

            </Helmet>

            <div className='background'>
                <Routes>home


                    <Route path="/" element={<Home  />}/>
                    <Route path="/categories"
                           element={<CategoryBookList />}>
                        <Route path=":catId"
                               element={<CategoryBookList/>}/>

                    </Route>


                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />

                    <Route path="/confirmation" element={<Confirmation />} />



                </Routes>

                <AppFooter/>
            </div>
        </Router>

    );
}

export default App;

