
import { Router } from "express";
import { GetAllFruitsCategories, GetFruits, GetFruitsByCategory } from "../../controllers/Fruits/FruitsController";
import { check } from "express-validator";
import { ValidateFields } from "../../middlewares/validateFormats";
import { CheckSameIP } from "../../middlewares/checkIP";

const router = Router();
router.get('/images/:user', [
    
], GetFruits);

router.get('/category/:user', [
    
    check("category", "Introduzca una categoria valida").isLength({ min: 4 }),
    ValidateFields
], GetFruitsByCategory);

router.get('/categories/:user', [
    
], GetAllFruitsCategories);

module.exports = router;