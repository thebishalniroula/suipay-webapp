import { MIST_PER_SUI } from "@mysten/sui/utils";
import useSuiToUSD from "@/hooks/use-sui-to-usd";
import ArrowSlanted from "@/icons/arrow-slanted";

type Transaction = {
  incoming: boolean;
  amount: string | number;
  address: string;
};

export const TransactionItem = (props: { transaction: Transaction }) => {
  const { data } = useSuiToUSD(
    +props.transaction.amount / Number(MIST_PER_SUI)
  );

  return (
    <div className="rounded-[30px] p-4 flex justify-between bg-[#FFFFFF05]">
      <div className="flex gap-3">
        <div className="h-[52px] w-[52px] rounded-2xl bg-[#7772F833] flex justify-center items-center">
          <ArrowSlanted
            className={!props.transaction.incoming ? "rotate-180" : ""}
          />
        </div>
        <div className="flex flex-col justify-between py-1">
          <p className="font-medium ">
            {props.transaction.incoming ? "Deposit" : "Withdraw"}
          </p>
          <p className="text-sm text-[#ADC8DF] font-medium ">0x65rg2...32fd</p>
        </div>
      </div>
      <div className="flex flex-col justify-between py-1 text-right">
        <p className="text-[#3EF7B4] font-semibold">
          {Number(+props.transaction.amount / Number(MIST_PER_SUI)).toFixed(2)}{" "}
          SUI
        </p>
        <p className="text-sm text-[#ADC8DF]">$ {data}</p>
      </div>
    </div>
  );
};
