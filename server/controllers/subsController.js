const Sub = require("../models/subsModel");

/**
 * Crea una subcolección
 *
 * @param {*} req
 * @param {*} res
 */
const subPost = (req, res) => {
    let sub = new Sub();
    sub.collection = req.body.collection;
    sub.children = req.body.children;
    if (sub.collection && sub.children) {
        sub.save()
            .then((savedSub) => {
                res.status(201).json(savedSub); // CREATED
            })
            .catch((err) => {
                res.status(422).json({ error: 'There was an error saving the subcollection' });
            });
    } else {
        res.status(422).json({ error: 'No valid data provided for subcollection' });
    }
};

/**
 * Obtiene subcolecciones mediante el id de la colección
 *
 * @param {*} req
 * @param {*} res
 */
const subGet = async (req, res) => {
    try { 
        const collectionId = req.query.collectionId;

        // Verificar si se proporcionó el ID de colección en la consulta
        if (!collectionId) {
            return res.status(400).json({ error: "Collection ID is required" });
        }

        // Buscar todas las subcolecciones que pertenecen a la colección con el ID proporcionado
        const subs = await Sub.find({ collection: collectionId });

        res.status(200).json(subs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Actualiza una subcolección existente
 *
 * @param {*} req
 * @param {*} res
 */
const subPatch = async (req, res) => {
    try {
        const updateFields = req.body;

        const updatedSub = await Sub.findByIdAndUpdate(req.query.id, updateFields, { new: true });

        if (!updatedSub) {
            return res.status(404).json({ error: 'Subcollection not found' });
        }

        res.status(200).json(updatedSub);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Elimina una subcolección existente
 *
 * @param {*} req
 * @param {*} res
 */
const subDelete = async (req, res) => {
    try {
        const deletedSub = await Sub.findByIdAndDelete(req.query.id);

        if (!deletedSub) {
            return res.status(404).json({ error: 'Subcollection not found' });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    subGet,
    subPost,
    subPatch,
    subDelete
};
