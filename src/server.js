import express from "express";
import * as dotenv from "dotenv";

import actions from "./actions.js";

const app = express();

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const port = process.env.PORT ?? 8000;

app.use(express.json());
const router = express.Router();
router.get('/test', actions.test);
router.get('/rovers', actions.getRovers);
router.get('/rovers/:roverName/photos/:cameraType', actions.getRoverPhotos);
app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
})
