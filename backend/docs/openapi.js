const openApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "Hamid Snack API",
    version: "1.0.0",
    description: "API de gestion du menu du snack de Hamid",
  },
  servers: [{ url: "http://localhost:3000", description: "Serveur local" }],
  paths: {
    "/api/plats": {
      get: {
        summary: "Lister tous les plats",
        responses: { 200: { description: "Liste des plats" } },
      },
      post: {
        summary: "Ajouter un nouveau plat",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nom", "prix", "categorie"],
                properties: {
                  nom: { type: "string" },
                  prix: { type: "number" },
                  categorie: { type: "string" },
                  disponible: { type: "boolean" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Plat créé" }, 400: { description: "Données invalides" } },
      },
    },
    "/api/plats/{id}": {
      get: {
        summary: "Récupérer un plat",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Plat trouvé" }, 404: { description: "Plat introuvable" } },
      },
      put: {
        summary: "Modifier un plat",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Plat modifié" }, 404: { description: "Plat introuvable" } },
      },
      delete: {
        summary: "Supprimer un plat",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 204: { description: "Plat supprimé" }, 404: { description: "Plat introuvable" } },
      },
    },
  },
};

module.exports = openApiSpec;