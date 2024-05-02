let GOOGLE_MAPS_API_KEY = '';

if (typeof window === 'undefined') {
    const dotenv = require('dotenv');
    dotenv.config();
    GOOGLE_MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;
} else {
    GOOGLE_MAPS_API_KEY = import.meta.env.REACT_APP_MAPS_API_KEY;
}

export const mapOptions = {
    googleMapApiKey: GOOGLE_MAPS_API_KEY
};

