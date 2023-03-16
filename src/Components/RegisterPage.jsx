import React, { useState } from "react";
import axios from "axios";
import "./RegisterPage.css";

function RegisterPage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  //this function save data which is stored in placeholder
  const handelChange = (data) => {
    const { name, value } = data.target;

    setUserData({
      // we use ... (spread operator) to save the last change also , without this it will only save the latest word enterd by user
      ...userData,
      [name]: value, //[key] : value   here name and value will change accordingly with input tags
    });
  };

  const [showOtp, setShowOtp] = useState(false);
  const handelOtp = () => {
    const { name, email, password, confirmPassword, otp } = userData;
    console.log(otp);
    if (name && email && password && password === confirmPassword) {
      setShowOtp(true);
      if (showOtp) {
        axios
          .post("http://localhost:9191/register", userData)
          .then((res) => alert(res.data.message))
          .catch((err) => alert(err));
      }
    } else alert("invalid");
  };

  const handelRegister = () => {
    const { name, email, password, confirmPassword } = userData;

    //to check all the conditions
    if (name && email && password && password === confirmPassword) {
      axios
        .post("http://localhost:9191/register", userData)
        .then((res) => alert(res.data.message))
        .catch((err) => alert(err));
      setShowOtp(true);
    } else alert("invalid");
  };

  const generateOTP = () => {
    axios
      .post("http://localhost:9191/generateOTP", userData.email)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="lolo">
        <div className="registerMain">
          <div className="registerBoxHeading">
            <h4>register</h4>
          </div>

          <div className="registerForm">
            <label>Name</label>

            <input
              value={userData.name}
              name="name"
              type="text"
              placeholder="Name"
              onChange={handelChange}
            />
            <br />
            <label>Email</label>
            <input
              value={userData.email}
              name="email"
              type="text"
              placeholder="Email"
              onChange={handelChange}
            />
            <br />
            <label>Password</label>
            <input
              value={userData.password}
              name="password"
              type="password"
              placeholder="Password"
              onChange={handelChange}
            />
            <br />
            <label>Confirm Password</label>
            <input
              value={userData.confirmPassword}
              name="confirmPassword"
              type="Password"
              placeholder="confirmPassword"
              onChange={handelChange}
            />
            <div className="registerButton">
              <button onClick={handelRegister}>Generate OTP</button>
            </div>

            {showOtp ? (
              <>
                <br />
                <label>Enter OTP</label>
                <input
                  name="otp"
                  value={userData.otp}
                  onChange={handelChange}
                  type="password"
                  placeholder="OTP"
                />
                <span>An otp sent to your mail id</span>
                <button onClick={handelOtp}>Register</button>
                <button>resend otp</button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
