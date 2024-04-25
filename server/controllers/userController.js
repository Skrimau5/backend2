const User = require("../models/userModel");

/**
 * Creates a user
 *
 * @param {*} req
 * @param {*} res
 */
const userPost = (req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = req.body.password;
    user.pin = req.body.pin;
    user.country = req.body.country;
    user.fechaNacimiento = req.body.fechaNacimiento;
    user.telefono = req.body.telefono;
    user.status = req.body.status;

    if (
        user.name &&
        user.lastname &&
        user.email &&
        user.password &&
        user.pin &&
        user.fechaNacimiento&&
        user.telefono&&
        user.status
    ) {
        // Calcular la edad del usuario a partir de la fecha de nacimiento
        let birthDate = new Date(user.fechaNacimiento);
        let today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        let month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // Verificar si el usuario tiene al menos 18 años
        if (age < 18) {
            return res.status(422).json({ error: 'You must be at least 18 years old to register' });
        }

        // Guardar el usuario en la base de datos
        user.save()
            .then((savedUser) => {
                res.status(201).json(savedUser); // CREATED
            })
            .catch((err) => {
                res.status(422).json({ error: 'There was an error saving the user' });
            });
    } else {
        res.status(422).json({ error: 'No valid data provided for user' });
    }
};


/**
 * Creates a user
 *
 * @param {*} req
 * @param {*} res
 */
const activateUser = (req, res) => {

    User.findByIdAndUpdate(req.query.id, { status: 'Activo' }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(updatedUser);
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal server error' });
        });
};



/**
 * Get all users
 *
 * @param {*} req
 * @param {*} res
 */
const userGet = async (req, res) => {
    try {
        const { email, password } = req.query; // Usa req.query para obtener los parámetros de la cadena de consulta

        // Verificar si se proporcionaron correo electrónico y contraseña
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Buscar usuario por correo electrónico
        const user = await User.findOne({ email });

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Verificar si la contraseña es correcta
        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Si el usuario y la contraseña son correctos, devolver el usuario
        return res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const loginGet = async (req, res) => {
    try {
        const { _id, pin } = req.query; 
        if (!_id || !pin) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ _id });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.pin !== pin) {
            return res.status(401).json({ error: "Invalid password" });
        }
        return res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    userGet,
    activateUser,
    userPost,
    loginGet
  }