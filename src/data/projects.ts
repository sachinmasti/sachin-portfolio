import type { Project } from "@/types";


export const projects: Project[] = [
  {
    title: "Airbnb NYC Price Predictor",
    description:
      "Cleaned a 48,895-listing NYC dataset and engineered pricing signals like Times Square proximity and TF-IDF keyword detection. Tuned a CatBoost regressor to R² = 0.63 (MAE ≈ $31). Deployed on Render via Flask with a rule-based fallback estimator.",
    status: "Completed",
    tags: ["Python", "CatBoost", "Feature Engineering", "Flask", "Render"],
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
    title: "HR Attrition — EDA & ML Pipeline",
    description:
      "End-to-end analysis of messy HR data: data cleaning, EDA, feature engineering, and classification pipeline (LogisticRegression + PCA) predicting employee attrition with 84% accuracy.",
    status: "Completed",
    tags: ["Python", "EDA", "scikit-learn", "Classification", "Pandas"],
    github: "https://github.com/sachinmasti/HR-attrition"
  },
  {
    title: "NYC Airbnb EDA & Price Prediction",
    description:
      "Exploratory analysis and regression modeling on 49K NYC Airbnb listings. Feature engineering includes geospatial distance, text mining (TF-IDF), and temporal features. Best model: CatBoost (R² 0.627).",
    status: "Completed",
    tags: ["Python", "EDA", "CatBoost", "XGBoost", "Regression", "Geospatial"],
    github: "https://github.com/sachinmasti/Air_Bnb_house-_price_prediction_EDA_files"
  },
  {
    title: "Spam Detection System",
    description:
      "Built an end-to-end spam classifier using TF-IDF and an Optuna-tuned LightGBM on a 5k+ message dataset. Handled class imbalance with SMOTE (99.63% test AUC). Shipped as a real-time FastAPI endpoint in a Docker container with Pydantic v2 validation.",
    status: "Completed",
    tags: ["Python", "LightGBM", "FastAPI", "Docker", "Pydantic", "NLP"],
    github: "https://github.com/sachinmasti/spam_classifier",
    live: "https://spam-classifier-ffg1.onrender.com"
  },
  {
    title: "Customer Churn Prediction System — ChurnGuard AI",
    description:
      "End-to-end system on a 20,000-customer dataset. Trained a bagging ensemble of 150 XGBoost classifiers reaching 74.1% accuracy. Deployed as two containerized services (FastAPI inference API + Gradio dashboard) via Docker Compose on Render.",
    status: "Completed",
    tags: ["Python", "XGBoost", "FastAPI", "Gradio", "Docker", "Machine Learning"],
    github: "https://github.com/sachinmasti/Customer-Churn-project---",
    live: "https://churnguard-ui.onrender.com/"
  }
];
