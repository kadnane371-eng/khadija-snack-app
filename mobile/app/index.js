import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CategoryList from "../components/CategoryList";
import DishCard from "../components/DishCard";
import { useQuery } from "@tanstack/react-query";
import { getPlats } from "../services/platService";
import { PLATS_CACHE_KEY, LAST_SYNC_KEY } from "../services/syncTask";

function formatRelativeTime(isoString) {
  if (!isoString) return "Jamais";
  const diffMs = new Date() - new Date(isoString);
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "À l'instant";
  return `il y a ${diffMins} min`;
}

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [relativeTime, setRelativeTime] = useState("Jamais");

  const {
    data = { plats: [], isOffline: false, lastSync: null },
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["plats"],
    queryFn: async () => {
      try {
        const response = await getPlats();
        const platsData = response.data;
        
        // Save to cache
        await AsyncStorage.setItem(PLATS_CACHE_KEY, JSON.stringify(platsData));
        const now = new Date().toISOString();
        await AsyncStorage.setItem(LAST_SYNC_KEY, now);
        
        return { plats: platsData, isOffline: false, lastSync: now };
      } catch (error) {
        console.warn("API request failed, loading from cache:", error.message);
        const cachedData = await AsyncStorage.getItem(PLATS_CACHE_KEY);
        const cachedTime = await AsyncStorage.getItem(LAST_SYNC_KEY);
        if (cachedData) {
          return {
            plats: JSON.parse(cachedData),
            isOffline: true,
            lastSync: cachedTime,
          };
        }
        
        // Final fallback: use static demo data
        const { plats: demoPlats } = require("../data/plats");
        return {
          plats: demoPlats,
          isOffline: true,
          lastSync: null,
        };
      }
    },
  });

  const platsList = data.plats || [];
  const filteredPlats = platsList.filter((plat) =>
    plat.nom.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const lastSync = data?.lastSync;
    if (!lastSync) {
      setRelativeTime("Jamais");
      return;
    }
    const update = () => {
      setRelativeTime(formatRelativeTime(lastSync));
    };
    update();
    const interval = setInterval(update, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [data?.lastSync]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />

      <SearchBar value={search} onChangeText={setSearch} />

      <CategoryList />

      {data.isOffline && (
        <View style={styles.offlineBanner}>
          <Ionicons name="cloud-offline-outline" size={18} color="#D32F2F" />
          <Text style={styles.offlineText}>Mode hors-ligne : connexion instable</Text>
        </View>
      )}

      <View style={styles.syncCard}>
        <View style={styles.syncRow}>
          <Text style={styles.syncText}>
            Dernière synchro : {relativeTime}
          </Text>
          <TouchableOpacity
            style={styles.syncButton}
            onPress={() => refetch()}
            disabled={isFetching}
          >
            <Ionicons name="refresh-outline" size={15} color="#FF8C00" style={styles.syncIcon} />
            <Text style={styles.syncButtonText}>
              {isFetching ? "Synchro..." : "Forcer"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredPlats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DishCard plat={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity style={styles.fab} onPress={() => router.push("/add")}>
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

  offlineBanner: {
    backgroundColor: "#FFEBEE",
    borderColor: "#FFCDD2",
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  offlineText: {
    color: "#C62828",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 14,
  },

  syncCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },

  syncRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  syncText: {
    color: "#666",
    fontSize: 14,
  },

  syncButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF0E6",
    borderColor: "#FF8C00",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  syncIcon: {
    marginRight: 4,
  },

  syncButtonText: {
    color: "#FF8C00",
    fontWeight: "bold",
    fontSize: 13,
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