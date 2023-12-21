package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.Customer;
import business.customer.CustomerDao;
import business.customer.CustomerForm;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}

	//Add OrderDao, LineItemDao and CustomerDao instances to the ApplicationContext and DefaultOrderService. Add setter methods as well and wire in instances of the classes into DefaultOrderService following the pattern we established with the BookDao already.
	public OrderDao orderDao;

	public void setOrderDao(OrderDao orderDao) {
		this.orderDao = orderDao;
	}


	public LineItemDao lineItemDao;

	public void setLineItemDao(LineItemDao lineItemDao) {
		this.lineItemDao = lineItemDao;
	}


	public CustomerDao customerDao;

	public void setCustomerDao(CustomerDao customerDao) {
		this.customerDao = customerDao;
	}
	@Override
	public OrderDetails getOrderDetails(long orderId) {
		Order order = orderDao.findByOrderId(orderId);
		Customer customer = customerDao.findByCustomerId(order.customerId());
		List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
		List<Book> books = lineItems
				.stream()
				.map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
				.toList();
		return new OrderDetails(order, customer, lineItems, books);
	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		try (Connection connection = JdbcUtils.getConnection()) {
			Date ccExpDate = getCardExpirationDate(
					customerForm.getCcExpiryMonth(),
					customerForm.getCcExpiryYear());
			return performPlaceOrderTransaction(
					customerForm.getName(),
					customerForm.getAddress(),
					customerForm.getPhone(),
					customerForm.getEmail(),
					customerForm.getCcNumber(),
					ccExpDate, cart, connection);
		} catch (SQLException e) {
			throw new BookstoreDbException("Error during close connection for customer order", e);
		}
	}
	private Date getCardExpirationDate(String monthString, String yearString) {
		return new Date(); // TODO Implement this correctly
	}

	private long performPlaceOrderTransaction(
			String name, String address, String phone,
			String email, String ccNumber, Date date,
			ShoppingCart cart, Connection connection) {
		try {
			connection.setAutoCommit(false);
			long customerId = customerDao.create(
					connection, name, address, phone, email,
					ccNumber, date);
			long customerOrderId = orderDao.create(
					connection,
					cart.getComputedSubtotal() + cart.getSurcharge(),
					generateConfirmationNumber(), customerId);
			for (ShoppingCartItem item : cart.getItems()) {
				lineItemDao.create(connection, customerOrderId,
						item.getBookId(), item.getQuantity());
			}
			connection.commit();
			return customerOrderId;
		} catch (Exception e) {
			try {
				connection.rollback();
			} catch (SQLException e1) {
				throw new BookstoreDbException("Failed to roll back transaction", e1);
			}
			return 0;
		}
	}

	private int generateConfirmationNumber() {

		return ThreadLocalRandom.current().nextInt(999999999);
	}



	private void validateCustomer(CustomerForm customerForm) {

    	String name = customerForm.getName();
		String address= customerForm.getAddress();
		String phone= customerForm.getPhone();
		String ccNumber= customerForm.getCcNumber();

		if (name == null) {
			throw new ApiException.ValidationFailure("name","Missing name field");
		}
		if (name.isEmpty()) {
			throw new ApiException.ValidationFailure("name", "Empty name field");
		}
		if(name.length() < 4|| name.length() > 45)
		{
			throw new ApiException.ValidationFailure("name","Invalid name field");
		}

		if (address == null ) {
			throw new ApiException.ValidationFailure("address","Missing address field");
		}

		if (address.isEmpty()) {
			throw new ApiException.ValidationFailure("address", "Empty address field");
		}
		if (address.length() < 4|| address.length() > 45)
		{
			throw new ApiException.ValidationFailure("address","Invalid address field");
		}

		if (phone== null ) {
			throw new ApiException.ValidationFailure("phone","Missing phone field");
		}
		String phonedigits= phone.replaceAll("\\D", "");
		if (phonedigits.isEmpty()) {
			throw new ApiException.ValidationFailure("phone", "Empty phone field");
		}
		if (phonedigits.length() < 10)
		{
			throw new ApiException.ValidationFailure("phone","Invalid phone field");
		}

		if (ccNumber== null ) {
			throw new ApiException.ValidationFailure("ccNumber","Missing Credit Card field");
		}

		String ccdigits= ccNumber.replaceAll("\\D", "");
		if (ccdigits.isEmpty()) {
			throw new ApiException.ValidationFailure("ccNumber", "Empty Credit Card field");
		}
		if (ccdigits.length() < 14 || ccdigits.length()>16)
		{
			throw new ApiException.ValidationFailure("ccNumber","Invalid Credit Card field");
		}


		String email = customerForm.getEmail();
		if (email.isEmpty()) {
			throw new ApiException.ValidationFailure("email", "Empty email field");
		}

		if (email == null) {
			throw new ApiException.ValidationFailure("email", "Missing email field");
		}

		if (!email.contains("@") || email.contains(" ") || email.endsWith("."))
		{
			throw new ApiException.ValidationFailure("email", "Invalid email field");
		}


		// TODO: Validation checks for address, phone, email, ccNumber

		if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("Please enter a valid expiration date!");

		}
	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {

		// TODO: return true when the provided month/year is before the current month/yeaR
		// HINT: Use Integer.parseInt and the YearMonth class
		//return false;

		try {
			int month = Integer.parseInt(ccExpiryMonth);
			int year = Integer.parseInt(ccExpiryYear);

			// Create a YearMonth object for the entered expiration date
			YearMonth expiryDate = YearMonth.of(year, month);

			// Get the current YearMonth
			YearMonth currentYearMonth = YearMonth.now();

			// Check if the entered expiration date is before the current month and year
			return expiryDate.isBefore(currentYearMonth);
		} catch (NumberFormatException | DateTimeException e) {
			// Handle parsing or date calculation errors
			return true;
		}

	}

	private void validateCart(ShoppingCart cart) {

		if (cart.getItems().size() <= 0) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}

		cart.getItems().forEach(item-> {
			if (item.getQuantity() < 1 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Invalid quantity");
			}
			Book databaseBook = bookDao.findByBookId(item.getBookId());

			// TODO: complete the required validations

			if (databaseBook == null) {
				throw new ApiException.ValidationFailure("Book not found in the database for ID");
			}



			if (item.getBookForm().getPrice() != databaseBook.price()) {
				throw new ApiException.ValidationFailure("Invalid price for book with ID");
			}


			if (item.getBookForm().getCategoryId()!= databaseBook.categoryId()) {
				throw new ApiException.ValidationFailure("Invalid category for book");
			}


		});
	}




}
