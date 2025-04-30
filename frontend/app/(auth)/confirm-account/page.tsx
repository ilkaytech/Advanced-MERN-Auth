import React, { Suspense } from "react";
import ConfirmAccount from "./_confirmaccount";

const page = () => {
  return (
    <Suspense>
      <ConfirmAccount />
    </Suspense>
  );
};

export default page;
