import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Navigator from './components/navigator/Navigator';
import Login from './pages/login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AuthenticatedApp />} /> 
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
