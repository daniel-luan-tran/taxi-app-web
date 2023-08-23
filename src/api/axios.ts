import _axios from 'axios'
const { VITE_API_URL } = import.meta.env

// export const authConfig = {
//     withCredentials: true,
// }

const axios = _axios.create({ baseURL: VITE_API_URL });

export default axios;