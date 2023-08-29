# JayPlus

## Introduction

JayPlus is a buisness management software for auto detailing businesses. The objective is to give business admins controll over their financial and non financial data, bookings, employees, all of which to allow them to manage their business more easily and increase profitability and reduce inefficiencies.

The features under development are booking management, analytics, employee management and marketing tools.

# V1.0 Development Plan

JayPlus V1.0 is the booking management feature, which includes customer booking app and admin dashboard that includes a view of all bookings and ability to see them in detail and cancel them.

The software architecture is a service oriented monolith for the backend and a separate frontend.

## Frontend

The frontend is separated into Admin and Customer app in React TypeScript, where Admin app includes auto detailing business admin features and customer app includes the business customer features, specifically booking in this case.

## Backend

The backend is separated into individual service packages in Go and a managed Postgres Database. Services at version V1.0 are as follows:

- Booking Management
- Payment
- Auth

## Integration

Frontend and backend communication are through API endpoints and JWT is used for authorization.

# Features

### Customer Booking

Customers can open the business booking page at <business_name>.jayplus.app/booking where they are presented with three sets of selection options:

- Vehicle Type
- Service Type
- Date and Time

When the desired service and time are selected, customers can proceed to payment where they see the following:

- Invoice
- Payment Form

Should Payment be successful, they are presented with a final receipt that includes booking details and payment confirmation number.

#### Booking Selection Page

##### Vehicle Type Selection

- Vehicle Types List:
  -- A list of all the vehicle types <business_name> Auto Detailing services as options for the customer to choose
- Description field:
  -- A text field describing what the Vehicle Type selected means and what type of vehicles it includes

Ex: [Sedan, SUV, LargeSUV/Truck, Motorcycle]
"Any 5-seater sedan, any hatchback, any two or mini car."

##### Service Type Selection

- Service Types List:
  -- A list of all the service types <business_name> Auto Detailing offers for the selected vehicle as options for the customer to choose
- Description field:
  -- A text field describing what the Service Type selected means

Ex: [Show Room, Basic, Interior, Exterior]
" - Vacuum (Including Trunk Compartment) - Remove & Wash all Rubber Mats - Wipe All Over The dashboard - Power Wash Body and Windows - Power Wash & Clean Wheel Wells
"

##### Date and Time Type Selection

A calendar view showing three day at a time with buttons to navigate between the dates. Each column represents a day and each cell, a timeslot.

- 3 columns each representing a day
  - Column Header showing the date
  - Cells showing a time block
- Back button to navigate to previous day
- Forward button to navigate to the next day

##### Business Rules:

- Each vehicle type has a list of services that can be offered.
- Active cell means that time block can be booked for the selected service and vehicle and inactive means the selected service can not be booked in that time block.

#### Payment Page

##### Invoice

A card formed invoice including booking details the customer is going to pay for. It will include date and time, booking number, and more.

##### Payment Form

A Stripe payment form and a phone number field to identify the customer based on.

### Admin Panel

#### Dashboard Page

Admins can open the dashboard at <business_name>.jayplus.app/admin/dashboard where they can access different features from the navigation bar on the left side and see the feature on the right. In version V1.0, the only active feature will be booking management.

For V1.0 dashboard page will automatically have Booking management tab active by default and the page is oepn on the right. This means all the /dashboard requests will be navigated to /booking-management.

#### Navbar

The navbar is on the left on a wide screen and a dropdown on a phone. It includes the following:

- Business Logo
- List of Admin Features (Only Booking Management for V1.0)
- Logout Button

#### Booking Management

Admins can access booking management page at <business_name>.jayplus.app/admin/booking-management where they can see all of the bookings.

##### Page Heading

- Page Title
- "Add a Booking" Button

##### Bookings Calendar View

A calendar view showing three day at a time on phone or 5 on a computer with buttons to navigate between the dates. Each column represents a day and each cell, a timeslot.

- Columns each representing a day
  - Column Header showing the date
  - Cells showing:
    - Booking Start Time
    - Vehicle Type
    - Service Type
- Back button to navigate to previous day
- Forward button to navigate to the next day

- A "Today" button to reset the caledar to today.

##### Bookings Details Modal

Upon selecting a booking, a modal pops up showing the booking details. The modal includes the following:

- Modal Title
- Close Modal Icon
- Booking Details
- "Cancel Booking" Button

##### Confirm Delete Modal

When the "Cancel Booking" Button is selectedm a new Modal replaces the old one asking to confirm cancellation. The modal has the following:

- Modal Title
- Confirm Delete Message
- "No" Button
- "Yes, Cancel" Button

##### Business Rules:

- Admins can add bookings without payment through "Add a Booking" button.
- If admin wants to book with payment, they can do so through the regular customer portal.
- If admin chooses the "No" button for cancel confirm, the previous modal is shown.

# Frontend App

## Structure

The app uses react-router-dom v6 for routing. Routes then renders the appropriate apps.
There are 2 App components that get rendered.

- CustomerApp
- AdminApp

Each of the app files has an <Outlet> tag inside which will be replaced with the appropiate children based on the route.

Each app has its own directory as "admin" and "customer" directories in "src", and the shared components are in the "shared" directory.

Each app directory has Pages directory inside which includes the components for each page that is rendered. The pages then include the required components from the components directory within the app.

The frontend also uses ContextAPI for global state management. Each app has a context directory, which includes the context and provider.

The utils directory witin "src" includes the utility fuctions used anywhere within the app.

## Customer App:

CustomerApp component is the parent component which uses the components within its "pages" directory for their respective routes

### Pages

Pages directory has a domain driven sub-directory structure. In V1.0 booking directory includes booking related pages and payment directory, payment pages.

- booking
  - BookingSelectionPage
- payment
  - PaymentPage
  - PaymentSuccessPage

### Components

Each page includes its necessary components from the app specific or shared components. In V1.0 while admin has its specific components like Navbar most of the components are shared components which can be found under "shared" directory under "src" as follows:

Admin:

- NavbarSide
- NavbarTop

Shared:

- SelectListInline (List of Options)
- SelectListItem (Item ID, Item Name, Item Icon||null)
- DescriptionField (Description Text)
- TimeSelectionCalendarView
  - PreviousDayButton
  - NextDayButton
  - DayColumnList
  - DayColumn
- ButtonMD
- KeyValueTable
- PaymentForm
- ButtonSM
- CalendarCell
- ButtonXS

modals:

- BookingDetailsModal
- ConfirmCancelModal

### Routes

the routes.tsx file in the "src" folder is responsible for all of the routing and deciding which app or page to render. The structure is as follows:

- '/': Renders CustomerApp
  children:

  - '': Renders BookingSelectionPage
  - 'payment': Renders PaymentPage
  - 'payment-success': Renders PaymentSuccessPage

- '/admin': Renders AdminApp
  children:
  - '': Renders DashboardPage
  - 'booking-management': Renders BookingManagementPage

# Backend App

## Structure

The main function in "cmd/app" directory is the entry point of the program. All of the internal services are in the "internal" directory in a folder named as the service name. An "app" package exists in the "internal" directory wich acts as a container for all the other services.

"utils" directory includes shared utility functions.

"models" directory includes the db models.

"contracts" directory includes all the interfaces in directories named as their respective services.

"config" directory sets the general config of the app.

## Services

Services are categorized in a domain-drivven format. Each service includes routing, handlers and business logic of its specific domain. The services for V1.0 are as follows:

- app
- db
- auth
- booking-management
- payment

#### App Service

App service sets up the router and uses other services as required. This service is also responsible for managing the business customer's config.

#### DB Service

Database service includes all the database related functionality from setting up the database to query functions.

#### Auth Service

Auth service is responsible for all of the authentication and authorization functionality. It uses JWT and is reponsible for generating and deleting tokens and setting up JWT.

#### Booking Management Service

Booking Management service is responsible for business logic related to choosing services and time to book as well as recording and retrieving the bookings. The scheduling is also done in this service.

#### Payment Service

Payment service uses Stripe to provide payment functionality. For V1.0 its usecase is when the customer wants to pay.

### Endpoints

### Handlers

## Database
