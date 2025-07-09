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


  return weighted;
}
function toggleInfiltrationInput(method) {
  document.getElementById("measuredInfiltrationSection").style.display = (method === "measured") ? "block" : "none";
  document.getElementById("subjectiveInfiltrationSection").style.display = (method === "subjective") ? "block" : "none";

  // پاک کردن نمایش امتیاز قبلی هنگام تغییر روش
  document.getElementById("infiltrationRateScoreDisplay").innerHTML = "<strong>SHI Score:</strong> —";
  document.getElementById("infiltrationSubjectiveScoreDisplay").innerHTML = "<strong>SHI Score:</strong> —";
}

// 1. امتیاز نفوذپذیری (مقدار اندازه‌گیری شده)
function calculateInfiltrationRateScore() {
  const val = parseFloat(document.getElementById('infiltrationRate').value);
  let score = 0;

  if (isNaN(val) || val < 0) {
    score = 0;
  } else if (val > 50) {
    score = 5;
  } else if (val > 30) {
    score = 4;
  } else if (val > 15) {
    score = 3;
  } else if (val > 5) {
    score = 2;
  } else {
    score = 1;
  }

  document.getElementById('infiltrationRateScoreDisplay').innerHTML = `<strong>SHI Score:</strong> ${score}`;
  return score;
}

// 2. امتیاز نفوذپذیری (ارزیابی ذهنی)
function calculateInfiltrationSubjectiveScore() {
  const val = document.getElementById('infiltrationSubjective').value;
  let score = 0;
  switch (val) {
    case "Very Good": score = 5; break;
    case "Good": score = 4; break;
    case "Moderate": score = 3; break;
    case "Poor": score = 2; break;
    case "Very Poor": score = 1; break;
    default: score = 0;
  }
  document.getElementById('infiltrationSubjectiveScoreDisplay').innerHTML = `<strong>SHI Score:</strong> ${score}`;
  return score;
}

// 3. امتیاز ساختار خاک (VESS)
function calculateSoilStructureScore() {
  const val = document.getElementById('soilStructure').value;
  let score = 0;
  switch (val) {
    case "1": score = 5; break;
    case "2": score = 4; break;
    case "3": score = 3; break;
    case "4": score = 2; break;
    case "5": score = 1; break;
    default: score = 0;
  }
  document.getElementById('soilStructureScoreDisplay').innerHTML = `<strong>SHI Score:</strong> ${score}`;
  return score;
}

// 4. امتیاز عمق لایه شخم
function calculateTillageLayerScore() {
  const val = parseFloat(document.getElementById('tillageLayer').value);
  let score = 0;

  if (isNaN(val) || val < 0) {
    score = 0;
  } else if (val >= 30) {
    score = 5;
  } else if (val >= 20) {
    score = 4;
  } else if (val >= 10) {
    score = 3;
  } else if (val >= 5) {
    score = 2;
  } else {
    score = 1;
  }

  document.getElementById('tillageLayerScoreDisplay').innerHTML = `<strong>SHI Score:</strong> ${score}`;
  return score;
}

// 5. امتیاز سختی خاک
function calculateSoilStrengthScore() {
  const val = parseFloat(document.getElementById('soilStrength').value);
  let score = 0;

  if (isNaN(val) || val < 0) {
    score = 0;
  } else if (val <= 1.0) {
    score = 5;
  } else if (val <= 1.5) {
    score = 4;
  } else if (val <= 2.0) {
    score = 3;
  } else if (val <= 3.0) {
    score = 2;
  } else {
    score = 1;
  }

  document.getElementById('soilStrengthScoreDisplay').innerHTML = `<strong>SHI Score:</strong> ${score}`;
  return score;
}
