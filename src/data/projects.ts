import type { Project } from "@/types";


export const projects: Project[] = [
  {
    title: "Airbnb NYC Price Predictor",
    description:
      "Regression model trained on 2019 NYC Airbnb dataset to predict listing prices. Built with Python, scikit-learn, and deployed on Render.",
    status: "Completed",
    tags: ["Python", "scikit-learn", "Regression", "Render"],
    github: "https://github.com/sachinmasti/airbnb-nyc-price-predictor",
    live: "https://airbnb-nyc-price-predictor.onrender.com"
  },
  {
    title: "Teen Mental Health Predictor API",
    description:
      "FastAPI + Pydantic v2 API predicting academic performance from social media habits, sleep patterns, and mental health indicators. SGDRegressor model with full preprocessing pipeline.",
    status: "Completed",
    tags: ["FastAPI", "Pydantic", "Python", "scikit-learn", "API"],
    github: "https://github.com/sachinmasti/Api-with-fast-api"
  },
  {
    title: "Spam Classifier",
    description:
      "Text classification model to detect spam messages. Built with NLP techniques and deployed as a web app on Render.",
    status: "Completed",
    tags: ["Python", "NLP", "Classification", "Render"],
    github: "https://github.com/sachinmasti/spam_classifier",
    live: "https://spam-classifier-ffg1.onrender.com"
  }
];
