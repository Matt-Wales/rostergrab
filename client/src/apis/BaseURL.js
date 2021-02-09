import axios from 'axios';

export default axios.create({
    baseURL: `http://rostergrab.herokuapp.com/api`
})