/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
  Alert,
  TouchableOpacity
} from "react-native";
import Splash from "./components/Splash";
import Welcome from "./components/Welcome";
import WelcomeAnimation from "./components/WelcomeAnimation";
import CreateAccount from "./components/AuthenticationScreens/CreateAccount"
import Dashboard from "./components/Dashboard/index"
import DropBox from "./components/Dashboard/DropBox"
import Preferences from "./components/Preferences"
import Orders from "./components/Orders"
import OrderProcessed from "./components/OrderProcessed"
import Notifications from "./components/Notifications"
import PriceList from "./components/Dashboard/PriceList"
import Profile from "./components/Dashboard/Profile"
import MyCards from "./components/MyCards"
import AddCard from "./components/AddCard"
import CardSuccess from "./components/CardSuccess"
import { createStackNavigator } from "react-navigation";
type Props = {};
const RootStack = createStackNavigator({
  Home: {
    screen: Welcome
  },
  WelcomeAnimation: {
    screen: WelcomeAnimation
 },
 CreateAccount: {
   screen: CreateAccount
 },
 Dashboard: {
   screen: Dashboard
 },
 DropBox: {
screen: DropBox
 },
 Preferences: {
   screen: Preferences
 },
 Orders: {
   screen: Orders
 },
 OrderProcessed: {
   screen: OrderProcessed
 },
 Notifications: {
   screen: Notifications
 },
 PriceList: {
   screen: PriceList
 },
 Profile: {
   screen: Profile
 },
 MyCards: {
   screen: MyCards
 },
 AddCard: {
   screen: AddCard
 },
 CardSuccess: {
   screen:  CardSuccess
 }
});

class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false
    };
  }
  componentDidMount() {
    // SplashScreen.hide()
  }
  render() {
    setTimeout(() => {
      this.setState({ timePassed: true });
    }, 500);
    if (this.state.timePassed) {
      return (
        <View style={styles.container}>
          <RootStack />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Splash />
        </View>
      );
    }
  }
}
/*function connectWithStore(store, WrappedComponent, ...args) {
  var ConnectedWrappedComponent = connect(...args)(WrappedComponent);
  return function(props) {
    return <ConnectedWrappedComponent {...props} store={store} />;
  };
}*/
/*const App = connectWithStore(
  store,
  reduxApp,
  mapStateToProps,
 // mapDispatchToProps
);*/
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});
