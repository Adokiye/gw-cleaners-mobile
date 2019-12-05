/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";

export default class DropBoxNavBar extends Component {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  render() {
    return (
      <View
        style={{
          width: "100%",
          paddingLeft: 10,
          paddingRight: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          height: 73,
          elevation: 2,
          backgroundColor: "#fff",
          bottom: 0,
          position: 'absolute'
      //    borderTopColor: "#1281dd",
      //    borderTopWidth: 1
        }}
      >
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Dashboard", {
            })
          }
        >
          <View
            style={{
              flexDirection: "column",
              height: 50,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
              source={require("../../assets/images/homeNormal.png")}
            />
            <Text style={styles.offlineText}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("DropBox", {})}
        >
          <View
            style={{
              flexDirection: "column",
              height: 50,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
              source={require("../../assets/images/dropBoxGreen.png")}
            />
            <Text style={styles.onlineText}>DropBox</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("PriceList", {})}
        >
          <View
            style={{
              flexDirection: "column",
              height: 50,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
              source={require("../../assets/images/priceList.png")}
            />
            <Text style={styles.offlineText}>Price List</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Profile", {})}
        >
          <View
            style={{
              flexDirection: "column",
              height: 50,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
              source={require("../../assets/images/profile.png")}
            />
            <Text style={styles.offlineText}>Profile</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  onlineText: {
    color: "#1bc47d",
    fontSize: 10,
    fontFamily: "proRegular"
  },
  offlineText: {
    color: "#898888",
    fontSize: 10,
    fontFamily: "proRegular"
  }
});
