import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";

const PRIMARIO = "#2C1810";
const SECUNDARIO = "#8B5E3C";
const DESTAQUE = "#C4955A";
const FUNDO = "#F5F0E8";
const FUNDO_CARD = "#FDFAF5";

export default function Dashboard({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarTexto}>← Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>📊 Dashboard</Text>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.cardNumero}>0</Text>
          <Text style={styles.cardLabel}>Pedidos hoje</Text>
          {/* 🔁 BACKEND: Conecte à sua API */}
        </View>
        <View style={styles.card}>
          <Text style={styles.cardNumero}>0</Text>
          <Text style={styles.cardLabel}>Clientes</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardNumero}>R$ 0</Text>
          <Text style={styles.cardLabel}>Faturamento</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardNumero}>0</Text>
          <Text style={styles.cardLabel}>Produtos</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: FUNDO, padding: 24, paddingTop: 20 },
  voltar: { marginBottom: 16 },
  voltarTexto: { color: DESTAQUE, fontSize: 15, fontWeight: "600" },
  titulo: { fontSize: 26, fontWeight: "bold", color: PRIMARIO, marginBottom: 24 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    backgroundColor: FUNDO_CARD,
    borderRadius: 16,
    padding: 20,
    width: "47%",
    alignItems: "center",
    shadowColor: PRIMARIO,
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
    borderBottomWidth: 3,
    borderBottomColor: DESTAQUE,
  },
  cardNumero: { fontSize: 28, fontWeight: "bold", color: PRIMARIO },
  cardLabel: { fontSize: 13, color: SECUNDARIO, marginTop: 4 },
});