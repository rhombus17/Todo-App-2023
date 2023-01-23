import axios from 'axios';

let axiosInstance = null;

// const serverURL = 'https://us-central1-todo-app-2023.cloudfunctions.net/api';
const localURL = 'http://localhost:5000/todo-app-2023/us-central1/api';

const baseURL = localURL;

const GetAxios = () => {
    if (axiosInstance == null) {
        axiosInstance = axios.create({
            baseURL: baseURL,
            timeout: 15000
        });
    }
    return axiosInstance;
}

const AxiosUtil = GetAxios();

export default AxiosUtil;
