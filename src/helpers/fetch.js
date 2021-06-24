const baseUrl = process.env.REACT_APP_API_URL;

const fetchWitoutToken = (endpoint, data, method = 'GET') => {
    const url = `${ baseUrl }/${ endpoint}`;
    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

const fetchWithTokenRefresh = (endpoint, data, method = 'GET') => {

    const url = `${ baseUrl }/${ endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token,
                'Authorization': `Bearer `+token
            },
            body: data
        });
    }
}

const fetchWithToken = (endpoint, data, method = 'GET') => {

    const url = `${ baseUrl }/${ endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'Authorization': `Bearer `+token,
                //'x-email': email,
                'Content-type': 'application/json',
                //'Content-type': 'multipart/form-data',
            },
            body: data
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                //'Content-type': 'multipart/form-data',
                //'x-token': token,
                'Authorization': `Bearer `+token,
                //'x-email': email,
            },
            body: data//JSON.stringify(data)
        });
    }
}

const fetchWithTokenFile = (endpoint, data, method = 'GET') => {

    const url = `${ baseUrl }/${ endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'Authorization': `Bearer `+token,
                'responseType': 'blob'
            },
            body: data
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                //'Content-type': 'multipart/form-data',
                //'x-token': token,
                'Authorization': `Bearer `+token,
                //'x-email': email,
            },
            body: data//JSON.stringify(data)
        });
    }
}

const fetchWithToken2 = (endpoint, data, method = 'GET') => {

    const url = `${ baseUrl }/${ endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'Authorization': `Bearer `+token,
                'Content-type': 'application/json',
            },
            body: data
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                'Authorization': `Bearer `+token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

export {
    fetchWitoutToken,
    fetchWithToken,
    fetchWithToken2,
    fetchWithTokenFile,
    fetchWithTokenRefresh
}