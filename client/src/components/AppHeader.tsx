import HeaderDropdown from './HeaderDropdown';
import '../assets/css/global.css'
import '../assets/css/app-header.css';
import '../assets/css/header-dropdown.css';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { CatProp} from "../types";
import {CartStore} from "../reducers/CartContext";
import {useContext} from "react";
import CategoryContext from "../contexts/CategoryContext";


function AppHeader() {

    const { cart } = useContext(CartStore);
    const cartQuantity = cart.reduce((total, item) => total + item.quantity,0);

    console.log(cart);
    return (

        <header className="container">
            <section className="logo-container">
                <div>
                    <Link to="/">
                        <img
                            src={require("../assets/icons/logo.png")}

                            width="60px"
                            height="auto"

                        /></Link>
                </div>
                <div>
                    <Link to="/">
                        <img
                            src={require("../assets/icons/Line.png")}
                            width="2.5px"
                            height="auto"/> </Link>

                </div>
                <div><Link to="/"><h1 className="text-logo">PaperTown</h1></Link></div>
            </section>
            <section>
                <form className="search-container " action="/ShutonuBookstoreReactState/categories/Action">
                    <input type="text" className="search-bar" placeholder="Search..."/>
                    <section className="container-search">
                        <button type="submit" className="icon-button-search"><FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                    </section>
                </form>
            </section>
            <section><Link to="/">
                <button className="home">Home</button>
            </Link></section>

            <section>
                <HeaderDropdown  />
            </section>


            <section>
                <button className="icon-button">
                    <FontAwesomeIcon icon={faUser} className="icon-style"/>
                    <span className="badge">Login</span>
                </button>
            </section>


            <section>
                <Link to="/cart">
                <button className="icon-button">
                    <FontAwesomeIcon icon={faCartShopping} className="icon-style"/>
                     <span className="badge">({cartQuantity})</span>
                </button>
                    </Link>
            </section>

        </header>
    )
}
export default AppHeader;

