const {Schema, model} = require('mongoose');

const PlaylistSchema = Schema({
    guild: String,
    songs: Array
});

module.exports = model('Playlist', PlaylistSchema);