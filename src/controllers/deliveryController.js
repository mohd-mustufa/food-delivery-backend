const pool = require("../../db");

const calculateCost = async (req, res) => {
  const { zone, organization_id, total_distance, item_type } = req.body;

  try {
    // Fetch pricing details from the database
    let query = `
                SELECT base_distance_in_km, km_price, fix_price
                FROM pricing
                WHERE organization_id = ${parseInt(
                  organization_id
                )} AND zone = '${zone.toLowerCase()}' AND item_id = 
                (SELECT id FROM items WHERE type = '${item_type.toLowerCase()}');
              `;

    const { rows } = await pool.query(query);

    // Check if pricing details are found
    if (rows.length === 0) {
      return res.status(404).json({ error: "Pricing details not found" });
    }

    const { base_distance_in_km, km_price, fix_price } = rows[0];

    // Calculate total price
    let totalPrice = parseInt(fix_price); // Base price

    if (parseInt(total_distance) > parseInt(base_distance_in_km)) {
      const extraDistance =
        parseInt(total_distance) - parseInt(base_distance_in_km);
      const extraPrice = extraDistance * parseInt(km_price);
      totalPrice += extraPrice;
    }

    // Convert price to cents to avoid decimal issues
    totalPrice *= 100;

    res.json({ total_price: totalPrice });
  } catch (error) {
    console.error("Error calculating delivery cost:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = calculateCost;
