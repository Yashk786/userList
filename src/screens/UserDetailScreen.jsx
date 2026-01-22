import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const UserDetailScreen = ({ route }) => {
    const { user } = route.params;
    const { address } = user;

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const getAvatarColor = (name) => {
        const colors = [
            "#6366F1",
            "#8B5CF6",
            "#EC4899",
            "#EF4444",
            "#F59E0B",
            "#10B981",
            "#06B6D4",
            "#3B82F6",
        ];
        const index = name.length % colors.length;
        return colors[index];
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <View style={styles.errorCard}>
                    <Text style={styles.errorIcon}>⚠️</Text>
                    <Text style={styles.errorText}>Unable to load user details.</Text>
                </View>
            </View>
        );
    }

    const InfoRow = ({ icon, label, value, isLink = false }) => (
        <View style={styles.infoRow}>
            <View style={styles.infoHeader}>
                <Text style={styles.infoIcon}>{icon}</Text>
                <Text style={styles.label}>{label}</Text>
            </View>
            <Text style={[styles.value, isLink && styles.linkValue]} selectable>
                {value}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
            <ScrollView
                style={{ flex: 1, backgroundColor: "#F9FAFB" }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerCard}>
                    <View style={[styles.avatar, { backgroundColor: getAvatarColor(user.name) }]}>
                        <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
                    </View>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Contact Information</Text>

                    <InfoRow
                        label="Email"
                        value={user.email}
                        isLink={true}
                    />

                    <InfoRow
                        label="Phone"
                        value={user.phone}
                        isLink={true}
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Address</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.infoHeader}>
                            <Text style={styles.label}>Street</Text>
                        </View>
                        <Text style={styles.value} selectable>
                            {address.street}, {address.suite}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoHeader}>
                            <Text style={styles.label}>City & Zip</Text>
                        </View>
                        <Text style={styles.value} selectable>
                            {address.city}, {address.zipcode}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default UserDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    scrollContent: {
        paddingBottom: 24,
    },
    headerCard: {
        backgroundColor: "#FFFFFF",
        paddingTop: 32,
        paddingBottom: 32,
        paddingHorizontal: 20,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
    },
    avatarText: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "700",
        letterSpacing: 1,
    },
    userName: {
        fontSize: 24,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 6,
        textAlign: "center",
        letterSpacing: -0.5,
    },
    userEmail: {
        fontSize: 15,
        color: "#6B7280",
        textAlign: "center",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        borderWidth: 1,
        borderColor: "#F3F4F6",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 20,
        letterSpacing: -0.3,
    },
    infoRow: {
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    infoHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    infoIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    label: {
        fontSize: 12,
        color: "#6B7280",
        textTransform: "uppercase",
        letterSpacing: 0.8,
        fontWeight: "600",
    },
    value: {
        fontSize: 16,
        fontWeight: "500",
        color: "#111827",
        marginLeft: 26,
    },
    linkValue: {
        color: "#6366F1",
    },
    errorCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 32,
        margin: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    errorIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    errorText: {
        fontSize: 16,
        color: "#6B7280",
        textAlign: "center",
        fontWeight: "500",
    },
});

