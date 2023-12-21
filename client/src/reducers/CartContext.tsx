import React, {createContext, Dispatch, ReactNode, useEffect, useReducer} from "react";
import { cartReducer, AppActions } from "../reducers/CartReducer";
import { ShoppingCartItem, initialCartState } from "../types";

export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null as any, // Initialize dispatch with a dummy function of appropriate type
});

CartStore.displayName = "CartContext";
const storagekey= "cart";
export const CartContext = ({ children }: { children: ReactNode }) => {


    const [cart, dispatch] = useReducer(
        cartReducer as (state: ShoppingCartItem[], action: AppActions) => ShoppingCartItem[],
        initialCartState
    );
useEffect( ()=>{
    localStorage.setItem(storagekey, JSON. stringify(cart))}, [cart]);
    return <CartStore.Provider value={{ cart, dispatch }}>{children}</CartStore.Provider>;
};

