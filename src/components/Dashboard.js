import { useContext, useState } from "react";
import "../assets/css/Dashboard.css";
import SideNav from "../components/SideNav";
import AuthContext from "../store/auth-context";

const Dashboard = () => {
    const [profile, setProfile] = useState({});
    const [addFile, setAddFile] = useState(false);
    const [currentTab, setCurrentTab] = useState(1);
    const [file, setFile] = useState(null);

    const authCtx = useContext(AuthContext);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) {
            alert("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("File upload failed");
            }

            const data = await response.json();
            console.log("File uploaded successfully", data);
            alert("File uploaded successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file");
        }
    };

    return (
        <div className="dashboard">
            <div className="nav">
                <SideNav
                    onAdd={() => setAddFile(true)}
                    setCurrentTab={setCurrentTab}
                    currentTab={currentTab}
                />
            </div>
            <div className="dashright">
                <h1 className="welcome">Welcome {profile.name}!</h1>
                <div className="records">
                    {addFile && (
                        <div className="file-upload">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                                id="file-input"
                            />
                            <label htmlFor="file-input" className="file-input-label">
                                Choose File
                            </label>
                            <br></br>
                            {file && <p>Selected file: {file.name}</p>}
                            <button className="file-input-label" onClick={handleFileUpload}>Upload File</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;