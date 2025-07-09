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
  document.getElementById('slopeWeighted').textContent = score ? score * 15 : '—';
  return score;
}

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
  document.getElementById('surfaceFormWeighted').textContent = score ? score * 3 : '—';
  return score;
}

function calculateTopographyFinalScore() {
  const slopeScore = calculateSlopeScore();
  const surfaceScore = calculateSurfaceFormScore();
  const totalWeight = 15 + 3;

  if (slopeScore && surfaceScore) {
    const weightedSum = (slopeScore * 15) + (surfaceScore * 3);
    const finalScore = (weightedSum / totalWeight).toFixed(2);
    document.getElementById('finalTopographyScore').textContent = finalScore;
  } else {
    document.getElementById('finalTopographyScore').textContent = '—';
  }
}
// Step 4 — SHI Weights from table (Accuracy × Importance)
const weightsStep4 = {
  soilStructure: 25,    // 5 × 5
  tillageLayer: 15,     // 3 × 5
  soilStrength: 9,      // 3 × 3
  infiltration: 9       // 3 × 3 (applies to either measured or subjective)
};

// Soil Structure (VESS Score: 1 = best, 5 = worst → reverse it)
function calculateSoilStructureScore() {
  const val = parseInt(document.getElementById('soilStructure').value);
  if (!val || val < 1 || val > 5) return 0;

  const score = 6 - val; // Reverse scale
  const weighted = score * weightsStep4.soilStructure;

  document.getElementById('soilStructureScoreDisplay').innerHTML = `SHI Score: ${score} × ${weightsStep4.soilStructure} = ${weighted}`;
  return weighted;
}

// Tillage Layer Depth (deeper is better)
function calculateTillageLayerScore() {
  const val = parseFloat(document.getElementById('tillageLayer').value);
  let score = 0;

  if (val >= 40) score = 5;
  else if (val >= 30) score = 4;
  else if (val >= 20) score = 3;
  else if (val >= 10) score = 2;
  else if (val > 0) score = 1;

  const weighted = score * weightsStep4.tillageLayer;
  document.getElementById('tillageLayerScoreDisplay').innerHTML = `SHI Score: ${score} × ${weightsStep4.tillageLayer} = ${weighted}`;
  return weighted;
}

// Soil Strength (kg/cm²) — lower is better
function calculateSoilStrengthScore() {
  const val = parseFloat(document.getElementById('soilStrength').value);
  let score = 0;

  if (val <= 0.5) score = 5;
  else if (val <= 1.0) score = 4;
  else if (val <= 1.5) score = 3;
  else if (val <= 2.0) score = 2;
  else score = 1;

  const weighted = score * weightsStep4.soilStrength;
  document.getElementById('soilStrengthScoreDisplay').innerHTML = `SHI Score: ${score} × ${weightsStep4.soilStrength} = ${weighted}`;
  return weighted;
}

// Infiltration Rate (measured mm/hr)
function calculateInfiltrationRateScore() {
  const val = parseFloat(document.getElementById('infiltrationRate').value);
  let score = 0;

  if (val > 50) score = 5;
  else if (val > 30) score = 4;
  else if (val > 15) score = 3;
  else if (val > 5) score = 2;
  else if (val > 0) score = 1;

  const weighted = score * weightsStep4.infiltration;
  document.getElementById('infiltrationRateScoreDisplay').innerHTML = `SHI Score: ${score} × ${weightsStep4.infiltration} = ${weighted}`;
  return weighted;
}

// Infiltration Subjective
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

  const weighted = score * weightsStep4.infiltration;
  document.getElementById('infiltrationSubjectiveScoreDisplay').innerHTML = `SHI Score: ${score} × ${weightsStep4.infiltration} = ${weighted}`;
  return weighted;
}

// ✅ Final score for Step 4
function calculatePhysicalSoilFinalScore() {
  const structure = calculateSoilStructureScore();
  const tillage = calculateTillageLayerScore();
  const strength = calculateSoilStrengthScore();

  // Only one of the two infiltration inputs will be active
  let infiltration = 0;
  if (document.querySelector('input[name="infiltrationMethod"]:checked')?.value === 'measured') {
    infiltration = calculateInfiltrationRateScore();
  } else if (document.querySelector('input[name="infiltrationMethod"]:checked')?.value === 'subjective') {
    infiltration = calculateInfiltrationSubjectiveScore();
  }

  const totalWeight = weightsStep4.soilStructure + weightsStep4.tillageLayer +
                      weightsStep4.soilStrength + weightsStep4.infiltration;

  const totalScore = structure + tillage + strength + infiltration;
  const finalScore = totalWeight > 0 ? (totalScore / totalWeight).toFixed(2) : "—";

  document.getElementById('finalPhysicalScore').innerText = finalScore;
  return finalScore;
}
