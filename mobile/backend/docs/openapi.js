const openApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "Hamid Snack API",
    version: "1.0.0",
    description: "API de gestion du menu du snack de Hamid",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Serveur local",
    },
  ],
  paths: {
    "/api/plats": {
      get: {
        summary: "Lister tous les plats",
        responses: {
          200: {
            description: "Liste des plats",
          },
        },
      },
      post: {
        summary: "Ajouter un nouveau plat",
        responses: {
          201: {
            description: "Plat créé avec succès",
          },
        },
      },
    },
    "/api/plats/{id}": {
      get: {
        summary: "Récupérer un plat par son ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Plat trouvé",
          },
          404: {
            description: "Plat introuvable",
          },
        },
      },
      put: {
        summary: "Modifier un plat",
        responses: {
          200: {
            description: "Plat modifié",
          },
        },
      },
      delete: {
        summary: "Supprimer un plat",
        responses: {
          204: {
            description: "Plat supprimé",
          },
        },
      },
    },
  },
};

module.exports = openApiSpec;