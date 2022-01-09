import { View, useWindowDimensions } from "react-native";

import FindById from "./helpers/FindById";
import ModalContents from "./ModalContents";
import React from "react";
import { connect } from "react-redux";

export const Modal = ({ modal, setModal, selectedDialectId, dialects }) => {
  const { height, width } = useWindowDimensions();
  const selectedDialect = FindById(dialects, selectedDialectId);

  if (modal) {
    return (
      <>
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            backgroundColor: "rgba(127, 200, 248, 0.8)",
            height,
            width,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ModalContents
            selectedDialect={selectedDialect}
            setModal={setModal}
          />
        </View>
      </>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return {
    dialects: state.dialectReducer.dialects,
  };
};

export default connect(mapStateToProps)(Modal);
