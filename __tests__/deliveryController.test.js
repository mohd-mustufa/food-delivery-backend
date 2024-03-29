const request = require("supertest");
const app = require("../server");
const pool = require("../db");

describe("calculateCost controller", () => {
  // Test case for valid input and successful calculation
  it("should calculate the delivery cost correctly for valid input", async () => {
    const response = await request(app).get("/api/v1/cost-estimate").send({
      zone: "central",
      organization_id: 1,
      total_distance: 10,
      item_type: "perishable",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("total_price");
    expect(typeof response.body.total_price).toBe("number");
  });

  // Test case for missing required fields
  it("should return an error when required fields are missing", async () => {
    const response = await request(app).get("/api/v1/cost-estimate").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  // Test case for invalid zone
  it("should return an error when an invalid zone is provided", async () => {
    const response = await request(app).get("/api/v1/cost-estimate").send({
      zone: "invalid_zone",
      organization_id: 1,
      total_distance: 10,
      item_type: "perishable",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  // Test case for total_distance equal to base_distance_in_km
  it("should calculate the delivery cost correctly when total_distance is equal to base_distance_in_km", async () => {
    const response = await request(app).get("/api/v1/cost-estimate").send({
      zone: "central",
      organization_id: 1,
      total_distance: 5, // Assuming base_distance_in_km is 5
      item_type: "perishable",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("total_price");
    expect(response.body.total_price).toBeGreaterThan(0);
  });

  // Test case for total_distance less than base_distance_in_km
  it("should calculate the delivery cost correctly when total_distance is less than base_distance_in_km", async () => {
    const response = await request(app).get("/api/v1/cost-estimate").send({
      zone: "central",
      organization_id: 1,
      total_distance: 3, // Assuming base_distance_in_km is 5
      item_type: "perishable",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("total_price");
    expect(response.body.total_price).toBeGreaterThan(0);
  });

  afterAll(() => {
    pool.end(); // Close the database connection after all tests
  });
});
