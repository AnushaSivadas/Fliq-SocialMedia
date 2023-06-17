import React,{useState} from "react";
import "./Auth.css";
import Logo from "../../imgs/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../actions/AuthActions.js";

const Auth = () => {

  const loading = useSelector((state) => state.authReducer.loading);
  const [data, setData] = useState({username:"",password:""});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(data,navigate))    
  };

  return (
    <div className="Auth App">

      {/* left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Fliq Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* right side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}> 
          <h3>Admin Log In</h3>
  
          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
                onChange={handleChange}
            />
          </div>
  
          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
                onChange={handleChange}
            />
          </div>
  
          <div >
             
          <button className="button infoButton"
            type="submit"
            disabled={loading} >
             {loading ? "Loading..." : "Login"}
             </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default Auth;