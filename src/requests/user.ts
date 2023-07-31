import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_USERS_API_BASE_URL,
    withCredentials: true
});

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error)
    if (error.response) throw error.response.data.message;

    if (error.message) throw error.message;
    
    throw error;
});


export class User {
    async signUp(email: string, password: string) {
        const apiRoute = '/signup';
        try {
            const response = await api.post(apiRoute, { "email": email, "password": password });
            return JSON.stringify(response.data);
        } catch (error: any) {
            throw error;
        }
    }

    async signIn(email: string, password: string) {
        const apiRoute = '/signin';
        try {
            const response = await api.post(apiRoute, { "email": email, "password": password });
            return JSON.stringify(response.data);
        } catch (error: any) {
            throw error;
        }
    }

    async signOut() {
        const apiRoute = '/signout';
        try {
            const response = await api.get(apiRoute);
            return JSON.stringify(response.data);
        } catch (error) {
            throw error;
        }
    }

    async user() {
        try {
            const response = await api.get('');
            return JSON.stringify(response.data);
        } catch (error) {
            throw error;
        }
    }
    
    async googleSignIn(email: string) {
        const apiRoute = '/google-signin';
        try {
            const response = await api.post(apiRoute, { "googleToken": email });
            return JSON.stringify(response.data);
        } catch (error) {
            throw error;
        }
    }

    async confirmationEmail(token: string) {
        const apiRoute = `/confirm-email/${token}`;
        console.log(token)

        try {
            const response = await api.get(apiRoute);
            
            return JSON.stringify(response.data);
        } catch (error) {
            throw error;
        }
    }
    
    async forgotPassword(email: string) {
        const apiRoute = '/forgot-password';
        try {
            const response = await api.post(apiRoute, { email });
            return JSON.stringify(response.data);
        } catch (error) {
            throw error;
        }
    }
    
    async resetPassword(token: string, password: string) {
        const apiRoute = `/reset-password/${token}`;
        try {
            const response = await api.post(apiRoute, { password });
            return JSON.stringify(response.data);
        } catch (error) {
            throw error;
        }
    }
    
    async deleteAccount() {
        try {
            const response = await api.delete('');
            return JSON.stringify(response.data);
        } catch (error) {
            throw error;
        }
    }

}