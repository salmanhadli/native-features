import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

export default ({ navigation }) => {
  async function createPlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate("AllPlaces", {
      place: { ...place, id: new Date().toString() + Math.random().toString() },
    });
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};
