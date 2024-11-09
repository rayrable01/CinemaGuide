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
    email: z.string(), // required
    password: z.string(), // required 
    name: z.string(),
    surname: z.string()
})

export type registerDataType = z.infer<typeof registerDataSchema>

// Схема аунтефикации ( логина )

export const AuthInfoSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export type AuthInfoSchemaType = z.infer<typeof AuthInfoSchema>


// Функция регистрации пользователя.
export const registerUser = ({email, password, name, surname}: registerDataType): Promise<void>  => {
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