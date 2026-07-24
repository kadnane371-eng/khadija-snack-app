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

export default function EditScreen() {
  const [nom, setNom] = useState("Burger Maison");
  const [prix, setPrix] = useState("45");
  const [categorie, setCategorie] = useState("Burger");
  const [disponible, setDisponible] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier un plat</Text>

      <TextInput
        style={styles.input}
        value={nom}
        onChangeText={setNom}
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={prix}
        onChangeText={setPrix}
      />

      <TextInput
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
        <Text style={styles.saveText}>Mettre à jour</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
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