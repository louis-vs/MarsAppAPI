import provider from './nasa_provider.js';

const getRovers = async (request, response) => {
    response.send(await provider.rovers());
};

const getRoverPhotos = async (request, response) => {
    response.send(await provider.photos(request.params.roverName, request.params.cameraType));
};

const test = async (request, response) => {
    response.send('Hello, world!');
}

export default { getRovers, getRoverPhotos, test };
