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
import firebase from "react-native-firebase";
import type { Notification, NotificationOpen } from "react-native-firebase";
import AsyncStorage from '@react-native-community/async-storage';
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
  const channel = new firebase.notifications.Android.Channel(
    'default',
    'Channel Name',
    firebase.notifications.Android.Importance.Max
  ).setDescription('A natural description of the channel');
  firebase.notifications().android.createChannel(channel);
  this.checkPermission();

  this.createNotificationListeners();
  //  await SQIPCore.setSquareApplicationId(APPLICATION_ID)
  }
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }
  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
  }
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }
  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    console.log("notification function");
    this.notificationListener = firebase.notifications().onNotification(notification => {
        console.log("received")
      const localNotification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
      })
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
           .ios.setBadge(notification.ios.badge)
          .android.setChannelId("default")
          .android.setPriority(firebase.notifications.Android.Priority.High)
          .android.setSmallIcon("@drawable/ic_stat_gw_cleaners_new")
          .android.setColor('#769CF1');
        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
      });
  
    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
        // NavigationService.navigate("Orders", {
        //   // chatName: `${data.channelName}`,
        //   // chatId: `${data.channelId}`
        // });
   //     this.showAlert.bind(this, title, body);
      });
  
    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
   //   this.showAlert.bind(this, title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message));
    });
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
