import React from 'react';
import './App.sass';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from '../../components/Header/Header';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Logout from '../Logout/Logout';
import Homepage from '../Homepage/Homepage';
import NotFound from '../NotFound/NotFound';
// import Test from './Test';
import '../../utils/axios.interceptor';
import { UserProvider } from '../../context/user.context';

function App() {
  return (
    <div className="App">
		<UserProvider>
		<Router>
			<Header />
			<Switch>
				<Route path="/" exact component={Homepage} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/logout" component={Logout} />
				<Route path="/" component={NotFound} />
			</Switch>
		</Router>
		</UserProvider>
    </div>
  );
}

export default App;
