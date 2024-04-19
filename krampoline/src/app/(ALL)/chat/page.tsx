"use client";

import React from "react";
import Chat from "./_component/Chat";

async function getAWS() {
    const region = process.env.AWS_S3_BUCKET_REGION;
    const keyId = process.env.AWS_S3_BUCKET_ACCESS_KEY_ID;
    const AccessKey = process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY;

    return {region, keyId, AccessKey};
}

async function Page() {
    const {region, keyId, AccessKey} = await getAWS()

  return (
    <>
      <Chat region={region} keyId={keyId} AccessKey={AccessKey} />
    </>
  );
};

export default Page;
