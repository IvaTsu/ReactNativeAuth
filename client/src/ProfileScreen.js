import React, { Component } from "react";
import { StyleSheet, View, Text, AsyncStorage, Button } from "react-native";
import Axios from "axios";
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: null
    };
  }

  componentDidMount() {
    this._getData();
  }

  _getData = () => {
    AsyncStorage.getItem("x-auth").then(token =>
      Axios.get("http://10.54.0.158:3000/private/private", {
        headers: {
          "x-auth": token
        }
      }).then(res => {
        this.setState({
          res: JSON.stringify(res.data.message)
        });
      })
    );
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.res}</Text>
        <Button title="Log Out" onPress={this._signOutAsync} />
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

export default ProfileScreen;
