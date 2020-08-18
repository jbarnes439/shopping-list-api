const BASE_URL = 'https://thinkful-list-api.herokuapp.com/josh';

const listApiFetch = function(...args) {
    //set up a variable in scope, outside of promise chain.
    let error;
    return fetch(...args)
        .then(res => {
            if (!res.ok) {
                //if the response is not a 200 code, build error object
                error = { code: res.status };

                // if the response is not JSON type, place statusText in error object
                // and reject the promise
                if (!res.headers.get('context-type').includes('json')) {
                    error.message = res.statusText;
                    return Promise.reject(error);
                }
            }
            // if no errors return parsed JSON
            return res.json();
        })
        .then(data => {
            // if error exists, place the JSON message into the error object and 
            // reject the Promise with your error object so it lands in the next 
            // catch.  IMPORTANT: Check how the API sends errors -- not all APIs
            // will respond with a JSON object containing message key
            if (error) {
                error.message = data.message;
                return Promise.reject(error);
            }
            // if no errors, return the json as normal resolved Promise
            return data;
        });
};



const getItems = function() {
    return listApiFetch(`${BASE_URL}/items`);
};

const createItem = function(name) {
    const newItem = JSON.stringify({ name });

    return listApiFetch(`${BASE_URL}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newItem
    });
};

const updateItem = function(id, updateData) {
    const newData = JSON.stringify(updateData);
    return listApiFetch(`${BASE_URL}/items/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: newData
    });
};

const deleteItem = function(id) {
    return listApiFetch(`${BASE_URL}/items/${id}`, {
        method: 'DELETE',
    });
};

export default {
    getItems,
    createItem,
    updateItem,
    deleteItem
};