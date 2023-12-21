import {ShoppingCartItem, BookItem} from "../types";
import {Dispatch, ReducerAction, useContext} from "react";

import {initialCartState} from "../types";
import {CartStore} from "./CartContext";

export const CartTypes = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    CLEAR: "CLEAR"
};



export type AppActions = {
    id:number;
    type: "ADD" | "REMOVE"  | "CLEAR";
    item: BookItem;
}

const findItem = (cart: ShoppingCartItem[], id: number) => cart.find((item) => item.id === id);
export const cartReducer = (state:ShoppingCartItem[], action:AppActions):(ShoppingCartItem | { id: number; items: BookItem; quantity: number; })[] => {
    switch (action.type) {
        case CartTypes.ADD :
            /*
                The following only added the item in the cart for the first time with quantity 1.
                You have to handle the increment of the quantity if the item
                is already in the cart
              */

            if (findItem(state, action.item.bookId)) {
                return state.map((book) =>
                    book.id === action.item.bookId
                        ? { ...book, quantity: book.quantity + 1 }
                        : book
                );
            }
            return [
                ...state,
                { id: action.item.bookId, book: action.item, quantity: 1 }
            ];

        case CartTypes.REMOVE:
            const existingItem = findItem(state, action.item.bookId);
            if (existingItem) {
                const updatedCart = state.map((book) =>
                    book.id === action.item.bookId
                        ? { ...book, quantity: book.quantity - 1 }
                        : book
                );
                return updatedCart.filter((book) => book.quantity >= 1);
            }
            return state;

        case CartTypes.CLEAR:
            return []; // Clears the entire cart

        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};