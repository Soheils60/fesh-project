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
