import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const categories = [
  "Tous",
  "Burger",
  "Pizza",
  "Tacos",
  "Boissons",
];

export default function CategoryList() {
  return (
    <View style={styles.container}>
      {categories.map((item) => (
        <TouchableOpacity key={item} style={styles.button}>
          <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },

  text: {
    fontWeight: "600",
  },
});