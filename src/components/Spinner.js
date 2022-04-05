import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";

const Spinner = ({ showText = true }) => {
  return (
    <View style={{ alignItems: "center", marginVertical: 10 }}>
      <ActivityIndicator size="large" color="#99AAAB" />
      {showText && (
        <Text style={{ top: 10, fontWeight: "bold", fontSize: 18 }}>
          Түр хүлэээнэ үү
        </Text>
      )}
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({});
