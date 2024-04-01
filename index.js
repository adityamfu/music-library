const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./db");
const {
  getAllSongs,
  getAllArtists,
  getAllAlbums,
  getAllData,
  getArtistsByName,
  addArtists,
  addAlbum,
  addSong,
  deleteSong,
} = require("./request");
const path = require("path");

const app = express();
const port = 3000;
app.use(bodyParser.json());

connectDB();

app.get("/", getAllData);
app.get("/songs", getAllSongs);
app.get("/artists", getAllArtists);
app.get("/albums", getAllAlbums);

app.get("/music/:artists", (req, res) => {
  const artistName = req.params.artists;
  getArtistsByName(artistName, res);
});

app.post("/artists", (req, res) => {
  const data = req.body;
  addArtists("artists", data, res);
});
app.post("/albums", (req, res) => {
  const data = req.body;
  addAlbum(data, res);
});
app.post("/music", (req, res) => {
  const data = req.body;
  addData(data, res);
});
app.post("/songs", (req, res) => {
  const data = req.body;
  addSong(data, res);
});

app.delete("/songs/:id", deleteSong);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
