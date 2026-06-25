import { FC } from "react";
import styles from "./ErrorPage.module.css";

export interface ErrorPageProps {
  title: string;
  description?: string;
}

export const ErrorPage: FC<ErrorPageProps> = ({ title, description }) => {
  const additionalDescription =
    description ?? "Перезагрузите страницу или попробуйте позже.";

  return (
    <div className={styles.error__container}>
      <h3 className={styles.error__title}>{title}</h3>
      <p className={styles.error}>{additionalDescription}</p>
    </div>
  );
};
