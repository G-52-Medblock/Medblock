import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AuthContext from "../store/auth-context";
import loginimg from "../assets/images/security.png";
import "../assets/css/loader.css";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, body: "" });

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passChangeHandler = (event) => {
    setPass(event.target.value);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        authCtx.login(user.uid); // Adjust according to how you handle login context
        Navigate("/dashboard");
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError({ status: true, body: errorMessage });
        setLoading(false);
      });
  };

  return (
    <div className="login">
      <div className="form-wrapper">
        <form>
          <h1>Login to Med Block</h1>
          <p>New User? <Link to="/register">Register Here</Link></p>
          <label>Email</label>
          <input type="email" required onChange={emailChangeHandler} value={email}/>
          <label>Password</label>
          <input type="password" required onChange={passChangeHandler} value={pass}/>
          {error.status ? <span className="reqmsg">{error.body}</span> : null}
          <button type="submit" className="registerBtn" onClick={loginHandler}>Login</button>
          {loading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : null}
        </form>
      </div>
      <img className="form-img" src={loginimg} alt="Login"/>
    </div>
  );
};

export default Login;