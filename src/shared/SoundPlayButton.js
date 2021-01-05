import { Audio } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
const SoundPlayButton = ({ soundSource }) => {
  const [sound, setSound] = React.useState();
  async function playSound() {
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

  return (
    <Icon
      name="play-circle-o"
      style={{ color: "#EBEBEB" }}
      size={150}
      onPress={playSound}
    />
  );
};

export default SoundPlayButton;
