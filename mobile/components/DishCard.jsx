import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function DishCard({ plat }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: plat.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{plat.nom}</Text>

        <Text style={styles.category}>{plat.categorie}</Text>

        <Text style={styles.price}>{plat.prix} DH</Text>

        <View style={styles.footer}>
          <Text style={styles.badge}>
            {plat.disponible ? "✅ Disponible" : "❌ Indisponible"}
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push("/edit")}
            >
              <Ionicons
                name="create-outline"
                size={22}
                color="#2196F3"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton}>
              <Ionicons
                name="trash-outline"
                size={22}
                color="#E53935"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 170,
  },

  info: {
    padding: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },

  category: {
    color: "#666",
    marginTop: 5,
    fontSize: 14,
  },

  price: {
    color: "#FF8C00",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },

  footer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  badge: {
    fontWeight: "bold",
    color: "#2E7D32",
  },

  actions: {
    flexDirection: "row",
  },

  iconButton: {
    marginLeft: 12,
  },
});