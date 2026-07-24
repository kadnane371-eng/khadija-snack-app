import { useState } from "react";
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
import CategoryList from "../components/CategoryList";
import DishCard from "../components/DishCard";
import { plats } from "../data/plats";

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  const filteredPlats = plats.filter((plat) =>
    plat.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header />

      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

      <CategoryList />

      <View style={styles.syncCard}>
        <Text style={styles.syncText}>
          Dernière synchronisation : il y a 2 min
        </Text>
      </View>

      <FlatList
        data={filteredPlats}
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

  syncCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },

  syncText: {
    color: "#666",
    fontSize: 14,
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