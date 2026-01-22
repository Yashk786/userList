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
  const navigation = useNavigation();

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (pageNumber) => {
    try {
      pageNumber === 1 ? setLoading(true) : setLoadingMore(true);

      const response = await fetchUsersApi(pageNumber);

      setUsers((prevUsers) =>
        pageNumber === 1 ? response : [...prevUsers, ...response]
      );
    } catch (error) {
      console.log("Error fetching users:", error.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreUsers = () => {
    if (!loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      getUsers(nextPage);
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
    return <ActivityIndicator style={{ marginVertical: 16 }} />;
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <SearchInput
        placeholder="Search by name"
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
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
        />
      )}
    </View>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
});
