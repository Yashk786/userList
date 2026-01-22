import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  resetUsers,
  incrementPage,
} from "../store/usersSlice";
import { fetchUsersApi } from "../services/userApi";
import { useNavigation } from "@react-navigation/native";
import UserItem from "../components/UserItem";
import SearchInput from "../components/SearchInput";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { list, page, loading, error } = useSelector(
    (state) => state.users
  );

  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Fetch users whenever page changes
   */
  useEffect(() => {
    loadUsers(page);
  }, [page]);

  /**
   * API call
   */
  const loadUsers = async (pageNumber) => {
    try {
      dispatch(fetchStart());
      const response = await fetchUsersApi(pageNumber);
      dispatch(fetchSuccess(response));
    } catch (err) {
      dispatch(fetchFailure("Failed to load users"));
    }
  };

  /**
   * Infinite scroll handler
   */
  const loadMoreUsers = () => {
    if (loading || list.length === 0) return;
    dispatch(incrementPage());
  };

  /**
   * Pull-to-refresh
   */
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      dispatch(resetUsers());
      dispatch(incrementPage()); // sets page back to 1
    } finally {
      setRefreshing(false);
    }
  };

  /**
   * Retry after error
   */
  const onRetry = () => {
    dispatch(resetUsers());
    dispatch(incrementPage());
  };

  /**
   * Search filter
   */
  const filteredUsers = useMemo(() => {
    return list.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [list, search]);

  /**
   * Render user item
   */
  const renderItem = useCallback(
    ({ item }) => (
      <UserItem
        user={item}
        onPress={() =>
          navigation.navigate("UserDetail", { user: item })
        }
      />
    ),
    [navigation]
  );

  /**
   * Footer loader
   */
  const renderFooter = () => {
    if (!loading || list.length === 0) return null;
    return <ActivityIndicator style={styles.loader} />;
  };

  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Search by name"
        value={search}
        onChangeText={setSearch}
      />

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.retry} onPress={onRetry}>
            Retry
          </Text>
        </View>
      )}

      {loading && list.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onEndReached={loadMoreUsers}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            !loading && <Text>No users found</Text>
          }
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyboardShouldPersistTaps="handled"
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
    padding: 16,
  },
  loader: {
    marginVertical: 16,
  },
  errorContainer: {
    padding: 12,
    backgroundColor: "#fee",
    borderRadius: 6,
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 4,
  },
  retry: {
    color: "blue",
    fontWeight: "bold",
  },
});
