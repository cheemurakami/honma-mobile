import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import React from "react";

export const Modal = ({ modal, setModal }) => {
  const { height, width } = useWindowDimensions();

  if (modal) {
    return (
      <TouchableOpacity
        style={
          Modal
            ? {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                opacity: 0.7,
                backgroundColor: "#7FC8F8",
                height,
                width,
                justifyContent: "center",
                alignItems: "center",
              }
            : {
                flex: 1,
                display: "none",
                flexDirection: "column",
                position: "absolute",
                backgroundColor: "#7FC8F8",
                height: 0,
                width: 0,
              }
        }
        onPress={() => setModal(false)}
      >
        <View>
          <Text>Hello</Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};

export default Modal;
