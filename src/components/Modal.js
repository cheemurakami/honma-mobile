import { View, Text, useWindowDimensions } from "react-native";

import FindById from "./helpers/FindById";
import ModalContents from "./ModalContents";
import React from "react";
import { connect } from "react-redux";

import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

export const GET_PLACE_INFOS = gql`
  query getPlaceInfos($dialectId: ID!) {
    placeInfos(dialectId: $dialectId) {
      id
      nameEn
      nameJp
      latitude
      longtitude
      category
      description
      website
    }
  }
`;

export const Modal = ({ modal, setModal, selectedDialectId, dialects }) => {
  const { height, width } = useWindowDimensions();
  const selectedDialect = FindById(dialects, selectedDialectId);

  const { loading, error, data } = useQuery(GET_PLACE_INFOS, {
    variables: { dialectId: selectedDialectId },
  });

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
          {console.log(
            "LOADING:::",
            loading,
            "ERROR:::",
            error,
            "DATA:::",
            data,
            "dialectId:::",
            selectedDialectId
          )}

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
