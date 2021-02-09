import axios from 'axios';

const port = process.env.PORT || 3030;

export default axios.create({
    baseURL: `http://localhost:${port.toString()}/api`
})