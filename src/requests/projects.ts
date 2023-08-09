import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_Projects_API_BASE_URL,
    withCredentials: true
});

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    if (error.response) throw error.response.data.message;

    if (error.message) throw error.message;
    
    throw error;
});


export class Projects {
    async getProjects() {
        const apiRoute = '';
        try {
            const response = await api.get(apiRoute);

            //TODO: delete this line
            const projects = [
                {
                    _id: 'jkadfbhjvk',
                    name: 'project 01'
                },
                {
                    _id: 'EFWAGREF',
                    name: 'project 02'
                },
                {
                    _id: 'ytdjtrshreagtry',
                    name: 'project 03'
                },
            ]

            return JSON.stringify(projects)

            // return JSON.stringify(response.data);
        } catch (error: any) {
            throw error;
        }
    }

    async getSperificProject(projectId: string) {
        const apiRoute = projectId;
        try {
            const response = await api.get(apiRoute);
            return JSON.stringify(response.data);
        } catch (error: any) {
            throw error;
        }
    }

    async getSpecifFieldOfASpecificProject(field: string, projectId: string) {
        const apiRoute = `/${field}/${projectId}`;
        try {
            const response = await api.get(apiRoute);
            return JSON.stringify(response.data);
        } catch (error: any) {
            throw error;
        }
    }

    async newProject() {
        const apiRoute = '';
        try {
            const response = await api.post(apiRoute);
            return JSON.stringify(response.data);
        } catch (error: any) {
            throw error;
        }
    }

    async deleteProject(projectId: string) {
        const apiRoute = `/${projectId}`;
        try {
            const response = await api.delete(apiRoute);
            return JSON.stringify(response.data);
        } catch (error: any) {
            throw error;
        }
    }

    async updateProjectField(field: string, projectId: string, body: any) {
        const apiRoute = `/${field}/${projectId}`;

        console.log(field)

        try {
            const response = await api.post(apiRoute, {body} );
            return JSON.stringify(response.data);
        } catch (error: any) {
            throw error;
        }
    }

}