"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckRol = void 0;
const CheckRol = (req, res, next) => {
    const arrRols = ["Simple", "Avanzado"];
    const { rol } = req.body;
    for (let i = 0; i < arrRols.length; i++) {
        if (arrRols[i] === rol) {
            return next();
        }
    }
    return res.status(500).json({
        status: 500,
        msg: "Error en la validacion de roles",
    });
};
exports.CheckRol = CheckRol;
