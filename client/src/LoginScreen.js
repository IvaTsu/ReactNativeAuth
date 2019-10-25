import React, { Component } from "react";
import {
  AsyncStorage,
  StyleSheet,
  View,
  TextInput,
  Button
} from "react-native";
import axios from "axios";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  handleLogin = () => {
    const { username, password } = this.state;
    axios
      .post("http://10.54.0.158:3000/user/login", {
        username,
        password
      })
      .then(res => {
        try {
          const token = res.headers["x-auth"];
          if (token) {
            AsyncStorage.setItem("x-auth", token).then(() => {
              this.props.navigation.navigate("App");
            });
          }
        } catch {}
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
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Go to Register"
          onPress={() => this.props.navigation.navigate("Register")}
        />
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

export default LoginScreen;
