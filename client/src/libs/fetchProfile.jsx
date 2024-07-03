import axios from 'axios'

async function fetchProfile() {
    const response = await axios.get('http://localhost:3000/api/v1/auth/profile',{withCredentials:true});
    return response;
}

export default fetchProfile