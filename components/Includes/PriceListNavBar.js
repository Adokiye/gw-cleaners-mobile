/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";

export default class PriceListNavBar extends Component {
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
          backgroundColor: "#fff",
          elevation: 2
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
              source={require("../../assets/images/dropBox.png")}
            />
            <Text style={styles.offlineText}>DropBox</Text>
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
              source={require("../../assets/images/priceListGreen.png")}
            />
            <Text style={styles.onlineText}>Price List</Text>
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
    color: "#769CF1",
    fontSize: 10,
    fontFamily: "mont-reg"
  },
  offlineText: {
    color: "#81898F",
    fontSize: 10,
    fontFamily: "mont-reg"
  }
});
