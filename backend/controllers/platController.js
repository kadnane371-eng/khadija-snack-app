const { Plat } = require("../models");

const validatePlat = (body) => {
  if (!body || typeof body !== "object") return { error: "Données invalides" };
  const nom = String(body.nom || "").trim();
  const categorie = String(body.categorie || "").trim();
  const prix = Number(body.prix);
  if (!nom || !categorie || Number.isNaN(prix) || prix <= 0) {
    return { error: "Nom, catégorie et prix valide sont requis" };
  }
  return { data: { nom, categorie, prix, disponible: body.disponible !== false } };
};

const getAllPlats = async (req, res) => {
  try {
    const plats = await Plat.findAll({ order: [["createdAt", "DESC"]] });
    res.status(200).json(plats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlatById = async (req, res) => {
  try {
    const plat = await Plat.findByPk(req.params.id);
    if (!plat) return res.status(404).json({ message: "plat introuvable" });
    res.status(200).json(plat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPlat = async (req, res) => {
  const result = validatePlat(req.body);
  if (result.error) return res.status(400).json({ message: result.error });
  try {
    const plat = await Plat.create(result.data);
    res.status(201).json(plat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePlat = async (req, res) => {
  const result = validatePlat(req.body);
  if (result.error) return res.status(400).json({ message: result.error });
  try {
    const plat = await Plat.findByPk(req.params.id);
    if (!plat) return res.status(404).json({ message: "plat introuvable" });
    await plat.update(result.data);
    res.status(200).json(plat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePlat = async (req, res) => {
  try {
    const plat = await Plat.findByPk(req.params.id);
    if (!plat) return res.status(404).json({ message: "plat introuvable" });
    await plat.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllPlats, getPlatById, createPlat, updatePlat, deletePlat };
