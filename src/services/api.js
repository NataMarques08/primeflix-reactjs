//BASE URL https://api.themoviedb.org/3
///movie/now_playing?api_key=8d3546987bc0561dc355eb43a7457a2e
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;