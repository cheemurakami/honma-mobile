import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
  View,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const PlaceInfoDetailCarousel = ({ imageUrlsEntries }) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null)

  useEffect(() => {
    setEntries(imageUrlsEntries);
  }, []);

  const renderItem = ({ item }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.illustration }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={250}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default PlaceInfoDetailCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: 250,
    height: 250,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});
