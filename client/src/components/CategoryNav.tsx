import '../assets/css/category.css'
import '../assets/css/global.css'
import {CategoryItem, CatProp} from '../types';

import { Link, useMatch } from 'react-router-dom';
import {useContext} from "react";
import {Category} from "../contexts/CategoryContext";

function CategoryNav() {
    const categories = useContext<CategoryItem[]>(Category);
    return (
        <nav className="container-nav">

            {categories.map((category) => (

                <ul  >
                    <NavLinkToCategory name={category.name} />
                </ul>




            ))}


        </nav>
    )
}
interface NavLinkToCategoryProps {
    name: string; // Explicitly specify the type as string
}

function NavLinkToCategory({ name }: NavLinkToCategoryProps) {
    const match = useMatch(`/categories/${name}`);
    return (
        <li className={`items ${match ? 'item-selected' : ''}`}  key={name}>
            <Link
                to={`/categories/${name}`}
                className="styled-font"
            >
                {name}
            </Link>
        </li>
    );
}

export default CategoryNav;





