import React from "react";
import { View, StyleSheet } from "react-native";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    maxWidth: 500, // prevents stretching on big screens
  },
});

export default Container;
