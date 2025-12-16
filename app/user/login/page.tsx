import { Suspense } from "react";
import UserLoginClient from "../../useClientfiles/clientloginrole";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserLoginClient />
    </Suspense>
  );
}
