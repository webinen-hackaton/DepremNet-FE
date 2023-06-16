import { StyleSheet, Text, View } from 'react-native';
import React from 'react';


export default function InputWithIcon({ icon }) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <Text style={styles.input}>{/* Your input component here */}</Text>
        <View style={styles.iconContainer}>{icon}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  iconContainer: {
    marginLeft: 10,
  },
});
