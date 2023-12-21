import React, {createContext, Dispatch, ReactNode, useEffect, useReducer} from "react";
import { OrderDetailsReducer, OrderDetailsActions } from "../reducers/orderDetailsReducer";
import { OrderDetails, initialOrderState } from "../types";

export const OrderDetailsStore = createContext<{
    orderDetails: OrderDetails;
    dispatched: Dispatch<any>;
}>({
    orderDetails: initialOrderState,
    dispatched: () => null as any, // Initialize dispatch with a dummy function of appropriate type
});

OrderDetailsStore.displayName = "OrderDetailsContext";
const storagekeyorder = "order";

export const OrderDetailsProvider = ({ children }: { children: ReactNode }) => {
    const [orderDetails, dispatched] = useReducer(
        OrderDetailsReducer as (state: OrderDetails, action: OrderDetailsActions) => OrderDetails,
        initialOrderState
    );

    // Uncomment the following lines if you want to store the state in local storage
    useEffect(() => {
        localStorage.setItem(storagekeyorder, JSON.stringify(orderDetails));
    }, [orderDetails]);

    return <OrderDetailsStore.Provider value={{ orderDetails, dispatched }}>{children}</OrderDetailsStore.Provider>;
};

export default OrderDetailsProvider;
