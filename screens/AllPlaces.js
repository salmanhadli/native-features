import PlacesList from "../components/Places/PlacesList";

export default ({ route }) => {
  const { pramas } = route;
  return <PlacesList places={[]} />;
};
