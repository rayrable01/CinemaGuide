import { FC, ForwardedRef, useState } from "react";
import styles from "./AuthForm.module.css";
import logo from "../../assets/logo.svg";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { LoginForm } from "../LoginForm/LoginForm";
import { ModalClose } from "../ModalClose/ModalClose";
import { SuccessRegister } from "../SuccessRegister/SuccessRegister";

interface ModalCloseProp {
  onClick: () => void;
  forwardedRef: ForwardedRef<HTMLDivElement>;
}

enum AUTH_STATUS {
  REGISTRATION = "registration",
  LOGIN = "login",
  SUCCESS = "success",
}

export const AuthForm: FC<ModalCloseProp> = ({ onClick, forwardedRef }) => {
  const [authState, setAuthState] = useState<AUTH_STATUS>(
    AUTH_STATUS.REGISTRATION,
  );
  const [registrationComplete, setRegistrationComplete] =
    useState<boolean>(false);

  const handleRegistrationSuccess = () => {
    setRegistrationComplete(true);
  };

  const handleLoginClick = () => {
    setRegistrationComplete(false); // Сброс состояния, если пользователь захочет вернуться к форме
    setAuthState(AUTH_STATUS.LOGIN);
  };

  const handleSwitch = () => {
    setAuthState((prevState) =>
      prevState === AUTH_STATUS.REGISTRATION
        ? AUTH_STATUS.LOGIN
        : AUTH_STATUS.REGISTRATION,
    );
  };

  return (
    <div className={styles.modal__content} ref={forwardedRef}>
      <img src={logo} alt="cinema-logo" className={styles.modal__img}></img>

      {registrationComplete ? (
        <SuccessRegister onClick={handleLoginClick} />
      ) : authState === AUTH_STATUS.REGISTRATION ? (
        <RegisterForm completeReg={handleRegistrationSuccess} />
      ) : (
        <LoginForm />
      )}

      {!registrationComplete && (
        <button className={styles.modal__switch} onClick={handleSwitch}>
          {authState === AUTH_STATUS.REGISTRATION
            ? "У меня есть пароль"
            : "Регистрация"}
        </button>
      )}
      <ModalClose onClick={onClick} />
    </div>
  );
};
