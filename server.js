const express = require("express");
const deliveryRoutes = require("./src/routes/deliveryRoutes");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Food Delivery API",
      description: "API documentation for the Food Delivery backend",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./server.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /api/v1/cost-estimate:
 *  post:
 *      summary: Calculate delivery cost
 *      description: Get the estimated cost for delivering food items based on zone, organization, distance, and item type.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          zone:
 *                              type: string
 *                              enum: [north, south, east, west, central]
 *                              description: The zone for delivery. Valid values are - north, south, east, west and central.
 *                          organization_id:
 *                              type: integer
 *                              enum: [1, 2, 3, 4, 5]
 *                              description: The ID of the organization. Only organizations 1, 2, 3, 4, 5 are available for testing.
 *                          total_distance:
 *                              type: number
 *                              description: The total distance for delivery in kilometers.
 *                          item_type:
 *                              type: string
 *                              enum: [perishable, non-perishable]
 *                              description: The type of item. Valid values are - perishable, non-perishable.
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              total_price:
 *                                  type: number
 *          400:
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *          404:
 *              description: Not Found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *          500:
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 */

app.use("/api/v1/cost-estimate", deliveryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening on port " + PORT));

module.exports = app;
