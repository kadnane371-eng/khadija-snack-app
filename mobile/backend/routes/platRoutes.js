const express = require("express");
const router = express.Router();

const {
    getAllPlats,
    getPlatById,
    createPlat,
    updatePlat,
    deletePlat,
} = require("../controllers/platController");

router.get("/",getAllPlats);

router.get("/:id",getPlatById);

router.post("/",createPlat);

router.put("/:id",updatePlat);

router.delete("/:id",deletePlat);

module.exports = router;