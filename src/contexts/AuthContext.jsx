import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import api from "../services/api";

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [autenticado, setAutenticado] = useState(false);
  const [aluno, setAluno] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function recuperarDadosArmazenados() {
      const alunoArmazenado = localStorage.getItem("aluno");
      const tokenArmazenado = localStorage.getItem("token");

      if (alunoArmazenado && tokenArmazenado) {
        api.defaults.headers["Authorization"] = `Bearer ${tokenArmazenado}`;

        setAluno(JSON.parse(alunoArmazenado));
        setAutenticado(true);
        setLoading(false);
      } else {
        setLoading(false);

        if (
          location.pathname === "/cadastro" ||
          location.pathname === "/nova-senha" ||
          location.pathname === "/nova-solicitacao"
        )
          return;
        else navigate("/");
      }
    }

    recuperarDadosArmazenados();
  }, []);

  const handleLogin = (
    { email, senha },
    setLoading,
    setMostrandoAlert,
    setDados
  ) => {
    setLoading(true);

    api.post("/auth/login", { email, senha }).then((response) => {
      const dados = response.data;

      if (response.status === 401) {
        setDados({ ...dados, tipo: "aviso" });
        setLoading(false);
        setMostrandoAlert(true);
        return;
      }

      if (response.status === 400) {
        setDados({ ...dados, tipo: "erro" });
        setLoading(false);
        setMostrandoAlert(true);
        return;
      }

      if (dados.token && response.status === 200) {
        setAluno(dados.dadosAlunoLogin);
        setAutenticado(true);

        api.defaults.headers["Authorization"] = `Bearer ${dados.token}`;

        localStorage.setItem("aluno", JSON.stringify(dados.dadosAlunoLogin));
        localStorage.setItem("token", dados.token);
        navigate("/home");
      }
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    setAluno(null);
    setAutenticado(false);
    navigate("/");
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ClipLoader color="#41e5f6" size={40} />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ autenticado, aluno, handleLogin, handleLogout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthContext, AuthProvider };
