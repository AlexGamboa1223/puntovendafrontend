const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import type { User, UpdateUser, BackEndUser } from '../api/types';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'sonner';


export function useCreateUser() {
    const queryClient = useQueryClient();
    const{getAccessTokenSilently} = useAuth0();

    // Función para crear un usuario
    const createUserRequest = async (user: User) => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/user', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,    
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user), 
        });

        if (!res.ok) {
            throw new Error("Error al crear el usuario")
        }

        return res.json();
    } //Fin createUser
    return useMutation({
        mutationFn:(user:User)=>createUserRequest(user),
        onError: (err)=>{
            console.log(err);
            toast.error(err.toString());
            throw new Error("Error al crear el usuario")
        },
        onSuccess: (user) => {
            console.log(user)
            queryClient.invalidateQueries({queryKey:['user']});
        },
    })//Fin de return
}//Fin de useCreateUser 

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const {getAccessTokenSilently} = useAuth0();

    // Función para actualizar el perfil de usuario
    const updateUserRequest = async (formData: UpdateUser) => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/user', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + accessToken,    
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), 
        });

        if (!res.ok) {
            throw new Error("Error al actualizar el usuario")
        }

        return res.json();
    } //Fin updateUser

    return useMutation({
        mutationFn:(formData: UpdateUser)=>updateUserRequest(formData),
        onError: (err)=>{
            console.log(err);
            throw new Error("Error al actualizar el usuario")
        },
        onSuccess: (user) => {
            toast.success('Perfil actualizado exitosamente')
            console.log(user)
            queryClient.invalidateQueries({queryKey:['user']});
        },
    })//Fin de return
}//Fin de useUpdateUser

export function useGetUser() {
    const {getAccessTokenSilently} = useAuth0();

    // Función para obtener el perfil de usuario
    const getUserRequest = async ():Promise<BackEndUser> => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/user', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            }
        });
        if (!res.ok) {
            throw new Error("Error al obtener el usuario")
            }
            return res.json();
        } //Fin getUser
        return useQuery({
            queryKey: ['user'],
            queryFn: getUserRequest,
        })//Fin de return
}//Fin de useGetUser
