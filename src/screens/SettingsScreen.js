import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightColor, mainColor } from "../../Constants";
import FormSwitch from "../components/FormSwitch";

const SettingsScreen = (props) => {
  const [alarm, setAlarm] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("alarm")
      .then((result) => {
        // console.log(JSON.parse(result).alarm);
        setAlarm(JSON.parse(result).alarm);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleAlarm = () => {
    setAlarm((alarm) => {
      const newValue = !alarm;
      AsyncStorage.setItem("alarm", JSON.stringify({ alarm: newValue }));
      return newValue;
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <StatusBar backgroundColor={mainColor} barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: mainColor,
        }}
      >
        <Text style={{ fontSize: 30, color: lightColor }}>
          Тохиргооны хэсэг
        </Text>
        <Text style={{ fontSize: 16, color: lightColor, marginTop: 10 }}>
          Та хямдралын талаарх тохиргооог оруулна уу
        </Text>
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        duration={800}
        style={{
          flex: 5,
          paddingHorizontal: 20,
          paddingVertical: 30,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: lightColor,
        }}
      >
        <ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormSwitch
              label="Хямдрал дуусахыг сануулах эсэх"
              icon="clock"
              data={["Сануулна", "Сануулахгүй"]}
              value={alarm}
              onValueChange={toggleAlarm}
            />
          </View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
