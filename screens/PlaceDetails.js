import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";

export default ({ route, navigation }) => {
  const [place, setPlace] = useState();

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    fetchPlaceDetails(selectedPlaceId).then((place) => {
      setPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    });
  }, [selectedPlaceId]);
  function onShowOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: place.location.lat,
      initialLng: place.location.lng,
    });
  }

  if (!place) {
    <Text style={styles.fallbackText}>Loading Place</Text>;
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place?.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place?.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={onShowOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fallbackText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
