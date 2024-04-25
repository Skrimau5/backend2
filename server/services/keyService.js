/**
 * @param {*} req
 * @param {*} res
 */

const keyGet = (req, res) => {
    const generateRandomKey = () => {
        const min = 100000; 
        const max = 999999; 
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    try {
        const key = generateRandomKey();
        res.status(200).json({ key });
    } catch (error) {
        res.status(500).json({ error: 'Error al generar la clave.' });
    }
}

module.exports = keyGet;