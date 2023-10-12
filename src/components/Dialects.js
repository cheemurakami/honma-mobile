import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import * as a from "../rdx/actions";

import { Alert } from "react-native";
import FindById from "./helpers/FindById";
import Icon from "react-native-vector-icons/AntDesign";
import { List } from "react-native-paper";
import ScreenLayout from "../shared/ScreenLayout";
import { connect } from "react-redux";
import styled from "styled-components/native";

const pageTitle = "Choose your dialect";
let counter = 0;
const defaultTitleStyle = { fontSize: 20, fontWeight: "bold" };
const selectedTitleStyle = { ...defaultTitleStyle, color: "#fff" };
const defaultDescriptionStyle = { fontSize: 14, fontWeight: "bold" };
const selectedDescriptionStyle = { ...defaultDescriptionStyle, color: "#fff" };

const Dialects = ({ navigation, dispatch, dialects, completedGrammars }) => {
  const [selectedDialectId, setSelectedDialectId] = useState(null);
  const [btnText, setBtnText] = useState("はじめましょう!!");
  const [modal, setModal] = useState(false);
  const [grammars, setGrammars] = useState([]);
  const [dialectGrammars, setDialectGrammars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/grammars")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Something went wrong. status: " + resp.status);
        }
      })
      .then((data) => {
        setGrammars(data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {};
  }, []);

  const doubleTap = (id) => {
    changeBtnText(id);
    const selectedDialect = FindById(dialects, id);

    setDialectGrammars(getDialectGrammars(selectedDialect));

    if (selectedDialectId == id || selectedDialectId == null) {
      setSelectedDialectId(id);
      counter++;
      if (counter === 1) {
        setTimeout(() => {
          counter = 0;
        }, 1200);
      } else if (counter === 2) {
        navigation.navigate("PatternList", {
          selectedDialect,
          dialectGrammars,
        });
      }
    } else {
      setSelectedDialectId(id);
      counter = 1;
    }
  };

  const changeBtnText = (id) => {
    const selectedDialect = FindById(dialects, id);
    setBtnText(selectedDialect.start_btn_text);
  };

  const navigateBtn = (id) => {
    if (id) {
      const selectedDialect = FindById(dialects, id);
      navigation.navigate("PatternList", {
        selectedDialect,
      });
    } else {
      Alert.alert("Please select dialect");
    }
  };

  const completedQuizzesNumber = (dialectGrammars) => {
    if (completedGrammars !== {}) {
      const sumCompletedQuizzes =
        Object.entries(completedGrammars).length +
        completedNumber(dialectGrammars);
      return (
        <ProgressText>
          {sumCompletedQuizzes}/{dialectGrammars.length}
        </ProgressText>
      );
    } else {
      return (
        <ProgressText>
          {completedNumber(dialectGrammars)}/{dialectGrammars.length}
        </ProgressText>
      );
    }
  };

  const completedNumber = (dialectGrammars) => {
    const quizzes = dialectGrammars.map((grammar) => grammar.quizzes);
    const completedQuizzes = quizzes
      .flat()
      .filter((quiz) => quiz.quiz_completed);
    return completedQuizzes.length;
  };

  const displayModal = (id) => {
    setModal(true);
    setSelectedDialectId(id);
  };

  const signout = () => {
    fetch("http://localhost:3000/users/sign_out", {
      method: "DELETE",
    }).then(() => {
      dispatch(a.signout());
      navigation.navigate("Registration");
    });
  };

  const getDialectGrammars = (dialect) => {
    if (grammars) {
      return grammars.filter((grammar) => grammar.dialect_id == dialect.id);
    }
  };

  return (
    <ScreenLayout
      pageTitle={pageTitle}
      btnLabel={selectedDialectId ? btnText : null}
      btnSubLabel="Start"
      onPressHandler={() => navigateBtn(selectedDialectId)}
      modal={modal}
      setModal={setModal}
      selectedDialectId={selectedDialectId}
    >
      <DialectContainer>
        {!!dialects &&
          dialects.map((dialect, index) => {
            return (
              <DialectTouchable
                key={index}
                onPress={() => doubleTap(dialect.id)}
                style={
                  selectedDialectId === dialect.id
                    ? {
                        backgroundColor: "#7fc8f8",
                      }
                    : { backgroundColor: "#fffceb" }
                }
              >
                <List.Item
                  title={dialect.name_jp}
                  titleStyle={
                    selectedDialectId === dialect.id
                      ? selectedTitleStyle
                      : defaultTitleStyle
                  }
                  description={dialect.name_en}
                  descriptionStyle={
                    selectedDialectId === dialect.id
                      ? selectedDescriptionStyle
                      : defaultDescriptionStyle
                  }
                  style={{ width: "100%" }}
                  left={() => (
                    <Icon
                      name="infocirlce"
                      size={45}
                      style={{ margin: 10, color: "#aacc00" }}
                      onPress={() => displayModal(dialect.id)}
                    />
                  )}
                  right={() => (
                    <ProgressIcon>
                      {completedQuizzesNumber(getDialectGrammars(dialect))}
                      {/* <ProgressText>
                        {completedNumber(dialect.grammars)}/
                        {dialect.grammars.length}
                      </ProgressText> */}
                      <ProgressText>Quiz</ProgressText>
                    </ProgressIcon>
                  )}
                />
              </DialectTouchable>
            );
          })}
        <TextWrapper>
          <MessageText>More dialects coming soon!</MessageText>
        </TextWrapper>
        <TextWrapper>
          <Button
            mode="contained"
            onPress={() => signout()}
            color={"#E9A9BA"}
            labelStyle={{
              color: "#fff",
              fontSize: 18,
            }}
            style={{
              width: 280,
              height: 45,
              margin: 10,
              justifyContent: "center",
            }}
          >
            LOGOUT
          </Button>
        </TextWrapper>
      </DialectContainer>
    </ScreenLayout>
  );
};

const DialectContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 10px;
  background-color: #fffceb;
`;

const DialectTouchable = styled.TouchableHighlight.attrs({
  underlayColor: "#7fc8f8",
})`
  background-color: #fffceb;
  margin-top: 10px;
  border-radius: 25px;
`;

const ProgressIcon = styled.View`
  width: 70px;
  height: 45px;
  margin: 10px;
  border-radius: 10px;
  background-color: #f6a704;
  align-items: center;
  justify-content: center;
`;
const ProgressText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
const TextWrapper = styled.View`
  align-items: center;
  padding: 10px;
`;

const MessageText = styled.Text`
  font-size: 18px;
`;

const mapStateToProps = (state) => {
  return {
    dialects: state.dialectReducer.dialects,
    completedGrammars: state.grammarsReducer.completedIds,
  };
};

export default connect(mapStateToProps)(Dialects);
