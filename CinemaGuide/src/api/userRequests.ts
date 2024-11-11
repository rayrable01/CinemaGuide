import z from "zod";
import { validateResponse } from "./validateRespose";

const API_URL = 'https://cinemaguide.skillbox.cc'

// Схема пользователя. 
export const userSchema = z.object({
    name: z.string(),
    surname: z.string(),
    email: z.string(),
    favorites: z.array(z.string())
})

export type userSchemaType = z.infer<typeof userSchema>

// Схема регистрации
export const registerDataSchema = z.object({
    email: z.string().regex(/@.*\.(com|ru)$/, 'Некорректный email'),
    password: z.string().min(6, "Пароль должен содержать минимум 6 симоволов"), 
    name: z.string().min(1, 'Поле обязательно к заполнению'),
    surname: z.string().min(1, 'Поле обязательно к заполнению'),
})

export const registerValidationSchema = registerDataSchema.extend({
    confirmPassword: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Пароли не совпадают",
});


export type RegisterValidationType = z.infer<typeof registerValidationSchema>;
export type RegisterDataType = z.infer<typeof registerDataSchema>

// Схема аунтефикации ( логина )

export const AuthInfoSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export type AuthInfoSchemaType = z.infer<typeof AuthInfoSchema>


// Функция регистрации пользователя.
export const registerUser = ({email, password, name, surname}: RegisterDataType): Promise<void>  => {
    return fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name,
            surname: surname
        })
    }).then(validateResponse).then(() => undefined);
}

// Функция логина пользователя
export const loginUser = ({email, password}: AuthInfoSchemaType): Promise<void> => {
    return fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(validateResponse).then(() => undefined);
}

// Функция логаута пользователя
export const logoutUser = (): Promise<void> => {
    return fetch(`${API_URL}/auth/logout`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(validateResponse).then(() => undefined);
}

// Функция проверки данных об пользователе
export const fetchMe = (): Promise<userSchemaType> => {
    return fetch(`${API_URL}/profile`)
    .then(response => validateResponse(response))
    .then(res => res.json())
    .then(data => userSchema.parse(data));
}