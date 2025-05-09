import React from "react";

type InfoBoxProps = {
  title: string;
  description: string;
};
const InfoBox = (props: InfoBoxProps) => {
  return (
    <div className="px-4 py-5 text-center bg-[#FFFFFF0A] rounded-[20px]">
      <h3 className="text-lg text-[#FF4D6B] mb-1">{props.title}</h3>
      <p className="text-sm">{props.description}</p>
    </div>
  );
};

export default InfoBox;
