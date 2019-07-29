import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import Contacts from './components/contacts';
import About from './components/pages/about';
import AddContact from './components/pages/addContact';
import UpdateContact from './components/updateContact';
import NotFound from './components/pages/notFound';

function getContactsLS() {
    let contacts;
    if (localStorage.getItem('contacts') === null) {
        contacts = [];
    }
    else {
        contacts = JSON.parse(localStorage.getItem('contacts'));
    }
    contacts = Array.from(contacts);
    return contacts;
}


class App extends React.Component {
    constructor(){
        super();
        this.contactsLS = getContactsLS();
    }

    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={() => <Contacts contacts={this.contactsLS} />} />
                        <Route exact path="/add-contact" component={AddContact} />
                        <Route exact path="/edit-contact/:id" component={UpdateContact} />
                        <Route exact path="/about" component={About} />
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App