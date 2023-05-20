import PlaceForm from "../components/Places/PlaceForm";

export default ({ navigation }) => {
  function createPlaceHandler(place) {
    navigation.navigate("AllPlaces", {
      place,
    });
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};
