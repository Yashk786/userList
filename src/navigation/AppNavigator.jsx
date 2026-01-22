import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserListScreen from "../screens/UserListScreen";
import UserDetailScreen from "../screens/UserDetailScreen";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UserListScreen} />
      <Stack.Screen name="UserDetail" component={UserDetailScreen} />
    </Stack.Navigator>
  );
}
