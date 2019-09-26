import React, {Component} from "react";

class Signup extends Component {
     constructor() {
         super()
             this.state = {
                 name: "",
                 email: "",
                 password: "",
                 error: "",
             
             }
     }
//event target value changes and talk to the state above and populate fields with setState
//this sytanx with event works for all of them no need to do three
 handleChange = name => event => {
     this.setState({[name]: event.target.value});
 }

 clickSubmit = event => {
     //stop default behavior
     event.preventDefault()
     //no need to put this state in the object
     const {name, email, password} = this.state
     const user = {
         name,
         email,
         password
     };
     fetch("http://localhost:8080/signup", {
         method: "POST",
         headers: {
             Accept: "application/json",
             "Content-Type": "application/json"
         },
        body: JSON.stringify(user)
     })
     .then(response => {
         return response.json()
     })
     .catch(err => console.log(err))
 };


    render() {
        const {name, email, password} = this.state
        return (
            <div>
                <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <form>
                    <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input onChange={this.handleChange("name")} type="text" className="form-control"
                    value={name}/>
                    </div>
                    <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input onChange={this.handleChange("email")} type="email" className="form-control"
                    value={email}/>
                    </div>
                    <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input onChange={this.handleChange("password")} type="password" className="form-control"
                    value={password}/>
                    </div>
                    
                    <button onClick={this.clickSubmit} className="button.btn.btn-raised.btn-primary">Submit</button>
                </form>
            </div>
            </div>
        );
    }
}

export default Signup;