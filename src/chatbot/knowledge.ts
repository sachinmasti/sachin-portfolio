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
      "Sachin works with Python, Pandas, NumPy, SQL, Tableau, Statistics, Machine Learning, and Data Visualization."
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
      "Here are Sachin's projects:\n\n**Airbnb NYC Price Predictor** — Regression model trained on 2019 NYC Airbnb dataset to predict listing prices.\n  [Code](https://github.com/sachinmasti/airbnb-nyc-price-predictor) | [Live Demo](https://airbnb-nyc-price-predictor.onrender.com)\n\n**Spam Classifier** — NLP-based text classification model to detect spam messages.\n  [Code](https://github.com/sachinmasti/spam_classifier) | [Live Demo](https://spam-classifier-ffg1.onrender.com)"
  },
  {
    id: "airbnb",
    questions: ["airbnb", "price predictor", "nyc"],
    answer:
      "**Airbnb NYC Price Predictor** — A regression model trained on 2019 NYC Airbnb data to predict listing prices.\n[Code](https://github.com/sachinmasti/airbnb-nyc-price-predictor) | [Live Demo](https://airbnb-nyc-price-predictor.onrender.com)"
  },
  {
    id: "spam",
    questions: ["spam", "classifier", "spam classifier"],
    answer:
      "**Spam Classifier** — An NLP-based model to detect spam messages.\n[Code](https://github.com/sachinmasti/spam_classifier) | [Live Demo](https://spam-classifier-ffg1.onrender.com)"
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
