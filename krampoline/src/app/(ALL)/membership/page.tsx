import { ChargePointProvider } from "@/app/utils/ChargePointProvider";
import MembershipTerms from "./_component/MembershipTerms";

const Page = () => {
  return (
    <div>
      <ChargePointProvider>
        <MembershipTerms />
      </ChargePointProvider>
    </div>
  );
};

export default Page;
