import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Checkbox, Form, Input } from "antd";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { gapi } from "gapi-script";
import "./Navbar.css";
import "antd/dist/antd.css";
import { GoogleLogin } from "@react-oauth/google";

export default function Navbar() {
  const [search, setSearch] = useState([]);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const [isHoverLogin, setIsHoverLogin] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [tokens, setTokens] = useState("");
  const [user, setUser] = useState([]);

  const handleGoogleLogin = (credential) => {
    localStorage.setItem("token", JSON.stringify(credential.credential));
    localStorage.setItem("user", JSON.stringify({ first_name: "Google User" }));
    setTimeout(function () {
      window.location.reload(1);
    }, 1500);
  };
  const submit = (e) => {
    navigate(`/Search/${search}`);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const handleMouseEnterLogin = () => {
    setIsHoverLogin(true);
  };

  const handleMouseLeaveLogin = () => {
    setIsHoverLogin(false);
  };

  const showModalLogin = () => {
    setIsModalLoginOpen(true);
  };
  const showModalLogout = () => {
    setIsModalLogoutOpen(true);
  };
  const showModalRegister = () => {
    setIsModalRegisterOpen(true);
  };
  const onFinish = async (value) => {
    console.log("Success: ", value);
    try {
      const res = await axios.post(
        "https://notflixtv.herokuapp.com/api/v1/users/login",
        value
      );
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("token", JSON.stringify(res.data.data.token));
    } catch (error) {}
    setTimeout(function () {
      window.location.reload(1);
    }, 1500);
    setIsModalLoginOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinishLogout = async (value) => {
    setTimeout(function () {
      window.location.reload(1);
    }, 1500);
    localStorage.clear();
    setIsModalLogoutOpen(false);
  };

  const onFinishFailedLogout = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onRegister = async (value) => {
    console.log("Success: ", value);
    try {
      const res = await axios.post(
        "https://notflixtv.herokuapp.com/api/v1/users",
        value
      );
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("token", JSON.stringify(res.data.data.token));
    } catch (error) {}
    setTimeout(function () {
      window.location.reload(1);
    }, 1500);
    setIsModalLoginOpen(false);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    setTokens(token);
    setUser(user);
  }, [tokens]);

  const onRegisterFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancelLogin = () => {
    setIsModalLoginOpen(false);
  };
  const handleCancelLogout = () => {
    setIsModalLogoutOpen(false);
  };
  const handleCancelRegister = () => {
    setIsModalRegisterOpen(false);
  };

  return (
    <div>
      {tokens ? (
        <nav>
          <div className="container">
            <div className="nav-main">
              <div className="nav-logo">
                <Link to="/">
                  <img
                    src={
                      "https://movielist-react-app.netlify.app/static/media/Logo.eeba5c17ddf85f2145e83dd963662921.svg"
                    }
                  ></img>
                </Link>
              </div>
              <div className="nav-menu">
                <div>
                  <form onSubmit={submit}>
                    <input
                      type="text"
                      className="input-all"
                      placeholder="What do you want to watch"
                      onChange={(e) => setSearch(e.target.value)}
                    ></input>
                    <BsSearch className="src" />
                  </form>
                </div>
              </div>
              <div className="login-regis">
                <h5 style={{ color: "white" }}>
                  {user.first_name || user.name}
                </h5>
                <div className="profile">
                  {user.image || user.imageUrl ? (
                    <img
                      onClick={showModalLogout}
                      src={user.image || user.imageUrl}
                    ></img>
                  ) : (
                    <img
                      onClick={showModalLogout}
                      src="https://th.bing.com/th/id/R.9d32bec8058bd3595a63a08a8cc12ade?rik=9cCTin36GLU%2f5w&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_87237.png&ehk=hVpH%2bC7rwlA1j2KqxGpMs1sp9l0RgM0jjRJsJsvDoPc%3d&risl=&pid=ImgRaw&r=0"
                    ></img>
                  )}
                </div>

                <Modal
                  title="Logout to Your Account"
                  open={isModalLogoutOpen}
                  onCancel={handleCancelLogout}
                  footer={[null]}
                >
                  <Form
                    wrapperCol={{
                      span: "100%",
                    }}
                    onFinish={onFinishLogout}
                    onFinishFailed={onFinishFailedLogout}
                    autoComplete="off"
                  >
                    <Form.Item>
                      <div className="footer-modal">
                        <Button
                          type="submit"
                          htmlType="submit"
                          style={{
                            borderRadius: "30px",
                            background: isHovering ? "#fd8d8d" : "red",
                            border: "1px solid red",
                            color: "white",
                            width: "fit-content",
                            cursor: "pointer",
                          }}
                        >
                          Logout
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            </div>
          </div>
          {/* {search && search.map((item) => <h1 style={{color:"white"}}>{item.title}</h1>)} */}
        </nav>
      ) : (
        <nav>
          <div className="container">
            <div className="nav-main">
              <div className="nav-logo">
                <Link to="/">
                  <img
                    src={
                      "https://movielist-react-app.netlify.app/static/media/Logo.eeba5c17ddf85f2145e83dd963662921.svg"
                    }
                  ></img>
                </Link>
              </div>
              <div className="nav-menu">
                <div>
                  <form onSubmit={submit}>
                    <input
                      type="text"
                      className="input-all"
                      placeholder="What do you want to watch"
                      onChange={(e) => setSearch(e.target.value)}
                    ></input>
                    <BsSearch className="src" />
                  </form>
                </div>
              </div>
              <div className="login-regis">
                <Button
                  onMouseEnter={handleMouseEnterLogin}
                  onMouseLeave={handleMouseLeaveLogin}
                  style={{
                    borderRadius: "30px",
                    background: "transparent",
                    borderColor: isHoverLogin ? "#fd8d8d" : "red",
                    color: isHoverLogin ? "#fd8d8d" : "red",
                    width: "90px",
                    height: "40px",
                    cursor: "pointer",
                  }}
                  onClick={showModalLogin}
                >
                  Login
                </Button>
                <Button
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    borderRadius: "30px",
                    background: isHovering ? "#fd8d8d" : "red",
                    border: "1px solid red",
                    color: "white",
                    width: "90px",
                    height: "40px",
                    cursor: "pointer",
                  }}
                  onClick={showModalRegister}
                >
                  Register
                </Button>
                <Modal
                  title="Log in to Your Account"
                  open={isModalLoginOpen}
                  onCancel={handleCancelLogin}
                  footer={[null]}
                >
                  <Form
                    wrapperCol={{
                      span: "100%",
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Email!",
                        },
                        { type: "email", message: "Please enter valid email" },
                      ]}
                    >
                      <Input
                        style={{ borderRadius: "30px" }}
                        placeholder="Email Address"
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password
                        style={{ borderRadius: "30px" }}
                        placeholder="Password"
                      />
                    </Form.Item>
                    <Form.Item>
                      <div className="footer-modal">
                        <Button
                          type="submit"
                          htmlType="submit"
                          style={{
                            borderRadius: "30px",
                            background: isHovering ? "#fd8d8d" : "red",
                            border: "1px solid red",
                            color: "white",
                            width: "fit-content",
                            cursor: "pointer",
                          }}
                        >
                          Login
                        </Button>
                      </div>
                    </Form.Item>
                    <div>
                      <GoogleLogin
                        style={{ borderRadius: "30px" }}
                        onSuccess={handleGoogleLogin}
                        onError={() => {
                          console.log("Login Failed");
                        }}
                      />
                    </div>
                  </Form>
                </Modal>
                <Modal
                  title="Create Account"
                  open={isModalRegisterOpen}
                  onCancel={handleCancelRegister}
                  footer={[null]}
                >
                  <Form
                    wrapperCol={{
                      span: "100%",
                    }}
                    onFinish={onRegister}
                    onFinishFailed={onRegisterFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      name="first_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your First Name!",
                        },
                        { whitespace: true },
                        { min: 3 },
                      ]}
                      hasFeedback
                    >
                      <Input
                        style={{ borderRadius: "30px" }}
                        placeholder="First Name"
                      />
                    </Form.Item>
                    <Form.Item
                      name="last_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Last Name!",
                        },
                        { whitespace: true },
                        { min: 3 },
                      ]}
                      hasFeedback
                    >
                      <Input
                        style={{ borderRadius: "30px" }}
                        placeholder="Last Name"
                      />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                        { type: "email", message: "Please enter valid email" },
                      ]}
                    >
                      <Input
                        style={{ borderRadius: "30px" }}
                        placeholder="Email Address"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          // message: "Please input your password!",
                        },
                        { min: 8 },
                        {
                          validator: (_, value) =>
                            value &&
                            value.match(
                              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
                            )
                              ? Promise.resolve()
                              : Promise.reject(
                                  "Password does not match criteria"
                                ),
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        style={{ borderRadius: "30px" }}
                        placeholder="Password"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password_confirmation"
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter the same password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              "The password you entered is not the same!"
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        style={{ borderRadius: "30px" }}
                        placeholder="Password Confirmation"
                      />
                    </Form.Item>
                    <Form.Item>
                      <div className="footer-modal">
                        <Button
                          type="submit"
                          htmlType="submit"
                          style={{
                            borderRadius: "30px",
                            background: isHovering ? "#fd8d8d" : "red",
                            border: "1px solid red",
                            color: "white",
                            width: "fit-content",
                            cursor: "pointer",
                          }}
                        >
                          Register Now
                        </Button>
                      </div>
                      ,
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            </div>
          </div>
          {/* {search && search.map((item) => <h1 style={{color:"white"}}>{item.title}</h1>)} */}
        </nav>
      )}
    </div>
  );
}
