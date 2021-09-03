# Express Mongoose TypeScript application for Teliolabs simplified-take-home-assignment.

# Getting started

- Clone the repository

```
git clone https://github.com/omgdev4/simplified-take-home-assignment.git <project_name>
```

- Install dependencies

```
cd <project_name>
npm install
npm run tsc
```

- Build and run the project with auto reload (nodemon)

```
npm run server
```

- Build and run the project

```
npm run start
```

Finally, navigate to `http://localhost:5000/` and you should see the API running!

# API Endpoints
-
```
   Book A Reservation 
   Endpoint: http://localhost:5000/api/booking
   HTTP Method: POST
   Body Expected:
   {
    "email": "om.gehlot@gmail.com",
    "firstName": "om",
    "lastName": "gehlot",
    "checkInDate": "2020/09/07 01:43:12",
    "checkOutDate": "2021/09/08 01:43:12",
    "noOfPeople": 2
   }
```
- 
```
   Get A Reservation 
   Endpoint: http://localhost:5000/api/booking/:reservationId
   HTTP Method: GET
```
- 
```
   Cancel A Reservation 
   Endpoint: http://localhost:5000/api/booking/:reservationId
   HTTP Method: DELETE
```