import { BiBarChartAlt2 } from "react-icons/bi";
import { FaPython } from "react-icons/fa";
import { SiNumpy, SiPandas } from "react-icons/si";
import { TbChartDots, TbDatabase, TbMathFunction, TbRobot } from "react-icons/tb";
import type { Skill } from "@/types";

export const skills: Skill[] = [
  { name: "Python", description: "Problem solving, automation, and ML workflows.", icon: FaPython },
  { name: "Pandas", description: "Data cleaning, analysis, joins, and feature preparation.", icon: SiPandas },
  { name: "NumPy", description: "Numerical computing and efficient array operations.", icon: SiNumpy },
  { name: "SQL", description: "Querying, aggregation, and structured data exploration.", icon: TbDatabase },
  { name: "Tableau", description: "Visual dashboards for communicating insights.", icon: TbChartDots },
  { name: "Statistics", description: "Probability, distributions, inference, and experiments.", icon: TbMathFunction },
  { name: "Machine Learning", description: "Predictive modeling, evaluation, and iteration.", icon: TbRobot },
  { name: "Data Visualization", description: "Clear charts that turn complexity into decisions.", icon: BiBarChartAlt2 }
];
