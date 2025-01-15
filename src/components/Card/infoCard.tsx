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
    <div className="lg:h-24 h-[60px] lg:mx-[60px] mx-2 shadow-md rounded-lg overflow-hidden">
      <div className="lg:p-2 p-1" style={{ backgroundColor: color }}>
        <h3 className="text-white lg:text-lg text-sm font-semibold">{title}</h3>
      </div>
      <p
        className="text-center lg:text-2xl text-base font-bold lg:pt-2 pt-0 lg:py-0 py-2"
        style={{ color: color }}
      >
        {value}
      </p>
    </div>
  );
};

export default InfoCard;
