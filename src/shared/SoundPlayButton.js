import React, { useState } from "react";

import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";

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
    <Icon
      name="play-circle-o"
      style={isPressed ? { color: "#7d8b91" } : { color: "#EBEBEB" }}
      size={150}
      onPress={() => playSound()}
    />
  );
};

export default SoundPlayButton;
