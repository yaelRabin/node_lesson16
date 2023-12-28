import mongoose from "mongoose";
import { CarModel } from "../Models/cars.js";

//---getAll
async function getAllCars(req, res) {
    try {
        let page = req.query.page || 1
        let perPage = req.query.perPage || 15
        let { company, year } = req.query
        let companyFilter = new RegExp(company)
        let filter = {}
        if (company)
            filter.company = companyFilter
        if (year)//----
            filter.year = year
        let allCars = await CarModel.find(filter).skip(perPage*(page-1)).limit(perPage);
        res.json(allCars)
    }
    catch (err) {
        res.status(404).send('sorry, we cant provide you the information from the dataBase \n Error:' + err.message)
    }

}
//----getById
async function getCarById(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.idGet))
            return res.status(400).send('id is not valid')
        let car = await CarModel.findById(req.params.idGet)
        if (!car)
            return res.status(404).send('there is no car with such id')
        res.json(car)
    }
    catch (err) {
        res.status(404).send('sorry, we cant provide you the information from the dataBase. \n Error:' + err.message)
    }
}
//----post
async function addCar(req, res) {
    try {
        let { company, price, km, year } = req.body;
        if (!company || !price)
            return res.status(404).send('company and price are required fields!!')
        let sameCar = await CarModel.find({ company, price })// לא יכול להיות שני רכבים של אותה חברה עם אותו מחיר
        if (sameCar.length > 0)
            return res.status(409).send("לחברה זו כבר יש רכב במחיר זה")
        let newCar = new CarModel({ company, price, km, year })
        await newCar.save();
        res.json(newCar);
    }
    catch (err) {
        res.status(400).send("sorry, there is an error, we cant add this car.\n error: " + err.message)
    }
}
//----delete
async function deleteCar(req, res) {
    try {
        let { idDelete } = req.params;
        if (!mongoose.isValidObjectId(idDelete))
            return res.status(400).send("id is not valid");
        let car = await CarModel.findByIdAndDelete(idDelete);
        if (!car)
            return res.status(404).send("there is no car with such id");
        res.json(car);
    }
    catch (err) {
        res.status(400).send("sorry, there is an error, we cant delete this car.\n error: " + err.message)
    }
}
//----put
async function updateCar(req, res) {
    try {
        let { idUpdate } = req.params;
        if (!mongoose.isValidObjectId(idUpdate))
            return res.status(400).send('id is not valid');
        let car = await CarModel.findById(idUpdate)
        if (!car)
            return res.status(404).send('there is no car with such id')
        if (!req.body)
            return res.status(404).send('you didnt send fiels to update')
        await CarModel.findByIdAndUpdate(idUpdate, req.body)
        let carAfterUpdate = await CarModel.findById(idUpdate)
        res.json(carAfterUpdate);
    }
    catch (err) {
        res.status(400).send("sorry, there is an error, we cant update this car.\n error: " + err.message)
    }
}



export { getAllCars, getCarById, addCar, deleteCar, updateCar };