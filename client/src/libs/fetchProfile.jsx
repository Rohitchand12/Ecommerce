import axios from 'axios'

async function fetchProfile() {
    const response = await axios.get('https://mystickart.onrender.com/api/v1/auth/profile',{withCredentials:true});
    return response;
}

export default fetchProfile