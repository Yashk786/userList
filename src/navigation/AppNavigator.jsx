import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TestScreen from "../screens/TestScreen";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Test" component={TestScreen} />
    </Stack.Navigator>
  );
}
