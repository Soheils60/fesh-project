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
// ✅ Weights for Step 5
const weightsStep5 = {
  ph: 25,
  color: 15
};

// ✅ Calculate pH Score
function calculatePhScore() {
  const val = parseFloat(document.getElementById('soilPh').value);
  let score = 0;
  if (!isNaN(val)) {
    if (val >= 6.0 && val <= 7.0) score = 5;
    else if (val >= 5.5 && val < 6.0) score = 4;
    else if ((val >= 5.0 && val < 5.5) || (val > 7.0 && val <= 7.5)) score = 3;
    else if ((val >= 4.5 && val < 5.0) || (val > 7.5 && val <= 8.0)) score = 2;
    else if ((val > 0 && val < 4.5) || val > 8.0) score = 1;
  }
  const weighted = score * weightsStep5.ph;
  document.getElementById('phScore').textContent = score || '—';
  document.getElementById('phWeighted').textContent = score ? weighted : '—';
  return weighted;
}

// ✅ Calculate Color Score
function calculateColorScore() {
  const val = document.getElementById('soilColor').value;
  let score = 0;
  switch (val) {
    case "Very black":
    case "Black": score = 5; break;
    case "Very dark brown":
    case "Very dark gray": score = 4; break;
    case "Dark brown":
    case "Dark reddish brown":
    case "Dark gray": score = 3; break;
    case "Medium dark brown":
    case "Brown":
    case "Medium brown":
    case "Gray":
    case "Reddish brown": score = 2; break;
    case "Light brown":
    case "Very light brown":
    case "Yellowish brown":
    case "Yellow brown":
    case "Pale brown":
    case "Light gray":
    case "Very light gray":
    case "Yellowish gray":
    case "Olive":
    case "Dark olive":
    case "Red":
    case "Orange brown": score = 1; break;
    default: score = 0;
  }
  const weighted = score * weightsStep5.color;
  document.getElementById('colorScore').textContent = score || '—';
  document.getElementById('colorWeighted').textContent = score ? weighted : '—';
  return weighted;
}

// ✅ Final Score Calculation
function calculateStep5TotalScore() {
  const ph = calculatePhScore();
  const color = calculateColorScore();
  const totalWeight = weightsStep5.ph + weightsStep5.color;
  const totalScore = ph + color;

  if (ph && color) {
    const finalScore = (totalScore / totalWeight).toFixed(2);
    document.getElementById('finalChemicalScore').textContent = finalScore;
    return finalScore;
  } else {
    document.getElementById('finalChemicalScore').textContent = '—';
    return null;
  }
}

// ✅ Live updates
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById('soilPh').addEventListener("input", calculateStep5TotalScore);
  document.getElementById('soilColor').addEventListener("change", calculateStep5TotalScore);
});
// ✅ Biological Scores – Step 6
function calculateEmergenceRateScore() {
  const val = document.getElementById('emergenceRate').value;
  let score = 0;
  switch (val) {
    case "Very Low": score = 1; break;
    case "Low": score = 2; break;
    case "Moderate": score = 3; break;
    case "High": score = 4; break;
    case "Very High": score = 5; break;
    default: score = 0;
  }
  const weighted = score * weightsStep6.emergence;
  document.getElementById('emergenceRateScore').textContent = score || '—';
  document.getElementById('emergenceRateWeighted').textContent = score ? weighted : '—';
  return weighted;
}

function calculateRootDevScore() {
  const val = document.getElementById('rootDevelopment').value;
  let score = 0;
  switch (val) {
    case "Poor": score = 1; break;
    case "Fair": score = 2; break;
    case "Good": score = 4; break;
    case "Excellent": score = 5; break;
    default: score = 0;
  }
  const weighted = score * weightsStep6.rootDev;
  document.getElementById('rootDevScore').textContent = score || '—';
  document.getElementById('rootDevWeighted').textContent = score ? weighted : '—';
  return weighted;
}

function calculateRootCoatingScore() {
  const val = document.getElementById('rootCoating').value;
  let score = 0;
  switch (val) {
    case "None": score = 1; break;
    case "Light": score = 3; break;
    case "Moderate": score = 4; break;
    case "Heavy": score = 5; break;
    default: score = 0;
  }
  const weighted = score * weightsStep6.rootCoating;
  document.getElementById('rootCoatingScore').textContent = score || '—';
  document.getElementById('rootCoatingWeighted').textContent = score ? weighted : '—';
  return weighted;
}

function calculateWormActivityScore() {
  const val = document.getElementById('earthwormActivity').value;
  let score = 0;
  switch (val) {
    case "Absent": score = 1; break;
    case "Low": score = 2; break;
    case "Moderate": score = 3; break;
    case "High": score = 5; break;
    default: score = 0;
  }
  const weighted = score * weightsStep6.wormActivity;
  document.getElementById('wormActivityScore').textContent = score || '—';
  document.getElementById('wormActivityWeighted').textContent = score ? weighted : '—';
  return weighted;
}

function calculateMyceliumScore() {
  const val = document.getElementById('myceliumDevelopment').value;
  let score = 0;
  switch (val) {
    case "None": score = 1; break;
    case "Light": score = 3; break;
    case "Moderate": score = 4; break;
    case "Extensive": score = 5; break;
    default: score = 0;
  }
  const weighted = score * weightsStep6.mycelium;
  document.getElementById('myceliumScore').textContent = score || '—';
  document.getElementById('myceliumWeighted').textContent = score ? weighted : '—';
  return weighted;
}

function calculateWormCountScore() {
  const val = parseInt(document.getElementById('earthwormCount').value);
  let score = 0;
  if (!isNaN(val)) {
    if (val >= 50) score = 5;
    else if (val >= 30) score = 4;
    else if (val >= 15) score = 3;
    else if (val >= 5) score = 2;
    else score = 1;
  }
  const weighted = score * weightsStep6.wormCount;
  document.getElementById('wormCountScore').textContent = score || '—';
  document.getElementById('wormCountWeighted').textContent = score ? weighted : '—';
  return weighted;
}

// ✅ Final Step 6 Score
function calculateStep6TotalScore() {
  const e1 = calculateEmergenceRateScore();
  const e2 = calculateRootDevScore();
  const e3 = calculateRootCoatingScore();
  const e4 = calculateWormActivityScore();
  const e5 = calculateMyceliumScore();
  const e6 = calculateWormCountScore();

  const totalWeight = weightsStep6.emergence + weightsStep6.rootDev + weightsStep6.rootCoating +
                      weightsStep6.wormActivity + weightsStep6.mycelium + weightsStep6.wormCount;

  const totalScore = e1 + e2 + e3 + e4 + e5 + e6;
  const finalScore = (totalScore / totalWeight).toFixed(2);

  document.getElementById('finalStep6Score').textContent = finalScore;
  return finalScore;
}
