import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

export default () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchPlaces().then((res) => {
      setLoadedPlaces(res);
    });
  }, [isFocused]);
  return <PlacesList places={loadedPlaces} />;
};
