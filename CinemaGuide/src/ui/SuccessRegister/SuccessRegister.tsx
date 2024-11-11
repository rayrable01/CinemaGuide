import { FC } from 'react'
import styles from './SuccessRegister.module.css'

interface SuccessRegisterProps {
    onClick: () => void
}

export const SuccessRegister: FC<SuccessRegisterProps> = ({onClick}) => {
    return (
        <div className={styles.success__wrapper}>
            <h3 className={styles.success__title}>Регистрация завершена</h3>
            <p className={styles.success__description}>Используйте вашу электронную почту для входа</p>
            <button className={styles.login__button} onClick={onClick}>Войти</button>
        </div>
    )
}