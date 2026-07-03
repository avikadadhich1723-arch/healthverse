import { analyzeSymptoms } from "./TempAgent";
import { detectEmergency } from "./EmergencyAgent";
import { getAyurvedaPlan } from "./AyurvedaAgent";
import { getHomeopathyPlan } from "./HomeopathyAgent";
import { getAllopathyPlan } from "./AllopathyAgent";
import { predictRecovery } from "./RecoveryAgent";
import { recommendTreatment } from "./RecommendationAgent";

export function runHealthVerseAI(symptom) {
  // Step 1
  const analysis = analyzeSymptoms(symptom);

  // Step 2
  const emergency = detectEmergency(symptom);

  // Step 3
  const ayurveda = getAyurvedaPlan(analysis.condition);

  // Step 4
  const homeopathy = getHomeopathyPlan(analysis.condition);

  // Step 5
  const allopathy = getAllopathyPlan(analysis.condition);

  // Step 6
  const recovery = predictRecovery(analysis.condition);

  // Step 7
  const recommendation = recommendTreatment({
    ayurveda,
    homeopathy,
    allopathy
  });

  return {
    analysis,
    emergency,
    ayurveda,
    homeopathy,
    allopathy,
    recovery,
    recommendation
  };
}