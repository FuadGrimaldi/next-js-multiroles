import React from "react";

export default function CardSideBar() {
  return (
    <>
      <div
        className="rounded rounded-md mx-6 mt-4 shadow-xl bg-base"
        style={{
          backgroundImage: "url('/assets/Group_26953.png')",
        }}
      >
        <div className="p-2 rounded rounded-md shadow-md">
          <div className="lg:p-5 p-3 bg-white w-10 rounded-lg mb-4"></div>
          <h2 className="mb-1 lg:text-lg text-sm">Need Help?</h2>
          <p className="mb-1 lg:text-lg text-sm">Please check our docs</p>
          <div className="flex justify-center bg-white rounded-lg p-3">
            <a
              href="/docs"
              className="text-black mx-auto font-semibold lg:text-lg text-sm"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
