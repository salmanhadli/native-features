import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { useEffect, useState } from "react";
import { getMapPreview } from "../../util/location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

export default () => {
  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      if (mapPickedLocation) {
        setPickedLocation(mapPickedLocation);
      }
    }
  }, [route, isFocused]);

  async function getLocationHandler() {
    let { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission to access location was denied!",
        "You need to grant location permissions to use this app"
      );
      //   setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await getCurrentPositionAsync({});
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  let locationPreview = <Text>No location picked yet</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.mapPreviewImage}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    );
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate Me
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mapPreviewImage: {
    width: "100%",
    borderRadius: 4,
    height: "100%",
  },
});
