import usuarioModel from '../db/models/usuario.model.js';
import jwt from 'jsonwebtoken'; // Para crear el token JWT
import bcrypt from  'bcryptjs'; // Para hashear la clave
import { JWT_SECRET } from '../config/config.js'

    const ResponseAPI = {
        msg: "",
        status: "ok", 
        data: [], 
        token: ""
    }

export const loginUser = async (req, res, next) => {

    try{
        //Verificamos si el usuario existe
        const {name, email, password} = req.body;

        const existingUser = await usuarioModel.findOne({email});

        if(!existingUser){
            return res.status(400).json({
                msg: "El correo ingresado no es válido"
            })
        }


        // Verificar si la clave está bien
        console.log("Clave ingresada:", password);
        console.log("Clave del usuario:", existingUser.password);
        if(password != existingUser.password){
            return res.status(401).json({
                msg: "Tu clave es incorrecta"
            })
        }

        // Crear un token JWT
        const token = jwt.sign({
            userId: existingUser._id, 
            name: existingUser.name
        }, JWT_SECRET, {
            expiresIn: '2h'
        })


        // Devolver datos y token al usuario
        ResponseAPI.msg = "Acceso correcto";

        ResponseAPI.data = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            token: token
        };

        return res.status(200).json(ResponseAPI); // ✅ FALTA ESTO

    }catch(e){
        next(e);
    }

}

export const registerUser = async (req, res, next) => {

    try{
         // Traer datos del Body
        const {email, name, password} = req.body;

        // Verificamos si ya existe el usuario
        console.log("Datos del usuario: ", email, name, password);
        const existingUser = await usuarioModel.findOne({email});

        if(existingUser){
            res.status(400).json({
                msg: "El usuario con ese correo ya existe",
            });
        }


        const newUser = new usuarioModel ({
            email,
            name,
            password
        });
        

        await newUser.save();


        // Crear un token JWT
        const token = jwt.sign({
            userId: newUser._id, 
            name: newUser.name
        }, JWT_SECRET, {
            expiresIn: '2h'
        })


        // Devolver todos los datos al usuario
        ResponseAPI.msg = "Usuario registrado correctamente";
        ResponseAPI.data = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        };

        ResponseAPI.token = token;

        return res.status(200).json(ResponseAPI)



    }catch(e){
        next(e);
    }

}

export const getCurrentUser = async (req, res, next) => {

    try{
        const userId = req.user.id; // Asumiendo que el ID del usuario está en req.user.id

        console.log("ID del usuario:", userId);
        // Verificar que el usuario existe
        const user = await usuarioModel.findById(userId).select("-password"); // Ex
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        // Devolver los datos del usuario
        ResponseAPI.msg = "Usuario encontrado";
        ResponseAPI.data = user;

        return res.status(200).json(ResponseAPI);




    }catch(e){
        next(e);
    }

}

