import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient';
import { logoutUser, userSchemaType } from '../../api/userRequests';
import styles from '../PersonalPage/PersonalPage.module.css'
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

const getFirstLetter = (name: string, surname: string): string => {
    return `${name.substring(0, 1)}${surname.substring(0, 1)}`;
}

interface SettingsPageProps {
    userData: userSchemaType,
}

export const SettingsPage: FC<SettingsPageProps> = ({userData}) => {
    const navigate = useNavigate();
    const logoutMutation = useMutation({ 
        mutationFn: logoutUser,
        onSuccess: () => {
            console.log('logout success')
            queryClient.invalidateQueries({queryKey: ["users", "me"]})
            navigate("/")
        },
        mutationKey: ["users", "me"],
        onError: (error) => {
            console.log(error.message)
        }
    }, queryClient)

    return (
        <>
            <div className={styles.profile__info_wrapper}>
                <div className={styles.profile__content__wrapper}>
                    <div className={styles.profile__img_div}>{getFirstLetter(userData.name, userData.surname)}</div>
                    <div className={styles.profile__special_info}>
                        <span className={styles.personal__title}>Имя Фамилия</span>
                        <span className={styles.personal__name}>{userData && `${userData.name} ${userData.surname}`}</span>
                    </div>
                </div>
                <div className={styles.profile__content__wrapper}>
                    <div className={styles.profile__img_div}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" fill="white" />
                        </svg>
                    </div>
                    <div className={styles.profile__special_info}>
                        <span className={styles.personal__email__title}>Электронная почта</span>
                        <span className={styles.personal__email}>{userData && userData.email}</span>
                    </div>
                </div>
            </div>

            <button className={styles.profile__logout_btn} type='submit' onClick={() => logoutMutation.mutate()}>Выйти из аккаунта</button>
        </>
    )
}