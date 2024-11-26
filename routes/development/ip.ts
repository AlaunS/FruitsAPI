
import { Router } from "express";
import { check } from "express-validator";
import { ValidateFields } from "../../middlewares/validateFormats";
import { AddIP, DeleteIP } from "../../controllers/Development/IPControllers";

const router = Router();
router.post('/ip/add', [
    check("user", "Introduzca un usuario valido").isLength({ min: 4, max: 20 }),
    check("ip", "Introduzca una ip valida").isLength({ min: 4 }),
    ValidateFields
], AddIP);

router.delete('/ip/del', [
    check("user", "Introduzca un usuario valido").isLength({ min: 4, max: 20 }),
    check("ip", "Introduzca una ip valida").isLength({ min: 4 }),
    ValidateFields
], DeleteIP);

module.exports = router;