import { Button } from "react-native-paper";
import React from "react";

const FooterButton = ({ title, onPressHandler }) => {
  return (
    <Button
      mode="contained"
      onPress={onPressHandler}
      color="#FFE45E"
      style={{ width: "90%", height: 45, justifyContent: "center" }}
      labelStyle={{ fontSize: 25 }}
    >
      {title}
    </Button>
  );
};

export default FooterButton;
