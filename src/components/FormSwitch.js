import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { mainColor, textColor } from "../../Constants";
import Feather from "react-native-vector-icons/Feather";
import { Switch, TouchableRipple } from "react-native-paper";

const FormSwitch = (props) => {
  return (
    <View>
      <Text style={{ fontSize: 16, paddingTop: 35, color: textColor }}>
        {props.label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          borderBottomColor: "#f2f2f2",
          borderBottomWidth: 1,
          paddingBottom: 5,
        }}
      >
        <Feather name={props.icon} size={20} color={textColor} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            paddingLeft: 10,
          }}
        >
          <TouchableRipple onPress={props.onValueChange}>
            <Text style={{ color: textColor, marginTop: 7 }}>
              {props.value ? props.data[0] : props.data[1]}
            </Text>
          </TouchableRipple>
          <Switch
            color={mainColor}
            value={props.value}
            onValueChange={props.onValueChange}
          />
        </View>
      </View>
    </View>
  );
};

export default FormSwitch;

const styles = StyleSheet.create({});
