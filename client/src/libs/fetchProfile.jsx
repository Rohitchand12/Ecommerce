import axios from 'axios'

async function fetchProfile() {
    const response = await axios.get('https://api.mystickart.online/api/v1/auth/profile',{withCredentials:true});
    return response;
}

export default fetchProfile