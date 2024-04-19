import { ChargePointProvider } from "@/app/utils/ChargePointProvider";
import PointChargeTerms from "./_component/PointChargeTerms";

const Page = () => {
  return (
    <div>
      <ChargePointProvider>
        <PointChargeTerms />
      </ChargePointProvider>
    </div>
  );
};

export default Page;
