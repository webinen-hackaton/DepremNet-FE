import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React from "react";

const StandartButton = ({ buttonStyle, textStyle, onClick, text }) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, buttonStyle]}
      onPress={onClick}
    >
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default StandartButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 30,
    borderWidth: 2,
    marginHorizontal: 8,
    borderColor: "#000",
    color: "#000",
    width: "90%",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
});
