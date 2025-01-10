import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

function SignUp(props) {
    const [credentials, setCredentials] = useState({name: "",email: "", password: "", cpassword: ""});
    let navigate = useNavigate();
    
    const handleSubmit = async (e)=>{
        const {name, email, password, cpassword} = credentials;
        e.preventDefault();

        if (password !== cpassword) {
          props.showAlert("Passwords do not match", "danger");
          return;
        }
    
        try {
          const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
          });
    
          const json = await response.json();
          console.log(json);
    
          if (json.success) {
            // Redirect the user to the home page with their notes
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Account Created Successfully", "success");
          } else {
            props.showAlert(json.error || "Invalid Details", "danger");
          }
        } catch (error) {
          console.error("Error occurred during sign-up:", error);
          props.showAlert("Something went wrong. Please try again later.", "danger");
        }
      }

        const onChange = (e)=>{
            setCredentials({...credentials, [e.target.name]: e.target.value})
        }

  return (
    <div className="container my-2">
      <h2 className="my-3">Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
          onChange={onChange}
            type="text"
            value={credentials.name}
            name="name"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            minLength={2} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
          onChange={onChange}
            type="email"
            value={credentials.email}
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
          onChange={onChange}
          value={credentials.password}
          name="password"
            type="password"
            className="form-control"
            id="password"
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
          onChange={onChange}
          value={credentials.cpassword}
          name="cpassword"
            type="password"
            className="form-control"
            id="cpassword"
            minLength={5} required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp