import * as zh from "./data";
import * as en from "./data-en";
import { LANG } from "./locale";

const source = LANG === "en" ? en : zh;

// 同一份结构，语言在构建/加载时决定，组件无需感知
export const {
  advantages,
  aiProjects,
  allSkills,
  bossGreeting,
  businessProjects,
  education,
  experience,
  expertise,
  featuredStack,
  journey,
  metrics,
  personalProjects,
  profile,
  selfIntroduction,
  workProjects,
} = source;
