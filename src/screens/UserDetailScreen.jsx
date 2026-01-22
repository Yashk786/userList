import { StyleSheet, Text, View } from "react-native";
import React from "react";

const UserDetailScreen = ({ route }) => {
  const { user } = route.params;
  const { address } = user;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <Text style={styles.value}>{user.name}</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Text style={styles.label}>Phone</Text>
      <Text style={styles.value}>{user.phone}</Text>

      <Text style={styles.label}>Address</Text>
      <Text style={styles.value}>
        {address.street}, {address.suite}
      </Text>
      <Text style={styles.value}>
        {address.city} - {address.zipcode}
      </Text>
    </View>
  );
};

export default UserDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
});
