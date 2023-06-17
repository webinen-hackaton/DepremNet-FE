import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default MyTeamsPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Takımlarım</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.teamContainer}>
        <View style={styles.teamBox}>
          <Text style={styles.teamName}>Takım 1</Text>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create" size={18} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.teamBox}>
          <Text style={styles.teamName}>Takım 2</Text>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create" size={18} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.teamBox}>
          <Text style={styles.teamName}>Takım 3</Text>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 48,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 16,
  },
  addButton: {
    backgroundColor: "#e8e8e8",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  teamContainer: {
    flex: 1,
  },
  teamBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 16,
  },
  editButton: {
    backgroundColor: "#e8e8e8",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
