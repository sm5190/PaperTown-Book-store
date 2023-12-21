package api;

import business.ApplicationContext;
import business.category.Category;
import business.category.CategoryDao;
import business.book.Book;
import business.book.BookDao;

import business.customer.CustomerDao;
import business.order.*;
import jakarta.servlet.http.HttpServletRequest;
//import jakarta.javax.ws.rs.*;
import jakarta.ws.rs.*;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

import jakarta.ws.rs.Produces;

import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@ApplicationPath("/")
@Path("/")
public class ApiResource {

    private final BookDao bookDao = ApplicationContext.INSTANCE.getBookDao();
    private final OrderDao orderDao = ApplicationContext.INSTANCE.getOrderDao();
    private final LineItemDao lineItemDao = ApplicationContext.INSTANCE.getLineItemDao();

    private final CustomerDao customerDao = ApplicationContext.INSTANCE.getCustomerDao();
    private final CategoryDao categoryDao = ApplicationContext.INSTANCE.getCategoryDao();
    private final OrderService orderService = ApplicationContext.INSTANCE.getOrderService();
    @GET
    @Path("categories")
    @Produces (MediaType.APPLICATION_JSON)
    public List<Category> categories(@Context HttpServletRequest httpRequest) {
        try {
            return categoryDao.findAll();
        } catch (Exception e) {
            throw new ApiException("categories lookup failed", e);
        }
    }

    @GET
    @Path("categories/{category-id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Category categoryById(@PathParam("category-id") long categoryId,
                                 @Context HttpServletRequest httpRequest) {
        try {
            Category result = categoryDao.findByCategoryId(categoryId);
            if (result == null) {
                throw new ApiException(String.format("No such category id: %d", categoryId));
            }
            return result;
        } catch (Exception e) {
            throw new ApiException(String.format("Category lookup by category-id %d failed", categoryId), e);
        }
    }

    @GET
    @Path("books/{book-id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Book bookById(@PathParam("book-id") long bookId,
                         @Context HttpServletRequest httpRequest) {
        try {
            Book result = bookDao.findByBookId(bookId);
            if (result == null) {
                throw new ApiException(String.format("No such book id: %d", bookId));
            }
            return result;
        } catch (Exception e) {
            throw new ApiException(String.format("Book lookup by book-id %d failed", bookId), e);
        }
    }

    @GET
    @Path("categories/{category-id}/books")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Book> booksByCategoryId(@PathParam("category-id") long categoryId,
                                        @Context HttpServletRequest httpRequest) {
        try {
            Category category = categoryDao.findByCategoryId(categoryId);
            if (category == null) {
                throw new ApiException(String.format("No such category id: %d", categoryId));
            }
            return bookDao.findByCategoryId(category.categoryId());
        } catch (Exception e) {
            throw new ApiException(String.format("Books lookup by category-id %d failed", categoryId), e);
        }
    }

    @GET
    @Path("categories/{category-id}/suggested-books")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Book> suggestedBooks(@PathParam("category-id") long categoryId,
                                     @QueryParam("limit") @DefaultValue("3") int limit,
                                     @Context HttpServletRequest request) {
        try {
            return bookDao.findRandomByCategoryId(categoryId, limit);
        } catch (Exception e) {
            throw new ApiException("products lookup via categoryId failed", e);
        }
    }

    // TODO Implement the following APIs
    // categories/name/{category-name}

    @GET
    @Path("categories/name/{category-name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Category categoryByName(
            @PathParam("category-name") String categoryName,
            @Context HttpServletRequest httpRequest) {
        try {
            Category result = categoryDao.findByName(categoryName);
            if (result == null) {
                throw new ApiException("No such category name: " + categoryName);
            }
            return result;
        } catch (Exception e) {
            throw new ApiException("Category lookup by category-name " + categoryName + " failed", e);
        }
    }

    // categories/name/{category-name}/books
    @GET
    @Path("categories/name/{category-name}/books")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Book> booksByCategoryName(@PathParam("category-name") String categoryName,
                                        @Context HttpServletRequest httpRequest) {
        try {
            Category category = categoryDao.findByName(categoryName);
            if (category == null) {
                throw new ApiException("No such category name: " + categoryName);
            }
            return bookDao.findByCategoryName(category.name());
        } catch (Exception e) {
            throw new ApiException("Books lookup by category-name " + categoryName + " failed", e);
        }
    }

    // categories/name/{category-name}/suggested-books
    // categories/name/{category-name}/suggested-books?limit=#

    @GET
    @Path("categories/name/{category-name}/suggested-books")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Book> suggestedBooks(@PathParam("category-name")  String categoryName,
                                     @QueryParam("limit") @DefaultValue("3") int limit,
                                     @Context HttpServletRequest request) {
        try {
            return bookDao.findRandomByCategoryName(categoryName, limit);
        } catch (Exception e) {
            throw new ApiException("products lookup via category name failed", e);
        }
    }
    @POST
    @Path("orders")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public OrderDetails placeOrder(OrderForm orderForm) {

        try {

            long orderId = orderService.placeOrder(orderForm.getCustomerForm(), orderForm.getCart());
            if (orderId > 0) {
                return orderService.getOrderDetails(orderId);
            } else {
                throw new ApiException.ValidationFailure("Unknown error occurred");
            }

            // NOTE: MORE CODE PROVIDED NEXT PROJECT

        } catch (ApiException e) {
            // NOTE: all validation errors go through here
            throw e;
        } catch (Exception e) {
            throw new ApiException("order placement failed", e);
        }
    }

}