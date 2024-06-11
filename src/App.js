import logo from './logo.svg';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Usuario from './pages/usuario/Usuario';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="container">
      <Sidebar />
      <div className="page-box">
        <Usuario />
        <Footer />
      </div>
    </div>
  );
}

export default App;
