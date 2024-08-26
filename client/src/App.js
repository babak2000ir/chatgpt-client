import Nav from './views/Nav';
import Panel from './views/Panel';
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
        <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2 border-end border-start"><Nav /></div>
        <div className="col"><Main /></div>
        <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2 border-end border-start"><Panel /></div>
      </div>
      <div className="row border">
        <div className="col"><Footer /></div>
      </div>
    </div>
  );
}

export default App;
