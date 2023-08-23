import axios, { 
    // authConfig 
} from "./axios"

export const homePage = async (): Promise<any> => {
    const response = await axios.get<any>("/");
    return response.data;
};