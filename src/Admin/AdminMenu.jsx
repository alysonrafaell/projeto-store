import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { AuthContext } from "../autenticacao/autenticar";

const PRIMARIO = "#2C1810";
const SECUNDARIO = "#8B5E3C";
const DESTAQUE = "#C4955A";
const FUNDO = "#F5F0E8";
const FUNDO_CARD = "#FDFAF5";

export default function AdminMenu({ navigation }) {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerSub}>Bem-vindo,</Text>
        <Text style={styles.headerTitulo}>Painel Admin</Text>
        <Text style={styles.headerLoja}>🛍️ Loja Bison</Text>
      </View>

      {/* Cards */}
      <View style={styles.grid}>

        <TouchableOpacity
          style={[styles.card, styles.cardDestaque]}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={styles.cardIcone}>📊</Text>
          <Text style={styles.cardTituloDestaque}>Dashboard</Text>
          <Text style={styles.cardSubDestaque}>Pedidos, clientes e faturamento</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("GerenciarProdutos")}
        >
          <Text style={styles.cardIcone}>📦</Text>
          <Text style={styles.cardTitulo}>Produtos</Text>
          <Text style={styles.cardSub}>Adicionar e editar produtos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: "Homepage" }] })}
        >
          <Text style={styles.cardIcone}>🏪</Text>
          <Text style={styles.cardTitulo}>Ver Loja</Text>
          <Text style={styles.cardSub}>Visualizar como cliente</Text>
        </TouchableOpacity>

      </View>

      {/* Botão sair */}
      <TouchableOpacity
        style={styles.botaoSair}
        onPress={() => { logout(); navigation.navigate("Homepage"); }}
      >
        <Text style={styles.botaoSairTexto}>🚪 Sair da conta</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FUNDO,
    padding: 24,
    paddingTop: 20,
  },
  header: {
    backgroundColor: PRIMARIO,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  headerSub: {
    color: "#C4A882",
    fontSize: 14,
  },
  headerTitulo: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "900",
    marginTop: 4,
  },
  headerLoja: {
    color: DESTAQUE,
    fontSize: 14,
    marginTop: 6,
  },
  grid: {
    flex: 1,
    gap: 14,
  },
  card: {
    backgroundColor: FUNDO_CARD,
    borderRadius: 16,
    padding: 20,
    shadowColor: PRIMARIO,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: DESTAQUE,
  },
  cardDestaque: {
    backgroundColor: PRIMARIO,
    borderLeftColor: SECUNDARIO,
  },
  cardIcone: {
    fontSize: 28,
    marginBottom: 8,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: PRIMARIO,
    marginBottom: 4,
  },
  cardTituloDestaque: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 13,
    color: SECUNDARIO,
  },
  cardSubDestaque: {
    fontSize: 13,
    color: "#C4A882",
  },
  botaoSair: {
    borderWidth: 1,
    borderColor: "#e03131",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: FUNDO_CARD,
  },
  botaoSairTexto: {
    color: "#e03131",
    fontWeight: "bold",
    fontSize: 15,
  },
});