"use client";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";
import useWSDepositAddress from "@/hooks/use-ws-deposit-address";
import useCountDown from "@/hooks/use-count-down";
import InfoBox from "@/components/ui/info-box";
import ProcessingIcon from "@/icons/processing";
import TickIcon from "@/icons/tick-icon";

const TempDepositAddressPage = () => {
  const messages = useWSDepositAddress();

  const addressDetails = messages.messages.find(
    (message) => message?.status === "AddressReady"
  );

  const expiry = addressDetails?.expiresAt;
  const tempAddress = addressDetails?.depositAddress;

  const status = messages.messages[messages.messages.length - 1]
    ?.status as string;

  const handleCopy = async () => {
    try {
      if (window.navigator.clipboard) {
        await window.navigator.clipboard.writeText(tempAddress);
        toast.success("Copied to clipboard");
      }
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="p-3 flex flex-col gap-4 max-w-[500px] mx-auto border border-[#47278C]">
      {!["processing", "successful"].includes(status?.toLowerCase()) && (
        <>
          <InfoBoxWithCountdown expiresAt={expiry} />

          <div
            className="bg-white mx-auto flex items-center justify-center text-black rounded-xl"
            style={{
              height: "170px",
              width: "170px",
            }}
          >
            {tempAddress && (
              <QRCode size={155} value={tempAddress} viewBox={`0 0 256 256`} />
            )}
          </div>
          <p className="text-white tex-base text-center break-words font-medium">
            {tempAddress}
          </p>
          <div
            onClick={handleCopy}
            className="bg-[#7772F833] text-white rounded-2xl p-4 text-base font-medium text-center w-fit mx-auto cursor-pointer"
          >
            Copy Address
          </div>
        </>
      )}
      {["processing", "successful"].includes(status?.toLowerCase()) && (
        <>
          <Processing status={status?.toLowerCase()} />
        </>
      )}
    </div>
  );
};

export default TempDepositAddressPage;

const InfoBoxWithCountdown = ({ expiresAt }: { expiresAt: string }) => {
  const countdown = useCountDown(expiresAt);
  return (
    <InfoBox
      title={`Valid for ${countdown.data ?? "05:00"} minutes`}
      description="This is a temporary address that sends funds to your smart contract wallet."
    />
  );
};

const Processing = ({ status }: { status: string }) => {
  return (
    <div className="flex flex-col gap-30 items-center justify-center transform translate-y-[33%]">
      {status?.toLowerCase() === "processing" && (
        <>
          <ProcessingIcon className="animate-[spin_5s_linear_infinite]" />
          <div className="font-medium flex flex-col text-center">
            <span className="text-[#7E7AF2] leading-[1]">Status</span>
            <span className="text-lg {leading-[1]}">Processing</span>
          </div>
        </>
      )}
      {status?.toLowerCase() === "successful" && (
        <>
          <TickIcon />
          <div className="flex flex-col text-center font-medium">
            <span className="text-[#7E7AF2] leading-[1]">Status</span>
            <span className="text-lg leading-[1]">Successful</span>
          </div>
        </>
      )}
    </div>
  );
};
