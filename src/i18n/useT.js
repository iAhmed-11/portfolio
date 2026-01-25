import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";

export const useT = () => useContext(LanguageContext);