import express from "express"
import { getAllCars, getCarById, addCar, deleteCar, updateCar} from '../Controllers/cars.js'
import authToken from '../middlewares/authToken.js'

const router = express.Router();

router.use('/', (req, res, next) => {
    console.log('enter to the cars modules file...');
    next()
});

// router.use('/', (req, res) => {
//     if (req.query.search)
//         getAllCars(req, res);
//     else
//         getAllCarsSortesByCompany(req, res)
// })

router.get('/', getAllCars);
router.get('/:idGet', getCarById);
router.post('/',authToken, addCar)
router.delete('/:idDelete',authToken, deleteCar)
router.put('/:idUpdate',authToken, updateCar)

router.use('/', (req, res) => {
    res.status(400).send("oops,\n the page not found")
})

export default router;