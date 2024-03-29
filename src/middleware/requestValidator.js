const requestValidator = (req, res, next) => {
  const { zone, organization_id, total_distance, item_type } = req.body;

  // Validate zone
  const validZones = ["north", "south", "east", "west", "central"];
  if (!zone || !validZones.includes(zone.toLowerCase())) {
    return res.status(400).json({
      error:
        "Zone is required and must be one of: north, south, east, west, central",
    });
  }

  // Validate organization_id
  if (!organization_id) {
    return res.status(400).json({ error: "Organization ID is required" });
  }

  // Validate total_distance
  if (isNaN(total_distance) || total_distance <= 0) {
    return res
      .status(400)
      .json({ error: "Total distance must be a positive number" });
  }

  // Validate item_type
  const validItemTypes = ["perishable", "non-perishable"];
  if (!item_type || !validItemTypes.includes(item_type.toLowerCase())) {
    return res.status(400).json({
      error:
        "Item type is required and must be one of: perishable, non-perishable",
    });
  }
  next();
};

module.exports = requestValidator;
