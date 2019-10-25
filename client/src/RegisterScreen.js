import React, { Component } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import axios from "axios";

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", email: "" };
  }

  handleRegister = () => {
    const { email, username, password } = this.state;
    axios
      .post("http://10.54.0.158:3000/user/register", {
        email,
        username,
        password
      })
      .then(res => {
        if (res.status == 201) {
          this.props.navigation.navigate("Login");
        }
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            width: "80%",
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          placeholder="email"
        />
        <TextInput
          style={{
            height: 40,
            width: "80%",
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
          placeholder="username"
        />
        <TextInput
          style={{
            height: 40,
            width: "80%",
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          placeholder="password"
          secureTextEntry
        />
        <Button title="Register" onPress={this.handleRegister} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default RegisterScreen;
