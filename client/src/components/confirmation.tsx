// You can use the following Css file
// .confirmationView {
//     display: flex;
// flex-direction: column;
// align-items: flex-start;
// margin: 1em auto;
// }
// ul {
//     text-align: left;
// }
// ul > li {
//     margin: 1em;
// }


import '../assets/css/Confirmation.css'
import React from 'react';
//import '../assets/css/Confirmation.css'; // Import your CSS file
import ConfirmationTable from "./ConfirmationTable";
import { useContext } from "react";
import { OrderDetailsStore } from "../contexts/OrderDetailsContext";
import {BookItem} from "../types";
import {CartTypes} from "../reducers/CartReducer";
import AppHeader from "./AppHeader";

function Confirmation() {


    const {orderDetails} = useContext(OrderDetailsStore);


    const reformatTimestamp = (timestamp: string | number) => {
        const date = new Date(timestamp);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear().toString().slice(2);
        return `${month}/${year}`;
    };

    const displayLastFourDigits = (ccNumber: String) => {
        return `**** **** **** ${ccNumber.slice(-4)}`;
    };

    const orderDate = () => {
        let date = new Date(orderDetails.order.dateCreated);
        return (date.toLocaleString());
    };
    const ccExpDate = (): Date => {
        return new Date(orderDetails.customer.ccExpDate);
    };

    return (
        <div>
            <AppHeader/>

            <div className="confirmationView">
                <ul className="un-order">
                    <li>Confirmation #: {orderDetails.order.confirmationNumber}</li>
                    <li>{orderDate()}</li>
                </ul>
                <ConfirmationTable/>
                <ul className="un-order">
                    <li><b>Name:</b> {orderDetails?.customer?.customerName}</li>
                    <li><b>Address:</b> {orderDetails?.customer?.address}</li>
                    <li><b>Email:</b> {orderDetails?.customer?.email}</li>
                    <li><b>Phone:</b> {orderDetails?.customer?.phone}</li>
                    <li><b>Credit
                        Card:</b> {displayLastFourDigits(orderDetails?.customer?.ccNumber)}({localStorage.getItem('expMonth')}/{localStorage.getItem('expYear')}))
                    </li>
                </ul>
                <div id="customerInfo"></div>
            </div>


        </div>
    )
}

export default Confirmation;
