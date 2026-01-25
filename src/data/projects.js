// src/data/projects.js

import edueye1 from "../assets/images/projects/edueye-1.jpg";
import edueye2 from "../assets/images/projects/edueye-2.jpg";
import edueye3 from "../assets/images/projects/edueye-3.jpg";

import mediguide1 from "../assets/images/projects/mediguide-1.jpg";
import mediguide2 from "../assets/images/projects/mediguide-2.jpg";
import mediguide3 from "../assets/images/projects/mediguide-3.jpg";
import mediguide4 from "../assets/images/projects/mediguide-4.jpg";
import mediguide5 from "../assets/images/projects/mediguide-5.jpg";
import mediguide6 from "../assets/images/projects/mediguide-6.jpg";

import gdogc1 from "../assets/images/projects/gdogc-1.jpg";
import gdogc2 from "../assets/images/projects/gdogc-2.jpg";

export const projects = [
  {
    id: "edueye",
    titleKey: "project_edueye_title",
    year: "2025",
    descriptionKey: "project_edueye_desc",
    tech: ["Python", "AI", "Data Analysis"],
    images: [edueye2, edueye3, edueye1],
  },
  {
    id: "mediguide",
    titleKey: "project_mediguide_title",
    year: "2025",
    descriptionKey: "project_mediguide_desc",
    tech: ["AI", "Healthcare", "Safety"],
    images: [
      null, // ✅ mediguide-1 مخفية مؤقتًا (بدون حذف)
      mediguide2,
      mediguide4,
      mediguide3,
      mediguide5,
      mediguide6,
    ],
  },
  {
    id: "gdogc-bootcamp",
    titleKey: "project_gdogc_title",
    year: "2025",
    descriptionKey: "project_gdogc_desc",
    tech: ["Python", "Machine Learning", "Classification", "Data Prep"],
    images: [gdogc1, gdogc2],
  },
];