import styles from './LoginForm.module.css'

export const LoginForm = () => {
    return (
        <form className={styles.login__form}>
            <input type='text' className={styles.login__email} placeholder='Электронная почта'></input>
            <input type='password' className={styles.login__password} placeholder='Пароль'></input>
            <button className={styles.login__button}>Войти</button>
        </form>
    )
}