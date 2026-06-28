import express from "express";
import cors from "cors";
import { getRandomFilm } from "./randomFilm/getRandomFilm";

const app = express();

const STUB_PORT = Number(process.env.STUB_PORT ?? 3001);

app.use(cors()).use(express.json()).use(getRandomFilm);

app.listen(STUB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Stub server running on http://localhost:${STUB_PORT}`);
});
