import React from 'react'

class addContact extends React.Component {
    state = {
        id: '',
        name: '',
        email: '',
        phone: ''
    }

    onChangeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }


    // Create a unique UID
    createID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    // Uppercasing first letter :p
    customName(){
        return this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1);
    }

    addContactEvent = (e) => {
        e.preventDefault();
        let contacts;
        if (localStorage.getItem('contacts') === null)
            contacts = [];
        else {
            contacts = JSON.parse(localStorage.getItem('contacts'));
        }
        contacts = Array.from(contacts);

        // Form Validation

        const nameValid = this.isNameValid();
        const phoneValid = this.isPhoneValid();
        const contactExists = this.isContactExists();

        if (!nameValid) {
            const error = document.querySelector('.validName');
            setTimeout(() => error.classList = "validName lead text-danger d-none", 5000);
        }

        if (!phoneValid) {
            const error = document.querySelector('.validPhone');
            setTimeout(() => error.classList = "validPhone lead text-danger d-none", 5000);
        }

        if (this.state.email === '') {
            const error = document.querySelector('.validEmail');
            error.classList = "validEmail lead text-danger d-block";
            setTimeout(() => error.classList = "validEmail lead text-danger d-none", 5000);
        }

        if(contactExists){
            const yellowAlert = document.querySelector('.alert-danger');
            yellowAlert.classList="alert alert-danger d-block text-center";
            setTimeout(()=>{
                yellowAlert.classList="alert alert-danger d-none";
            },3000);

            // Reseting input of the email and phone
            document.querySelector('input[type=email]').value = '';
            document.querySelector('input[name="phone"]').value = '';
        }

        if (nameValid && this.state.email !== '' && phoneValid && !contactExists) {
            const contact = {
                id: this.createID(),
                name: this.customName(),
                email: this.state.email,
                phone: this.state.phone
            }
            contacts.push(contact);

            // Reseting inputs
            document.querySelectorAll('input[type=text]').forEach(input => input.value = '');
            document.querySelector('input[type=email]').value = '';

            // Showing success message
            const greenAlert = document.querySelector('.alert-success');
            greenAlert.classList="alert alert-success d-block text-center";
            setTimeout(()=>{
                greenAlert.classList="alert alert-success d-none";
            },3000);
        }

        // Updating local storage

        localStorage.setItem('contacts', JSON.stringify(contacts));

        // redirection
        // this.props.history.push('/');
    }

    // Validation Functions
    isNameValid() {
        const letters = /^[A-Za-z _-]+$/;
        const error = document.querySelector('.validName');
        if (this.state.name.match(letters) && this.state.name !== '') {
            return true;
        }
        else {
            error.classList = "validName lead text-danger d-block";
            return false;
        }
    }

    isPhoneValid() {
        const letters = /^[0-9 ]+$/;
        const error = document.querySelector('.validPhone');
        if (this.state.phone.match(letters) && this.state.phone !== '') {
            return true;
        }
        else {
            error.classList = "validPhone lead text-danger d-block";
            return false;
        }
    }

    isContactExists=()=>{
        const phone=this.state.phone;
        const email=this.state.email;
        const contacts = Array.from(JSON.parse(localStorage.getItem('contacts')));
        for(let i=0;i<contacts.length;i++){
            if((contacts[i].phone==phone)&& (contacts[i].email==email)){
                return true;
            }
        }
        return false;
    }

    render() {
        return (
            <div>
                <div className="alert-success d-none">Contact successfully added!</div>
                <div className="alert-danger d-none">Contact already exists!</div>
                <div className="card">
                    <div className="card-header">Add Contact</div>
                    <div className="card-body">
                        <form onSubmit={this.addContactEvent}>
                            <div className="form-group">
                                <label htmlFor="name">Name :</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    placeholder="Enter Name"
                                    onChange={this.onChangeHandler}
                                />
                                <p className="validName lead text-danger d-none">Please enter a valid name</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email :</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    onChange={this.onChangeHandler}
                                />
                                <p className="validEmail lead text-danger d-none">Please enter an email adress</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone :</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="phone"
                                    placeholder="Enter Phone"
                                    onChange={this.onChangeHandler}
                                />
                                <p className="validPhone lead text-danger d-none">Please enter a valid phone number</p>
                            </div>
                            <input
                                type="submit"
                                className="btn btn-light btn-block"
                                value="Add Contact"
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default addContact