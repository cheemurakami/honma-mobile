import * as FileSystem from "expo-file-system";

import React, { useEffect, useState } from "react";

import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";
import { audioFileUri } from "../components/helpers/AudioManagement";
import styled from "styled-components/native";

const SoundPlayButton = ({ audioId }) => {
  const [sound, setSound] = useState();
  const [isPressed, setIsPressed] = useState(false);
  const [audioUri, setAudioUri] = useState();

  async function playSound() {
    btnPressed();
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    setSound(sound);

    await sound.playAsync();
  }

  // Checks to see if audio clip has been downloaded to phone
  // If it has, set the uri to state so we can show the button.
  useEffect(() => {
    const uri = audioFileUri(audioId);
    FileSystem.getInfoAsync(uri).then((info) => {
      if (info.exists) {
        setAudioUri(uri);
      }
    });
    return () => {};
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const btnPressed = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 200);
  };

  // Don't show the button if the audio clip hasn't been downloaded
  if (audioUri) {
    return (
      <ButtonContainer onPress={() => playSound()}>
        <Icon name="volume-up" style={{ color: "#fff" }} size={25} />
      </ButtonContainer>
    );
  }

  return null;
};

const ButtonContainer = styled.TouchableHighlight.attrs({
  underlayColor: "#5aa9e6",
})`
  align-items: center;
  justify-content: center;
  height: 55px;
  width: 55px;
  background-color: #5aa9e6;
  border-radius: 10px;
  padding: 5px;
`;

export default SoundPlayButton;
 