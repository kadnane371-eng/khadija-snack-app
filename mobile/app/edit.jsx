import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlat, updatePlat } from "../services/platService";

export default function EditScreen() {
  const params = useLocalSearchParams();
  const platId = params.platId?.toString();
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [categorie, setCategorie] = useState("");
  const [disponible, setDisponible] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();

  const { data: plat, isLoading } = useQuery({
    queryKey: ["plat", platId],
    queryFn: async () => {
      const response = await getPlat(platId);
      return response.data;
    },
    enabled: Boolean(platId),
  });

  useEffect(() => {
    if (plat) {
      setNom(plat.nom || "");
      setPrix(String(plat.prix ?? ""));
      setCategorie(plat.categorie || "");
      setDisponible(Boolean(plat.disponible));
    }
  }, [plat]);

  const updatePlatMutation = useMutation({
    mutationFn: async (payload) => updatePlat(platId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["plats"] });
      await queryClient.invalidateQueries({ queryKey: ["plat", platId] });
      router.back();
    },
    onError: (error) => {
      setErrorMessage(error?.response?.data?.message || "Échec de la mise à jour");
    },
  });

  const handleSave = () => {
    setErrorMessage("");

    if (!platId || !nom.trim() || !categorie.trim() || !prix) {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    updatePlatMutation.mutate({
      nom: nom.trim(),
      prix: Number(prix),
      categorie: categorie.trim(),
      disponible,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier un plat</Text>

      <TextInput style={styles.input} value={nom} onChangeText={setNom} />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={prix}
        onChangeText={setPrix}
      />

      <TextInput style={styles.input} value={categorie} onChangeText={setCategorie} />

      <View style={styles.switchContainer}>
        <Text>Disponible</Text>

        <Switch value={disponible} onValueChange={setDisponible} />
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        disabled={updatePlatMutation.isPending}
      >
        <Text style={styles.saveText}>
          {updatePlatMutation.isPending ? "Mise à jour..." : "Mettre à jour"}
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