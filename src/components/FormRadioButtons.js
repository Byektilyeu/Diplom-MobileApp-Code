import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { textColor, mainColor } from "../../Constants";
import Feather from "react-native-vector-icons/Feather";
import {
  RadioButton,
  Text as RadioText,
  TouchableRipple,
} from "react-native-paper";
const FormRadioButtons = (props) => {
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

        <View style={{ flexDirection: "column" }}>
          {props.data.map((el, index) => (
            <View key={index} style={{ flexDirection: "row", marginLeft: 10 }}>
              {/*!!!!!!!!!!props.values[index] === categoryID*/}
              <RadioButton
                onPress={() => {
                  props.onValueChange(props.values[index]);
                }}
                color={mainColor}
                value={props.values[index]}
                status={
                  props.value === props.values[index] ? "checked" : "unchecked"
                }
              />
              <TouchableRipple
                onPress={() => {
                  props.onValueChange(props.values[index]);
                }}
              >
                <RadioText
                  style={{ marginTop: 12, color: textColor, marginTop: 9 }}
                >
                  {el}
                </RadioText>
              </TouchableRipple>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default FormRadioButtons;

const styles = StyleSheet.create({});
