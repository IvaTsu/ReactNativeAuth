import React, { Component } from "react";
import {
  StyleSheet,
  AsyncStorage,
  View,
  ActivityIndicator,
  StatusBar
} from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import LoginScreen from "./src/LoginScreen";
import RegisterScreen from "./src/RegisterScreen";
import ProfileScreen from "./src/ProfileScreen";
import Axios from "axios";

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // AsyncStorage.getItem("x-auth")
    //   .then(token => {
    //     Axios.get("http://10.54.0.158:3000/private/private", {
    //       headers: {
    //         "x-auth": token
    //       }
    //     }).then(res => {
    //       this.props.navigation.navigate(res.status == 200 ? "App" : "Auth");
    //     });
    //   })
    //   .catch(err => {
    //     if (err) {
    //       console.log(err);
    //       this.props.navigation.navigate("Auth");
    //     }
    //   });
    const token = await AsyncStorage.getItem("x-auth");
    this.props.navigation.navigate(token ? "App" : "Auth");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const AppStack = createStackNavigator({ Home: ProfileScreen });
const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
