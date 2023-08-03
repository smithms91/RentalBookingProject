'use client';

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeUser, SafeListing } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/Listings/ListingCard";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ listings, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(async (id: string) => {
    setDeletingId(id);

    await axios.delete(`/api/listings/${id}`).then(() => {
      toast.success("Listing Deleted!");
      router.refresh();
    }).catch((error) => {
      toast.error(error?.response?.data?.error || "Something went wrong!");
    }).finally(() => {
      setDeletingId("");
    });
  }, [router]);

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties." />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard key={listing.id} data={listing} actionId={listing.id} onAction={onCancel} actionLabel="Delete Property" disabled={deletingId == listing.id} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
}

export default PropertiesClient;