import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍔 Hamid Snack</Text>

      <Text style={styles.subtitle}>
        Gérez facilement votre menu
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#222",
  },

  subtitle: {
    marginTop: 6,
    color: "#777",
    fontSize: 15,
  },
});