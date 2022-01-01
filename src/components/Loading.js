import * as a from "../rdx/actions";

import React, { useEffect } from "react";
import { addMultipleAudios } from "./helpers/AudioManagement";

import { connect } from "react-redux";
import styled from "styled-components/native";

const examplesWithAudio = (resp) => {
  let examples = [];
  resp.forEach((dialect) => {
    dialect.grammars.forEach((grammar) => {
      grammar.examples.forEach((example) => {
        if (example.audio_clip_url) {
          examples.push(example);
        }
      });
    });
  });
  return examples;
};

const Loading = ({ navigation, dispatch }) => {
  useEffect(() => {
    fetch("https://honma-api.herokuapp.com/api/dialects")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Something went wrong. status: " + resp.status);
        }
      })
      .then((resp) => {
        if (resp.error) {
          console.log(resp.error);
        }
        (async () => {
          await addMultipleAudios(examplesWithAudio(resp));
        })();
        dispatch(a.loadedDialects(resp));
      })
      .then(() => navigation.navigate("ChooseDialect"))
      .catch((error) => {
        console.log(error);
      });
    return () => {};
  }, []);
  return (
    <LoadingContainer>
      <TextHonma>Honma</TextHonma>
      <TextLoading>Loading...</TextLoading>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const TextHonma = styled.Text`
  font-size: 48px;
  color: #fff;
  font-weight: bold;
`;
const TextLoading = styled.Text`
  font-size: 18px;
`;

const mapStateToProps = (state) => {
  return {
    dialects: state.dialectReducer.dialects,
  };
};

export default connect(mapStateToProps)(Loading);
