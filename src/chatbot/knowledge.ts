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
      "Sachin Masti is an aspiring Data Scientist and Machine Learning enthusiast who is building skills in Python, Statistics, Data Analysis, Machine Learning, and Data Visualization."
  },
  {
    id: "skills",
    questions: ["skills", "what skills", "technical skills"],
    answer:
      "Sachin works with Python, Pandas, NumPy, SQL, Tableau, Statistics, Machine Learning, and Data Visualization."
  },
  {
    id: "learning",
    questions: ["what is he learning", "learning", "currently focused"],
    answer:
      "He is currently focused on real-world data science projects and strengthening the mathematical foundations needed for machine learning."
  },
  {
    id: "projects",
    questions: ["projects", "what projects", "built"],
    answer:
      "Projects are in progress. The portfolio is structured so new Data Science and Machine Learning projects can be added cleanly as they become ready."
  },
  {
    id: "contact",
    questions: ["contact", "how can i contact", "email", "social"],
    answer:
      "You can contact Sachin through the contact form or connect on GitHub, LinkedIn, Medium, X, and Instagram. The email destination is sachinmasti88@gmail.com."
  }
];

export function askKnowledgeBase(question: string) {
  const normalized = question.toLowerCase().trim();
  const match = knowledgeBase.find((entry) =>
    entry.questions.some((candidate) => normalized.includes(candidate))
  );

  return (
    match?.answer ??
    "I can answer questions like: Who is Sachin? What skills does he have? What is he learning? How can I contact him? What projects has he built?"
  );
}
