import AddAuctionForm from "./_component/AddAuctionForm";
import AddAuctionWarning from "./_component/AddAuctionWarning";
import { UserProvider } from "@/app/utils/UserProvider";
import { AddAuctionsProvider } from "@/app/utils/AddAuctionsProvider";

<<<<<<< HEAD
async function Page() {
=======
function Page() {
>>>>>>> main
  return (
    <div>
      {/* <AddAuctionWarning /> */}
      <UserProvider>
        <AddAuctionsProvider>
          <AddAuctionForm />
        </AddAuctionsProvider>
      </UserProvider>
    </div>
  );
}

export default Page;
