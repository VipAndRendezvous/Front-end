import { UserProvider } from "@/app/utils/UserProvider";
import WithDrawTerms from "./_component/WithDrawTerms";
import { ChargePointProvider } from "@/app/utils/ChargePointProvider";

const Page = () => {
  return (
    <div>
      <ChargePointProvider>
        <UserProvider>
          <WithDrawTerms />
        </UserProvider>
      </ChargePointProvider>
    </div>
  );
};

export default Page;
