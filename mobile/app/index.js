import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

import DishCard from "../components/DishCard";
import { plats } from "../data/plats";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <SearchBar />

<View
  style={{
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  }}
>
  <Text style={{ color: "#666" }}>
    Dernière synchronisation : il y a 2 min
  </Text>
</View>

      <FlatList
        data={plats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DishCard plat={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add")}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F3",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
  },

  sync: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },

  fab: {
    position: "absolute",
    bottom: 25,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF8C00",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});