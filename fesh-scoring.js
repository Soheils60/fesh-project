// 1. Slope Class
function calculateSlopeScore() {
  const slope = document.getElementById('slopeClass').value;
  let score = 0;
  switch (slope) {
    case "0-1": score = 4; break;
    case "1-2":
    case "2-4": score = 5; break;
    case "4-8": score = 4; break;
    case "8-10": score = 3; break;
    case "10-20": score = 2; break;
    case "20-50":
    case "50-100":
    case "100+": score = 1; break;
    default: score = 0;
  }
  document.getElementById('slopeScoreDisplay').innerHTML = `<strong>SHI Score:</strong> ${score}`;
  return score;
}

// 2. Slope Direction
function calculateSlopeDirectionScore() {
  const dir = document.getElementById('slopeDirection').value;
  let score = 0;
  switch (dir) {
    case "Flat": score = 5; break;
    case "North":
    case "North-East":
    case "North-West": score = 4; break;
    case "East":
    case "South-East":
    case "West": score = 3; break;
    case "South":
    case "South-West": score = 2; break;
    default: score = 0;
  }
  document.getElementById('slopeDirScoreDisplay').innerHTML = `<strong>SHI Score:</strong> ${score}`;
  return score;
}

// 3. Landscape Position
function calculateLandscapePositionScore() {
  const pos = document.getElementById('landscapePosition').value;
  let score = 0;
  switch (pos) {
    case "Toeslope": score = 5; break;
    case "Footslope": score = 4; break;
    case "Backslope": score = 3; break;
    case "Shoulder": score = 2; break;
    case "Summit": score = 1; break;
    default: score = 0;
  }
  document.getElementById('landscapeScoreDisplay').innerHTML = `<strong>SHI Score:</strong> ${score}`;
  return score;
}

// 4. Surface Form
function calculateSurfaceFormScore() {
  const form = document.getElementById('surfaceForm').value;
  let score = 0;
  switch (form) {
    case "Concave": score = 5; break;
    case "Flat": score = 4; break;
    case "Convex": score = 2; break;
    default: score = 0;
  }
  document.getElementById('surfaceFormScoreDisplay').innerHTML = `<strong>SHI Score:</strong> ${score}`;
  return score;
}

// ✅ نهایی: محاسبه امتیاز کل Topography
function calculateTopographyScore() {
  const slope = calculateSlopeScore();              // وزن = 3
  const slopeDir = calculateSlopeDirectionScore();  // وزن = 2
  const landscape = calculateLandscapePositionScore(); // وزن = 3
  const surface = calculateSurfaceFormScore();      // وزن = 2

  const weighted = (
    (slope * 3) +
    (slopeDir * 2) +
    (landscape * 3) +
    (surface * 2)
  ) / 10;

  alert("Final Weighted SHI Score (Topography): " + weighted.toFixed(2));

  return weighted;
}
