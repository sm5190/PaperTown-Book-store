 import {BookItem, Customer, initialOrderState, LineItem, Order, OrderDetails,} from "../types";
// import {initialOrderState} from "../types";
// import {AppActions} from "./CartReducer";
//
//
//
//
// export const OrderDetailsTypes = {
//     CLEAR: "CLEAR_ORDER_DETAILS",
//     UPDATE: "UPDATE_ORDER_DETAILS",
// };
//
// export type OrderDetailsActions = {
//     type: "CLEAR_ORDER_DETAILS" | "UPDATE_ORDER_DETAILS";
//     payload?: OrderDetails;
// };
//
//
// export const OrderDetailsReducer = (state:OrderDetails[], action:OrderDetailsActions):(OrderDetails | {  order: Order, customer: Customer, books: BookItem[], lineItems: LineItem[]})[] => {
// ): OrderDetails => {
//     switch (action.type) {
//         case OrderDetailsTypes.CLEAR:
//             return [];
//
//         case OrderDetailsTypes.UPDATE:
//             return action.payload || {};
//
//         default:
//             return state;
//     }
// };


//import {BookItem, Customer, initialOrderState, LineItem, Order, OrderDetails} from '../types'; // Adjust the path accordingly


export type OrderDetailsActions = {
    type: "CLEAR_ORDER_DETAILS" | "UPDATE_ORDER_DETAILS";

};
export const OrderDetailsTypes = {
    CLEAR: 'CLEAR_ORDER_DETAILS',
    UPDATE: 'UPDATE_ORDER_DETAILS',
};
 // export const initialOrderState: OrderDetails[] = storedOrder
 //     ? (JSON.parse(storedOrder) as OrderDetails[])
 //     : [];
// order: Order;
// customer: Customer;
// books: BookItem[];
// lineItems: LineItem[];


 const storagekeyorder= "order";
export const OrderDetailsReducer =(
    state: OrderDetails= initialOrderState,
    action: OrderDetailsActions
) => {
    switch (action.type) {
        case OrderDetailsTypes.CLEAR:
            //localStorage.clear()
            return [];

        case OrderDetailsTypes.UPDATE:

            // const existingItem = findItem(state, action.item.bookId);
            // if (existingItem) {
            //     const updatedCart = state.map((book) =>
            //         book.id === action.item.bookId
            //             ? { ...book, quantity: book.quantity - 1 }
            //             : book
            //     );
            //     return updatedCart.filter((book) => book.quantity >= 1);
            // }
            // return state;
            const storedOrder = localStorage.getItem(storagekeyorder);
            state= storedOrder
                ? (JSON.parse(storedOrder) as OrderDetails)
                : initialOrderState;
            return state;

        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};
