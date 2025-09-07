// app/donate/page.jsx
import { Suspense } from "react";
import DonateClient from "./DonateClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <Suspense fallback={<div className="container-narrow py-8">Loading…</div>}>
      <DonateClient />
    </Suspense>
  );
}
