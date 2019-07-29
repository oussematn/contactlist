import React from 'react';
import {Link} from 'react-router-dom';

class Contact extends React.Component {
    state = {
        showDetails: false
    }

    showDetailsHandler = () => {
        this.setState({ showDetails: !this.state.showDetails })
    }

    deleteContact = () =>{
        this.props.deleteContact();
    }

    render() {
        const { id, name, email, phone } = this.props;
        return (
                <div className="card card-body mb-3">
                    <h2>{name}
                        <i className="fas fa-caret-down ml-2" onClick={this.showDetailsHandler} style={{cursor:'pointer'}}></i>
                        <i className="fas fa-times" style={{ color: 'red', float: 'right' , cursor:'pointer'}} onClick={this.deleteContact}></i>
                        <Link to={`edit-contact/${id}`}><i className="fas fa-user-edit mr-2 mt-1" style={{fontSize: '27px', float : 'right', cursor : 'pointer', color : 'black'}}
                         data-toggle="modal" data-target="#updateModal"></i></Link>
                    </h2>
                    {this.state.showDetails ? (
                        <ul className="list-group">
                            <li className="list-group-item">{email}</li>
                            <li className="list-group-item">{phone}</li>
                        </ul>
                    ) : null}
                </div>
        )
    }
}
export default Contact;