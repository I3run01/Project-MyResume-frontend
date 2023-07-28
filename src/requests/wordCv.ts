import axios from 'axios';
import FileDownload from 'js-file-download';

const api = axios.create({
    baseURL: process.env.API_BASE_URL || 'https://create-word-cv.onrender.com/api/word'
});

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error)
    if (error.response) throw error.response.data.message;

    if (error.message) throw error.message;
    
    throw error;
});

export class WordCv {
    async CreateCv(json: object, language: string) {
        const apiRoute = `/${language}`;

        try {
            const response = await api.post(apiRoute, json, { responseType: 'blob' });

            console.log(response)

            FileDownload(response.data, 'word-resume.docx');

            return JSON.stringify(response)

        } catch (error: any) {
            throw error;
        }
    }

    async getWordAllowedLanguages() {
        const apiRoute = '/languages';

        try {
            const response = await api.get(apiRoute);

            return JSON.stringify(response.data)

        } catch (error: any) {
            throw error;
        }
    }
}
