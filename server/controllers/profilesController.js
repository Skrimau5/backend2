const Profile = require("../models/profileModel");

/**
 *
 * @param {*} req
 * @param {*} res
 */
const profilePost = (req, res) => {
    let profile = new Profile();
    profile.name = req.body.name;
    profile.pin = req.body.pin;
    profile.avatar = req.body.avatar;
    profile.user = req.body.user;
    profile.age = req.body.age

    if (profile.name ) {
        profile.save()
            .then(savedProfile => {
                res.status(201).json(savedProfile);
            })
            .catch(error => {
                res.status(422).json({ error: 'There was an error saving the profile' });
            });
    } else {
        res.status(422).json({ error: 'No valid data provided for profile' });
    }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const profileGet = (req, res) => {
    if (req.query && req.query.id) {
        Profile.find({ user: req.query.id })
            .then(profiles => {
                res.json(profiles);
            })
            .catch(err => {
                console.log('error while querying the profile', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        res.status(400).json({ error: "Missing 'id' parameter in query" });
    }
};

/**
 * Deletes a profile
 *
 * @param {*} req
 * @param {*} res
 */
const profileDelete = (req, res) => {
    if (req.query && req.query.id) {
        Profile.findByIdAndDelete(req.query.id)
            .then(profile => {
                if (!profile) {
                    res.status(404).json({ error: "Profile doesn't exist" });
                } else {
                    res.status(204).json({});
                }
            })
            .catch(err => {
                console.log('error while deleting the profile', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        res.status(404).json({ error: "Profile doesn't exist" });
    }
};

/**
 * Login a profile
 *
 * @param {*} req
 * @param {*} res
 */
const profileLogin = (req, res) => {
    const { id, pin } = req.query;

    if (id && pin) {
        Profile.findOne({ _id: id, pin: pin })
            .then(profile => {
                if (!profile) {
                    res.status(404).json({ error: "Profile doesn't exist" });
                } else {
                    res.json(profile);
                }
            })
            .catch(err => {
                console.log('error while querying the profile', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        Profile.find()
            .then(profiles => {
                res.json(profiles);
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    }
};


/**
 * Updates a profile
 *
 * @param {*} req
 * @param {*} res
 */
const profilePatch = (req, res) => {
    if (req.query && req.query.id) {
        Profile.findByIdAndUpdate(req.query.id, req.body, { new: true })
            .then(profile => {
                if (!profile) {
                    res.status(404).json({ error: "Profile doesn't exist" });
                } else {
                    res.json(profile);
                }
            })
            .catch(err => {
                console.log('error while updating the profile', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        res.status(404).json({ error: "Profile doesn't exist" });
    }
};



module.exports = {
    profileGet,
    profilePost,
    profilePatch,
    profileDelete,
    profileLogin
}