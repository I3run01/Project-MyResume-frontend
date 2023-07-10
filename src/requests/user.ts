import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://localhost:4000/api/users',
    withCredentials: true
});

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response) {
        throw error.response;
    }
    throw error;
});


export class User {
    async signUp(email: string, password: string) {
        const apiRoute = '/signup';
        try {
            const response = await api.post(apiRoute, { "email": email, "password": password });
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    async signIn(email: string, password: string) {
        const apiRoute = '/signin';
        try {
            const response = await api.post(apiRoute, { "email": email, "password": password });
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    async signOut() {
        const apiRoute = '/signout';
        try {
            const response = await api.get(apiRoute);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async user() {
        try {
            const response = await api.get('');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
    async googleSignIn(email: string) {
        const apiRoute = '/google-signin';
        try {
            const response = await api.post(apiRoute, { "googleToken": email });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async confirmationEmail(token: string) {
        const apiRoute = `/confirm-email/${token}`;
        try {
            const response = await api.get(apiRoute);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
    async forgotPassword(email: string) {
        const apiRoute = '/forgot-password';
        try {
            const response = await api.post(apiRoute, { email });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
    async resetPassword(token: string, password: string) {
        const apiRoute = `/reset-password/${token}`;
        try {
            const response = await api.post(apiRoute, { password });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
    async deleteAccount() {
        try {
            const response = await api.delete('');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}