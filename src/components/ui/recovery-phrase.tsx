import React from "react";
import { Button } from "./button";
import InfoBox from "./info-box";

type RecoveryPhraseProps = {
  phrase: string;
  handleContinue?: () => void;
  className?: string;
};
const RecoveryPhrase = (props: RecoveryPhraseProps) => {
  return (
    <div className={props.className}>
      <div className="flex flex-col h-full py-5 gap-5">
        <InfoBox
          title="Do not share your Recovery phrase!"
          description="If someone has your Recovery Phrase they will have full control of your wallet."
        />
        <div className="grid grid-cols-3 gap-2">
          {props.phrase.split(" ").map((word, index) => (
            <div
              key={index}
              className="border border-white/25 rounded-[10px] px-3 text-center text-white h-[42px] flex items-center"
            >
              {index + 1}. {word}
            </div>
          ))}
        </div>
        {props.handleContinue && (
          <Button onClick={props.handleContinue} className="mt-auto">
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default RecoveryPhrase;
