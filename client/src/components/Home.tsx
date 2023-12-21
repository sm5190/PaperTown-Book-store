
//import HomeCategoryList from './HomeCategoryList';
import '../assets/css/global.css';
import '../assets/css/home.css';
import '../assets/css/banner.css'
import React, {useContext, useState} from "react";
import AppHeader from "./AppHeader";
import App from "../App";

import {BookProp, HItem, HList,BookItem} from "../types";
import FeatureItem from "./FeatureItem";
import {CatProp} from "../types";
import {Link} from "react-router-dom";
import {CartStore}  from "../reducers/CartContext"
import {Category} from "../contexts/CategoryContext";


//import FeatureItem from "./Features";





function Home(   ) {
    //const [categories, setCategories] = useState<CategoryItem[]>();
    return (
        <div className='banner'>
            <AppHeader/>
            <div className="home-page">
                <br/>
                <br/>
                <br/>
                <br/>
                <section className="category-image container">
                    <div className="category-image-items">
                        {HList.map((h: HItem) => (

                            <FeatureItem Feature={h.Feature} title={h.title}/>))}

                    </div>

                </section>

                <section className="welcome-text flow-content container dark-background">
                    <br/>
                    <h4>Welcome!</h4>


                    <p>Are you looking for a platform to buy comics online?</p>

                    <p>Look no further than our website!</p>

                    <p>
                        With over 3000 comics, we offer an extensive collection of manga comics
                        for all readers. Our platform provides a user-friendly interface that is
                        easy to navigate and explore, so you can quickly find your desired comic
                        book.
                    </p>
                    <br/>
                    <br/>
                    <Link to="/categories/Action">
                    <button className="button-start-shopping-box" >
                        <h2>START SHOPPING</h2>
                    </button>
                    </Link>
                    <br/>
                    <br/>
                    <br/>
                </section>
            </div>
        </div>

    );
}

export default Home;
