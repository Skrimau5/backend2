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

    if (
        user.name &&
        user.lastname &&
        user.email &&
        user.password &&
        user.pin &&
        user.fechaNacimiento
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
 * Get all users
 *
 * @param {*} req
 * @param {*} res
 */
const userGet = async (req, res) => {
    try {
        const { email, password } = req.body;
        // // Verificar si se proporcionaron correo electrónico y contraseña
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Buscar usuario por correo electrónico
        const user = await User.findOne({ email });

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // // Verificar si la contraseña es correcta
        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid password" });
        }else{
            return res.status(200), res.json(user);
        }

        
        
    } catch (err) {
        res.status(500).json({ error: err.messag});
    }
};
module.exports = {
    userGet,
    userPost
  }