import React, { useState } from "react";
import { Button } from "./button";
import InfoBox from "./info-box";
import toast from "react-hot-toast";
import Link from "next/link";

type RecoveryPhraseProps = {
  phrase: string;
  handleContinue?: () => void;
  className?: string;
  continueLink?: string;
};

const RecoveryPhrase = (props: RecoveryPhraseProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.phrase);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log("Failed to copy recovery phrase:", err);
    }
  };

  return (
    <div className={props.className}>
      <div className="flex flex-col h-full px-5 py-5 gap-5">
        <InfoBox
          title="Do not share your Recovery phrase!"
          description="If someone has your Recovery Phrase they will have full control of your wallet."
        />

        <div className="grid grid-cols-3 gap-2">
          {props.phrase.split(" ").map((word, index) => (
            <div
              key={index}
              className="border border-white/25 rounded-[10px] px-3 text-center text-white h-[42px] flex items-center justify-center"
            >
              {index + 1}. {word}
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={handleCopy}
          variant="secondary"
          size="md"
          className="w-full uppercase"
        >
          {copied ? "Copied!" : "Copy Recovery Phrase"}
        </Button>

        {(props.handleContinue || props.continueLink) && (
          <Button
            size="md"
            variant="primary"
            onClick={props.handleContinue}
            className="mt-auto relative"
          >
            {props.continueLink ? (
              <Link
                href={props.continueLink}
                target="_blank"
                className="h-full w-full block absolute inset-0"
              >
                Continue
              </Link>
            ) : (
              "Continue"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RecoveryPhrase;
