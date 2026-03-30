import { Metadata } from "next";
import { Suspense } from "react";
import { ReservationsClient } from "./ReservationsClient";

export const metadata: Metadata = {
  title: "Reservations | Güneş",
  description: "Reserve a table at your preferred Güneş location.",
};

export default function ReservationsPage() {
  return (
    <Suspense>
      <ReservationsClient />
    </Suspense>
  );
}
