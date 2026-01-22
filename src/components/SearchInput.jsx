import { StyleSheet, TextInput, View, Text } from "react-native";
import React from "react";

const SearchInput = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <Text style={styles.clearIcon} onPress={() => onChangeText("")}>
          ✕
        </Text>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: "#9CA3AF",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    paddingVertical: 14,
  },
  clearIcon: {
    fontSize: 18,
    color: "#9CA3AF",
    padding: 4,
    marginLeft: 8,
    fontWeight: "300",
  },
});
