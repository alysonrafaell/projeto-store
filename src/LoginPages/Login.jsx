import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Image
} from "react-native";
import { AuthContext } from "../autenticacao/autenticar";
import google from "../../assets/icons/google.png";
import facebook from "../../assets/icons/facebook.png";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modalMsg, setModalMsg] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);
  const { login } = useContext(AuthContext);

  function mostrarErro(msg) {
    setModalMsg(msg);
    setModalVisivel(true);
  }

  function validarEEntrar() {
    if (!email || !senha) {
      mostrarErro("Preencha todos os campos!");
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
    login(email); // 🔁 Troque por: await fetch("SUA_API_URL/login", { method: "POST", body: JSON.stringify({ email, senha }) })
  }

  function handleGoogle() {
    // 🔁 Coloque aqui o link da sua API de autenticação Google
    mostrarErro("Autenticação Google não configurada ainda.");
  }

  function handleFacebook() {
    // 🔁 Coloque aqui o link da sua API de autenticação Facebook
    mostrarErro("Autenticação Facebook não configurada ainda.");
  }

  return (
    <View style={styles.container}>
      {/* Modal de erro */}
      <Modal transparent animationType="fade" visible={modalVisivel}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalIcone}>⚠️</Text>
            <Text style={styles.modalTexto}>{modalMsg}</Text>
            <TouchableOpacity
              style={styles.modalBotao}
              onPress={() => setModalVisivel(false)}
            >
              <Text style={styles.modalBotaoTexto}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header verde */}
      <View style={styles.header}>
        
        <Text style={styles.headerTitulo}>Bem-vindo!
        </Text>
        <Text style={styles.headerSub}>Faça o login para ter acesso a nossa Loja.</Text>
      </View>

      {/* Card branco */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Login</Text>

        <View style={styles.inputWrapper}>
          
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
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
            placeholder="Digite sua senha"
            placeholderTextColor="#aaa"
            onChangeText={setSenha}
            value={senha}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.esqueciSenha}>
          <Text style={styles.esqueciSenhaTexto}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoPrincipal} onPress={validarEEntrar}>
          <Text style={styles.botaoPrincipalTexto}>Login</Text>
        </TouchableOpacity>

        <View style={styles.separador}>
          <View style={styles.linha} />
          <Text style={styles.separadorTexto}>Fazer o Login com</Text>
          <View style={styles.linha} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBotao} onPress={handleFacebook}>
            <Image source={facebook} style={styles.socialIcone} />
            <Text style={styles.socialTexto}> Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBotao} onPress={handleGoogle}>
            <Image source= {google} style={styles.socialIcone}/>
            <Text style={styles.socialTexto}> Google</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.linkCriar}
          onPress={() => navigation.navigate("CriarConta")}
        >
          <Text style={styles.linkCriarTexto}>
            Você é não tem conta?{" "}
            <Text style={styles.linkDestaque}>Criar conta</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const VERDE = "#2d8c7a";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VERDE,
  },
  header: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  headerEmoji: {
    fontSize: 50,
    marginBottom: 8,
  },
  headerTitulo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSub: {
    fontSize: 16,
    color: "#b1d8d2bb",
    marginTop: 4,
  },
  card: {
    flex: 1,
    backgroundColor: "#f0faf8",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 28,
    paddingTop: 32,
  },
  cardTitulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: VERDE,
    marginBottom: 20,
    textAlign: "center"
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#bdbdbd7e",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingRight: 0,
    paddingLeft: 0,
    marginBottom: 14,
    outlineStyle: "none",
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 15,
    color: "#333",
    outlineStyle: "none",
  },
  esqueciSenha: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  esqueciSenhaTexto: {
    color: VERDE,
    fontSize: 13,
  },
  botaoPrincipal: {
    backgroundColor: VERDE,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  botaoPrincipalTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  separador: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    
  },
  linha: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  separadorTexto: {
    marginHorizontal: 10,
    color: "#999",
    fontSize: 13,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 20,
  },
  socialBotao: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  socialIcone: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  socialTexto: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  linkCriar: {
    alignItems: "center",
  },
  linkCriarTexto: {
    color: "#777",
    fontSize: 14,
  },
  linkDestaque: {
    color: VERDE,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
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