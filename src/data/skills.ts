import { PythonLogo, PandasLogo, NumPyLogo, SQLLogo, TableauLogo, StatsLogo, MLLogo, DataVizLogo } from "@/components/ui/TechLogo";
import type { Skill } from "@/types";

export const skills: Skill[] = [
  { name: "Python", description: "Problem solving, automation, and ML workflows.", icon: PythonLogo },
  { name: "Pandas", description: "Data cleaning, analysis, joins, and feature preparation.", icon: PandasLogo },
  { name: "NumPy", description: "Numerical computing and efficient array operations.", icon: NumPyLogo },
  { name: "SQL", description: "Querying, aggregation, and structured data exploration.", icon: SQLLogo },
  { name: "Tableau", description: "Visual dashboards for communicating insights.", icon: TableauLogo },
  { name: "Statistics", description: "Probability, distributions, inference, and experiments.", icon: StatsLogo },
  { name: "Machine Learning", description: "Predictive modeling, evaluation, and iteration.", icon: MLLogo },
  { name: "Data Visualization", description: "Clear charts that turn complexity into decisions.", icon: DataVizLogo }
];
