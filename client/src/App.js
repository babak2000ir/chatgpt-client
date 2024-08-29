import Main from './views/Main';
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
        <div className="col"><Main /></div>
      </div>
      <div className="row border">
        <div className="col"><Footer /></div>
      </div>
    </div>
  );
}

export default App;
