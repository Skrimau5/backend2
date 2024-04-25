const Children = require("../models/childrenModel");

/**
 * Creates a children
 *
 * @param {*} req
 * @param {*} res
 */
const childrenPost = (req, res) => {
    let children = new Children();
    children.name = req.body.name;
    children.pin = req.body.pin;
    children.avatar = req.body.avatar;
    children.user = req.body.user;
    children.age = req.body.age

    if (children.name ) {
        children.save()
            .then(savedChildren => {
                res.status(201).json(savedChildren);
            })
            .catch(error => {
                res.status(422).json({ error: 'There was an error saving the children' });
            });
    } else {
        res.status(422).json({ error: 'No valid data provided for children' });
    }
};

/**
 * Get all Childrens
 *
 * @param {*} req
 * @param {*} res
 */
const childrenGet = (req, res) => {
    if (req.query && req.query.id) {
        Children.find({ user: req.query.id })
            .then(childrens => {
                res.json(childrens);
            })
            .catch(err => {
                console.log('error while querying the child', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        res.status(400).json({ error: "Missing 'id' parameter in query" });
    }
};


/**
 * Updates a children
 *
 * @param {*} req
 * @param {*} res
 */
const childrenPatch = (req, res) => {
    // get children by id
    if (req.query && req.query.id) {
        Children.findByIdAndUpdate(req.query.id, req.body, { new: true })
            .then(children => {
                if (!children) {
                    res.status(404).json({ error: "Children doesn't exist" });
                } else {
                    res.json(children);
                }
            })
            .catch(err => {
                console.log('error while updating the children', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        res.status(404).json({ error: "Children doesn't exist" });
    }
};

/**
 * Deletes a children
 *
 * @param {*} req
 * @param {*} res
 */
const childrenDelete = (req, res) => {
    // get children by id
    if (req.query && req.query.id) {
        Children.findByIdAndDelete(req.query.id)
            .then(children => {
                if (!children) {
                    res.status(404).json({ error: "Children doesn't exist" });
                } else {
                    res.status(204).json({});
                }
            })
            .catch(err => {
                console.log('error while deleting the children', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        res.status(404).json({ error: "Children doesn't exist" });
    }
};

const childrenLogin = (req, res) => {
    const { id, pin } = req.query;

    if (id && pin) {
        Children.findOne({ _id: id, pin: pin })
            .then(children => {
                if (!children) {
                    res.status(404).json({ error: "Children doesn't exist" });
                } else {
                    res.json(children);
                }
            })
            .catch(err => {
                console.log('error while querying the children', err);
                res.status(500).json({ error: "Internal server error" });
            });
    } else {
        Children.find()
            .then(childrens => {
                res.json(childrens);
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
    }
};

module.exports = {
    childrenGet,
    childrenPost,
    childrenPatch,
    childrenDelete,
    childrenLogin
}