import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
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

  const loadUsers = useCallback(
    async (pageNumber) => {
      try {
        dispatch(fetchStart());
        const response = await fetchUsersApi(pageNumber);
        dispatch(fetchSuccess(response));
      } catch (err) {
        dispatch(fetchFailure("Failed to load users"));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (!loading && refreshing) {
      setRefreshing(false);
    }
  }, [loading, refreshing]);

  useEffect(() => {
    loadUsers(page);
  }, [page, loadUsers]);


  const loadMoreUsers = () => {
    if (loading || refreshing) return;
    dispatch(incrementPage());
  };

  const onRefresh = () => {
    if (loading) return;
    setRefreshing(true);
    dispatch(resetUsers());
  };

  const onRetry = () => {
    dispatch(resetUsers());
  };

  const filteredUsers = useMemo(() => {
    return list.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [list, search]);

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

  const renderFooter = () => {
    if (!loading || list.length === 0) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#6366F1" />
      </View>
    );
  };

  const renderEmptyState = () => {
    if (loading) return null;
    if (search) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>No users found</Text>
          <Text style={styles.emptySubtitle}>
            Try adjusting your search terms
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>👥</Text>
        <Text style={styles.emptyTitle}>No users available</Text>
        <Text style={styles.emptySubtitle}>
          Pull down to refresh and load users
        </Text>
      </View>
    );
  };

  const renderError = () => {
    if (!error) return null;
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <View style={styles.container}>

      <SearchInput
        placeholder="Search by name"
        value={search}
        onChangeText={setSearch}
      />

      {renderError()}

      {loading && list.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Loading users...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => `user-${item.id}`}
          renderItem={renderItem}
          onEndReached={loadMoreUsers}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyState}
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.listContainer,
            filteredUsers.length === 0 && styles.emptyListContainer,
          ]}
          
          showsVerticalScrollIndicator={false}
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
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
  errorContainer: {
    margin: 16,
    marginTop: 12,
    padding: 20,
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
    alignItems: "center",
  },
  errorIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#DC2626",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
});
