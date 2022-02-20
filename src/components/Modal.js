import { View, useWindowDimensions } from "react-native";

import FindById from "./helpers/FindById";
import PlaceInfoMain from "./PlaceInfoMain";
import PlaceInfoList from "./PlaceInfoList";
import PlaceInfoDetail from "./PlaceInfoDetail";
import React from "react";
import { connect } from "react-redux";

import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import styled from "styled-components/native";

const Stack = createStackNavigator();

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
          <NavigationContainer independent={true}>
            <SafeareaContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  cardStyle: {
                    backgroundColor: "rgba(127, 200, 248, 0.8)",
                  },
                }}
              >
                <Stack.Screen name="PlaceInfoMain">
                  {(props) => (
                    <PlaceInfoMain
                      {...props}
                      selectedDialect={selectedDialect}
                      setModal={setModal}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name="PlaceInfoList" component={PlaceInfoList} />
                <Stack.Screen
                  name="PlaceInfoDetail"
                  component={PlaceInfoDetail}
                />
              </Stack.Navigator>
            </SafeareaContainer>
          </NavigationContainer>
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

const SafeareaContainer = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default connect(mapStateToProps)(Modal);
