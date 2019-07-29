import React from 'react';
import Contact from './contact';

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contacts: props.contacts }
  }


  deleteContact = (id) => {
    const { contacts } = this.state;
    const newContacts = contacts.filter(contact =>
      contact.id !== id
    );

    this.setState({ contacts: newContacts });

    //Handling local storage
    localStorage.setItem('contacts', JSON.stringify(newContacts));
  }

   render() {
    const contacts = this.state.contacts;
    return (
      <div>
        {contacts.map(contact =>
          <Contact
            id={contact.id}
            name={contact.name}
            email={contact.email}
            phone={contact.phone}
            deleteContact={this.deleteContact.bind(this,contact.id)}
          />
        )}
      </div>
    )
  }
}

export default Contacts;