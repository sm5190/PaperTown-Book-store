// Contains all the custom types we want to use for our application
//import Classics from './assets/images/categories/classics.jpg';
//import Fantasy from './assets/images/categories/fantasy.jpg';
//import Mystery from './assets/images/categories/mystery.jpg';
//import Romance from './assets/images/categories/romance.jpg';

export interface CatProp{
  catList: CategoryItem[],
  categories: CategoryItem[],

}

export interface BookProp{

  BookList: BookItem[],

}

export interface BookItem {
  bookId: number,
  title: string,
  author: string,
  price: number,
  isPublic: boolean,
  categoryId: number

}

export interface CategoryItem {
  categoryId: number;
  name: string;
}

export interface HItem {
  Feature: string;
  title: string;

}
export const HList = [
  {
    Feature: "This Week's Feature",
    title: "Death Note",

  },
  {
    Feature: 'New Release',
    title: "Demon Slayer",
  },
  {
    Feature: "All Time's Best Seller",
    title: "One Piece",

  }
];

//this interface represents the items(books) in our shopping cart
export class ShoppingCartItem {
  id:number;
  book: BookItem;
  quantity: number;

  constructor(theBook: BookItem) {
    this.id = theBook.bookId;
    this.book = theBook;
    this.quantity = 1;
  }
}
// this is used by the reducer. You can define it on the CartReducer
const storagekey= "cart";
const storedCart = localStorage.getItem(storagekey);

const storagekeyorder= "order";
//const storedOrder = localStorage.getItem(storagekeyorder);

export const initialCartState: ShoppingCartItem[] = storedCart
    ? (JSON.parse(storedCart) as ShoppingCartItem[])
    : [];



/*export const categoryList = [
  { categoryId: 1001, name: "Latest" },
  { categoryId: 1002, name: "Action" },
  { categoryId: 1003, name: "Mystery" },
  { categoryId: 1004, name: "Romance" },
  { categoryId: 1001, name: "Classics" },
  { categoryId: 1003, name: "Mystery" },
  { categoryId: 1004, name: "Adventure" },
  { categoryId: 1001, name: "Comedy" },
];*/

/*export const bookList = [
  {
    bookId: 1001,
    title: "Death Note",
    author: "Tsugumi Ohba",
    price: 1399,
    isPublic: true,
  },
  {
    bookId: 1002,
    title: "Slam Dunk",
    author: "Takehiko Inue",
    price: 1399,
    isPublic: false,
  },
  {
    bookId: 1003,
    title: "Chainsaw Man",
    author: "Tatsuki Fujimoto",
    price: 599,
    isPublic: true,
  },
  {
    bookId: 1004,
    title: "Jujutsu Kaisen",
    author: "Gege Akutami",
    price: 699,
    isPublic: true,
  },

  {
    bookId: 1004,
    title: "Blue Lock",
    author: "Yusuke Namura",
    price: 699,
    isPublic: true,
  },


  {
    bookId: 1004,
    title: "Naruto",
    author: "Tsugumi Ohba",
    price: 699,
    isPublic: true,
  },

  {
    bookId: 1004,
    title: "Demon Slayer",
    author: "Koyoharu Gotouge",
    price: 699,
    isPublic: true,
  },
  {
    bookId: 1004,
    title: "Attack On Titans",
    author: "Hajime Isayama",
    price: 699,
    isPublic: true,
  },
];*/



export interface ContextProps {
  children: JSX.Element | JSX.Element[]
}


export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const years = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
export interface CustomerForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpiryMonth: number;
  ccExpiryYear: number;
}

export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

// export interface OrderDetails {
//   order: Order;
//   customer: CustomerForm;
//   books: BookItem[];
// }

export interface ServerErrorResponse {
  reason: string;
  message: string;
  fieldName: string;
  error: boolean;
}


export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

export interface LineItem {
  bookId: number;
  orderId: number;
  quantity: number;
}
export interface Customer {
  customerName: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpDate: number;
}

export interface OrderDetails {
  order: Order;
  customer: Customer;
  books: BookItem[];
  lineItems: LineItem[];


}
const order: Order = {
  orderId: 0,
  amount: 0,
  dateCreated: 0,
  confirmationNumber: 0,
  customerId: 0,
};

const Customer: Customer = {
  customerName: "",
  address: "",
  phone: "",
  email: "",
  ccNumber: "",
  ccExpDate: 0,
};

const books: BookItem[] = [];

const lineItems: LineItem[] = [];

export const initialOrderState: OrderDetails = {
  order: order,
  customer: Customer,
  books: books,
  lineItems: lineItems,
};