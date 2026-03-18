import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  Animated,
} from "react-native";
import { AuthContext } from "../autenticacao/autenticar";
import google from "../../assets/icons/google.png";
import facebook from "../../assets/icons/facebook.png";

const PRIMARIO = "#2C1810";
const SECUNDARIO = "#8B5E3C";
const DESTAQUE = "#C4955A";
const FUNDO = "#F5F0E8";
const FUNDO_CARD = "#FDFAF5";
const TEXTO = "#1A0F0A";
const TEXTO_SUB = "#6B4C3B";

const CATEGORIAS = [
  "Todos",
  "Camisetas",
  "Calças",
  "Vestidos",
  "Jaquetas",
  "Acessórios",
];

// 🔁 BACKEND: Troque este array pelos produtos vindos da sua API
const PRODUTOS = [
  {
    id: "1",
    nome: "Camiseta Básica Premium",
    preco: 49.9,
    categoria: "Camisetas",
    novo: true,
  },
  {
    id: "2",
    nome: "Calça Jeans Slim",
    preco: 129.9,
    categoria: "Calças",
    novo: false,
  },
  {
    id: "3",
    nome: "Vestido Floral Midi",
    preco: 89.9,
    categoria: "Vestidos",
    novo: true,
  },
  {
    id: "4",
    nome: "Jaqueta Bomber",
    preco: 199.9,
    categoria: "Jaquetas",
    novo: false,
  },
  {
    id: "5",
    nome: "Shorts Casual",
    preco: 59.9,
    categoria: "Camisetas",
    novo: false,
  },
  {
    id: "6",
    nome: "Blusa Cropped",
    preco: 44.9,
    categoria: "Camisetas",
    novo: true,
  },
];

// ── CARROSSEL ──
function Carrossel() {
  const [indice, setIndice] = useState(0);
  const opacidade = React.useRef(new Animated.Value(1)).current;

  const imagens = [
    require("../../assets/icons/bison1.png"),
    require("../../assets/icons/bison2.png"),
    require("../../assets/icons/bison3.png"),
  ];

  React.useEffect(() => {
    const intervalo = setInterval(() => {
      Animated.timing(opacidade, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        setIndice((i) => (i + 1) % imagens.length);
        Animated.timing(opacidade, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <Animated.Image
      source={imagens[indice]}
      style={[styles.heroImagem, { opacity: opacidade }]}
      resizeMode="cover"
    />
  );
}

export default function Homepage({ navigation }) {
  const { logout, userType } = useContext(AuthContext);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalCarrinho, setModalCarrinho] = useState(false);
  const [modalProduto, setModalProduto] = useState(false);
  const [modalSobre, setModalSobre] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [carrinho, setCarrinho] = useState([]);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroLogin, setErroLogin] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const { login } = useContext(AuthContext);

  function handleLogin() {
    if (!email || !senha) {
      setErroLogin("Preencha todos os campos!");
      return;
    }
    if (!email.includes("@")) {
      setErroLogin("Email inválido!");
      return;
    }
    if (senha.length < 4) {
      setErroLogin("Senha muito curta!");
      return;
    }
    // 🔁 BACKEND: await fetch("SUA_API/login", { method: "POST", body: JSON.stringify({ email, senha }) })
    login(email);
    setModalLogin(false);
    setErroLogin("");
    setEmail("");
    setSenha("");
    if (email === "admin@bison.com") {
      navigation.navigate("AdminMenu");
    } else {
      setModalSucesso(true);
    }
  }

  function adicionarCarrinho(produto) {
    const existe = carrinho.find((i) => i.id === produto.id);
    if (existe) {
      setCarrinho(
        carrinho.map((i) =>
          i.id === produto.id ? { ...i, qtd: i.qtd + 1 } : i,
        ),
      );
    } else {
      setCarrinho([...carrinho, { ...produto, qtd: 1 }]);
    }
  }

  function removerCarrinho(id) {
    setCarrinho(carrinho.filter((i) => i.id !== id));
  }

  function abrirProduto(produto) {
    setProdutoSelecionado(produto);
    setModalProduto(true);
  }

  const totalCarrinho = carrinho.reduce((acc, i) => acc + i.preco * i.qtd, 0);
  const qtdCarrinho = carrinho.reduce((acc, i) => acc + i.qtd, 0);
  const produtosFiltrados =
    categoriaAtiva === "Todos"
      ? PRODUTOS
      : PRODUTOS.filter((p) => p.categoria === categoriaAtiva);

  return (
    <View style={styles.container}>
      {/* ── NAVBAR ── */}
      <View style={styles.navbar}>
        <Text style={styles.navLogo}>
          LOJA <Text style={styles.navLogoDestaque}>BISON</Text>
        </Text>

        <View style={styles.navAcoes}>
          {userType === "admin" && (
            <TouchableOpacity onPress={() => navigation.navigate("AdminMenu")}>
              <Text style={styles.navLink}>⚙️ Admin</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => setModalSobre(true)}>
            <Text style={styles.navLink}>Sobre</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navCarrinho}
            onPress={() => setModalCarrinho(true)}
          >
            <Text style={styles.navCarrinhoIcone}>🛒</Text>
            {qtdCarrinho > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeTexto}>{qtdCarrinho}</Text>
              </View>
            )}
          </TouchableOpacity>
          {userType ? (
            <TouchableOpacity style={styles.navBotao} onPress={logout}>
              <Text style={styles.navBotaoTexto}>Sair</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.navBotao}
              onPress={() => setModalLogin(true)}
            >
              <Text style={styles.navBotaoTexto}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── BANNER HERO ── */}
        <View style={styles.hero}>
          <View style={styles.heroEsquerda}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeTexto}>Nova Coleção 2025</Text>
            </View>
            <Text style={styles.heroTitulo}>Estilo que{"\n"}fala por você</Text>
            <Text style={styles.heroSub}>
              Descubra peças para cada momento — do casual ao estiloso. Encontre
              seu próximo estilo favorito! 👇
            </Text>
          </View>
          <View style={styles.heroDireita}>
            <Carrossel />
          </View>
        </View>

        {/* ── CATEGORIAS ── */}
        <Text style={styles.secaoTitulo}>Categorias</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriasScroll}
        >
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoriaBtn,
                categoriaAtiva === cat && styles.categoriaBtnAtivo,
              ]}
              onPress={() => setCategoriaAtiva(cat)}
            >
              <Text
                style={[
                  styles.categoriaBtnTexto,
                  categoriaAtiva === cat && styles.categoriaBtnTextoAtivo,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── PRODUTOS ── */}
        <Text style={styles.secaoTitulo}>
          {categoriaAtiva === "Todos" ? "Todos os produtos" : categoriaAtiva}
        </Text>
        <View style={styles.grid}>
          {produtosFiltrados.map((produto) => (
            <TouchableOpacity
              key={produto.id}
              style={styles.card}
              onPress={() => abrirProduto(produto)}
            >
              {produto.novo && (
                <View style={styles.cardTagNovo}>
                  <Text style={styles.cardTagNovoTexto}>NOVO</Text>
                </View>
              )}
              <View style={styles.cardImagem}>
                <Text style={styles.cardImagemTexto}>Colocar{"\n"}imagem</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardNome} numberOfLines={2}>
                  {produto.nome}
                </Text>
                <View style={styles.cardPrecos}>
                  <Text style={styles.cardPreco}>
                    R$ {produto.preco.toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.cardBotao}
                  onPress={(e) => {
                    e.stopPropagation?.();
                    adicionarCarrinho(produto);
                  }}
                >
                  <Text style={styles.cardBotaoTexto}>
                    Adicionar ao carrinho
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── RODAPÉ ── */}
        <View style={styles.rodape}>
          <Text style={styles.rodapeLogo}>LOJA BISON</Text>
          <Text style={styles.rodapeTexto}>📍 Olinda, Pernambuco</Text>
          <Text style={styles.rodapeTexto}>📧 LojaBisão@gmail.com</Text>
          <Text style={styles.rodapeCopy}>
            © 2025 Loja Bison. Todos os direitos reservados.
          </Text>
        </View>
      </ScrollView>

      {/* ══ MODAL LOGIN ══ */}
      <Modal transparent animationType="slide" visible={modalLogin}>
        <View style={styles.loginOverlay}>
          <View style={styles.loginModal}>
            <View style={styles.loginHeader}>
              <TouchableOpacity
                style={styles.loginFechar}
                onPress={() => setModalLogin(false)}
              >
                <Text style={styles.loginFecharTexto}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.loginHeaderTitulo}>Bem-vindo!</Text>
              <Text style={styles.loginHeaderSub}>
                Faça o login para ter acesso a nossa Loja.
              </Text>
            </View>
            <View style={styles.loginCard}>
              <Text style={styles.loginCardTitulo}>Login</Text>
              <View style={styles.loginInputWrapper}>
                <TextInput
                  style={styles.loginInput}
                  placeholder="Digite seu email"
                  placeholderTextColor="#aaa"
                  onChangeText={setEmail}
                  value={email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.loginInputWrapper}>
                <TextInput
                  style={styles.loginInput}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#aaa"
                  onChangeText={setSenha}
                  value={senha}
                  secureTextEntry
                />
              </View>
              <TouchableOpacity style={styles.loginEsqueci}>
                <Text style={styles.loginEsqueciTexto}>Esqueceu a senha?</Text>
              </TouchableOpacity>
              {erroLogin ? (
                <Text style={styles.erroTexto}>{erroLogin}</Text>
              ) : null}
              <TouchableOpacity style={styles.loginBotao} onPress={handleLogin}>
                <Text style={styles.loginBotaoTexto}>Login</Text>
              </TouchableOpacity>
              <View style={styles.loginSeparador}>
                <View style={styles.loginLinha} />
                <Text style={styles.loginSeparadorTexto}>
                  Fazer o Login com
                </Text>
                <View style={styles.loginLinha} />
              </View>
              <View style={styles.loginSocialRow}>
                <TouchableOpacity
                  style={styles.loginSocialBotao}
                  onPress={() => {
                    // 🔁 BACKEND: API autenticação Facebook
                  }}
                >
                  <Image source={facebook} style={styles.loginSocialIcone} />
                  <Text style={styles.loginSocialTexto}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.loginSocialBotao}
                  onPress={() => {
                    // 🔁 BACKEND: API autenticação Google
                  }}
                >
                  <Image source={google} style={styles.loginSocialIcone} />
                  <Text style={styles.loginSocialTexto}>Google</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.loginLinkCriar}
                onPress={() => {
                  setModalLogin(false);
                  navigation.navigate("CriarConta");
                }}
              >
                <Text style={styles.loginLinkTexto}>
                  Você não tem conta?{" "}
                  <Text style={styles.loginLinkDestaque}>Criar conta</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ══ MODAL SUCESSO LOGIN ══ */}
      <Modal transparent animationType="fade" visible={modalSucesso}>
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>✅</Text>
            <Text style={styles.modalTitulo}>Login realizado!</Text>
            <Text
              style={{
                color: TEXTO_SUB,
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              Bem-vindo à Loja Bison!
            </Text>
            <TouchableOpacity
              style={styles.modalBotaoPrincipal}
              onPress={() => setModalSucesso(false)}
            >
              <Text style={styles.modalBotaoPrincipalTexto}>
                Continuar comprando
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ══ MODAL CARRINHO ══ */}
      <Modal transparent animationType="slide" visible={modalCarrinho}>
        <View style={styles.overlay}>
          <View style={[styles.modalBox, { maxHeight: "85%" }]}>
            <TouchableOpacity
              style={styles.fechar}
              onPress={() => setModalCarrinho(false)}
            >
              <Text style={styles.fecharTexto}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitulo}>Meu Carrinho 🛒</Text>
            {carrinho.length === 0 ? (
              <View style={styles.carrinhoVazioBox}>
                <Text style={styles.carrinhoVazioIcone}>🛍️</Text>
                <Text style={styles.carrinhoVazio}>
                  Seu carrinho está vazio!
                </Text>
                <TouchableOpacity onPress={() => setModalCarrinho(false)}>
                  <Text style={styles.linkDestaque}>Continuar comprando</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <ScrollView style={{ maxHeight: 300 }}>
                  {carrinho.map((item) => (
                    <View key={item.id} style={styles.carrinhoItem}>
                      <View style={styles.carrinhoItemImagem}>
                        <Text style={styles.carrinhoItemImagemTexto}>img</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.carrinhoNome}>{item.nome}</Text>
                        <Text style={styles.carrinhoPreco}>
                          {item.qtd}x R$ {item.preco.toFixed(2)}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.carrinhoRemoverBtn}
                        onPress={() => removerCarrinho(item.id)}
                      >
                        <Text style={styles.carrinhoRemover}>Apagar</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
                <View style={styles.carrinhoTotal}>
                  <Text style={styles.carrinhoTotalTexto}>Total</Text>
                  <Text style={styles.carrinhoTotalValor}>
                    R$ {totalCarrinho.toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.modalBotaoPrincipal}
                  onPress={() => {
                    setModalCarrinho(false);
                    navigation.navigate("Checkout");
                  }}
                >
                  <Text style={styles.modalBotaoPrincipalTexto}>
                    Finalizar Compra →
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* ══ MODAL PRODUTO ══ */}
      <Modal transparent animationType="slide" visible={modalProduto}>
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.fechar}
              onPress={() => setModalProduto(false)}
            >
              <Text style={styles.fecharTexto}>✕</Text>
            </TouchableOpacity>
            {produtoSelecionado && (
              <>
                <View style={styles.detalheImagem}>
                  <Text style={styles.detalheImagemTexto}>imagem</Text>
                </View>
                <Text style={styles.detalheCategoria}>
                  {produtoSelecionado.categoria}
                </Text>
                <Text style={styles.detalheNome}>
                  {produtoSelecionado.nome}
                </Text>
                <Text style={styles.detalheDescricao}>
                  Produto de alta qualidade, confortável e estiloso. Disponível
                  em vários tamanhos.
                </Text>
                <View style={styles.detalhePrecos}>
                  <Text style={styles.detalhePreco}>
                    R$ {produtoSelecionado.preco.toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.modalBotaoPrincipal}
                  onPress={() => {
                    adicionarCarrinho(produtoSelecionado);
                    setModalProduto(false);
                  }}
                >
                  <Text style={styles.modalBotaoPrincipalTexto}>
                    Adicionar ao Carrinho 🛒
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* ══ MODAL SOBRE ══ */}
      <Modal transparent animationType="fade" visible={modalSobre}>
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.fechar}
              onPress={() => setModalSobre(false)}
            >
              <Text style={styles.fecharTexto}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitulo}>Sobre nós</Text>
            <Text style={styles.sobreTexto}>
              {/* 🔁 Troque pelo texto real da Loja Bison */}
              Somos a Loja Bison, comprometida com moda de qualidade e estilo.
              Nossa missão é oferecer roupas que fazem você se sentir bem todos
              os dias.
            </Text>
            <Text style={styles.sobreTexto}>📍 Olinda, Pernambuco</Text>
            <Text style={styles.sobreTexto}>📧 LojaBison101@gmail.com</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: FUNDO },
  navbar: {
    backgroundColor: FUNDO_CARD,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    paddingTop: 44,
    borderBottomWidth: 1,
    borderBottomColor: "#E8DDD0",
  },
  navLogo: {
    fontSize: 20,
    fontWeight: "900",
    color: PRIMARIO,
    letterSpacing: 2,
  },
  navLogoDestaque: { color: DESTAQUE },
  navAcoes: { flexDirection: "row", alignItems: "center", gap: 12 },
  navLink: { color: TEXTO_SUB, fontSize: 14 },
  navCarrinho: { position: "relative", padding: 4 },
  navCarrinhoIcone: { fontSize: 22 },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#e03131",
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeTexto: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  navBotao: {
    backgroundColor: DESTAQUE,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  navBotaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 13 },

  hero: {
    backgroundColor: "#EDE5D8",
    flexDirection: "row",
    padding: 24,
    paddingTop: 32,
    paddingBottom: 40,
    gap: 16,
  },
  heroEsquerda: { flex: 1, justifyContent: "center" },
  heroBadge: {
    backgroundColor: PRIMARIO,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  heroBadgeTexto: { color: "#F5F0E8", fontSize: 11, fontWeight: "bold" },
  heroTitulo: {
    fontSize: 28,
    fontWeight: "900",
    color: PRIMARIO,
    lineHeight: 34,
    marginBottom: 10,
  },
  heroSub: { fontSize: 13, color: TEXTO_SUB, lineHeight: 20, marginBottom: 20 },
  heroDireita: { width: 200, alignItems: "center", justifyContent: "center" },
  heroImagem: { width: 180, height: 210, borderRadius: 16 },

  categoriasScroll: { paddingHorizontal: 16, paddingVertical: 8 },
  categoriaBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D4C4B0",
    marginRight: 8,
    backgroundColor: FUNDO_CARD,
  },
  categoriaBtnAtivo: { backgroundColor: PRIMARIO, borderColor: PRIMARIO },
  categoriaBtnTexto: { fontSize: 13, color: TEXTO_SUB, fontWeight: "500" },
  categoriaBtnTextoAtivo: { color: "#fff" },

  secaoTitulo: {
    fontSize: 18,
    fontWeight: "800",
    color: PRIMARIO,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 12,
    marginBottom: 8,
  },
  card: {
    backgroundColor: FUNDO_CARD,
    borderRadius: 16,
    width: "47%",
    overflow: "hidden",
    shadowColor: PRIMARIO,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTagNovo: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: DESTAQUE,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    zIndex: 1,
  },
  cardTagNovoTexto: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  cardTagOff: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#e03131",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    zIndex: 1,
  },
  cardTagOffTexto: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  cardImagem: {
    height: 140,
    backgroundColor: "#EDE5D8",
    alignItems: "center",
    justifyContent: "center",
  },
  cardImagemTexto: { color: "#C4A882", fontSize: 12, textAlign: "center" },
  cardInfo: { padding: 12 },
  cardNome: {
    fontSize: 13,
    fontWeight: "600",
    color: TEXTO,
    marginBottom: 6,
    lineHeight: 18,
  },
  cardPrecos: { marginBottom: 10 },
  cardPrecoAntigo: {
    fontSize: 11,
    color: "#bbb",
    textDecorationLine: "line-through",
  },
  cardPreco: { fontSize: 15, fontWeight: "800", color: SECUNDARIO },
  cardBotao: {
    backgroundColor: PRIMARIO,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  cardBotaoTexto: { color: "#fff", fontSize: 12, fontWeight: "600" },

  rodape: {
    backgroundColor: PRIMARIO,
    padding: 24,
    alignItems: "center",
    gap: 6,
  },
  rodapeLogo: {
    color: DESTAQUE,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 3,
    marginBottom: 8,
  },
  rodapeTexto: { color: "#C4A882", fontSize: 13 },
  rodapeCopy: { color: "#8B6B50", fontSize: 11, marginTop: 12 },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalBox: {
    backgroundColor: FUNDO_CARD,
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 420,
  },
  fechar: { alignSelf: "flex-end", marginBottom: 4 },
  fecharTexto: { fontSize: 18, color: "#999" },
  modalTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: PRIMARIO,
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: TEXTO_SUB,
    marginBottom: 6,
    marginTop: 10,
  },
  modalInput: {
    backgroundColor: "#EDE5D8",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: TEXTO,
    outlineStyle: "none",
  },
  erroTexto: { color: "#e03131", fontSize: 13, marginTop: 8 },
  modalBotaoPrincipal: {
    backgroundColor: PRIMARIO,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginTop: 16,
  },
  modalBotaoPrincipalTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalBotaoSecundario: { alignItems: "center", marginTop: 14 },
  modalBotaoSecundarioTexto: { color: TEXTO_SUB, fontSize: 14 },
  linkDestaque: { color: DESTAQUE, fontWeight: "bold" },

  carrinhoVazioBox: { alignItems: "center", paddingVertical: 24 },
  carrinhoVazioIcone: { fontSize: 40, marginBottom: 8 },
  carrinhoVazio: { color: TEXTO_SUB, fontSize: 15, marginBottom: 12 },
  carrinhoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EDE5D8",
    gap: 12,
  },
  carrinhoItemImagem: {
    width: 50,
    height: 50,
    backgroundColor: "#EDE5D8",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  carrinhoItemImagemTexto: { color: "#C4A882", fontSize: 10 },
  carrinhoNome: { fontSize: 14, fontWeight: "600", color: TEXTO },
  carrinhoPreco: { fontSize: 13, color: TEXTO_SUB, marginTop: 2 },
  carrinhoRemoverBtn: {
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  carrinhoRemover: { fontSize: 12, color: "#e03131", fontWeight: "600" },
  carrinhoTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#EDE5D8",
  },
  carrinhoTotalTexto: { fontSize: 16, fontWeight: "bold", color: PRIMARIO },
  carrinhoTotalValor: { fontSize: 18, fontWeight: "900", color: DESTAQUE },

  detalheImagem: {
    height: 180,
    backgroundColor: "#EDE5D8",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  detalheImagemTexto: { color: "#C4A882", fontSize: 13 },
  detalheCategoria: {
    fontSize: 11,
    color: TEXTO_SUB,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  detalheNome: {
    fontSize: 20,
    fontWeight: "bold",
    color: PRIMARIO,
    marginTop: 4,
    marginBottom: 8,
  },
  detalheDescricao: {
    fontSize: 14,
    color: TEXTO_SUB,
    lineHeight: 22,
    marginBottom: 12,
  },
  detalhePrecos: { marginBottom: 4 },
  detalhePrecoAntigo: {
    fontSize: 13,
    color: "#bbb",
    textDecorationLine: "line-through",
  },
  detalhePreco: { fontSize: 22, fontWeight: "900", color: SECUNDARIO },

  sobreTexto: {
    fontSize: 15,
    color: TEXTO_SUB,
    lineHeight: 24,
    marginBottom: 10,
  },

  loginOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  loginModal: {
    backgroundColor: PRIMARIO,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "92%",
  },
  loginHeader: { padding: 24, paddingTop: 20, alignItems: "center" },
  loginFechar: { alignSelf: "flex-end", marginBottom: 8 },
  loginFecharTexto: { color: "#C4A882", fontSize: 18 },
  loginHeaderTitulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  loginHeaderSub: { fontSize: 14, color: "#C4A882", textAlign: "center" },
  loginCard: {
    backgroundColor: FUNDO,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 28,
  },
  loginCardTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: PRIMARIO,
    marginBottom: 20,
    textAlign: "center",
  },
  loginInputWrapper: {
    backgroundColor: "#EDE5D8",
    borderRadius: 12,
    marginBottom: 14,
  },
  loginInput: {
    flex: 1,
    paddingVertical: 13,
    paddingHorizontal: 14,
    fontSize: 15,
    color: TEXTO,
    outlineStyle: "none",
  },
  loginEsqueci: { alignItems: "flex-end", marginBottom: 16 },
  loginEsqueciTexto: { color: DESTAQUE, fontSize: 13 },
  loginBotao: {
    backgroundColor: PRIMARIO,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  loginBotaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  loginSeparador: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  loginLinha: { flex: 1, height: 1, backgroundColor: "#D4C4B0" },
  loginSeparadorTexto: { marginHorizontal: 10, color: TEXTO_SUB, fontSize: 13 },
  loginSocialRow: { flexDirection: "row", gap: 12, marginBottom: 20 },
  loginSocialBotao: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#D4C4B0",
  },
  loginSocialIcone: { width: 20, height: 20, resizeMode: "contain" },
  loginSocialTexto: { fontSize: 14, color: TEXTO, fontWeight: "500" },
  loginLinkCriar: { alignItems: "center" },
  loginLinkTexto: { color: TEXTO_SUB, fontSize: 14 },
  loginLinkDestaque: { color: DESTAQUE, fontWeight: "bold" },
});
