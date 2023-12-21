

import  "../assets/css/checkout.css"

import "../assets/css/carttable.css";

import { isCreditCard, isMobilePhone, isvalidEmail } from '../utils';
import {BookItem, CustomerForm, months, OrderDetails, ShoppingCartItem, years} from "../types";
import {CartStore} from "../reducers/CartContext";
import React, {ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import AppHeader from "./AppHeader";
import axios from "axios";
import {OrderDetailsStore} from "../contexts/OrderDetailsContext";
import {OrderDetailsTypes} from "../reducers/orderDetailsReducer";

//import { isMobilePhone, isValidEmail, isCreditCard } from 'validator';


//declare function isMobilePhone(phone: string): boolean;
//declare function isValidEmail(email: string): boolean;
//declare function isCreditCard(ccNumber: string): boolean;


function CheckoutPage()
{

   const getBookImageUrl = function (book: BookItem): string {
      let filename = book.title.toLowerCase();
      filename = filename.replace(/ /g, "-");
      filename = filename.replace(/'/g, "");
      filename = filename + ".jpg";
      try {
         return require('../assets/images/Catagory/' + filename);
      } catch (_) {
         return require('../assets/images/Catagory/'+ filename);
      }
   };

   /*
    * This will be used by the month and year expiration of a credit card
    *  NOTE: For example yearFrom(0) == <current_year>
   */


   function yearFrom(index: number) {
      return new Date().getFullYear() + index;
   }

   const {cart, dispatch} = useContext(CartStore);
   const navigate = useNavigate();


   const addBookToCart = (book: BookItem) => {
      dispatch({ type: CartTypes.ADD, item: book, id: book.bookId });
   };

   const removeBookFromCart = (cartItem: ShoppingCartItem) => {
      dispatch({ type: CartTypes.REMOVE, item: cartItem.book });
   };

   const cartTotalPrice = cart.reduce((total, cartItem) => total + cartItem.quantity * (cartItem.book?.price || 0), 0);

   const cartQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);// TO DO the code that calculates the total number of items in your cart

   const [surcharge, setSurcharge] = useState(0);
   const [Total, setTotal] = useState(0);
   useEffect(() => {
   const calculatedSurcharge = 5.00;
   setSurcharge(calculatedSurcharge);

   // Calculate cart total (subtotal + surcharge)
   const calculatedCartTotal = cartTotalPrice + calculatedSurcharge;
   setTotal(calculatedCartTotal);
   }, [cartTotalPrice]);

   function getExpiryYearOptions() {
      const currentYear = new Date().getFullYear();
      const years = Array.from({ length: 15 }, (_, index) => currentYear + index);
      return years;
   }


   // TO DO error states for the rest of the input elements
   const [nameError, setNameError] = useState("");
   const [addressError, setAddressError] = useState("");
   const [phoneError, setPhoneError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [ccNumberError, setCCNumberError] = useState("");
   const [ccExpiryMonthError, setCCExpiryMonthError] = useState("");
   const [ccExpiryYearError, setCCExpiryYearError] = useState("");


   const [formData, setFormData] = useState({name: "",address:"", phone:"",email: "",ccNumber:"", ccExpiryMonth:0,ccExpiryYear:0});

   const [checkoutStatus, setCheckoutStatus] = useState("");

// ... (previous code)

   function isValidForm() {
      let isValid = true;

      // Validation for name
      if (!formData.name || formData.name.length < 4 || formData.name.length > 45) {
         setNameError("Name must be between 4 and 45 characters");
         isValid = false;
      } else {
         setNameError("");
      }

      // Validation for address
      if (!formData.address) {
         setAddressError("Address is required");
         isValid = false;
      } else if (formData.address.length < 4 || formData.address.length > 45) {
         setAddressError("Address must be between 4 and 45 characters");
         isValid = false;
      } else {
         setAddressError("");
      }

      // Validation for phone
      if (!formData.phone || !isMobilePhone(formData.phone)) {
         setPhoneError("Invalid phone number");
         isValid = false;
      } else {
         setPhoneError("");
      }

      // Validation for email
      if (!formData.email || !isvalidEmail(formData.email)) {
         setEmailError("Invalid email address");
         isValid = false;
      } else {
         setEmailError("");
      }

      // Validation for credit card number
      // Assuming you have a function isCreditCard to validate credit card numbers
      if (!formData.ccNumber || !isCreditCard(formData.ccNumber)) {
         setCCNumberError("Invalid credit card number");
         isValid = false;
      } else {
         setCCNumberError("");
      }

      // Validation for credit card expiry month
     /*if (formData.ccExpiryMonth < 1 || formData.ccExpiryMonth > 12) {
         setCCExpiryMonthError("Invalid expiry month");
         isValid = false;
      } else {
         setCCExpiryMonthError("");
      }

      // Validation for credit card expiry year
      const currentYear = new Date().getFullYear();
      if (isNaN(formData.ccExpiryYear) || formData.ccExpiryYear < currentYear || formData.ccExpiryYear > currentYear + 15) {
         setCCExpiryYearError("Invalid expiry year");
         isValid = false;
      } else {
         setCCExpiryYearError("");
      }*/

      return isValid;
   }

   function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
      const { name, value } = event.target;

      switch (name) {
         case 'name':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            if (value.length < 4 || value.length > 45) {
               setNameError("Name must be between 4 and 45 characters");
            } else {
               setNameError("");
            }
            break;
         case 'address':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            if (!value) {
               setAddressError("Address is required");
            } else if (value.length < 4 || value.length > 45) {
               setAddressError("Address must be between 4 and 45 characters");
            } else {
               setAddressError("");
            }
            break;
         case 'phone':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            if (!value) {
               setPhoneError("Phone number is required");
            } else if (!isMobilePhone(value)) {
               setPhoneError("Invalid phone number");
            } else {
               setPhoneError("");
            }
            break;
         case 'email':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            if (!value) {
               setEmailError("Email is required");
            } else if (!isvalidEmail(value)) {
               setEmailError("Invalid Email Address");
            } else {
               setEmailError("");
            }
            break;
         case 'ccNumber':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            if (!value) {
               setCCNumberError("Credit card number is required");
            } else if (!isCreditCard(value)) {
               setCCNumberError("Invalid credit card number");
            } else {
               setCCNumberError("");
            }
            break;
         case 'ccExpiryMonth':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: parseInt(value, 10) }));
            break;
         case 'ccExpiryYear':
            setFormData((prevFormData) => ({ ...prevFormData, [name]: parseInt(value, 10) }));
            break;
         default:
            break;
      }
   }

// ... (previous code)
   const storagekey2= "recent_cat";
   const storedCat = localStorage.getItem(storagekey2);
   console.log(storedCat)
   const storagekeyorder="order";

   const {  dispatched } = useContext(OrderDetailsStore);

   // Assuming you want to display information for the first order in the array
   //const selectedOrder = orderDetails.length > 0 ? orderDetails[0] : null;
   const updateorder = () => {
      dispatched({ type: OrderDetailsTypes.UPDATE});
   };
   async function submitOrder(event:FormEvent) {
      event.preventDefault();
      console.log("Submit order");
      const isFormCorrect =  isValidForm();
      console.log(isFormCorrect);
      if (!isFormCorrect) {
         setCheckoutStatus("ERROR");
      } else {
         setCheckoutStatus("PENDING");
         const orders = await placeOrder({
            name: formData.name,
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
            ccNumber: formData.ccNumber,
            ccExpiryMonth: formData.ccExpiryMonth,
            ccExpiryYear: formData.ccExpiryYear,
         })
         localStorage.setItem('expMonth',JSON.stringify(formData.ccExpiryMonth));
         localStorage.setItem('expYear',JSON.stringify(formData.ccExpiryYear));
         if(orders) {
            setCheckoutStatus("OK");
            updateorder()
            navigate('/confirmation');}
         else{
            console.log("Error placing order");
         }
      }
   }

   const placeOrder =  async (customerForm: CustomerForm) =>  {




      const order = { customerForm: customerForm, cart:{itemArray:cart} };

      const orders = JSON.stringify(order);
      console.log(orders);     //you can uncomment this to see the orders JSON on the console
      const url = 'api/orders';
      const orderDetails: OrderDetails = await axios.post(url, orders,
          {headers: {
                "Content-Type": "application/json",
             }
          })
          .then((response) => {
             dispatch({type: CartTypes.CLEAR});
             return response.data;
          })
          .catch((error)=>console.log(error));
      console.log("order deatils: ", orderDetails);

      localStorage.setItem(storagekeyorder, JSON. stringify(orderDetails));
      console.log(localStorage.getItem(storagekeyorder))
      return orderDetails;
   }
  // TO DO submitOrder function comes here. See the project Spec





   return (
       <>
          <AppHeader />
          <section className="checkout-cart-table-view">
             {cart.length === 0 ? (
                 <div className="empty-cart">
                    <p>Your cart is empty.</p>
                    <Link to={`/categories/${(storedCat || '').replace(/["']/g, '')}`}>
                       <button className="continue-shopping-button">Continue Shopping</button>
                    </Link>
                 </div>
             ) : (
                 <div className="checkout-page-body">
                    <div>
                       <form
                           className="checkout-form form-style"
                           onSubmit={(event) => submitOrder(event)}
                           method="post"
                       >
                          <div>
                             <label htmlFor="fname">Name</label>
                             <input
                                 type="text"
                                 size={20}
                                 name="name"
                                 id="fname"
                                 value={formData.name}
                                 onChange={handleInputChange}
                             />
                          </div>
                          {nameError && <div className="error">{nameError}</div>}

                          {/* TO DO: Form elements for phone */}
                          <div>
                             <label htmlFor="fphone">Phone</label>
                             <input
                                 type="text"
                                 size={20}
                                 name="phone"
                                 id="fphone"
                                 value={formData.phone}
                                 onChange={handleInputChange}
                             />
                          </div>
                             {phoneError && <div className="error">{phoneError}</div>}

                          {/* TO DO: Form elements for address */}
                          <div>
                             <label htmlFor="faddress">Address</label>
                             <input
                                 type="text"
                                 size={20}
                                 name="address"
                                 id="faddress"
                                 value={formData.address}
                                 onChange={handleInputChange}
                             />
                          </div>
                             {addressError && <div className="error">{addressError}</div>}


                          {/* TO DO: Form elements for email */}
                          <div>
                             <label htmlFor="femail">Email</label>
                             <input
                                 type="text"
                                 size={20}
                                 name="email"
                                 id="femail"
                                 value={formData.email}
                                 onChange={handleInputChange}
                             />
                          </div>
                             {emailError && <div className="error">{emailError}</div>}


                          {/* TO DO: Form elements for credit card */}
                          <div>
                             <label htmlFor="fccNumber">Credit Card Number</label>
                             <input
                                 type="text"
                                 size={20}
                                 name="ccNumber"
                                 id="fccNumber"
                                 value={formData.ccNumber}
                                 onChange={handleInputChange}
                             />
                          </div>
                             {ccNumberError && <div className="error">{ccNumberError}</div>}


                          {/* TO DO: Form elements for expiration date */}
                          <div>
                             <label htmlFor="">Exp Date: &nbsp;</label>
                             <label htmlFor="ccExpiryMonth">Month</label>
                             <select
                                 style={{ color: 'black' }}
                                 name="ccExpiryMonth"
                                 value={formData.ccExpiryMonth}
                                 onChange={handleInputChange}
                             >
                                {months.map((month, i) => (
                                    <option key={i} value={i + 1}>
                                       {month}
                                    </option>
                                ))}
                             </select>
                             {/*ccExpiryMonthError && <div className="error">{ccExpiryMonthError}</div>*/}

                             {/* TO DO: Select input for the expiration year. Read the spec about this */}
                             <label htmlFor="ccExpiryYear">&nbsp;Year</label>
                             <select
                                 style={{ color: 'black' }}
                                 name="ccExpiryYear"
                                 id="fccExpiryYear"
                                 value={formData.ccExpiryYear}
                                 onChange={handleInputChange}
                             >
                                {getExpiryYearOptions().map((year) => (
                                    <option key={year} value={year}>
                                       {year}
                                    </option>
                                ))}
                             </select>
                             {ccExpiryYearError && <div className="error">{ccExpiryYearError}</div>}
                          </div>
                       </form>
                    </div>

                       {/* Display cart total, subtotal, and surcharge near the checkout button */}
                       <div className="checkout-container">
                          <div className="checkout-summary">
                             <div>
                                <strong>Subtotal:</strong> ${cartTotalPrice.toFixed(2)}
                             </div>
                             <div>
                                <strong>Surcharge:</strong> ${surcharge.toFixed(2)}
                             </div>
                             <div>
                                <strong>Cart Total:</strong> ${Total.toFixed(2)}
                             </div>


                          <div className="checkout-button">
                             <button onClick={submitOrder}> Checkout</button>
                          </div>

                             {checkoutStatus === 'OK' && (
                                 <div className="processing-message">Processing...</div>
                             )}
                       </div>
                 </div>
                 </div>
             )}

             <div>
                {/* This displays the information about the items in the cart */}
                <ul className="checkout-cart-info">
                   {cart?.map((item, i) => (
                       <div className="checkout-cart-book-item" key={i}>
                          <div className="checkout-cart-book-image">
                             <img
                                 src={getBookImageUrl(item.book)}
                                 alt="title"
                                 className="checkout-cart-info-img"
                                 width="20%"
                                 height="20%"
                             />
                          </div>
                          <div className="checkout-cart-book-info">
                             <div className="checkout-cart-book-title">{item.book.title}</div>

                             <div className="checkout-cart-book-subtotal">
                                {/* TO DO the total cost of this specific book displayed here */}
                                <div className="cart-book-subtotal">${item.quantity * (item.book?.price || 0)}</div>
                             </div>
                             <div className="checkout-cart-book-quantity">
                                <button onClick={() => addBookToCart(item.book)} className="checkout-inc-arrow-button">
                                   <FontAwesomeIcon icon={faPlusCircle} />
                                </button>
                                <button className="checkout-num-button">{item.quantity}</button>
                                <button onClick={() => removeBookFromCart(item)} className="checkout-dec-arrow-button">
                                   <FontAwesomeIcon icon={faMinusCircle} />
                                </button>
                             </div>
                          </div>
                       </div>
                   ))}
                </ul>
             </div>
          </section>
       </>
)};
   export default CheckoutPage;