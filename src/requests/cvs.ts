import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://localhost:4000/api/cvs',
    withCredentials: true
});

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    if (error.response) throw error.response.data.message;

    if (error.message) throw error.message;
    
    throw error;
});


export class Cvs {
    async getCvs() {
        const apiRoute = '';
        try {
            const response = await api.get(apiRoute);
            return JSON.stringify(response.data);
        } catch (error: any) {
            throw error;
        }
    }

    async newCv() {
        const apiRoute = '';
        try {
            const response = await api.post(apiRoute);
            return JSON.stringify(response.data);
        } catch (error: any) {
            throw error;
        }
    }

    async deleteCv(cvId: string) {
        const apiRoute = `/${cvId}`;
        try {
            const response = await api.delete(apiRoute);
            return JSON.stringify(response.data);
        } catch (error: any) {
            throw error;
        }
    }

}