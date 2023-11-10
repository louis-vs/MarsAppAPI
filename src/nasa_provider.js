import axios from "axios";

const createRequest = (path, params) => {
    let request = `${process.env.MARS_PHOTOS_URL}${path}`;

    if (!params) {
        params = {};
    }
    params.api_key = process.env.API_KEY;

    request += '?';
    for (const [key, value] of Object.entries(params)) {
        request += `${key}=${value}&`
    }

    return request;
};

const rovers = async () => {
    let response = undefined;
    try {
        response = await axios.get(createRequest('/rovers'));
    } catch (e) {
        console.error(e);
    }

    return response.data;
};

const photos = async (roverName, cameraType) => {
    let response = undefined;
    try {
        const requestParams = {
            camera: cameraType,
            sol: 1000,
        }
        const request = createRequest(`/rovers/${roverName}/photos`, requestParams);
        response = await axios.get(request);
    } catch (e) {
        console.error(e);
    }

    const filteredData = response.data.photos.map((photo) => {
        return {
            id: photo.id,
            imgSrc: photo.img_src,
            date: photo.earth_date,
            rover: photo.rover.name,
        }
    });

    return filteredData;
}


export default { rovers, photos };
