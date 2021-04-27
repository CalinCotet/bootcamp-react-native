import axios from 'axios';

export const getBooks = () => {
    axios.get(`http://rn-bootcamp2021.mocklab.io/v1/members/${userId}/books`, config)
        .then(res => {
            const {books, totalActive, totalReturned} = res.data;    
            console.log(books,totalActive, totalReturned);
        });
}

export const getData = async (url, config) => {
    try {
        const response = await axios.get(url, config);
        const data = response.data;
        return data;
    } catch(error) {
        console.log("error", error);
    }
}