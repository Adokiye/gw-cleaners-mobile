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
import SignIn from "./components/AuthenticationScreens/SignIn"
import Dashboard from "./components/Dashboard/index"
import DropBox from "./components/Dashboard/DropBox"
import Preferences from "./components/Preferences"
import Orders from "./components/Orders"
import OrderProcessed from "./components/OrderProcessed"
import Notifications from "./components/Notifications"
import PriceList from "./components/Dashboard/PriceList"
import Profile from "./components/Dashboard/Profile"
import MyCards from "./components/MyCards"
import Schedule from "./components/Schedule"
import Confirm from "./components/Confirm"
import AddCard from "./components/AddCard"
import CardSuccess from "./components/CardSuccess"
import SelectDropbox from "./components/Dropbox"
import { createStackNavigator } from "react-navigation";
import { persistor, store } from "./store/index";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/es/integration/react';
import {SQIPCore} from 'react-native-square-in-app-payments';
import {APPLICATION_ID} from './root.js'
type Props = {};
const RootStack = createStackNavigator({
  Home: {
    screen:  Splash           //Welcome
  },
  Welcome: {
    screen: Welcome
  },
  Schedule: {
    screen:  Schedule
  },
  Confirm:{
    screen: Confirm
  },
  WelcomeAnimation: {
    screen: WelcomeAnimation
 },
 CreateAccount: {
   screen: CreateAccount
 },
 SignIn: {
   screen: SignIn
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
 },
 SelectDropbox: {
   screen: SelectDropbox
 }
});

class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false
    };
  }
 async componentDidMount() {
    await SQIPCore.setSquareApplicationId(APPLICATION_ID)
  }
  render() {
    return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <RootStack />
        </View>
        </PersistGate>
        </Provider>
    );
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
