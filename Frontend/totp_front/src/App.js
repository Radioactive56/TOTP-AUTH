import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Success from './components/Success';
import Failed from './components/Failed';

export let API_URL = process.env.REACT_APP_API_URL

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<Login></Login>}></Route>
      <Route exact path='/register' element={<Register></Register>}></Route>
      <Route exact path='/success' element={<Success></Success>}></Route>
      <Route exact path='/failed' element={<Failed></Failed>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
