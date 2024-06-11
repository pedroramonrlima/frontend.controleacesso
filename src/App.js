import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
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
