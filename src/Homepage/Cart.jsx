import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const VERDE = "#2d8c7a";

export default function Cart({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarTexto}>← Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>🛒 Carrinho</Text>
      <Text style={styles.vazio}>Seu carrinho está vazio!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7faf9", padding: 24, paddingTop: 50 },
  voltar: { marginBottom: 16 },
  voltarTexto: { color: VERDE, fontSize: 15, fontWeight: "500" },
  titulo: { fontSize: 26, fontWeight: "bold", color: "#222", marginBottom: 20 },
  vazio: { color: "#999", fontSize: 15, textAlign: "center", marginTop: 40 },
});