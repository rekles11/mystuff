import React from 'react';
import Contacts from './componets/contacts/Contacts'
import Header from './componets/layout/Header'
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from './context';
import AddContact from './componets/contacts/AddContact';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import About from './componets/pages/About';
import NotFound from './componets/pages/NotFound';
import Test from './componets/test/Test'
import EditContact from './componets/contacts/EditContact';
export default function App() {
  return (
    <Provider>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <header className="App-header">
            <Header branding="Monkey Man Manager" />
            <div className="contanier">
              <Switch>
                <Route exact path="/" component = {Contacts} />
                <Route exact path="/about" component = {About} />
                <Route exact path="/contact/add" component = {AddContact} />
                <Route exact path="/contact/edit/:id" component = {EditContact} />
                <Route exact path="/test" component = {Test} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </header>
        </div>
      </Router>
    </Provider>
  );
}
 
