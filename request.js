const { connection } = require("./db");
const { sendResponse, sendError } = require("./response");

// Fungsi untuk mengambil seluruh data dari tabel songs, artists, dan albums
const getAllData = (req, res) => {
  const fetchData = (tableName) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${tableName}`, (error, results) => {
        if (error) {
          console.error(
            `Error executing query for ${tableName}: ` + error.stack
          );
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  };

  Promise.all([fetchData("songs"), fetchData("artists"), fetchData("albums")])
    .then(([songs, artists, albums]) => {
      sendResponse(res, { songs, artists, albums });
    })
    .catch((error) => {
      console.error("Error fetching data: " + error);
      sendError(res, 500, "Internal server error");
    });
};

// Fungsi untuk mengambil data lagu dari tabel songs
const getAllSongs = (req, res) => {
  connection.query("SELECT * FROM songs", (error, results) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      sendError(res, 500, "Internal server error");
      return;
    }
    sendResponse(res, {
      data: "Songs",
      results,
      message: "Songs fetched successfully",
    });
  });
};

// Fungsi untuk mengambil data lagu dari tabel artists
const getAllArtists = (req, res) => {
  connection.query("SELECT * FROM artists", (error, results) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      sendError(res, 500, "Internal server error");
      return;
    }
    sendResponse(res, {
      data: "Artists",
      results,
      message: "Songs fetched successfully",
    });
  });
};

// Fungsi untuk mengambil data lagu dari tabel albums
const getAllAlbums = (req, res) => {
  connection.query("SELECT * FROM albums", (error, results) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      sendError(res, 500, "Internal server error");
      return;
    }
    sendResponse(res, {
      data: "Albums",
      results,
      message: "Songs fetched successfully",
    });
  });
};

// Fungsi untuk mengambil seluruh data berdasar nama artists
const getArtistsByName = (artistName, res) => {
  const sql = `SELECT * FROM artists where name = '${artistName}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      sendError(res, 500, "Internal server error");
      return;
    }
    sendResponse(res, result, "Data artists");
  });
};

// Fungsi untuk menambah data artists
const addArtists = (table, data, res) => {
  const values = Object.values(data);

  // Check if any value is null
  if (values.some((val) => val === null)) {
    sendError(res, 400, "Null values are not allowed");
    return;
  }

  const keys = Object.keys(data);
  const sql = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${values
    .map((val) => `'${val}'`)
    .join(", ")})`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      sendError(res, 500, "Internal server error");
      return;
    }
    sendResponse(res, result, "Data added successfully");
  });
};

// Fungsi untuk menambah data albums
const addAlbum = (data, res) => {
  const { title, artist_id } = data;
  const sql = `INSERT INTO albums (title, artist_id) VALUES (?, ?)`;
  connection.query(sql, [title, artist_id], (err, result) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      sendError(res, 500, "Internal server error");
      return;
    }
    sendResponse(res, result, "Album added successfully");
  });
};

// Fungsi untuk menambah data songs
const addSong = (data, res) => {
  const { title, artist_id, album_id, audio_url } = data;
  const sql = `INSERT INTO songs (title, artist_id, album_id, audio_url) VALUES (?, ?, ?, ?)`;
  connection.query(
    sql,
    [title, artist_id, album_id, audio_url],
    (err, result) => {
      if (err) {
        console.error("Error executing query: " + err.stack);
        sendError(res, 500, "Internal server error");
        return;
      }
      sendResponse(res, result, "Song added successfully");
    }
  );
};

const deleteSong = (req, res) => {
  const songId = req.params.id;

  connection.query(
    "DELETE FROM songs WHERE id = ?",
    [songId],
    (error, results) => {
      if (error) {
        console.error("Error executing query: " + error.stack);
        sendError(res, 500, "Internal server error");
        return;
      }
      if (results.affectedRows === 0) {
        sendError(res, 404, "Song not found");
        return;
      }
      sendResponse(res, { message: "Song deleted successfully" });
    }
  );
};

module.exports = {
  getAllSongs,
  getAllArtists,
  getAllAlbums,
  getAllData,
  getArtistsByName,
  addAlbum,
  addArtists,
  addSong,
  deleteSong,
};
