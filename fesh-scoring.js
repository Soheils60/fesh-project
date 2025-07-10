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
// ✅ Weights for Step 6
const weightsStep6 = {
  emergence: 9,
  rootDev: 15,
  rootCoating: 3,
  wormActivity: 5,
  mycelium: 3,
  wormCount: 5
};

function calculateStep6TotalScore() {
  function getScore(value, levels) {
    const index = levels.indexOf(value);
    return index >= 0 ? 1 + index : 0;
  }

  const emergence = document.getElementById("emergenceRate").value;
  const rootDev = document.getElementById("rootDevelopment").value;
  const rootCoating = document.getElementById("rootCoating").value;
  const wormActivity = document.getElementById("earthwormActivity").value;
  const mycelium = document.getElementById("myceliumDevelopment").value;
  const wormCount = parseInt(document.getElementById("earthwormCount").value);

  // 1. Score assignment
  const emergenceScore = getScore(emergence, ["Very Low", "Low", "Moderate", "High", "Very High"]);
  const rootDevScore = getScore(rootDev, ["Poor", "Fair", "Good", "Excellent"]);
  const rootCoatingScore = getScore(rootCoating, ["None", "Light", "Moderate", "Heavy"]);
  const wormActivityScore = getScore(wormActivity, ["Absent", "Low", "Moderate", "High"]);
  const myceliumScore = getScore(mycelium, ["None", "Light", "Moderate", "Extensive"]);
  const wormCountScore = !isNaN(wormCount)
    ? wormCount >= 40 ? 5 : wormCount >= 25 ? 4 : wormCount >= 10 ? 3 : wormCount >= 1 ? 2 : 1
    : 0;

  // 2. Weighted scores
  const weightedScores = {
    emergence: emergenceScore * weightsStep6.emergence,
    rootDev: rootDevScore * weightsStep6.rootDev,
    rootCoating: rootCoatingScore * weightsStep6.rootCoating,
    wormActivity: wormActivityScore * weightsStep6.wormActivity,
    mycelium: myceliumScore * weightsStep6.mycelium,
    wormCount: wormCountScore * weightsStep6.wormCount
  };

  const totalWeighted = Object.values(weightedScores).reduce((a, b) => a + b, 0);
  const totalWeight = Object.values(weightsStep6).reduce((a, b) => a + b, 0);
  const finalScore = (totalWeighted / totalWeight).toFixed(2);

  // 3. Update UI
  document.getElementById("emergenceScore").textContent = emergenceScore || '—';
  document.getElementById("emergenceWeighted").textContent = emergenceScore ? weightedScores.emergence : '—';

  document.getElementById("rootDevScore").textContent = rootDevScore || '—';
  document.getElementById("rootDevWeighted").textContent = rootDevScore ? weightedScores.rootDev : '—';

  document.getElementById("rootCoatingScore").textContent = rootCoatingScore || '—';
  document.getElementById("rootCoatingWeighted").textContent = rootCoatingScore ? weightedScores.rootCoating : '—';

  document.getElementById("wormActivityScore").textContent = wormActivityScore || '—';
  document.getElementById("wormActivityWeighted").textContent = wormActivityScore ? weightedScores.wormActivity : '—';

  document.getElementById("myceliumScore").textContent = myceliumScore || '—';
  document.getElementById("myceliumWeighted").textContent = myceliumScore ? weightedScores.mycelium : '—';

  document.getElementById("wormCountScore").textContent = wormCountScore || '—';
  document.getElementById("wormCountWeighted").textContent = wormCountScore ? weightedScores.wormCount : '—';

  document.getElementById("finalStep6Score").textContent = finalScore;
}


