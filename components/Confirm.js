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
import Loader from "./Includes/Loader";
import { API_URL } from "../root.js";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { setDropoffTime, setPickupTime } from "../actions/index";
import DatePicker from "react-native-date-picker";
var moment = require("moment");

type Props = {};
import { connect } from "react-redux";
const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => {
  return {
    setDropoffTime: dropoffTime => dispatch(setDropoffTime(dropoffTime)),
    setPickupTime: pickupTime => dispatch(setPickupTime(pickupTime))
  };
};
class reduxConfirm extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };

  constructor(props) {
    super(props);
    this.state = {
      regLoader: false,
      cards: [],
      datePickup: new Date(),
      dateDropoff: new Date()
    };
  }
  componentDidMount() {}
  dropoff(date) {
    console.log(date + " dropff");
    this.setState({ dateDropoff: date });
    this.props.setDropoffTime(date);
  }
  pickup(date) {
    console.log(date + " pick up");
    this.setState({ datePickup: date });
    this.props.setPickupTime(date);
  }
  createOrder() {
    this.setState({regLoader: true})
    const {params} = this.props.navigation.state
    var config = {
      headers: { Authorization: "Bearer " + this.props.token },
      timeout: 20000
    };
    axios
      .get(API_URL + "cards/" + this.props.id, config)
      .then(response => {
        let check = false;
        let card_id = "";
        console.log(response);
        if (response.data && response.data.length > 0) {
          console.log("response.data");
          console.log("here" + response.data);
          var len = response.data.length;
          //    this.setState({cards: []})
          for (let i = 0; i < len; i++) {
            let row = response.data[i];
            // this.setState(prevState => ({
            //   cards: [...prevState.cards, row]
            // }));
            if (row.default) {
              check = true;
              card_id = row._id;
            }
          }
          if (check) {
            this.makeOrder.bind(this, card_id);
          } else {
            this.props.navigation.navigate("MyCards", {
              order: true,
              preference: this.props.preferences,
              price: this.props.price
            });
          }
        } else {
          this.props.navigation.navigate("AddCard", {
            order: true,
            preferences: params.preferences || null
          });
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
  next() {
    if (this.props.dropoffTime) {
      Toast.show(
        "Select the date and time you want your clothes to be dropped off"
      );
    } else if (this.props.pickupTime) {
      Toast.show(
        "Select the date and time you want your clothes to be picked up"
      );
    } else {
      this.props.navigation.navigate("Preferences");
    }
  }
  makeOrder(card_id) {
    const { params } = this.props.navigation.state;
    this.setState({ regLoader: true });
    var config = {
      headers: { Authorization: "Bearer " + this.props.token },
      timeout: 20000
    };
    var bodyParameters = {
      card_id: card_id,
      user_id: this.props.id,
      preference: this.props.preference,
      dropoff_date: this.props.dropoffDate,
      pickup_date: this.props.pickupDate,
      dropoff_time: this.props.dropoffTime,
      pickup_time: this.props.pickupTime,
      dropbox_id: this.props.dropboxId,
      dropbox_address: this.props.dropbox_address
    };
    //  console.log(bodyParameters)
    axios
      .post(API_URL + "orders", bodyParameters, config)
      .then(response => {
        console.log(response);
        Toast.show("Success");
        this.setState({ regLoader: false });
        this.props.navigation.navigate("OrderProcessed");
      })
      .catch(error => {
        console.log(error);
        this.setState({ regLoader: false });
        if (error) {
          Toast.show(error.message);
          console.log(JSON.stringify(error));
        }
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
        <Image
          source={require("../assets/images/washitBack.png")}
          resizeMode="cover"
          style={{position: 'absolute', width: 187, height: 50, top: 0, right: 0}}
        />
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require("../assets/images/back.png")}
              resizeMode={"contain"}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
          <View style={styles.welcomeBox}>
            <Text style={styles.hiText}>Confirm</Text>
          </View>
          <Image
            source={require("../assets/images/plus.png")}
            resizeMode={"contain"}
            style={{ width: 21, height: 21, marginLeft: "65%", opacity: 0 }}
          />
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1,  }}>
        <View style={styles.clothTypeView}>
          <Text style={styles.clothTypeText}>Dropoff date and Time</Text>
          <Text style={styles.clothTypeInsideText}>
            {moment(this.props.dropoffDate).format("dddd, MMMM Do YYYY") +
              " " +
              this.props.dropoffTime}
          </Text>
          <Text style={styles.clothTypeText}>Pickup date and time</Text>
          <Text style={styles.clothTypeInsideText}>
            {moment(this.props.pickupDate).format("dddd, MMMM Do YYYY") +
              " " +
              this.props.pickupTime}
          </Text>
          <Text style={styles.clothTypeText}>Dropbox Address</Text>
          <Text style={styles.clothTypeInsideText}>
            {this.props.dropboxAddress}
          </Text>
              {/* <Text style={styles.clothTypeText}>Preferences</Text>
              <Text style={styles.clothTypeInsideText}>
                {this.props.preferences}
              </Text> */}
              </View>
        </ScrollView>
        <View style={styles.houseBottomButton}>
          <TouchableOpacity
            onPress={this.createOrder.bind(this)}
            activeOpacity={0.7}
          >
            <View style={styles.placeOrderView}>
              <Text style={styles.placeText}>Proceed</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("SelectDropbox", { order: true })
            }
            activeOpacity={0.7}
          >
            <View style={styles.iplaceOrderView}>
              <Text style={styles.iplaceText}>Make Changes</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.state.regLoader ? <Loader /> : null}
      </View>
    );
  }
}
const Confirm = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxConfirm);
const dimensions = Dimensions.get("window");
const Width = dimensions.width;
export default Confirm;
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
    fontFamily: "mont-bold",
    fontSize: 26
  },
  clothTypeView: {
    width: "87.5%",
    marginTop: 17,
    alignSelf: "center",
    marginBottom: 10,
    flexDirection: 'column',
  },
  clothTypeText: {
    color: "#000",
    fontFamily: "mont-semi",
    fontSize: 16,
    marginTop: 10
    //  marginLeft: 15
  },
  clothTypeInsideText: {
    color: "#000",
    fontFamily: "mont-extraBold",
    fontSize: 15,
    width: '95%',
    alignSelf: 'center',
    textAlign: 'center'
  },
  houseBottomButton: {
    width: "95%",
    marginTop: 17,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-evenly"
  },
  placeOrderView: {
    width: 140,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 19.67,
    alignSelf: "center",
    // marginTop: 10,
    backgroundColor: "#769CF1",
    marginBottom: 10
  },
  placeText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "mont-bold"
  },
  iplaceOrderView: {
    width: 140,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 19.67,
    alignSelf: "center",
    //  marginTop: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: '#769CF1'
    // marginBottom: 10,
  },
  iplaceText: {
    color: "#769CF1",
    fontSize: 15,
    fontFamily: "mont-bold"
  }
});
