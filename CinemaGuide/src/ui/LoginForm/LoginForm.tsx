import { useForm } from 'react-hook-form'
import styles from './LoginForm.module.css'
import { AuthInfoSchema, AuthInfoSchemaType, loginUser } from '../../api/userRequests'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../api/queryClient'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
    const { register, handleSubmit, formState: {errors}} = useForm<AuthInfoSchemaType>({
        resolver: zodResolver(AuthInfoSchema)
    })
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: ({email, password}: AuthInfoSchemaType) => loginUser({email, password}),
        onSuccess() {
            console.log('Login successful!')
            queryClient.invalidateQueries({queryKey: ['users', 'me']})
            navigate("/personal/settings")
        },
        onError: (error) => {
            console.log(error.message)
        }
    }, queryClient)

    const onSubmit = (data: AuthInfoSchemaType) => {
        loginMutation.mutate(data)
    }

    return (
        <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
            <input 
                type='email' 
                className={styles.login__email} 
                placeholder='Электронная почта' 
                {...register('email')}
                style={errors.email && {outline: "1px solid red"}}
                />
            <input 
                type='password' 
                className={styles.login__password} 
                placeholder='Пароль' 
                {...register('password')}
                style={errors.password && {outline: "1px solid red"}}
            />

            <button className={styles.login__button} type='submit'>Войти</button>
        </form>
    )
}