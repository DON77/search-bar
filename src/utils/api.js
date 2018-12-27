const API_URL = 'https://restcountries.eu/rest/v2/all';

export const getCountries = () => {
    return fetch(API_URL)
        .then(response => response.status === 200
            ? response.json()
            : [])
        .catch(e => console.log(e));
};