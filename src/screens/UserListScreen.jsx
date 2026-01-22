import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { fetchUsersApi } from "../services/userApi";
import { useNavigation } from "@react-navigation/native";
import UserItem from "../components/UserItem";
import SearchInput from "../components/SearchInput";

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (pageNumber) => {
    try {
      setError(null);
      pageNumber === 1 ? setLoading(true) : setLoadingMore(true);

      const response = await fetchUsersApi(pageNumber);

      setUsers((prevUsers) =>
        pageNumber === 1 ? response : [...prevUsers, ...response]
      );
    } catch (err) {
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };


  console.log("users", users);

  const loadMoreUsers = () => {
    if (!loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      getUsers(nextPage);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      setError(null);
      setPage(1);

      const response = await fetchUsersApi(1);
      setUsers(response);
    } catch (err) {
      setError("Failed to refresh users.");
    } finally {
      setRefreshing(false);
    }
  };


  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const renderItem = ({ item }) => (
    <UserItem
      user={item}
      onPress={() => navigation.navigate("UserDetail", { user: item })}
    />
  );


  const renderFooter = () => {
    if (!loadingMore) return null;
    <ActivityIndicator size="large" style={styles.loader} />
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <SearchInput
        placeholder="Search by name"
        value={search}
        onChangeText={setSearch}
      />

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.retry} onPress={() => getUsers(1)}>
            Retry
          </Text>
        </View>
      )}


      {loading && users.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : (

        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onEndReached={loadMoreUsers}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={<Text>No users found</Text>}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />

      )}
    </View>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  item: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },

    elevation: 2,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  email: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },

  errorContainer: {
    backgroundColor: "#FEF2F2",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  errorText: {
    color: "#B91C1C",
    fontSize: 14,
    marginBottom: 6,
  },

  retry: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "600",
  },

  loader: {
    marginTop: 40,
  },
});

