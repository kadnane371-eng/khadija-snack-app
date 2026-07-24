import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DishCard({ plat }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: plat.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{plat.nom}</Text>

        <Text style={styles.category}>{plat.categorie}</Text>

        <Text style={styles.price}>{plat.prix} DH</Text>

        <View style={styles.footer}>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons
                name="create-outline"
                size={22}
                color="#FF8C00"
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

          <View style={styles.rightSide}>
            <Switch value={plat.disponible} />

            <Text
              style={[
                styles.badge,
                {
                  color: plat.disponible ? "#16A34A" : "#DC2626",
                },
              ]}
            >
              {plat.disponible ? "Disponible" : "Indisponible"}
            </Text>
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
  },

  category: {
    color: "#666",
    marginTop: 5,
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

  actions: {
    flexDirection: "row",
  },

  iconButton: {
    marginRight: 15,
  },

  rightSide: {
    alignItems: "center",
  },

  badge: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 12,
  },
});