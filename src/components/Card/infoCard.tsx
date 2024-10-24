import React from "react";

// Component for a single card
const InfoCard = ({
  color,
  title,
  value,
}: {
  color: string;
  title: string;
  value: string | number;
}) => {
  return (
    <div className="h-24 lg:mx-[90px] mx-6 shadow-md rounded-lg overflow-hidden">
      <div className="p-2" style={{ backgroundColor: color }}>
        <h3 className="text-white lg:text-lg text-base font-semibold">
          {title}
        </h3>
      </div>
      <p
        className="text-center lg:text-2xl text-xl font-bold pt-2"
        style={{ color: color }}
      >
        {value}
      </p>
    </div>
  );
};

export default InfoCard;
