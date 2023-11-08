import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import UserList from './components/UserList/UserList';
import CreateUser from './components/CreateUser/CreateUser';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  return (
    <div className='app'>
      
      <Router>
      <Header />
        <Switch>
          <Route exact path="/">
            {!isAuthenticated ? <Redirect to="/login" /> : <Dashboard />}
          </Route>
          <Route path="/login">{isAuthenticated ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/signup">{isAuthenticated ? <Redirect to="/" /> : <Signup />}</Route>
          <Route path="/userlist">{!isAuthenticated ? <Redirect to="/login" /> : <UserList />}</Route>
          <Route path="/createuser">{!isAuthenticated ? <Redirect to="/login" /> : <CreateUser />}</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
