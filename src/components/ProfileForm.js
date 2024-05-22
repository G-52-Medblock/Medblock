import React, { useState, useEffect } from "react";
import { firestore } from "../firebase.js"; // Import Firebase modules
import { useUserAuth } from "../context/UserAuthContext"; // Import useUserAuth hook
import "../assets/css/ProfileForm.css";
import logo from "../assets/images/logo2.png";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genders = ["Male", "Female", "Other"];

const ProfileForm = () => {
  const { user: currentUser } = useUserAuth(); // Use useUserAuth to get the current user
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    bloodGroup: "",
    height: "",
    weight: "",
    healthIssues: "",
    dob: "",
    gender: "",
    age: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const docRef = firestore.collection("patients").doc(currentUser.uid);
      docRef.get().then((doc) => {
        if (doc.exists) {
          setFormData({
            firstName: doc.data().firstName || "",
            middleName: doc.data().middleName || "",
            lastName: doc.data().lastName || "",
            phoneNumber: doc.data().phoneNumber || "",
            email: doc.data().email || "",
            address: doc.data().address || "",
            bloodGroup: doc.data().bloodGroup || "",
            height: doc.data().height || "",
            weight: doc.data().weight || "",
            healthIssues: doc.data().healthIssues || "",
            dob: doc.data().dob || "",
            gender: doc.data().gender || "",
            age: doc.data().age || "",
          });
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.error("Error getting document:", error);
        setErrorMessage("Failed to fetch data. Please try again.");
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset error message when input changes
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Current user:", currentUser);  // Log the current user to debug
  
    if (!currentUser || !currentUser.uid) {
      console.error("No user logged in or UID not found.");
      setErrorMessage("No user logged in or UID not found.");
      return;
    }
  
    console.log("Firestore instance:", firestore);  // Log the Firestore instance
    try {
      console.log("Attempting to access Firestore collection...");
      const collectionRef = firestore.collection("patients");
      console.log("Collection ref:", collectionRef);
      await collectionRef.doc(currentUser.uid).set(formData);  // Use set for a clearer test
      console.log("Form data successfully saved to Firebase!");
    } catch (error) {
      console.error("Error during Firestore operation:", error);
      setErrorMessage("Failed to save data. Please try again.");
    }
  };

  return (
      <div className="form-wrapper">
        <div className="header">
                <img src={logo}/>
                <h1 className="title">Med Block</h1>
                </div>

        <h2>Profile Details</h2>
        <form onSubmit={handleSubmit}>
          <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          placeholder="Middle Name"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Height (in feet)"
        />
        <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Weight in kgs"
            required
          />
          <input
            type="text"
            name="healthIssues"
            value={formData.healthIssues}
            onChange={handleChange}
            placeholder="Any Health Issues"
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            required
          />
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          name="dob"
          id="dob"
          value={formData.dob}
          onChange={handleChange}
          required
          />
          {/* DOB field remains for potential future use (commented out) */}
          {/* <input type="text" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth (dd/mm/yyyy)" /> */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfileForm;
