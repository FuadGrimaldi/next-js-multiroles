// InCubeStatus.tsx
import React from "react";

type InCubeStatusProps = {
  title: string;
  value: number;
};

const InCubeStatus: React.FC<InCubeStatusProps> = ({ title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-40 text-center text-black">
      <p className="font-semibold">InCube Active</p>
      <h2 className="text-2xl font-bold">
        {value} {title}
      </h2>
    </div>
  );
};

export default InCubeStatus;
