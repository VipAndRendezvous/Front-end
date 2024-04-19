import AddAuctionForm from "./_component/AddAuctionForm";
import AddAuctionWarning from "./_component/AddAuctionWarning";
import { UserProvider } from "@/app/utils/UserProvider";
import { AddAuctionsProvider } from "@/app/utils/AddAuctionsProvider";

async function getAWS() {
    const region = process.env.AWS_S3_BUCKET_REGION;
    const keyId = process.env.AWS_S3_BUCKET_ACCESS_KEY_ID;
    const AccessKey = process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY;

    return {region, keyId, AccessKey};
}

async function Page() {
    const {region, keyId, AccessKey} = await getAWS()
  return (
    <div>
      <AddAuctionWarning />
      <UserProvider>
        <AddAuctionsProvider>
          <AddAuctionForm region={region} keyId={keyId} AccessKey={AccessKey}/>
        </AddAuctionsProvider>
      </UserProvider>
    </div>
  );
};

export default Page;
