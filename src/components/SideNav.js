import "../assets/css/Sidenav.css";
import logo from "../assets/images/logo2.png";
import { GrDocumentText, GrUserManager, GrSettingsOption, GrAdd, GrLogout } from 'react-icons/gr';
import { IoMdStats } from 'react-icons/io';
import { useContext } from "react";
import swal from 'sweetalert';
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const SideNav = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
    
  const logoutHandler = () => {
    swal({
      text: "Are you sure you want to log out?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willLogout) => {
      if (willLogout) {
        authCtx.logout();
        navigate("/");
      }
    });
  };

  return (
    <div className="sidenav">
      <div className="navhead">
        <img src={logo} className="navlogo" alt="logo" />
        <h2 className="heading">MedBlock</h2>
      </div>
      
      <a onClick={props.onAdd}>
        <h4 className="add">
          <GrAdd className="icon" /> Add
        </h4>
      </a>
      
      {/* <h4 onClick={() => {
          props.setCurrentTab(1);
          navigate('/dashboard');
        }}
        className={props.currentTab === 1 ? 'active' : ''}
      >
        <GrDocumentText className="icon" /> Prescriptions
      </h4>  
      
      <h4 onClick={() => {
          props.setCurrentTab(2);
          navigate('/dashboard');
        }}
        className={props.currentTab === 2 ? 'active' : ''}
      >
        <IoMdStats className="icon" /> Reports
      </h4>
      
      <h4 onClick={() => {
          props.setCurrentTab(3);
          navigate('/dashboard');
        }}
        className={props.currentTab === 3 ? 'active' : ''}
      >
        <GrUserManager className="icon" /> Doctors
      </h4>  */}
      
      <h4 onClick={() => {
          props.setCurrentTab(4);
          navigate('/phonesignup');
        }}
        className={props.currentTab === 4 ? 'active' : ''}
      >
        <GrSettingsOption className="icon" /> Profile Info
      </h4> 
      
      <a onClick={logoutHandler}>
        <h4>
          <GrLogout className="icon" /> Logout
        </h4>
      </a>
    </div>
  );
}

export default SideNav;
