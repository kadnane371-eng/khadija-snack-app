import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { useState } from "react";

export default function AddScreen() {
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [categorie, setCategorie] = useState("");
  const [disponible, setDisponible] = useState(true);

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

        <Switch
          value={disponible}
          onValueChange={setDisponible}
        />
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Enregistrer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton}>
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
    marginBottom: 30,
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