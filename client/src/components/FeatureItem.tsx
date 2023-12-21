import React from 'react';
import { Link } from 'react-router-dom';
import '../types'
import "../types";
import { HItem} from "../types";
import '../assets/css/home.css';

// @ts-ignore
const bookFileName = (props:HItem) => {
    let name = props.title.toLowerCase();
    name = name.replace(/ /g, '-');
    name = name.replace(/'/g, '');
    return `${name}.jpg`;
};

/*const bookImageFileName =  (book : BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    return `${name}.jpg`;*/

// @ts-ignore
function FeatureItem(props: HItem) {
    return (
        <section className="tile">
            <h2>{props.Feature}</h2>
            <Link to="/categories/Action">
                <img
                    src={require(`../assets/images/Catagory/${bookFileName(props)}`)}
                    alt={props.title}
                    width="110em"
                    height="170em"
                    style={{ display: 'block', margin: '0 auto' }}
                />
                <h1>{props.title}</h1>
            </Link>
        </section>
    );
}
/*function FeatureItem(Book: BookItem) {
    return (
        <section className="tile">
            <h2>{props.Feature}</h2>
            <Link to="/categories">
                <img
                    src={require(`../assets/images/Catagory/${bookFileName(Book)}`)}
                    alt={Book.title}
                    width="110em"
                    height="120em"
                    style={{ display: 'block', margin: '0 auto' }}
                />
                <h1>{Book.title}</h1>
            </Link>
        </section>
    );
}*/
export default FeatureItem;