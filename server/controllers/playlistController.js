const   Playlist = require("../models/playlistModel");

/**
 * Creates a playlist
 *
 * @param {*} req
 * @param {*} res
 */
const videoPost = (req, res) => {
  let playlist = new Playlist();

  playlist.name = req.body.name;
  playlist.url  = req.body.url;
  playlist.collection= req.body.collection;

  if (playlist.name && playlist.url&&playlist.collection) {
    playlist.save()
        .then(savedPlaylist => {
            res.status(201).json(savedPlaylist);
        })
        .catch(error => {
            res.status(422).json({ error: 'There was an error saving the playlist' });
        });
} else {
    res.status(422).json({ error: 'No valid data provided for playlist' });
}
};

/**
 * Get all playlists
 *
 * @param {*} req
 * @param {*} res
 */
const videoGet = (req, res) => { 
    if (req.query && req.query.id) {
        Playlist.find({ collection: req.query.id })
            .then(playlists => {
                res.json(playlists);
            })
            .catch(err => {
                console.log('error while querying the playlist', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        res.status(400).json({ error: "Missing 'id' parameter in query" });
    }
};


/**
 * Updates a playlist
 *
 * @param {*} req
 * @param {*} res
 */
const videoPatch = (req, res) => {
    // get playlist by id
    if (req.query && req.query.id) {
        Playlist.findByIdAndUpdate(req.query.id, req.body, { new: true })
            .then(playlist => {
                if (!playlist) {
                    res.status(404).json({ error: "Playlist doesn't exist" });
                } else {
                    res.json(playlist);
                }
            })
            .catch(err => {
                console.log('error while updating the playlist', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        res.status(404).json({ error: "Playlist doesn't exist" });
    }
};

/**
 * Deletes a playlist
 *
 * @param {*} req
 * @param {*} res
 */
const videoDelete = (req, res) => {
    // get playlist by id
    if (req.query && req.query.id) {
        Playlist.findByIdAndDelete(req.query.id)
            .then(playlist => {
                if (!playlist) {
                    res.status(404).json({ error: "Playlist doesn't exist" });
                } else {
                    res.status(204).json({});
                }
            })
            .catch(err => {
                console.log('error while deleting the playlist', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        res.status(404).json({ error: "Playlist doesn't exist" });
    }
};

module.exports = {
  videoGet,
  videoPost,
  videoPatch,
  videoDelete
}