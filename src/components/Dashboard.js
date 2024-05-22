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
                            {file && <p>Selected file: {file.name}</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
