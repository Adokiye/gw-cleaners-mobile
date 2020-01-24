import React, { Component, Fragment } from "react";
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
import {
  setDropoffTime,
  setPickupTime,
  setDropoffDate,
  setPickupDate
} from "../actions/index";
import DatePicker from "react-native-date-picker";

type Props = {};
import { connect } from "react-redux";
const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => {
  return {
    setDropoffTime: dropoffTime => dispatch(setDropoffTime(dropoffTime)),
    setPickupTime: pickupTime => dispatch(setPickupTime(pickupTime)),
    setPickupDate: pickupDate => dispatch(setPickupDate(pickupDate)),
    setDropoffDate: dropoffDate => dispatch(setDropoffDate(dropoffDate))
  };
};
class reduxSchedule extends Component<Props> {
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
      dateDropoff: new Date(),
      maxDateDropOff: new Date().setDate(new Date().getDate() + 3),
      pickup: false,
      time_variable: "",
      time_variableP: ""
    };
    this.dropoff = this.dropoff.bind(this);
    this.pickup = this.pickup.bind(this);
  }
  componentDidMount() {}
  timeDropoff(time) {
    this.props.setDropoffTime('');
    this.setState({ time_variable: time });
    this.props.setDropoffTime(time);
    console.log(time + "<= time-dropoff");
    if (time && this.props.dropoffDate) {
      this.setState({ pickup: true });
    }
  }
  timePickup(time) {
    this.props.setPickupTime('');
    this.setState({ time_variableP: time });
    this.props.setPickupTime(time);
  }
  dropoff(date) {
    this.props.setDropoffDate('');
    console.log(date + " dropff");
    //    Toast.show(JSON.Stringify(date))
    date.setHours(0, 0, 0, 0);
    this.setState({ dateDropoff: date });
    //   let date_change = date;
    //  this.setState({minDate: date_change.setDate(date_change.getDate() + 1)});
    this.props.setDropoffDate(date);
    if (date && this.state.time_variable) {
      this.setState({ pickup: true });
    }
  }
  pickup(date) {
    this.props.setPickupDate('');
    console.log(date + " pick up");
    //     Toast.show(JSON.Stringify(date))
    date.setHours(0, 0, 0, 0);
    if (date <= this.state.dateDropoff) {
      Toast.show(
        "Select a pickup date is is at least 24 hrs from dropoff date"
      );
      // this.setState({datePickup: new})
      //  this.props.setPickupDate(null)
    } else {
      this.setState({ datePickup: date });
      this.props.setPickupDate(date);
    }
  }
  next() {
    if (!this.props.dropoffTime) {
      Toast.show("Select the time you want to drop your clothes");
    } else if (!this.props.pickupTime) {
      Toast.show("Select the time you want to pick your clothes");
    } else if (!this.props.pickupDate) {
      Toast.show("Select the date you want to pick your clothes");
    } else if (!this.props.dropoffDate) {
      Toast.show("Pick the date you want to drop your clothes");
    } else if (this.state.datePickup <= this.state.dateDropoff) {
      Toast.show("Pick a pickup date is is at least 24 hrs from dropoff date");
    } else {
      this.props.navigation.navigate("Preferences");
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Image
            source={require("../assets/images/topAbstract.png")}
            resizeMode={"contain"}
            style={{
              position: "absolute",
              width: 187,
              height: 50,
              top: 0,
              right: 0
            }}
          />
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require("../assets/images/back.png")}
              resizeMode={"contain"}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
          <View style={styles.welcomeBox}>
            <Text style={styles.hiText}>Schedule</Text>
          </View>
          <Image
            source={require("../assets/images/plus.png")}
            resizeMode={"contain"}
            style={{ width: 21, height: 21, marginLeft: "65%", opacity: 0 }}
          />
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.clothTypeView}>
            <Text style={styles.clothTypeText}>Schedule Dropoff Date</Text>
          </View>
          <DatePicker
            date={this.state.dateDropoff}
            onDateChange={date => this.dropoff(date)}
            minimumDate={new Date()}
            maximumDate={this.state.maxDateDropOff}
            mode={"date"}
          />
          <View style={styles.clothTypeView}>
            <Text style={styles.clothTypeText}>Schedule Dropoff Time</Text>
          </View>
          <View style={styles.timeParentView}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.timeDropoff.bind(this, "6am-8am")}
            >
              <View
                style={
                  this.state.time_variable == "6am-8am"
                    ? styles.timeChosenView
                    : styles.timeUnchosenView
                }
              >
                <Text
                  style={
                    this.state.time_variable == "6am-8am"
                      ? styles.timeChosenText
                      : styles.timeUnhosenText
                  }
                >
                  6am-8am
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.timeDropoff.bind(this, "8am-10am")}
            >
              <View
                style={
                  this.state.time_variable == "8am-10am"
                    ? styles.timeChosenView
                    : styles.timeUnchosenView
                }
              >
                <Text
                  style={
                    this.state.time_variable == "8am-10am"
                      ? styles.timeChosenText
                      : styles.timeUnhosenText
                  }
                >
                  8am-10am
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.timeDropoff.bind(this, "10am-12pm")}
            >
              <View
                style={
                  this.state.time_variable == "10am-12pm"
                    ? styles.timeChosenView
                    : styles.timeUnchosenView
                }
              >
                <Text
                  style={
                    this.state.time_variable == "10am-12pm"
                      ? styles.timeChosenText
                      : styles.timeUnhosenText
                  }
                >
                  10am-12pm
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.timeParentView}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.timeDropoff.bind(this, "12pm-2pm")}
            >
              <View
                style={
                  this.state.time_variable == "12pm-2pm"
                    ? styles.timeChosenView
                    : styles.timeUnchosenView
                }
              >
                <Text
                  style={
                    this.state.time_variable == "12pm-2pm"
                      ? styles.timeChosenText
                      : styles.timeUnhosenText
                  }
                >
                  12pm-2pm
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.timeDropoff.bind(this, "2pm-4pm")}
            >
              <View
                style={
                  this.state.time_variable == "2pm-4pm"
                    ? styles.timeChosenView
                    : styles.timeUnchosenView
                }
              >
                <Text
                  style={
                    this.state.time_variable == "2pm-4pm"
                      ? styles.timeChosenText
                      : styles.timeUnhosenText
                  }
                >
                  2pm-4pm
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.timeDropoff.bind(this, "4pm-6pm")}
            >
              <View
                style={
                  this.state.time_variable == "4pm-6pm"
                    ? styles.timeChosenView
                    : styles.timeUnchosenView
                }
              >
                <Text
                  style={
                    this.state.time_variable == "4pm-6pm"
                      ? styles.timeChosenText
                      : styles.timeUnhosenText
                  }
                >
                  4pm-6pm
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.timeParentView}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.timeDropoff.bind(this, "6pm-8pm")}
            >
              <View
                style={
                  this.state.time_variable == "6pm-8pm"
                    ? styles.timeChosenView
                    : styles.timeUnchosenView
                }
              >
                <Text
                  style={
                    this.state.time_variable == "6pm-8pm"
                      ? styles.timeChosenText
                      : styles.timeUnhosenText
                  }
                >
                  6pm-8pm
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.timeDropoff.bind(this, "8pm-10pm")}
            >
              <View
                style={
                  this.state.time_variable == "8pm-10pm"
                    ? styles.timeChosenView
                    : styles.timeUnchosenView
                }
              >
                <Text
                  style={
                    this.state.time_variable == "8pm-10pm"
                      ? styles.timeChosenText
                      : styles.timeUnhosenText
                  }
                >
                  8pm-10pm
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.timeDropoff.bind(this, "10pm-12am")}
            >
              <View
                style={
                  this.state.time_variable == "10pm-12am"
                    ? styles.timeChosenView
                    : styles.timeUnchosenView
                }
              >
                <Text
                  style={
                    this.state.time_variable == "10pm-12am"
                      ? styles.timeChosenText
                      : styles.timeUnhosenText
                  }
                >
                  10pm-12am
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.timeParentView}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.timeDropoff.bind(this, "12am-6am")}
            >
              <View
                style={
                  this.state.time_variable == "12am-6am"
                    ? styles.timeChosenView
                    : styles.timeUnchosenView
                }
              >
                <Text
                  style={
                    this.state.time_variable == "12am-6am"
                      ? styles.timeChosenText
                      : styles.timeUnhosenText
                  }
                >
                  12am-6am
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {this.state.pickup && (
            <View style={styles.clothTypeView}>
              <Text style={styles.clothTypeText}>Schedule Pickup Date</Text>
            </View>
          )}
          {this.state.pickup && (
            <DatePicker
              date={this.state.datePickup}
              onDateChange={date => this.pickup(date)}
              minimumDate={new Date()}
              mode={"date"}
            />
          )}
          {this.state.pickup && (
            <View style={styles.clothTypeView}>
              <Text style={styles.clothTypeText}>Schedule Pickup Time</Text>
            </View>
          )}
          {this.state.pickup && (
            <View style={styles.timeParentView}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.timePickup.bind(this, "6am-8am")}
              >
                <View
                  style={
                    this.state.time_variableP == "6am-8am"
                      ? styles.timeChosenView
                      : styles.timeUnchosenView
                  }
                >
                  <Text
                    style={
                      this.state.time_variableP == "6am-8am"
                        ? styles.timeChosenText
                        : styles.timeUnhosenText
                    }
                  >
                    6am-8am
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.timePickup.bind(this, "8am-10am")}
              >
                <View
                  style={
                    this.state.time_variableP == "8am-10am"
                      ? styles.timeChosenView
                      : styles.timeUnchosenView
                  }
                >
                  <Text
                    style={
                      this.state.time_variableP == "8am-10am"
                        ? styles.timeChosenText
                        : styles.timeUnhosenText
                    }
                  >
                    8am-10am
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.timePickup.bind(this, "10am-12pm")}
              >
                <View
                  style={
                    this.state.time_variableP == "10am-12pm"
                      ? styles.timeChosenView
                      : styles.timeUnchosenView
                  }
                >
                  <Text
                    style={
                      this.state.time_variableP == "10am-12pm"
                        ? styles.timeChosenText
                        : styles.timeUnhosenText
                    }
                  >
                    10am-12pm
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {this.state.pickup && (
            <Fragment>
              <View style={styles.timeParentView}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this.timePickup.bind(this, "12pm-2pm")}
                >
                  <View
                    style={
                      this.state.time_variableP == "12pm-2pm"
                        ? styles.timeChosenView
                        : styles.timeUnchosenView
                    }
                  >
                    <Text
                      style={
                        this.state.time_variableP == "12pm-2pm"
                          ? styles.timeChosenText
                          : styles.timeUnhosenText
                      }
                    >
                      12pm-2pm
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this.timePickup.bind(this, "2pm-4pm")}
                >
                  <View
                    style={
                      this.state.time_variableP == "2pm-4pm"
                        ? styles.timeChosenView
                        : styles.timeUnchosenView
                    }
                  >
                    <Text
                      style={
                        this.state.time_variableP == "2pm-4pm"
                          ? styles.timeChosenText
                          : styles.timeUnhosenText
                      }
                    >
                      2pm-4pm
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this.timePickup.bind(this, "4pm-6pm")}
                >
                  <View
                    style={
                      this.state.time_variableP == "4pm-6pm"
                        ? styles.timeChosenView
                        : styles.timeUnchosenView
                    }
                  >
                    <Text
                      style={
                        this.state.time_variableP == "4pm-6pm"
                          ? styles.timeChosenText
                          : styles.timeUnhosenText
                      }
                    >
                      4pm-6pm
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.timeParentView}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this.timePickup.bind(this, "6pm-8pm")}
                >
                  <View
                    style={
                      this.state.time_variableP == "6pm-8pm"
                        ? styles.timeChosenView
                        : styles.timeUnchosenView
                    }
                  >
                    <Text
                      style={
                        this.state.time_variableP == "6pm-8pm"
                          ? styles.timeChosenText
                          : styles.timeUnhosenText
                      }
                    >
                      6pm-8pm
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this.timePickup.bind(this, "8pm-10pm")}
                >
                  <View
                    style={
                      this.state.time_variableP == "8pm-10pm"
                        ? styles.timeChosenView
                        : styles.timeUnchosenView
                    }
                  >
                    <Text
                      style={
                        this.state.time_variableP == "8pm-10pm"
                          ? styles.timeChosenText
                          : styles.timeUnhosenText
                      }
                    >
                      8pm-10pm
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this.timePickup.bind(this, "10pm-12am")}
                >
                  <View
                    style={
                      this.state.time_variableP == "10pm-12am"
                        ? styles.timeChosenView
                        : styles.timeUnchosenView
                    }
                  >
                    <Text
                      style={
                        this.state.time_variableP == "10pm-12am"
                          ? styles.timeChosenText
                          : styles.timeUnhosenText
                      }
                    >
                      10pm-12am
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.timeParentView}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this.timePickup.bind(this, "12am-6am")}
                >
                  <View
                    style={
                      this.state.time_variableP == "12am-6am"
                        ? styles.timeChosenView
                        : styles.timeUnchosenView
                    }
                  >
                    <Text
                      style={
                        this.state.time_variableP == "12am-6am"
                          ? styles.timeChosenText
                          : styles.timeUnhosenText
                      }
                    >
                      12am-6am
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Fragment>
          )}
          <TouchableOpacity onPress={this.next.bind(this)}>
            <View style={styles.circleView}>
              <Image
                source={require("../assets/images/rightArrow.png")}
                resizeMode={"contain"}
                style={{ width: 20, height: 20 }}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
        {this.state.regLoader ? <Loader /> : null}
      </View>
    );
  }
}
const Schedule = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxSchedule);
const dimensions = Dimensions.get("window");
const Width = dimensions.width;
export default Schedule;
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
    backgroundColor: "#1bc47d",
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
    fontFamily: "proRegular",
    fontSize: 13,
    color: "#fff"
  },
  hiText: {
    color: "#fff",
    fontFamily: "proBold",
    fontSize: 26
  },
  clothTypeView: {
    width: "87.5%",
    marginTop: 17,
    alignSelf: "center",
    marginBottom: 10
  },
  clothTypeText: {
    color: "#000",
    fontFamily: "proExtraBold",
    fontSize: 18
  },
  circleView: {
    width: 43,
    height: 43,
    borderRadius: 43 / 2,
    alignSelf: "center",
    backgroundColor: "#1bc47d",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10
  },
  timeParentView: {
    width: "87.5%",
    marginTop: 10,
    alignSelf: "center",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  timeChosenView: {
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#1bc47d",
    alignItems: "center",
    justifyContent: "center"
  },
  timeUnchosenView: {
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#1bc47d",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  timeChosenText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "proBold"
  },
  timeUnhosenText: {
    color: "#1bc47d",
    fontSize: 16,
    fontFamily: "proBold"
  }
});
