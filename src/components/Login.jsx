import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';


function Login(props) {
    
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

          // Check if the form fields are empty
      if (!credentials.email || !credentials.password) {
        props.showAlert("Please fill in both fields", "danger");
        return;
      }
    
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
    
        if (!response.ok) {
          // Handle non-2xx HTTP responses gracefully
          props.showAlert("Login failed. Please check your details.", "danger");
          return;
        }
    
        const json = await response.json();
        console.log(json);
    
        if (json.success) {
          // Redirect the user to the home page with their notes
          localStorage.setItem('token', json.authtoken);
          navigate("/");
          props.showAlert("Logged in Successfully", "success");
        } else {
          props.showAlert("Invalid Details", "danger");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        props.showAlert("Something went wrong. Please try again later.", "danger");
      }
    };
    
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div className="container my-3">
      <h2 className="my-3">Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
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
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
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
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
