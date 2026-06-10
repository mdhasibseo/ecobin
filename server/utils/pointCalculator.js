const calculatePoints = (weight, type) => {
  let multiplier = 100;

  if (type === "Plastic") multiplier = 120;
  if (type === "Paper") multiplier = 80;
  if (type === "Glass") multiplier = 90;
  if (type === "Metal") multiplier = 150;

  return Math.floor(weight * multiplier);
};

module.exports = calculatePoints;