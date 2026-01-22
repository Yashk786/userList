import { StyleSheet, Text, View } from "react-native";
import React from "react";

const UserDetailScreen = ({ route }) => {
    const { user } = route.params;
    const { address } = user;

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Unable to load user details.</Text>
            </View>
        );
    }

    return (
        <View style={styles.card}>
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
        backgroundColor: "#F9FAFB",
        padding: 16,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 18,
        marginTop: 30,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },

        elevation: 3,
    },

    label: {
        fontSize: 13,
        color: "#6B7280",
        marginTop: 16,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    value: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginTop: 6,
    },
});

