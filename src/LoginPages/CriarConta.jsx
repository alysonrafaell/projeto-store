import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";

export default function CriarConta({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [modalMsg, setModalMsg] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  function mostrarErro(msg) {
    setSucesso(false);
    setModalMsg(msg);
    setModalVisivel(true);
  }

  function mostrarSucesso(msg) {
    setSucesso(true);
    setModalMsg(msg);
    setModalVisivel(true);
  }

  function handleCriarConta() {
    if (!email || !senha || !confirmarSenha) {
      mostrarErro("Preencha todos os campos obrigatórios!");
      return;
    }
    if (!email.includes("@")) {
      mostrarErro("Email inválido! Deve conter @");
      return;
    }
    if (senha.length < 4) {
      mostrarErro("Senha deve ter pelo menos 6 caracteres!");
      return;
    }
    if (senha !== confirmarSenha) {
      mostrarErro("As senhas não coincidem!");
      return;
    }
    mostrarSucesso("Conta criada com sucesso! 🎉");
    // 🔁 Coloque aqui o link da sua API de criação de conta
    // await fetch("SUA_API_URL/register", { method: "POST", body: JSON.stringify({ email, senha, telefone }) })
  }

  function fecharModal() {
    setModalVisivel(false);
    if (sucesso) navigation.navigate("Homepage");
  }

  return (
    <View style={styles.container}>
      {/* Modal */}
      <Modal transparent animationType="fade" visible={modalVisivel}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalIcone}>{sucesso ? "✅" : "⚠️"}</Text>
            <Text style={styles.modalTexto}>{modalMsg}</Text>
            <TouchableOpacity style={styles.modalBotao} onPress={fecharModal}>
              <Text style={styles.modalBotaoTexto}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.voltarTexto}> ↩ Voltar para o Login</Text>
        </TouchableOpacity>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Cria conta</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#aaa"
            onChangeText={setSenha}
            value={senha}
            secureTextEntry
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            placeholderTextColor="#aaa"
            onChangeText={setConfirmarSenha}
            value={confirmarSenha}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.botaoPrincipal} onPress={handleCriarConta}>
          <Text style={styles.botaoPrincipalTexto}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const VERDE = "#2d8c7a";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0faf8",
  },
  header: {
    backgroundColor: "#f0faf8",
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 10,
  },
  voltar: {
    flexDirection: "row",
    alignItems: "center",
  },
    voltarTexto: {
    color: VERDE,
    fontSize: 17,
    fontWeight: "500",
  },
  card: {
    flex: 1,
    padding: 28,
    paddingTop: 10,
  },
  cardTitulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: VERDE,
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#bdbdbd7e",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    outlineStyle: "none",
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 15,
    color: "#333",
    outlineStyle: "none",
  },
  botaoPrincipal: {
    backgroundColor: VERDE,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 8,
  },
  botaoPrincipalTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 28,
    alignItems: "center",
    width: "80%",
    maxWidth: 340,
  },
  modalIcone: {
    fontSize: 36,
    marginBottom: 12,
  },
  modalTexto: {
    fontSize: 15,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  modalBotao: {
    backgroundColor: VERDE,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  modalBotaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});