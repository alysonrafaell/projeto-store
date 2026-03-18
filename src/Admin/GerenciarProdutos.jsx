import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";

const PRIMARIO = "#2C1810";
const SECUNDARIO = "#8B5E3C";
const DESTAQUE = "#C4955A";
const FUNDO = "#F5F0E8";
const FUNDO_CARD = "#FDFAF5";

export default function GerenciarProdutos({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarTexto}>← Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>📦 Gerenciar Produtos</Text>
      <Text style={styles.sub}>Adicione, edite ou remova produtos.</Text>

      <TouchableOpacity style={styles.botaoAdicionar}>
        <Text style={styles.botaoAdicionarTexto}>+ Adicionar Produto</Text>
        {/* 🔁 BACKEND: Conecte à sua API */}
      </TouchableOpacity>

      <View style={styles.vazio}>
        <Text style={styles.vazioIcone}>📭</Text>
        <Text style={styles.vazioTexto}>Nenhum produto cadastrado.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: FUNDO, padding: 24, paddingTop: 20 },
  voltar: { marginBottom: 16 },
  voltarTexto: { color: DESTAQUE, fontSize: 15, fontWeight: "600" },
  titulo: { fontSize: 26, fontWeight: "bold", color: PRIMARIO, marginBottom: 4 },
  sub: { fontSize: 15, color: SECUNDARIO, marginBottom: 20 },
  botaoAdicionar: {
    backgroundColor: PRIMARIO,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  botaoAdicionarTexto: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  vazio: { flex: 1, alignItems: "center", justifyContent: "center" },
  vazioIcone: { fontSize: 48, marginBottom: 12 },
  vazioTexto: { color: "#C4A882", fontSize: 15 },
});