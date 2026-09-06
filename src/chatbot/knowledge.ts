export type KnowledgeEntry = {
  id: string;
  questions: string[];
  answer: string;
};

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "about",
    questions: ["who is sachin", "about sachin", "tell me about sachin"],
    answer:
      "Sachin Masti is a Data Scientist and Machine Learning Engineer with expertise in Python, Statistics, Data Analysis, Machine Learning, and Data Visualization."
  },
  {
    id: "skills",
    questions: ["skills", "what skills", "technical skills"],
    answer:
      "Sachin works with Python, Pandas, NumPy, SQL, Tableau, Statistics, Machine Learning, Data Visualization, Pydantic, FastAPI, and PyTorch."
  },
  {
    id: "focus",
    questions: ["what does he work on", "current focus", "currently building"],
    answer:
      "He is currently building end-to-end ML pipelines and production-grade data systems, from data ingestion to model deployment."
  },
  {
    id: "projects",
    questions: ["projects", "what projects", "built", "project list"],
    answer:
      "Here are Sachin's projects:\n\n**Airbnb NYC Price Predictor** — Cleaned a 48,895-listing NYC dataset and tuned a CatBoost regressor (R² = 0.63).\n  [Code](https://github.com/sachinmasti/airbnb-nyc-price-predictor) | [Live Demo](https://airbnb-nyc-price-predictor.onrender.com)\n\n**Teen Mental Health Predictor API** — FastAPI + Pydantic v2 API predicting academic performance from social media habits and mental health indicators.\n  [Code](https://github.com/sachinmasti/Api-with-fast-api)\n\n**HR Attrition — EDA & ML Pipeline** — End-to-end analysis predicting employee attrition with 84% accuracy.\n  [Code](https://github.com/sachinmasti/HR-attrition)\n\n**NYC Airbnb EDA & Price Prediction** — Exploratory analysis and regression modeling on 49K NYC Airbnb listings (CatBoost R² 0.627).\n  [Code](https://github.com/sachinmasti/Air_Bnb_house-_price_prediction_EDA_files)\n\n**Spam Detection System** — End-to-end spam classifier with TF-IDF and Optuna-tuned LightGBM (99.63% test AUC), shipped as a FastAPI endpoint.\n  [Code](https://github.com/sachinmasti/spam_classifier) | [Live Demo](https://spam-classifier-ffg1.onrender.com)\n\n**Customer Churn Prediction System — ChurnGuard AI** — Bagging ensemble of 150 XGBoost classifiers (74.1% accuracy) on a 20,000-customer dataset, deployed with FastAPI + Gradio dashboard.\n  [Code](https://github.com/sachinmasti/Customer-Churn-project---) | [Live Demo](https://churnguard-ui.onrender.com/)"
  },
  {
    id: "airbnb",
    questions: ["airbnb", "price predictor", "nyc"],
    answer:
      "**Airbnb NYC Price Predictor** — Cleaned a 48,895-listing NYC dataset and engineered pricing signals, tuning a CatBoost regressor to R² = 0.63. Deployed on Render via Flask.\n[Code](https://github.com/sachinmasti/airbnb-nyc-price-predictor) | [Live Demo](https://airbnb-nyc-price-predictor.onrender.com)"
  },
  {
    id: "spam",
    questions: ["spam", "classifier", "spam classifier", "detection"],
    answer:
      "**Spam Detection System** — End-to-end spam classifier with TF-IDF and an Optuna-tuned LightGBM (99.63% test AUC), shipped as a real-time FastAPI endpoint in a Docker container.\n[Code](https://github.com/sachinmasti/spam_classifier) | [Live Demo](https://spam-classifier-ffg1.onrender.com)"
  },
  {
    id: "churn",
    questions: ["churn", "churnguard", "customer churn", "retention"],
    answer:
      "**Customer Churn Prediction System — ChurnGuard AI** — End-to-end churn prediction on a 20,000-customer dataset. Bagging ensemble of 150 XGBoost classifiers reaching 74.1% accuracy, deployed as FastAPI inference API + Gradio dashboard via Docker Compose on Render.\n[Code](https://github.com/sachinmasti/Customer-Churn-project---) | [Live Demo](https://churnguard-ui.onrender.com/)"
  },
  {
    id: "contact",
    questions: ["contact", "how can i contact", "email", "social"],
    answer:
      "You can contact Sachin through the contact form on this site or connect via:\n\n[Email](mailto:sachinmasti88@gmail.com)\n[GitHub](https://github.com/sachinmasti)\n[LinkedIn](https://www.linkedin.com/in/sachin-masti-23a275228/)\n[Medium](https://medium.com/@sachinmasti88)\n[Twitter](https://x.com/sachin_masti88)\n[Instagram](https://www.instagram.com/mai_sachin.845)"
  }
];

const sachinKeywords = [
  "sachin", "masti", "data", "ml", "machine learning", "ai", "python",
  "skill", "project", "build", "contact", "email", "github", "linkedin",
  "medium", "instagram", "about", "who", "resume", "work", "job",
  "airbnb", "spam", "classifier", "predictor", "nlp", "model",
  "churn", "churnguard", "retention", "live", "demo", "link", "links",
  "pipeline", "hi", "hello", "hey"
];

export function askKnowledgeBase(question: string) {
  const normalized = question.toLowerCase().trim();

  const isSachinRelated = sachinKeywords.some((kw) => normalized.includes(kw));
  if (!isSachinRelated) {
    return "I can only answer questions about Sachin Masti — his skills, projects, experience, and contact details. Please ask something related to him.";
  }

  const match = knowledgeBase.find((entry) =>
    entry.questions.some((candidate) => normalized.includes(candidate))
  );

  return (
    match?.answer ??
    "I can answer questions like: Who is Sachin? What skills does he have? What does he build? How can I contact him? What projects has he built?"
  );
}
