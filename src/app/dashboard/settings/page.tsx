"use client";
import React, { useState } from "react";
import { TbChevronRight } from "react-icons/tb";
import toast from "react-hot-toast";
import PasswordPrompt, {
  PasswordPromptProps,
} from "@/components/ui/password-prompt";
import { useWalletEssentialsStore } from "@/store/wallet-essentials";
import { decryptData } from "@/utils/encryption";
import ConfirmAction, {
  ConfirmActionProps,
} from "@/components/ui/confirm-action";
import RecoveryPhrase from "@/components/ui/recovery-phrase";
import Header from "@/components/ui/header";

type SettingsItemProps = {
  title: string;
  rightElement?: React.ReactNode;
  onClick?: () => void;
};
const SettingsItem = (props: SettingsItemProps) => {
  return (
    <div
      className="bg-[#FFFFFF0A] px-4 h-[60px] flex justify-between items-center rounded-2xl cursor-pointer"
      onClick={props.onClick}
    >
      <p>{props.title}</p>
      {props.rightElement}
    </div>
  );
};

const SettingsPage = () => {
  const { plain, encrypted } = useWalletEssentialsStore();

  const [confirmActionProps, setConfirmActionProps] = useState<Omit<
    ConfirmActionProps,
    "onClose"
  > | null>(null);

  const [enterPwPromptProps, setEnterPwPromptProps] = useState<Omit<
    PasswordPromptProps,
    "onClose"
  > | null>(null);

  const [recoveryPhrase, setRecoveryPhrase] = useState<string>("");

  const handleShowRecovertyPhrase = () => {
    setEnterPwPromptProps({
      onSubmit: async (password) => {
        try {
          const decryptedMnemonic = await decryptData(
            encrypted.mnemonic,
            password
          );
          setRecoveryPhrase(decryptedMnemonic);
          setEnterPwPromptProps(null);
        } catch (error) {
          console.log(error);
          toast.error("Invalid password");
        }
      },
    });
  };

  return (
    <div className="bg-transparent border border-[#47278C] rounded-3xl p-8 w-full max-w-[580px] flex flex-col items-center text-center mx-auto">
      <div className="max-w-[500px] w-full px-3 flex flex-col">
        <Header title="Settings" onBack={() => window.history.back()} />
        {confirmActionProps && (
          <ConfirmAction
            {...confirmActionProps}
            onClose={() => setConfirmActionProps(null)}
          />
        )}

        {enterPwPromptProps && (
          <PasswordPrompt
            {...enterPwPromptProps}
            onClose={() => setEnterPwPromptProps(null)}
          />
        )}

        {/* <Header
        title={recoveryPhrase?.length > 0 ? "Recovery Phrase" : "Settings"}
        withBackButton={!!recoveryPhrase}
        onBackButtonClick={() => {
          setRecoveryPhrase("");
          }}
          /> */}

        {recoveryPhrase && (
          <RecoveryPhrase
            className="relative z-[200] h-full flex-1/2 mt-auto"
            phrase={recoveryPhrase}
          />
        )}
        {!recoveryPhrase && (
          <div className="flex flex-col gap-2">
            <SettingsItem
              title="Change Password"
              rightElement={<TbChevronRight color="#ADC8DF" />}
            />
            <SettingsItem
              title="Auto-lock Timer"
              rightElement={
                <div className="flex gap-2 text-[#ADC8DF] items-center">
                  <span className="font-light">10 Minutes</span>
                  <TbChevronRight color="#ADC8DF" />
                </div>
              }
            />
            <SettingsItem
              title="Show Recovery Phrase"
              rightElement={<TbChevronRight color="#ADC8DF" />}
              onClick={handleShowRecovertyPhrase}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
