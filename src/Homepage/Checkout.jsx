import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";

const PRIMARIO = "#2C1810";
const SECUNDARIO = "#8B5E3C";
const DESTAQUE = "#C4955A";
const FUNDO = "#F5F0E8";
const FUNDO_CARD = "#FDFAF5";

export default function Checkout({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarTexto}>← Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>💳 Checkout</Text>
      <Text style={styles.sub}>Resumo do pedido</Text>

      {/* 🔁 BACKEND: Coloque aqui os dados do pedido vindos da sua API */}
      <View style={styles.card}>
        <Text style={styles.cardTexto}>Nenhum item no pedido.</Text>
      </View>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Confirmar Pedido</Text>
        {/* 🔁 BACKEND: Conecte à sua API de pagamento */}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: FUNDO, padding: 24, paddingTop: 20 },
  voltar: { marginBottom: 16 },
  voltarTexto: { color: DESTAQUE, fontSize: 15, fontWeight: "600" },
  titulo: { fontSize: 26, fontWeight: "bold", color: PRIMARIO, marginBottom: 4 },
  sub: { fontSize: 15, color: SECUNDARIO, marginBottom: 20 },
  card: {
    backgroundColor: FUNDO_CARD,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: PRIMARIO,
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
    borderBottomWidth: 3,
    borderBottomColor: DESTAQUE,
  },
  cardTexto: { color: "#C4A882", fontSize: 14, textAlign: "center" },
  botao: {
    backgroundColor: PRIMARIO,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: "auto",
  },
  botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});