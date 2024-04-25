const Collection = require("../models/collectionModel");

/**
 * Crea una colección
 *
 * @param {*} req
 * @param {*} res
 */
const collectionPost = (req, res) => {
    let collection = new Collection();
    collection.name = req.body.name;
    collection.user = req.body.user;
    collection.videos = req.body.videos;
    if (collection.name &&collection.user) {
        
        collection.save()
            .then((savedCollection) => {
                res.status(201).json(savedCollection); // CREATED
            })
            .catch((err) => {
                res.status(422).json({ error: 'There was an error saving the collection' });
            });
    } else {
        res.status(422).json({ error: 'No valid data provided for collection' });
    }
};

/**
 * Busca colleción mediante el id del usuario
 *
 * @param {*} req
 * @param {*} res
 */
const collectionGet = async (req, res) => {
    try { 
        const userId = req.query.userId;

        // Verificar si se proporcionó el ID de usuario en la consulta
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Buscar todas las colecciones que pertenecen al usuario con el ID proporcionado
        const collections = await Collection.find({ user: userId });

        res.status(200).json(collections);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Actualiza una colección existente
 *
 * @param {*} req
 * @param {*} res
 */
const collectionPatch = async (req, res) => {
    try {
        const updateFields = req.body;

        const updatedCollection = await Collection.findByIdAndUpdate(req.query.id, updateFields, { new: true });

        if (!updatedCollection) {
            return res.status(404).json({ error: 'Collection not found' });
        }

        res.status(200).json(updatedCollection);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Elimina una colección existente
 *
 * @param {*} req
 * @param {*} res
 */
const collectionDelete = async (req, res) => {
    try {

        const deletedCollection = await Collection.findByIdAndDelete(req.query.id);

        if (!deletedCollection) {
            return res.status(404).json({ error: 'Collection not found' });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    collectionGet,
    collectionPost,
    collectionPatch,
    collectionDelete
};
