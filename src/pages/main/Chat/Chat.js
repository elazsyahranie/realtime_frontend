import React, { Component } from "react";
import Navbar from "../../../components/Navbar";
import styles from "./Chat.module.css";
// import axiosApiInstances from "../../utils/axios";
import { Container, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";

import { roomchat } from "../../../redux/action/roomchat";
// import { login } from "../../../redux/action/auth";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: "",
        message: "",
        messages: "",
      },
    };
  }

  componentDidMount = () => {
    this.handleRoomChat();
    console.log("Test ComponentDidMount");
  };

  componentDidUpdate = () => {
    if (this.props.socket) {
      this.props.socket.on("chatMessage", (dataMessage) => {
        this.setMessages(...this.messages, dataMessage);
      });
    }
  };

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleRoomChat = () => {
    this.props.roomchat(3).then((result) => {
      console.log(result.value.data.data);
    });
  };

  handleChat = (event) => {
    const { message } = this.state.form;
    const { user_name } = this.props.auth.data;
    console.log(`${user_name}: ${message}`);
    console.log(this.props.socket);
    const tryChat = { user_name, message };
    this.props.socket.emit("globalMessage", tryChat);
    event.preventDefault(); //event dipakai kalau ingin pindah halaman
    // console.log(this.state.form);
    // console.log(this.props.login);
  };

  render() {
    const { username, message } = this.state.form;
    const { user_name } = this.props.auth.data;
    console.log(this.props);
    return (
      <>
        <Container className="text-center pb-3">
          <Navbar />
        </Container>
        <Container fluid>
          <Row>
            <Col lg={3} md={3} sm={3} xs={12}>
              <h1>Telegram</h1>
              <Row className={`${styles.chat}`}>
                {this.props.chatlist.data.map((item, index) => {
                  return (
                    <p key={index} className={styles.room}>
                      {item.user_name}
                    </p>
                  );
                })}
              </Row>
            </Col>
            <Col lg={9} md={9} sm={9} xs={12}>
              <Row className={`${styles.chat}`}>
                <h2>Room Chat Here!</h2>
                <Form onSubmit={this.handleChat}>
                  <p></p>
                  <input
                    className={styles.inputMessage}
                    type="text"
                    onChange={(event) => this.changeText(event)}
                    name="message"
                    value={message}
                    placeholder="Message"
                  />
                  <button className={styles.btnSubmit} type="submit">
                    Send
                  </button>
                </Form>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

// mapStatetoProps digunakan untuk mengambil data dari redux
const mapStateToProps = (state) => ({
  auth: state.auth,
  chatlist: state.roomchat,
});

// Untuk menjalankan 'const login' atau apapun yang sudah di export oleh action/auth
const mapDispatchToProps = { roomchat };

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
