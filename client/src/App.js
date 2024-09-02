import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import TopNavBar from './components/TopNavBar';
import LoginForm from './screens/LoginForm';
import Delivary from './screens/Delivary';
import Reservation from './screens/Reservation';
import Queries from './screens/Queries';
import CreateUser from './screens/CreateUser';
import Orders from './screens/orders';

function App() {
  return (
    <>
    <TopNavBar/>
    <Routes>
      
      <Route path = "/" element={<Home/>}/>
      <Route path = "/Delivery" element={<Delivary/>}/>
      <Route path = "/reservation" element={<Reservation/>}/>
      <Route path = "/Login" element={<LoginForm/>}/>
      <Route path = "/queries" element={<Queries/>}/>
      <Route path = "/createUser" element={<CreateUser/>}/>
      <Route path = "/orders" element={<Orders/>}/>
    </Routes>
    </>
  );
}

export default App;
