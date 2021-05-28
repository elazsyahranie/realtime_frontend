import React, { Component } from "react";
// import { useState } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import loginStyle from "./Register.module.css";
import { connect } from "react-redux";
import { RegisterUser } from "../../../redux/action/auth";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userFullName: "",
        userPassword: "",
      },
      msg: "",
    };
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleRegister = (event) => {
    event.preventDefault();
    console.log(this.state.form);
    this.props.RegisterUser(this.state.form).then((result) => {
      console.log(result);
    });
  };

  render() {
    const { userFullName, userPassword } = this.state.form;
    return (
      <>
        <Container>
          <Row className="w-100">
            <Col
              lg={6}
              md={6}
              sm={12}
              xs={12}
              className={`${loginStyle.whiteBackground} mx-auto formPosition`}
            >
              <Row className={`w-100 px-5`}>
                <h4 className={`${loginStyle.purpleText} text-center py-4`}>
                  Register
                </h4>
                <h6 className={`py-4`}>Hi! Welcome back</h6>
                <Form className="w-100" onSubmit={this.handleRegister}>
                  <Form.Group className="mb-4">
                    <Form.Label className={loginStyle.grayText}>
                      Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      bsStyle="default"
                      className={loginStyle.formBelowOnly}
                      name="userFullName"
                      value={userFullName}
                      onChange={(event) => this.changeText(event)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className={loginStyle.grayText}>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      bsStyle="default"
                      name="userPassword"
                      value={userPassword}
                      className={loginStyle.formBelowOnly}
                      onChange={(event) => this.changeText(event)}
                      placeholder="Password"
                    />
                  </Form.Group>
                  <span className="text-end d-block pt-4 pb-5">
                    Forgot password?
                  </span>
                  <button className={`${loginStyle.lightBlueButton} btn w-100`}>
                    Login
                  </button>
                  <span className={`${loginStyle.loginline} py-4`}>
                    Login With
                  </span>
                  <button
                    className={`${loginStyle.lightBlueButtonOutline} btn w-100`}
                    type="submit"
                  >
                    Google
                  </button>
                  <span className={`d-block text-center py-5`}>
                    Don't have an account? Sign up
                  </span>
                </Form>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = { RegisterUser };

export default connect(null, mapDispatchToProps)(Register);
