import '../assets/css/global.css';
import '../assets/css/header-dropdown.css';
import { CategoryItem } from '../types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { Category } from "../contexts/CategoryContext";

function HeaderDropdown() {
    const categories = useContext<CategoryItem[]>(Category);
    const storageKey2 = "recent_cat";



    return (
        <div className="header-dropdown">
            <Link to='/categories/Action'>
                <button className="icon-button home">
                    Categories
                    <FontAwesomeIcon icon={faAngleDown} className="icon-style-1" />
                </button>
            </Link>

            <ul>
                {categories.map((item) => (
                    <li key={item.name}>
                        <Link to={`/categories/${item.name}`} >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HeaderDropdown;
