import CartTable from "./CartTable";
import {CartStore} from "../reducers/CartContext";
import {useContext} from "react";
import AppHeader from "./AppHeader";

function Cart() {

    return (
        <div>
            <AppHeader/>

            <CartTable  ></CartTable>
        </div>
    )

}
    export default Cart;
