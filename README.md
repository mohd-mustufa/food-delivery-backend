# Cost Estimation API For A Food Delivery Service

## Overview

This API provides endpoints for estimating the cost of delivering food items based on various factors such as zone, organization, distance, and item type. It leverages a PostgreSQL database to store pricing details and organization information.

## Installation

To use this API, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/mohd-mustufa/food-delivery-backend.git
```

2. Install the dependencies:

```bash
npm install
```

3. Set up a PostgreSQL database and execute the provided SQL queries to create tables and insert data.

4. Start the server:

```bash
npm start
```

## Database Setup

You can use the following SQL queries to set up the required tables and insert sample data into the PostgreSQL database:

```sql
-- Creating Tables
CREATE TABLE organizations (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL);
CREATE TABLE items (id SERIAL PRIMARY KEY, type VARCHAR(50) NOT NULL, description TEXT);
CREATE TABLE pricing (
organization_id INT REFERENCES Organizations(id),
item_id INT REFERENCES Items(id),
zone VARCHAR(50),
base_distance_in_km NUMERIC(10, 2) NOT NULL,
km_price NUMERIC(10, 2) NOT NULL,
fix_price NUMERIC(10, 2) NOT NULL,
PRIMARY KEY (organization_id, item_id, zone));

-- Queries for adding data in the tables

INSERT INTO organizations (name) VALUES ('Company A'), ('Company B'), ('Company C'), ('Company D'), ('Company E');

INSERT INTO items (type, description) VALUES ('perishable', 'Spoils quickly.'), ('non-perishable', 'Long shelf life.');

INSERT INTO pricing (organization_id, item_id, zone, base_distance_in_km, km_price, fix_price) VALUES
(1, 1, 'north', 6, 2, 10), (1, 1, 'south', 6, 2, 10), (1, 1, 'east', 5, 2, 10), (1, 1, 'west', 5, 2, 10), (1, 1, 'central', 4, 2, 10),
(1, 2, 'north', 6, 1, 10), (1, 2, 'south', 6, 1, 10), (1, 2, 'east', 5, 1, 10), (1, 2, 'west', 5, 1, 10), (1, 2, 'central', 4, 1, 10),

(2, 1, 'north', 5, 2, 10), (2, 1, 'south', 5, 2, 10), (2, 1, 'east', 5, 2, 10), (2, 1, 'west', 5, 2, 10), (2, 1, 'central', 5, 2, 10),
(2, 2, 'north', 5, 1.5, 10), (2, 2, 'south', 5, 1.5, 10), (2, 2, 'east', 5, 1, 10), (2, 2, 'west', 5, 1, 10), (2, 2, 'central', 5, 1, 10),

(3, 1, 'north', 5, 2, 10), (3, 1, 'south', 5, 2, 10), (3, 1, 'east', 5, 2, 10), (3, 1, 'west', 5, 2, 10), (3, 1, 'central', 5, 2, 10),
(3, 2, 'north', 5, 1, 10), (3, 2, 'south', 5, 1, 10), (3, 2, 'east', 5, 1, 10), (3, 2, 'west', 5, 1, 10), (3, 2, 'central', 5, 1, 10),

(4, 1, 'north', 5, 2, 10), (4, 1, 'south', 5, 2, 10), (4, 1, 'east', 5, 2, 10), (4, 1, 'west', 5, 2, 10), (4, 1, 'central', 5, 2, 10),
(4, 2, 'north', 5, 1, 10), (4, 2, 'south', 5, 1, 10), (4, 2, 'east', 5, 1, 10), (4, 2, 'west', 5, 1, 10), (4, 2, 'central', 5, 1, 10),

(5, 1, 'north', 5, 2, 10), (5, 1, 'south', 5, 2, 10), (5, 1, 'east', 5, 2, 10), (5, 1, 'west', 5, 2, 10), (5, 1, 'central', 5, 2, 10),
(5, 2, 'north', 5, 1, 10), (5, 2, 'south', 5, 1, 10), (5, 2, 'east', 5, 1, 10), (5, 2, 'west', 5, 1, 10), (5, 2, 'central', 5, 1, 10);
```

## Calculate Delivery Cost API

- **URL:** `/api/v1/cost-estimate`
- **Method:** `POST`
- **Description:** Calculate the estimated cost for delivering food items.
- **Request Body:**
  - `zone` (string, required): The zone for delivery. Valid values are north, south, east, west, and central.
  - `organization_id` (integer, required): The ID of the organization.
  - `total_distance` (number, required): The total distance for delivery in kilometers.
  - `item_type` (string, required): The type of item. Valid values are perishable and non-perishable.
- **Response:**
  - `total_price` (number): The estimated total cost for delivery.

## Usage

Once the server is running, you can send HTTP requests to the specified endpoints to calculate delivery costs based on different parameters.

## Technologies Used

- **Node.js:** Used as the server-side JavaScript runtime environment for building the API.
- **Express.js:** Employed as the web application framework for Node.js to handle routing and middleware functionality.
- **PostgreSQL:** Utilized as the relational database management system (RDBMS) to store and manage data related to pricing details and organization information.
- **Swagger:** Integrated for API documentation and testing to provide clear documentation and an interactive API exploration experience.

## Live Demo

Check out the live demo of the website: [Demo](https://food-delivery-backend-5amz.onrender.com/)

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any features, bug fixes, or enhancements you'd like to contribute.

---

Feel free to reach out to us with any questions or feedback.
