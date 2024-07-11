import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Navigator from './components/navigator/Navigator';
import Login from './pages/login';
import Usuario from './pages/usuario/Usuario';
import Requisicoes from './pages/requisicoes/Requisicoes';
import Dashboard from './pages/dashboard/Dashboard';
import Aprovacao from './pages/aprovacao/Aprovacao';
import Grupo from './pages/admin/grupos/Grupo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<AuthenticatedApp />}>
          <Route index element={<Dashboard />} />
          <Route path="requisicao-acesso" element={<Requisicoes />} />
          <Route path="solicitacao-usuario" element={<Usuario />} />
          <Route path="aprovacao-reprovacao" element={<Aprovacao />} />
          <Route path="grupo-usuario" element={<Grupo />} />
        </Route>
      </Routes>
    </Router>
  );
};

const AuthenticatedApp = () => {
  return (
    <div className="container">
      <Sidebar />
      <Navigator />
    </div>
  );
};

export default App;
