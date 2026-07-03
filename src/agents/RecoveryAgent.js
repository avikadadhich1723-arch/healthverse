export function predictRecovery(condition) {

  switch (condition) {

    case "Seasonal Viral Infection":
      return {
        probability: 95,
        estimatedDays: 7,
        confidence: 94
      };

    case "Joint Inflammation":
      return {
        probability: 88,
        estimatedDays: 21,
        confidence: 90
      };

    case "Possible Cardiac Issue":
      return {
        probability: 70,
        estimatedDays: 30,
        confidence: 92
      };

    default:
      return {
        probability: 85,
        estimatedDays: 10,
        confidence: 85
      };
  }

}