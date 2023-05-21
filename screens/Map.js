import { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import IconButton from "../components/UI/IconButton";

export default ({ navigation, route }) => {
  const [region, setRegion] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  let intialLocation;
  if (route.params.initialLat && route.params.initialLng) {
    intialLocation = {
      lat: route.params.initialLat,
      lng: route.params.initialLng,
    };
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => {
        if (intialLocation) return;
        return (
          <IconButton
            icon="save"
            size={24}
            color={tintColor}
            onPress={savePickedLocationHandler}
          />
        );
      },
    });
    async function getLocation() {
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
      return {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };
    }
    if (intialLocation) {
      setSelectedLocation({
        latitude: intialLocation.lat,
        longitude: intialLocation.lng,
      });
      // const region = {
      //   latitude: intialLocation.lat,
      //   longitude: intialLocation.lng,
      //   latitudeDelta: 0.0922,
      //   longitudeDelta: 0.0421,
      // };
      // setRegion(region);
    } else {
      getLocation()
        .then((location) => {
          const region = {
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          setRegion(region);
        })
        .catch(() => {
          const region = {
            latitude: 15.350304167845115,
            longitude: 75.14973487704992,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          setRegion(region);
        });
    }
  }, [navigation, savePickedLocationHandler]);

  function selectLocationHandler(event) {
    if (intialLocation) return;
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({
      latitude,
      longitude,
    });
  }

  function savePickedLocationHandler() {
    if (!selectedLocation) {
      Alert.alert(
        "No Location Picked!",
        "You have to select a location by tapping on the map first"
      );
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.latitude,
      pickedLng: selectedLocation.longitude,
    });
  }
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
