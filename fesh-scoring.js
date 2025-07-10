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
// وزن‌ها بر اساس جدول SHI
const weightsStep5 = {
  ph: 25,
  color: 15
};

// گرد کردن و اصلاح نمایشی مقدار pH
function roundAndDisplayPhInput() {
  const input = document.getElementById("soilPh");
  if (!input) return;

  input.addEventListener("blur", () => {
    let val = parseFloat(input.value);
    if (!isNaN(val)) {
      val = Math.round(val * 100) / 100;
      input.value = val.toFixed(2);
    }
  });
}

// محاسبه و نمایش امتیاز نهایی Step 5
function calculateChemicalScore() {
  const phInput = document.getElementById('soilPh').value;
  const colorInput = document.getElementById('soilColor').value;
  const btn = document.getElementById("step5Btn");

  if (phInput === "" || colorInput === "") {
    document.getElementById('finalChemicalScore').textContent = '—';
    if (btn) btn.disabled = true;
    return;
  }

  // محاسبه pH Score
  let phVal = parseFloat(phInput);
  phVal = Math.round(phVal * 100) / 100;

  let phScore = 0;
  if (phVal >= 6.0 && phVal <= 7.0) phScore = 5;
  else if (phVal >= 5.5 && phVal < 6.0) phScore = 4;
  else if ((phVal >= 5.0 && phVal < 5.5) || (phVal > 7.0 && phVal <= 7.5)) phScore = 3;
  else if ((phVal >= 4.5 && phVal < 5.0) || (phVal > 7.5 && phVal <= 8.0)) phScore = 2;
  else if ((phVal > 0 && phVal < 4.5) || phVal > 8.0) phScore = 1;

  const phWeighted = phScore * weightsStep5.ph;

  // محاسبه Color Score
  const val = colorInput;
  let colorScore = 0;

  const score5 = ["Very black", "Black", "Very dark brown"];
  const score4 = ["Dark brown", "Medium dark brown", "Dark reddish brown"];
  const score3 = ["Brown", "Medium brown", "Reddish brown", "Very dark gray"];
  const score2 = ["Light brown", "Very light brown", "Yellowish brown", "Yellow brown", "Pale brown", "Dark gray", "Gray", "Red", "Orange brown"];
  const score1 = ["Light gray", "Very light gray", "Yellowish gray", "Olive", "Dark olive"];

  if (score5.includes(val)) colorScore = 5;
  else if (score4.includes(val)) colorScore = 4;
  else if (score3.includes(val)) colorScore = 3;
  else if (score2.includes(val)) colorScore = 2;
  else if (score1.includes(val)) colorScore = 1;

  const colorWeighted = colorScore * weightsStep5.color;

  // محاسبه نهایی مرحله
  const final = ((phWeighted + colorWeighted) / (weightsStep5.ph + weightsStep5.color)).toFixed(2);

  // نمایش در صفحه
  document.getElementById('phScore').textContent = phScore || '—';
  document.getElementById('phWeighted').textContent = phScore ? phWeighted : '—';
  document.getElementById('colorScore').textContent = colorScore || '—';
  document.getElementById('colorWeighted').textContent = colorScore ? colorWeighted : '—';
  document.getElementById('finalChemicalScore').textContent = final;

  if (btn) btn.disabled = false;
}

// وصل کردن auto-calculate به input ها
function enableStep5Listeners() {
  const phInput = document.getElementById("soilPh");
  const colorSelect = document.getElementById("soilColor");
  if (phInput) phInput.addEventListener("input", calculateChemicalScore);
  if (colorSelect) colorSelect.addEventListener("change", calculateChemicalScore);
}

// اجرای همه چیز پس از لود صفحه
window.addEventListener("DOMContentLoaded", () => {
  roundAndDisplayPhInput();
  enableStep5Listeners();

  const btn = document.getElementById("step5Btn");
  if (btn) {
    btn.disabled = true;
    btn.addEventListener("click", () => {
      alert("Step 5 completed. Moving to Step 6...");
      // toggleStep(6); ← اگر مرحله بعدی دارید
    });
  }
});
