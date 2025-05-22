import { Button } from "./button";

export type ConfirmActionProps = {
  logo?: string;
  title: string;
  description: string;
  onSubmit: () => void;
  onClose: () => void;
  isLoading?: boolean;
};
const ConfirmAction = (props: ConfirmActionProps) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center p-3 text-center">
      <div className="w-full h-fit p-5 flex flex-col gap-6 bg-[#333166] rounded-3xl items-center">
        {!!props.logo && (
          <div className="h-[52px] w-[52px] rounded-xl bg-gray-100/10"></div>
        )}
        <div>
          <h5 className="mb-1">{props.title}</h5>
          <p className="font-light text-[#ADC8DF] leading-[1.2] text-sm">
            {props.description}
          </p>
        </div>
        <div className="flex gap-2 w-full">
          <Button
            disabled={props.isLoading}
            variant="secondary"
            size="md"
            onClick={props.onClose}
            className="flex-1"
          >
            Not Now
          </Button>
          <Button
            disabled={props.isLoading}
            variant="primary"
            size="md"
            onClick={props.onSubmit}
            className="flex-1"
          >
            {props.isLoading ? "Confirming..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmAction;
