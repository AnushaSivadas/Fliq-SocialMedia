import React, { useState,useEffect } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { logIn, signUp } from "../../actions/AuthActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const loading = useSelector((state) => state.authReducer.loading);
  const error = useSelector((state) => state.authReducer.error);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);

  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPass: "",
  });

  const [confirmPass, setConfirmPass] = useState(true);

  

  // const dispatch = useDispatch()

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setErrors({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmPass: "",
    });
    setConfirmPass(confirmPass);
  };

  // handle Change in input
  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = /^[A-Za-z]+$/;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "firstname" || name === "lastname") {
      if (!value.match(regex)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Only alphabets are allowed",
        }));
      } else if (value.length > 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `Maximum length is 10 characters`,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    } else if (name === "username" && isSignUp) {
      const regex = /^[a-z0-9_.]+$/;
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      } else if (!value.match(regex)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]:
            "Only lowercase alphabets, digits, underscore, and dot are allowed",
        }));
      } else if (value.length > 15) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Maximum username length is 15 characters",
        }));
      } else if (!value.match(/[a-z]/i)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Username must contain at least one alphabet",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    } else if (name === "password" && isSignUp) {
      const regex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      } else if (!value.match(regex)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]:
            "Must contain 8-16 letters,a special\ncharacter,a capital letter",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    } else if (name === "confirmpass") {
      if (value !== data.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Password does not match",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }

  };

  // Form Submission
  const handleSubmit = (e) => {
    // setConfirmPass(true);

    const isFormValid =
      Object.values(data).every((value) => value.trim() !== "") &&
      Object.values(errors).every((error) => error === "");

    e.preventDefault();
    if (isSignUp) {
      if (isFormValid) {
        // data.password === data.confirmpass
        // ? dispatch(signUp(data, navigate))
        // : setConfirmPass(false);
        dispatch(signUp(data, navigate));
      } else {
        // Display error message to fill all fields
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstname:
            data.firstname.trim() === "" ? "First Name is required" : "",
          lastname: data.lastname.trim() === "" ? "Last Name is required" : "",
          username: data.username.trim() === "" ? "Username is required" : "",
          password: data.password.trim() === "" ? "Password is required" : "",
          confirmpass:
            data.confirmpass.trim() === ""
              ? "Confirm Password is required"
              : "",
        }));
      }
    } else {
      console.log("data",data)
      dispatch(logIn(data, navigate));
    }
  };

  return (
    <div className="Auth">
      {/* left side */}

      <div className="a-left">
        <img src={Logo} alt="" />

        <div className="Webname">
          <h1>Fliq Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* right form side */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <div>
              <div className="inputContainer">
                <input
                  // required
                  type="text"
                  placeholder="First Name"
                  className="infoInput"
                  name="firstname"
                  value={data.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && (
                  <span className="error">{errors.firstname}</span>
                )}
              </div>
              <div className="inputContainer">
                <input
                  // required
                  type="text"
                  placeholder="Last Name"
                  className="infoInput"
                  name="lastname"
                  value={data.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && (
                  <span className="error">{errors.lastname}</span>
                )}
              </div>
            </div>
          )}

          <div>
            <input
              // required
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>

          {errors.username && (
            <span className="error" style={{ margin: "0px" }}>
              {errors.username}
            </span>
          )}
          <div>
            {isSignUp && (
              <div className="inputContainer">
                <input
                  // required
                  type="password"
                  className="infoInput"
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className="error" style={{ whiteSpace: "pre-wrap" }}>
                    {errors.password}
                  </span>
                )}
              </div>
            )}
            {!isSignUp && (
              <input
                // required
                type="password"
                className="infoInput"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
            )}
            {isSignUp && (
              <div className="inputContainer">
                <input
                  // required
                  type="password"
                  className="infoInput"
                  name="confirmpass"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
                {errors.confirmpass && (
                  <span className="error">{errors.confirmpass}</span>
                )}
              </div>
            )}
          </div>
          {/* <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span> */}

          {isSignUp ? (
            ""
          ) : (
            <span
              style={{
                color: "red",
                fontSize: "12px",
                alignSelf: "flex-end",
                marginRight: "5px",
                display: error ? "block" : "none",
              }}
            >
              *{error}
            </span>
          )}
          {isSignUp && Object.values(errors).some((error) => error !== "") && (
            <div className="inputContainer">
              <span className="error">Please fill all the fields</span>
            </div>
          )}

          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account Login"
                : "Don't have an account Sign up"}
            </span>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
