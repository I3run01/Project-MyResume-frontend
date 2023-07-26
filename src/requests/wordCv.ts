import axios from 'axios';
import FileDownload from 'js-file-download';

const api = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://127.0.0.1:5000/api/word'
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
    async CreateCv(json: object) {
        const apiRoute = '';

        try {
            const response = await api.post(apiRoute, json, { responseType: 'blob' });

            console.log(response)

            FileDownload(response.data, 'word-resume.docx');

            return JSON.stringify(response)

        } catch (error: any) {
            throw error;
        }
    }
}
