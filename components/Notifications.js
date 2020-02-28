import React, { Component } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  NetInfo,
  Animated,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  FlatList,
  Alert,
  TouchableOpacity,
  RefreshControl
} from "react-native";
//import LoaderModal from './Modals/LoaderModal';
//var SharedPreferences = require("react-native-shared-preferences");
type Props = {};
import Loader from "./Includes/Loader";
import { API_URL } from "../root.js";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { connect } from "react-redux";
var moment = require("moment");
const mapStateToProps = state => ({
  ...state
});
const options = [{ label: "", value: "true" }, { label: "", value: "false" }];
class reduxNotifications extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };

  constructor(props) {
    super(props);
    this.state = {
      regLoader: false,
      separateWhites: ""
    };
    this.getNotifications = this.getNotifications.bind(this);
  }
  componentDidMount() {
    this.getNotifications();
  }
  getNotifications() {
    console.log(this.state.token);
    this.setState({ regLoader: true });
    var config = {
      headers: { Authorization: "Bearer " + this.props.token },
      timeout: 20000
    };
    axios
      .get(API_URL + "notifications/" + this.props.id, config)
      .then(response => {
        console.log(response);
        if (response.data && response.data.length > 0) {
          console.log("response.data");
          console.log("here" + response.data);
          var len = response.data.length;
          this.setState({ notifications: [] });
          for (let i = 0; i < len; i++) {
            let row = response.data[i];
            this.setState(prevState => ({
              notifications: [...prevState.notifications, row]
            }));
          }
        }
        this.setState({ regLoader: false, fetch: false });
      })
      .catch(error => {
        this.setState({ regLoader: false });
        if (error.code == "ECONNABORTED") {
          Toast.show("Connection TImeout");
        } else {
          Toast.show(error.message);
        }
        console.log(error);
      });
  }
  render() {
    let notifications = (
      <FlatList
        data={this.state.notifications}
        extraData={this.state}
        renderItem={({ item, index }) => (
          <View style={styles.notificationBox}>
            <Text style={styles.notificationText}>{item.description}</Text>
            <Text style={styles.timeText}>
              {" "}
              {moment(item.createdAt).format("dddd, MMMM Do YYYY") !=
              moment().format("dddd, MMMM Do YYYY")
                ? moment(item.createdAt).format("MMMM Do YYYY")
                : moment(item.createdAt).format("hh:MM:ss")}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => `list-item-${index}`}
      />
    );
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
        <Image
          source={require("../assets/images/washitBack.png")}
          resizeMode="cover"
          style={{position: 'absolute', width: 187, height: 50, top: 0, right: 0}}
        />
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            hitSlop={{ left: 2, top: 2, right: 2, bottom: 2 }}
          >
            <Image
              source={require("../assets/images/back.png")}
              resizeMode={"contain"}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
          <View style={styles.welcomeBox}>
            <Text style={styles.hiText}>Notifications</Text>
          </View>
        </View>
        {notifications}
        {this.state.regLoader && <Loader />}
      </View>
    );
  }
}
const Notifications = connect(mapStateToProps)(reduxNotifications);
const dimensions = Dimensions.get("window");
const Width = dimensions.width;
export default Notifications;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center"
  },
  headerView: {
    width: "100%",
    height: 100,
    backgroundColor: "#769CF1",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    marginBottom: 15
    //     justifyContent: 'space-between',
  },
  welcomeBox: {
    flexDirection: "column",
    marginLeft: 13
  },
  dateText: {
    fontFamily: "mont-reg",
    fontSize: 13,
    color: "#fff"
  },
  hiText: {
    color: "#fff",
    fontFamily: "mont-semi",
    fontSize: 20
  },
  notificationBox: {
    width: Width * (84.267 / 100),
    height: 70,
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 2,
    flexDirection: "row",
    paddingLeft: 13,
    paddingRight: 13,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    borderRadius: 4
  },
  notificationText: {
    width: "79.114%",
    textAlign: "center",
    color: "#000",
    fontFamily: "mont-reg",
    fontSize: 12
  },
  timeText: {
    color: "#AFACAC",
    fontSize: 7,
    fontFamily: "mont-semi"
  }
});
