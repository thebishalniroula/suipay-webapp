import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./input";

export type PasswordPromptProps = {
  onClose?: () => void;
  onSubmit: (password: string) => void;
};

const zPassword = z.object({
  password: z.string().min(1),
});

type PasswordForm = z.infer<typeof zPassword>;
const PasswordPrompt = (props: PasswordPromptProps) => {
  const { register, handleSubmit, formState } = useForm<PasswordForm>({
    resolver: zodResolver(zPassword),
  });

  const onSubmit: SubmitHandler<PasswordForm> = ({ password }) => {
    props.onSubmit(password);
  };

  return (
    <div className="fixed z-[1000] h-screen w-screen inset-0 bg-black/70 flex justify-center items-center p-3 text-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-fit p-5 flex flex-col gap-6 bg-[#333166] rounded-3xl items-center max-w-[360px]"
      >
        <div>
          <h5 className="mb-1 text-lg">Enter your password</h5>
          <p className="font-light text-[#ADC8DF] leading-[1.2] text-md">
            You need to enter your password to perform sensitive actions.
          </p>
        </div>
        <Input
          className="w-full border-white/80"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {/* <p className="text-red-500">{formState.errors.password?.message}</p> */}
        <div className="flex gap-2 w-full">
          {props.onClose && (
            <Button
              variant="secondary"
              onClick={props.onClose}
              className="flex-1"
              type="button"
            >
              Not Now
            </Button>
          )}
          <Button className="flex-1" type="submit">
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
};
export default PasswordPrompt;
