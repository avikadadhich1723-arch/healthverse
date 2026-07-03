export function detectEmergency(symptom) {

  const emergencyWords = [
    "chest pain",
    "heart attack",
    "stroke",
    "difficulty breathing",
    "unconscious",
    "bleeding",
    "blood vomiting",
    "severe burns",
    "seizure"
  ];

  const text = symptom.toLowerCase();

  const emergency = emergencyWords.some(word =>
    text.includes(word)
  );

  return {
    isEmergency: emergency,

    recommendation: emergency
      ? "🚨 Immediate medical attention is required. Please visit the nearest emergency department or call emergency services immediately."
      : "No emergency symptoms detected."
  };
}