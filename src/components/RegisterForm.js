import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestore } from "../firebase";  // Import firestore here
import "../assets/css/Form.css";
import yoga from "../assets/images/yoga.png";
import "../assets/css/loader.css";

const RegisterForm = (props) => {
    const [name, setName] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        status: false,
        body: ""
    });
    const Navigate = useNavigate();

    const registerHandler = (e) => {
        e.preventDefault();
        setLoading(true);

        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                // Update profile with role
                return updateProfile(user, {
                    displayName: name,
                    photoURL: props.isPatient ? "patient" : "doctor"
                }).then(() => user);  // Return user to the next then
            })
            .then((user) => {  // Receive user here
                // Add user to respective Firestore collection
                const collectionName = props.isPatient ? "patients" : "doctors";
                return firestore.collection(collectionName).doc(user.uid).set({
                    name: name,
                    email: email,
                    speciality: props.isPatient ? null : speciality,
                    age: age,
                    gender: gender,
                    phone: phone
                });
            })
            .then(() => {
                setLoading(false);
                Navigate("/dashboard");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setLoading(false);
                setError({
                    status: true,
                    body: errorMessage
                });
            });
    };

    return (
        <div className="register">
            <div className="form-wrapper">
                <form>
                    <h1>Register</h1>
                    <label>Email</label>
                    <input type="email" required onChange={(event) => setEmail(event.target.value)} value={email}/>
                    <label>Password</label>
                    <input type="password" required onChange={(event) => setPass(event.target.value)} value={pass}/>
                    {error.status ? <span className="reqmsg">{error.body}</span> : null}
                    <button type="submit" className="registerBtn" onClick={registerHandler}>Register</button>
                    {loading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : null}
                </form>
            </div>
            <img className="form-img" src={yoga} alt="Yoga"/>
        </div>
    );
};

export default RegisterForm;