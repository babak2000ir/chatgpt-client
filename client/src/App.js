import MainOllama from './views/MainOllama';
import NavBar from './views/NavBar';
import Footer from './views/Footer';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './App.css';

function App() {
  return (
    <div className="container-fluid">
      <div className="row border">
        <div className="col"><NavBar /></div>
      </div>
      <div className="row gx-0">
        <div className="col"><MainOllama /></div>
      </div>
      <div className="row border">
        <div className="col"><Footer /></div>
      </div>
    </div>
  );
}

export default App;
