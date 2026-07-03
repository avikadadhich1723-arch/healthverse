export function recommendTreatment(data) {

  const scores = [
    { name: "Ayurveda", score: data.ayurveda.score },
    { name: "Homeopathy", score: data.homeopathy.score },
    { name: "Allopathy", score: data.allopathy.score }
  ];

  scores.sort((a, b) => b.score - a.score);

  return {
    bestTreatment: scores[0].name,
    text: `${scores[0].name} appears to be the most suitable treatment approach based on the AI symptom analysis. Always consult a qualified healthcare professional before starting treatment.`
  };
}