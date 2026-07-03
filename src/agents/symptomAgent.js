export function analyzeSymptoms(symptom) {

  const text = symptom.toLowerCase();

  if (text.includes("fever") || text.includes("cough")) {
    return {
      condition: "Seasonal Viral Infection",
      description: "Symptoms suggest a seasonal viral infection.",
      confidence: 91,
      severity: "Medium"
    };
  }

  if (text.includes("chest pain")) {
    return {
      condition: "Possible Cardiac Issue",
      description: "Chest pain may indicate a serious cardiac condition.",
      confidence: 97,
      severity: "High"
    };
  }

  if (text.includes("joint")) {
    return {
      condition: "Joint Inflammation",
      description: "Symptoms are consistent with joint inflammation.",
      confidence: 88,
      severity: "Low"
    };
  }

  return {
    condition: "General Health Concern",
    description: "Symptoms require further medical evaluation.",
    confidence: 72,
    severity: "Low"
  };

}