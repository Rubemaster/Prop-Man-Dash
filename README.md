# CRMapp

**General Notes**

`CRM` is opensource CRM developed on django framework. It has all the basic features of CRM to start with. Frontend is made using Bootstrap CSS.

- To run this project do the following:

    Pre-requisites: Python, pip and django should be installed in your system. All the coding is done using VScode.
    1. To install the dependencies: \
       `pip install -r requirements.txt` 
    2. Make the migrations:\
        `python manage.py makemigrations` 
    3. Migrate the tables: \
        `python manage.py migrate` 
    4. Create a superuser for your project: \
        `python manage.py createsuperuser`   
        This will prompt you to enter username, email and password for the superuser.  
    5. Run the server using: \
        `python manage.py runserver` 
        
- User panel: \
  -> Login or register site. \
  -> View the dashboard designed for customerand view their orders and their status. \
  -> View or change their account setting like username, email, profile pic. \
  -> User can change their password for login in case they forget or their password got leaked.  
  
- Admin panel:  \
  -> Login to site.  \
  -> View the dashboard designed for admin. The admin can view all the customers and their respective orders and order status.  \
  -> The admin can change the order status, or add, update and delete the customer orders as they need. \
  -> The admin can also add bulk orders for customer (maximum is 10). \
  -> The admin can query through the orders as they need by using different parameters like customer name, date created, start date, end date and given by customer.  
  

- Login page: 


![login](https://user-images.githubusercontent.com/93663329/197975803-4514a1a4-a8f5-47f4-8ce9-695112d5a658.png)


- Register page:


![register](https://user-images.githubusercontent.com/93663329/197975878-d833c223-2ad9-4f0f-99a6-952a5ad6d0e0.png)


- Password reset page: 


![reset password](https://user-images.githubusercontent.com/93663329/197975975-1253bd12-283c-4e06-9af5-5078fd7eb054.png)



- Password sent to email page: 


![-reset-password-sent](https://user-images.githubusercontent.com/93663329/197976082-4c9b49a5-a23e-48be-82a1-27f30d7a81c7.png)



- Enter a new password page: 


![reset-OQ-set-password](https://user-images.githubusercontent.com/93663329/197976239-49431eea-9ffe-46c5-bb22-0ea63cb3be4e.png)



- Reset password success page: 


![reset-password-complete](https://user-images.githubusercontent.com/93663329/197976358-dd2e0d4e-e43f-4b79-a872-076d42db14f6.png)





- Admin Dashboard:


![admin dash](https://user-images.githubusercontent.com/93663329/197974714-fa5664a2-c572-4fd0-ba6c-9b7e84a81972.png)


- Admin view of orders made for user: 


![admin view of orders by user](https://user-images.githubusercontent.com/93663329/197975210-569e1b33-ff63-4363-9ac6-32a6a6ecd02a.png)


- Admin view of products available for sale: 


![admin view of products available](https://user-images.githubusercontent.com/93663329/197975154-945c0fea-3529-41a0-9811-3f8ccc61bd7d.png)


- Admin view of making bulk orders: 


![admin view of bulk orders](https://user-images.githubusercontent.com/93663329/197975321-b3a70140-2cb0-47dc-9480-e9586a04b4a6.png)


- User view of dashboard: 


![user view of dashboard](https://user-images.githubusercontent.com/93663329/197975414-149c5521-f8f1-4754-a86e-8b27b74872d2.png)


- User profile view: 


![accountuser](https://user-images.githubusercontent.com/93663329/197975512-6b89d01b-cbb4-421f-835a-49c600cce533.png)


