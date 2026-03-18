import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, AuthContext } from "./src/autenticacao/autenticar";
import Login from "./src/LoginPages/Login";
import CriarConta from "./src/LoginPages/CriarConta";
import Homepage from "./src/Homepage/Homepage";
import Cart from "./src/Homepage/Cart";
import Checkout from "./src/Homepage/Checkout";
import Produtos from "./src/Homepage/Produtos";
import AdminMenu from "./src/Admin/AdminMenu";
import Dashboard from "./src/Admin/Dashboard";
import GerenciarProdutos from "./src/Admin/GerenciarProdutos";

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Telas principais */}
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="CriarConta" component={CriarConta} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Produtos" component={Produtos} />

        {/* Telas admin — sempre registradas para navigation.navigate funcionar */}
        <Stack.Screen name="AdminMenu" component={AdminMenu} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="GerenciarProdutos" component={GerenciarProdutos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}