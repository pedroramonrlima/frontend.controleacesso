import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Usuario from './pages/usuario/Usuario';
import Footer from './components/footer/Footer';
import Navigator from './components/navigator/Navigator';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <Navigator />
      </div>
    </Router>
  );
};


export default App;
