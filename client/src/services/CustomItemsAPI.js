async function fetchWithErrorHandling(url, options) {
    console.log('fetching:', url, options);
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    if (response.status === 204) {  // No content, for DELETE requests
        return null;
    }
    const data = await response.json();
    return data;
}

export const getAllItems = async () => {
    const url = '/api/customitems';
    return await fetchWithErrorHandling(url);
}

export const getItemById = async (id) => {
    const url = `/api/customitems/${id}`;
    return await fetchWithErrorHandling(url);
};

export const createItem = async (itemData) => {
    const url = `/api`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData)
    };
    return await fetchWithErrorHandling(url, options);
};

export const updateItem = async (id, updatedData) => {
    const url = `/api/customitems/edit/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    };
    return await fetchWithErrorHandling(url, options);
};

export const deleteItem = async (id) => {
    const url = `/api/customitems/edit/${id}`;
    const options = {
        method: 'DELETE'
    };
    return await fetchWithErrorHandling(url, options);
};
