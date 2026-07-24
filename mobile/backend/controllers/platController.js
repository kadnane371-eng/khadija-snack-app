const { Plat } = require("../models");

const getAllPlats = async (req, res) => {
    try {
        const plats = await Plat.findAll();
        res.status(200).json(plats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPlatById = async (req, res) => {
    try{
        const plat = await Plat.findByPk(req.params.id);

        if (!plat) {
            return res.status(404).json({ message: "plat introuvable"});
        }

        res.status(200).json(plat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPlat = async (req,res) => {
    try{
        const plat = await Plat.create(req.body);
         res.status(201).json(plat);
        } catch (error) {
        res.status(400).json({ message: error.message});
        }
    };

    const updatePlat = async (req,res) => {
        try{
            const plat = await Plat.findByPk(req.params.id);

            if (!plat) {
                return res.status(404).json({ message: "plat intouvable"});
            }
            await plat.update(req.body);

            res.status(200).json(plat);

        } catch (error) {
            res.status(400).json({ message: error.message});
        }
    };

    const deletePlat = async ( req,res) => {
        try {
            const plat = await Plat.findByPk(req.params.id);

            if (!plat) {
                return res.status(404).json({message: "plat introuvable"});
            }
            await plat.destroy();

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        } 
        };
 
        module.exports = {
            getAllPlats,
            getPlatById,
            createPlat,
            updatePlat,
            deletePlat,
        };

