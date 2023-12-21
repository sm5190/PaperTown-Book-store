# PaperTown
Visit : [Link to the site](http://webdev.cs.vt.edu:8080/ShutonuBookstoreReactTransact/)
 ## An E-Comic Bookstore in React and Rest API
PaperTown is a project that involves building a Bookstore web application using a React client app and a Tomcat server with a MySQL database. This project focuses on  a web application architecture that provides accessibility and performance considerations, and focuses on scalability. The project aims to create a scalable and reliable web application that can handle a large number of users and transactions. This prototype has single page architecture at frontend with monolith server at backend. Overall, the project is focused on building a high-quality web application that can handle a large amount of traffic and provide a good user experience.
## Architecture
![image](https://github.com/sm5190/PaperTown-Book-store/assets/53345331/f9300e75-1607-4f82-9740-14ca90cb6307)
### About server:
•The API allows us to serve clients other than React browser clients (e.g. mobile phones)
•It can be versioned and support many formats
•The business layer is separated from the API. Model objects and logic (e.g. validation) can be re-used in many different APIs and applications.
•If we wanted to change our database, changes would be isolated to our Data Access Layer.This involves carefully wrapping exceptions to hide details
## About Client:
![image](https://github.com/sm5190/PaperTown-Book-store/assets/53345331/7b1661dd-39fc-414a-b504-06ffdfee7259)
•The React client is separately build-able, and deployed separately
•Web developers can work independently via the API
•React Components are reusable
•React Components are responsive
