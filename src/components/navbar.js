import React from 'react'

class Navbar extends React.Component{
    render(){

        return(
            <div className="navbar bg-danger navbar-dark py-0 mb-3">
                <div className="container">
                    <h2 className="navbar-brand mt-2">MA PEOPLE</h2>
                    <ul className="navbar-nav mr-0">
                        <li className="nav-item row">
                            <a href="/" className="nav-link">Home  <i className="fas fa-home"></i></a>
                            <a href="/add-contact" className="nav-link ml-2">Add <i className="fas fa-plus"></i></a>
                            <a href="/about" className="nav-link ml-2">About <i className="fas fa-question"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Navbar;