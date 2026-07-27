import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlat } from "../services/platService";

export default function AddScreen() {
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [categorie, setCategorie] = useState("");
  const [disponible, setDisponible] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();

  const createPlatMutation = useMutation({
    mutationFn: async (payload) => createPlat(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["plats"] });
      router.back();
    },
    onError: (error) => {
      setErrorMessage(error?.response?.data?.message || "Échec de l’enregistrement");
    },
  });

  const handleSave = () => {
    setErrorMessage("");

    if (!nom.trim() || !categorie.trim() || !prix) {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    createPlatMutation.mutate({
      nom: nom.trim(),
      prix: Number(prix),
      categorie: categorie.trim(),
      disponible,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un plat</Text>

      <TextInput
        placeholder="Nom du plat"
        style={styles.input}
        value={nom}
        onChangeText={setNom}
      />

      <TextInput
        placeholder="Prix"
        keyboardType="numeric"
        style={styles.input}
        value={prix}
        onChangeText={setPrix}
      />

      <TextInput
        placeholder="Catégorie"
        style={styles.input}
        value={categorie}
        onChangeText={setCategorie}
      />

      <View style={styles.switchContainer}>
        <Text>Disponible</Text>

        <Switch value={disponible} onValueChange={setDisponible} />
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        disabled={createPlatMutation.isPending}
      >
        <Text style={styles.saveText}>
          {createPlatMutation.isPending ? "Enregistrement..." : "Enregistrer"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Annuler</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F3",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  errorText: {
    color: "#d32f2f",
    marginBottom: 12,
  },

  saveButton: {
    backgroundColor: "#FF8C00",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  cancelButton: {
    borderWidth: 1,
    borderColor: "#FF8C00",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  cancelText: {
    color: "#FF8C00",
    fontWeight: "bold",
    fontSize: 16,
  },
});