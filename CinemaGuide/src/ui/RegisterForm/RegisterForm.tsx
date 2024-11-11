import { useForm } from 'react-hook-form'
import styles from './RegisterForm.module.css'
import {RegisterDataType, registerUser, registerValidationSchema, RegisterValidationType } from '../../api/userRequests'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../api/queryClient'
import { FC } from 'react'

interface RegisterFormProps {
    completeReg: () => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({completeReg}) => {
    const {register, handleSubmit, formState: {errors} } = useForm<RegisterValidationType>({
        resolver: zodResolver(registerValidationSchema)
    })

    const registerMutation = useMutation({
        mutationFn: (data: RegisterDataType) => registerUser(data),
        onSuccess: () => {
            console.log('Успешная регистрация!')
            completeReg();
        }
    }, queryClient)

    const onSubmit = (data: RegisterValidationType) => {
        const {confirmPassword, ...requestData} = data;
        registerMutation.mutate(requestData);
    }

    return (
        <>
            <h3 className={styles.register__title}>Регистрация</h3>
            <form className={styles.register__form} onSubmit={handleSubmit(onSubmit)}>
                <input
                    className={styles.email__input} 
                    placeholder='Электронная почта' 
                    type='text'
                    style={errors.email && {outline: "1px solid red"}}
                    {...register("email")}
                />
                <input 
                    className={styles.name__input} 
                    placeholder='Имя' 
                    type='text'
                    style={errors.name && {outline: "1px solid red"}}
                    {...register("name")}
                />
                <input 
                    className={styles.surname__input} 
                    placeholder='Фамилия' 
                    type='text'
                    style={errors.surname && {outline: "1px solid red"}}
                    {...register("surname")}
                />
                <input 
                    className={styles.password__input} 
                    placeholder='Пароль' 
                    type='password'
                    style={errors.password && {outline: "1px solid red"}}
                    {...register("password")}
                />
                <input 
                    className={styles.password_submit_input} 
                    placeholder='Подтвердите пароль' 
                    type='password'
                    style={errors.confirmPassword && {outline: "1px solid red"}}
                    {...register("confirmPassword")}
                />
                <button className={styles.register__button} type='submit'>Создать аккаунт</button>
            </form>
        </>
    )
}