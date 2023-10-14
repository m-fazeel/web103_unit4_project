const API_URL = '/api/componentoptions';

export const getComponentOptions = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching component options:', error);
        throw error;
    }
};
