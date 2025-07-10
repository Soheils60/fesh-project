// SHI Weights for Step 3 and Step 4
const weights = {
  slope: 15,               // 5 × 3
  surfaceForm: 3,          // 1 × 3
  soilStructure: 25,       // 5 × 5
  tillageLayer: 15,        // 3 × 5
  soilStrength: 9,         // 3 × 3
  infiltration: 9          // 3 × 3
};

// ✅ Step 3 - Slope Score
function calculateSlopeScore() {
  const val = document.getElementById('slopeClass').value;
  let score = 0;
  switch (val) {
    case "1-2":
    case "2-4": score = 5; break;
    case "0-1":
    case "4-8": score = 4; break;
    case "8-10": score = 3; break;
    case "10-20": score = 2; break;
    case "20-50":
    case "50-100":
    case "100+": score = 1; break;
    default: score = 0;
  }
  document.getElementById('slopeScore').textContent = score || '—';
  document.getElementById('slopeWeighted').textContent = score ? score * weights.slope : '—';
  return score;
}

// ✅ Step 3 - Surface Form Score
function calculateSurfaceFormScore() {
  const val = document.getElementById('surfaceForm').value;
  let score = 0;
  switch (val) {
    case "Concave": score = 5; break;
    case "Flat": score = 4; break;
    case "Convex": score = 2; break;
    default: score = 0;
  }
  document.getElementById('surfaceFormScore').textContent = score || '—';
  document.getElementById('surfaceFormWeighted').textContent = score ? score * weights.surfaceForm : '—';
  return score;
}

// ✅ Step 3 - Final Score
function calculateTopographyFinalScore() {
  const slopeScore = calculateSlopeScore();
  const surfaceScore = calculateSurfaceFormScore();
  const totalWeight = weights.slope + weights.surfaceForm;

  if (slopeScore && surfaceScore) {
    const weightedSum = (slopeScore * weights.slope) + (surfaceScore * weights.surfaceForm);
    const finalScore = (weightedSum / totalWeight).toFixed(2);
    document.getElementById('finalTopographyScore').textContent = finalScore;
  } else {
    document.getElementById('finalTopographyScore').textContent = '—';
  }
}

// ✅ Step 4 - Soil Structure
function calculateSoilStructureScore() {
  const val = parseInt(document.getElementById('soilStructure').value);
  if (!val || val < 1 || val > 5) return 0;
  const score = 6 - val;
  const weighted = score * weights.soilStructure;
  document.getElementById('soilStructureScore').textContent = score;
  document.getElementById('soilStructureWeighted').textContent = weighted;
  return weighted;
}

// ✅ Step 4 - Tillage Layer Depth
function calculateTillageLayerScore() {
  const val = parseFloat(document.getElementById('tillageLayer').value);
  let score = 0;
  if (val >= 40) score = 5;
  else if (val >= 30) score = 4;
  else if (val >= 20) score = 3;
  else if (val >= 10) score = 2;
  else if (val > 0) score = 1;
  const weighted = score * weights.tillageLayer;
  document.getElementById('tillageLayerScore').textContent = score;
  document.getElementById('tillageLayerWeighted').textContent = weighted;
  return weighted;
}

// ✅ Step 4 - Soil Strength
function calculateSoilStrengthScore() {
  const val = parseFloat(document.getElementById('soilStrength').value);
  let score = 0;
  if (val <= 0.5) score = 5;
  else if (val <= 1.0) score = 4;
  else if (val <= 1.5) score = 3;
  else if (val <= 2.0) score = 2;
  else score = 1;
  const weighted = score * weights.soilStrength;
  document.getElementById('soilStrengthScore').textContent = score;
  document.getElementById('soilStrengthWeighted').textContent = weighted;
  return weighted;
}

// ✅ Step 4 - Infiltration Rate (Measured)
function calculateInfiltrationRateScore() {
  const val = parseFloat(document.getElementById('infiltrationRate').value);
  let score = 0;
  if (val > 50) score = 5;
  else if (val > 30) score = 4;
  else if (val > 15) score = 3;
  else if (val > 5) score = 2;
  else if (val > 0) score = 1;
  const weighted = score * weights.infiltration;
  document.getElementById('infiltrationRateScore').textContent = score;
  document.getElementById('infiltrationRateWeighted').textContent = weighted;
  return weighted;
}

// ✅ Step 4 - Infiltration Rate (Subjective)
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
  const weighted = score * weights.infiltration;
  document.getElementById('infiltrationSubjectiveScore').textContent = score;
  document.getElementById('infiltrationSubjectiveWeighted').textContent = weighted;
  return weighted;
}

// ✅ Step 4 - Final Score Calculation
function calculateStep4TotalScore() {
  const structure = calculateSoilStructureScore();
  const tillage = calculateTillageLayerScore();
  const strength = calculateSoilStrengthScore();
  let infiltration = 0;
  if (document.querySelector('input[name="infiltrationMethod"]:checked')?.value === 'measured') {
    infiltration = calculateInfiltrationRateScore();
  } else if (document.querySelector('input[name="infiltrationMethod"]:checked')?.value === 'subjective') {
    infiltration = calculateInfiltrationSubjectiveScore();
  }

  const totalScore = structure + tillage + strength + infiltration;
  const totalWeight = weights.soilStructure + weights.tillageLayer + weights.soilStrength + weights.infiltration;

  const finalScore = totalWeight > 0 ? (totalScore / totalWeight).toFixed(2) : "—";
  document.getElementById('finalStep4Score').textContent = finalScore;
  return finalScore;
}
// SHI Weights for Step 5 – Corrected
const weightsStep5 = {
  ph: 25,
  color: 15  // ← اصلاح شد بر اساس Accuracy × Importance
};

// ✅ pH Score Calculation
function calculatePhScore() {
  const val = parseFloat(document.getElementById('soilPh').value);
  let score = 0;

  if (val >= 6.0 && val <= 7.0) score = 5;
  else if (val >= 5.5 && val < 6.0) score = 4;
  else if ((val >= 5.0 && val < 5.5) || (val > 7.0 && val <= 7.5)) score = 3;
  else if ((val >= 4.5 && val < 5.0) || (val > 7.5 && val <= 8.0)) score = 2;
  else if ((val > 0 && val < 4.5) || val > 8.0) score = 1;

  const weighted = score * weightsStep5.ph;
  document.getElementById('phScore').textContent = score || '—';
  document.getElementById('phWeighted').textContent = score ? weighted : '—';
  return weighted;
}

// ✅ Soil Color Score Calculation
function calculateColorScore() {
  const val = document.getElementById('soilColor').value;
  let score = 0;

  const score5 = ["Very black", "Black", "Very dark brown"];
  const score4 = ["Dark brown", "Medium dark brown", "Dark reddish brown"];
  const score3 = ["Brown", "Medium brown", "Reddish brown", "Very dark gray"];
  const score2 = [
    "Light brown", "Very light brown", "Yellowish brown", "Yellow brown",
    "Pale brown", "Dark gray", "Gray", "Red", "Orange brown"
  ];
  const score1 = ["Light gray", "Very light gray", "Yellowish gray", "Olive", "Dark olive"];

  if (score5.includes(val)) score = 5;
  else if (score4.includes(val)) score = 4;
  else if (score3.includes(val)) score = 3;
  else if (score2.includes(val)) score = 2;
  else if (score1.includes(val)) score = 1;

  const weighted = score * weightsStep5.color;
  document.getElementById('colorScore').textContent = score || '—';
  document.getElementById('colorWeighted').textContent = score ? weighted : '—';
  return weighted;
}

// ✅ Final Score for Step 5
function calculateChemicalScore() {
  const phInput = document.getElementById('soilPh').value;
  const colorInput = document.getElementById('soilColor').value;

  if (phInput === "" || colorInput === "") {
    alert("Please fill in both Soil pH and Soil Color.");
    return;
  }

  const ph = calculatePhScore();    // weighted value
  const color = calculateColorScore();  // weighted value

  if (!ph || !color) {
    alert("Invalid score detected. Please check inputs.");
    return;
  }

  const final = (ph + color).toFixed(2);  // ✅ No division – values already weighted
  document.getElementById('finalChemicalScore').textContent = final;
}

// ✅ Event listener for button
window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("step5Btn");
  if (btn) btn.addEventListener("click", calculateChemicalScore);
});
