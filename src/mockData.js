// HealthVerse mock data

export const doctorsData = [
  // Allopathy Doctors
  {
    id: 'allo-1',
    name: 'Dr. Sarah Jenkins',
    type: 'Allopathic',
    specialty: 'Cardiologist & General Physician',
    experience: 14,
    rating: 4.9,
    reviewsCount: 182,
    fee: 80,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    bio: 'Dr. Sarah Jenkins is a board-certified Cardiologist with over 14 years of experience. She specializes in cardiovascular health, preventative medicine, and managing complex multi-system disorders with modern evidence-based pharmaceuticals.',
    hospital: 'Metro Cardiac & General Hospital',
    schedule: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM']
  },
  {
    id: 'allo-2',
    name: 'Dr. Marcus Vance',
    type: 'Allopathic',
    specialty: 'Pediatrician & Immunologist',
    experience: 9,
    rating: 4.8,
    reviewsCount: 120,
    fee: 65,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    bio: 'Dr. Vance focuses on childhood development, immunization, and treating infectious diseases. He integrates modern clinical methodologies and quick-relief medical care for children and young adults.',
    hospital: 'St. Jude Childrens Clinic',
    schedule: ['11:00 AM', '01:00 PM', '03:00 PM', '05:30 PM']
  },

  // Ayurveda Doctors
  {
    id: 'ayu-1',
    name: 'Dr. Acharya Devavrat',
    type: 'Ayurvedic',
    specialty: 'Panchakarma & Chronic Disease Specialist',
    experience: 22,
    rating: 4.95,
    reviewsCount: 340,
    fee: 50,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
    bio: 'Dr. Devavrat has dedicated over two decades to classical Ayurvedic healing. Specializing in Panchakarma detoxification, pulse diagnosis (Nadi Pariksha), and dietary modifications to balance the body Vata, Pitta, and Kapha doshas.',
    hospital: 'Nirvana Ayurveda Wellness Shala',
    schedule: ['08:00 AM', '10:00 AM', '11:30 AM', '03:30 PM']
  },
  {
    id: 'ayu-2',
    name: 'Dr. Priya Nair',
    type: 'Ayurvedic',
    specialty: 'Naturopathy & Skin Care Specialist',
    experience: 12,
    rating: 4.75,
    reviewsCount: 95,
    fee: 45,
    avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=300&q=80',
    bio: 'Dr. Priya Nair focuses on natural skin treatments, digestive health (Agni rejuvenation), and herbal formulations. She uses lifestyle correction plans along with herbs like Ashwagandha, Neem, and Turmeric.',
    hospital: 'AyurHealth Holistic Center',
    schedule: ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM']
  },

  // Homeopathy Doctors
  {
    id: 'homeo-1',
    name: 'Dr. Evelyn Dupont',
    type: 'Homeopathic',
    specialty: 'Constitutional Homeopath & Allergy Specialist',
    experience: 18,
    rating: 4.88,
    reviewsCount: 215,
    fee: 40,
    avatar: 'https://images.unsplash.com/photo-1582750433449-64c024716887?auto=format&fit=crop&w=300&q=80',
    bio: 'Dr. Evelyn Dupont utilizes highly individualized, diluted natural substances to trigger the body own healing mechanism. She has extensive experience with chronic allergies, respiratory issues, and emotional stress management.',
    hospital: 'Hahnemann Homeo Healing Clinic',
    schedule: ['10:00 AM', '12:00 PM', '03:00 PM', '06:00 PM']
  },
  {
    id: 'homeo-2',
    name: 'Dr. Rajeev Mehta',
    type: 'Homeopathic',
    specialty: 'Pediatric Homeopathy & Joint Care',
    experience: 15,
    rating: 4.7,
    reviewsCount: 140,
    fee: 35,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80',
    bio: 'Dr. Mehta focuses on children disorders, behavioral challenges, and arthritis management using Homeopathic principles. He aims for gentle, long-term root-cause relief without drug side effects.',
    hospital: 'Similia Homeo Care',
    schedule: ['09:00 AM', '11:30 AM', '01:30 PM', '05:00 PM']
  }
];

export const symptomQuestions = {
  start: {
    text: "Welcome to the HealthVerse AI Assistant. What primary concern or symptom category are you experiencing today?",
    options: [
      { text: "Digestive & Stomach Issues (Gas, Acidity, Bloating)", next: "digestive" },
      { text: "Chronic Pain & Joint Inflammation", next: "pain" },
      { text: "Cold, Cough, Flu, or Respiratory Issues", next: "respiratory" },
      { text: "Stress, Anxiety, or Sleep Disorders", next: "mental" },
      { text: "Skin Rashes, Acne, or Allergies", next: "skin" }
    ]
  },
  digestive: {
    text: "How long have you been experiencing these digestive issues?",
    options: [
      { text: "Just a few days (Acute)", next: "digestive_acute" },
      { text: "Several weeks or months (Chronic)", next: "digestive_chronic" }
    ]
  },
  digestive_acute: {
    text: "Are you experiencing severe symptoms like high fever, continuous vomiting, or sharp localized pain?",
    options: [
      { text: "Yes, I have high fever or sharp pain", next: "emergency_mode" },
      { text: "No, it is mild discomfort and bloating", next: "digestive_mild" }
    ]
  },
  digestive_chronic: {
    text: "Is it mostly related to specific foods, stress, or accompanied by regular acidity?",
    options: [
      { text: "Mainly acidity, burning sensation, and stress", next: "digestive_result_ayurveda" },
      { text: "Irregular bowel movements and food sensitivity", next: "digestive_result_combination" }
    ]
  },
  pain: {
    text: "Is the pain located in a specific joint (like knees/shoulders) or is it a general body/muscle pain?",
    options: [
      { text: "Joint pain with stiff joints in the morning", next: "pain_result_ayu_homeo" },
      { text: "Severe acute pain from a recent injury/sprain", next: "pain_result_allopathy" }
    ]
  },
  respiratory: {
    text: "Are you having any difficulty breathing, a high fever, or blood in cough?",
    options: [
      { text: "Yes, I have difficulty breathing or high fever", next: "emergency_mode" },
      { text: "No, just standard dry cough, runny nose, or mild congestion", next: "respiratory_mild" }
    ]
  },
  respiratory_mild: {
    text: "How often do you get these symptoms?",
    options: [
      { text: "Rarely, just seasonal flu", next: "resp_result_homeo_allo" },
      { text: "Chronically, due to dust or allergen exposure", next: "resp_result_ayurveda" }
    ]
  },
  mental: {
    text: "Are these symptoms accompanied by palpitations, inability to perform tasks, or extreme fatigue?",
    options: [
      { text: "Yes, they impair my daily routine severely", next: "mental_allo" },
      { text: "No, it is mild stress, overthinking, and trouble falling asleep", next: "mental_nature" }
    ]
  },
  skin: {
    text: "Is the skin issue widespread, blistering, or spreading very rapidly?",
    options: [
      { text: "Yes, it is rapid, red, and painful", next: "emergency_mode" },
      { text: "No, it is recurring acne, dry eczema, or mild itching", next: "skin_result_homeo_ayu" }
    ]
  }
};

export const symptomAssessments = {
  digestive_mild: {
    condition: "Mild Indigestion & Dyspepsia",
    description: "Your symptoms indicate temporary gastrointestinal imbalance (sluggish metabolism or mild bloating). This is often linked to diet or lifestyle choices.",
    recommendation: "Ayurveda & Lifestyle modification is highly recommended for root cause correction. Homeopathy can offer gentle relief.",
    scores: { ayurveda: 90, homeopathy: 75, allopathy: 40 },
    primarySystem: "Ayurveda"
  },
  digestive_result_ayurveda: {
    condition: "Acidity & Pitta Aggravation",
    description: "Your symptoms suggest elevated stomach acid secretion (Amlapitta), which correlates with Vata-Pitta imbalance in Ayurveda.",
    recommendation: "Ayurvedic herbs (cooling treatments like Amla and Licorice) and Homeopathic remedies (Nux Vomica) are excellent. Avoid spicy foods.",
    scores: { ayurveda: 95, homeopathy: 80, allopathy: 50 },
    primarySystem: "Ayurveda"
  },
  digestive_result_combination: {
    condition: "Irritable Bowel / Chronic Dyspepsia",
    description: "Long-standing digestive irregularity. Allopathy might be needed for diagnostic tests, while Ayurveda/Homeopathy are great for restoring gut biome naturally.",
    recommendation: "A combination approach: consult Allopathy for diagnostic blood tests/scans, and utilize Ayurveda for long-term diet and herbal therapy.",
    scores: { ayurveda: 85, homeopathy: 80, allopathy: 70 },
    primarySystem: "Combination"
  },
  pain_result_ayu_homeo: {
    condition: "Chronic Joint Stiffness / Mild Arthritis",
    description: "Your symptoms indicate chronic inflammation. Modern medicines (NSAIDs) give quick pain relief but may cause acidity. Natural pathways can address systemic inflammation.",
    recommendation: "Ayurvedic Panchakarma, oil massage (Abhyanga), and Homeopathy (Rhus Tox, Arnica) are highly suited for long-term recovery without side effects.",
    scores: { ayurveda: 90, homeopathy: 85, allopathy: 60 },
    primarySystem: "Ayurveda / Homeopathy"
  },
  pain_result_allopathy: {
    condition: "Acute Sprain / Inflammation",
    description: "Sudden onset pain indicating potential mechanical strain, muscle tear, or acute ligament injury.",
    recommendation: "Allopathy is recommended first to rule out fractures via X-Ray and manage pain immediately. Follow up with Ayurveda/Physiotherapy for recovery.",
    scores: { ayurveda: 50, homeopathy: 40, allopathy: 95 },
    primarySystem: "Allopathy"
  },
  resp_result_homeo_allo: {
    condition: "Acute Cold & Seasonal Flu",
    description: "Mild viral infection affecting upper respiratory tract.",
    recommendation: "Allopathy provides rapid relief for symptoms (congestion, headache) using antihistamines. Homeopathy (Oscillococcinum) offers a gentle natural booster.",
    scores: { ayurveda: 70, homeopathy: 80, allopathy: 85 },
    primarySystem: "Allopathy / Homeopathy"
  },
  resp_result_ayurveda: {
    condition: "Chronic Respiratory Allergy / Sinusitis",
    description: "Recurrent allergic reaction or sinus congestion due to hyper-sensitive immune response.",
    recommendation: "Ayurveda (Nasya therapy, Ginger-Tulsi immune builds) and Homeopathy (Arsenicum Album) target the underlying immune hypersensitivity.",
    scores: { ayurveda: 92, homeopathy: 88, allopathy: 55 },
    primarySystem: "Ayurveda"
  },
  mental_allo: {
    condition: "Severe Anxiety / Stress-Induced Burnout",
    description: "Symptoms pointing to high nervous stress, physical exhaustion, or clinical anxiety.",
    recommendation: "Allopathy consultation is vital for quick clinical evaluation. Complement this with Ayurvedic adaptogens (Ashwagandha) and meditation.",
    scores: { ayurveda: 75, homeopathy: 70, allopathy: 90 },
    primarySystem: "Combination"
  },
  mental_nature: {
    condition: "Mild Stress & Sleep Disturbance",
    description: "Normal life stress impacting sleep architecture and mental rest.",
    recommendation: "Ayurvedic lifestyle correction, Shirodhara therapy, herbal chamomile/ashwagandha, and Homeopathic calming remedies are recommended.",
    scores: { ayurveda: 95, homeopathy: 85, allopathy: 30 },
    primarySystem: "Ayurveda"
  },
  skin_result_homeo_ayu: {
    condition: "Chronic Eczema / Allergic Dermatitis",
    description: "Recurrent skin inflammation indicating a systemic immune/blood impurity trigger.",
    recommendation: "Homeopathy and Ayurveda excel in treating chronic skin conditions by cleansing from within. Avoid long-term steroid creams if possible.",
    scores: { ayurveda: 88, homeopathy: 92, allopathy: 60 },
    primarySystem: "Homeopathy"
  },
  emergency_mode: {
    condition: "POTENTIAL EMERGENCY SYMPTOMS DETECTED",
    description: "Your responses indicate high-risk symptoms (difficulty breathing, severe localized pain, or high fever) requiring immediate clinical intervention.",
    recommendation: "IMMEDIATE EMERGENCY WARNING: Please proceed to the nearest hospital emergency room. Do not rely on alternative or remote consultation for acute emergencies.",
    scores: { ayurveda: 0, homeopathy: 0, allopathy: 100 },
    primarySystem: "Allopathy (Emergency Care Required)",
    isEmergency: true
  }
};

export const defaultPatientProfile = {
  name: "Alex Mercer",
  age: 28,
  email: "alex.mercer@healthverse.com",
  healthScore: 78,
  recoveryProbability: 84,
  bloodGroup: "O+",
  activeReminders: [
    { id: 1, name: "Ashwagandha Tablet (Ayurveda)", time: "08:30 AM", dosage: "1 tab after breakfast", completed: false },
    { id: 2, name: "Paracetamol 650mg (Allopathy)", time: "02:00 PM", dosage: "1 tab if fever > 100F", completed: false },
    { id: 3, name: "Arnica Montana 30C (Homeopathy)", time: "09:00 PM", dosage: "4 pills dry on tongue", completed: false }
  ],
  dietPlan: [
    { meal: "Breakfast", food: "Oatmeal with almonds, pumpkin seeds, and warm milk. Warm ginger tea." },
    { meal: "Lunch", food: "Steamed quinoa, baked chicken breast/paneer, sautéed spinach, and lentils." },
    { meal: "Evening Snack", food: "Soaked walnuts, fresh apple slices with honey." },
    { meal: "Dinner", food: "Light vegetable soup, baked sweet potato, herbal mint tea." }
  ],
  exercisePlan: [
    { activity: "Morning Yoga", duration: "20 Mins", intensity: "Low (Vinyasa Flow & Pranayama)" },
    { activity: "Evening Brisk Walk", duration: "30 Mins", intensity: "Moderate (Heart rate 110-120bpm)" },
    { activity: "Mindfulness Meditation", duration: "10 Mins", intensity: "Restorative" }
  ],
  consultationHistory: [
    { id: 'c-1', doctorName: 'Dr. Sarah Jenkins', specialty: 'Cardiologist', date: '2026-05-12', type: 'Allopathic', status: 'Completed', prescription: 'Rx_Statins_5mg.pdf' },
    { id: 'c-2', doctorName: 'Dr. Acharya Devavrat', specialty: 'Panchakarma Specialist', date: '2026-06-02', type: 'Ayurvedic', status: 'Completed', prescription: 'Rx_Triphala_Guggulu.pdf' }
  ],
  upcomingAppointments: [
    { id: 'app-1', doctorName: 'Dr. Evelyn Dupont', type: 'Homeopathic', specialty: 'Constitutional Homeopath', date: '2026-06-25', time: '10:00 AM', status: 'Confirmed' }
  ],
  reports: [
    { id: 'rep-1', name: 'Comprehensive Blood Panel', date: '2026-05-10', status: 'Analyzed', file: 'blood_panel_may.pdf' },
    { id: 'rep-2', name: 'Liver Function Test (LFT)', date: '2026-06-01', status: 'Analyzed', file: 'lft_june.pdf' }
  ]
};

export const sampleReportsData = {
  blood_panel: {
    summary: "This blood report shows generally optimal counts, with two notable exceptions: Vitamin D is critically low, and your LDL (Bad Cholesterol) is slightly elevated.",
    abnormal: [
      { name: "Vitamin D3 (25-OH)", value: "18.2 ng/mL", range: "Optimal: 30.0 - 100.0 ng/mL", status: "Critical Low", explanation: "Low Vitamin D causes calcium malabsorption, fatigue, joint stiffness, and lowered immunity. Natural remedy: Sun exposure, fatty fish, and Ayurvedic supplements. Allopathic remedy: Cholecalciferol 60K UI weekly." },
      { name: "LDL Cholesterol", value: "135 mg/dL", range: "Optimal: < 100 mg/dL", status: "Borderline High", explanation: "Elevated bad cholesterol puts mild stress on cardiovascular system. Natural treatment: Reduce saturated fats, consume garlic (Lashuna), and exercise daily." }
    ],
    normal: [
      { name: "Hemoglobin", value: "14.5 g/dL", range: "Normal: 13.5 - 17.5 g/dL" },
      { name: "Fasting Blood Sugar", value: "88 mg/dL", range: "Normal: 70 - 99 mg/dL" },
      { name: "Thyroid Stimulating Hormone (TSH)", value: "2.1 uIU/mL", range: "Normal: 0.45 - 4.5 uIU/mL" }
    ]
  }
};
