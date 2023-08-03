import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length == 0) {
    return (
      <EmptyState title="No favorites found" subtitle="You have no favorite listings" />
    )
  }
  
  return (
    <div>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </div>
  )
};

export default FavoritesPage;