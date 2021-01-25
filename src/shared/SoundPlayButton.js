import React, { useState } from "react";

import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";
import styled from "styled-components/native";

const SoundPlayButton = ({ soundSource }) => {
  const [sound, setSound] = useState();
  const [isPressed, setIsPressed] = useState(false);

  async function playSound() {
    btnPressed();
    const { sound } = await Audio.Sound.createAsync({ uri: soundSource });
    setSound(sound);

    await sound.playAsync();
  }

  React.useEffect(() => {
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

  return (
    <ButtonContainer onPress={() => playSound()}>
      <Icon
        name="volume-up"
        style={{ color: "#fff" }}
        size={25}
      />
    </ButtonContainer>
  );
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
  margin: 10px;
`;

export default SoundPlayButton;
