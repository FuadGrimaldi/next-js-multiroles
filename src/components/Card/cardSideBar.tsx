import React from "react";

export default function CardSideBar() {
  return (
    <>
      <div
        className="card mx-6 mt-4 shadow-xl bg-base"
        style={{
          backgroundImage: "url('/assets/Group_26953.png')",
        }}
      >
        <div className="card-body">
          <div className="p-5 bg-white w-10 rounded-lg mb-4"></div>
          <h2 className="card-title -mb-2 text-lg">Need Help?</h2>
          <p className="card-text">Please check our docs</p>
          <div className="card-actions justify-end bg-white rounded-lg p-3">
            <a href="/docs" className="text-black mx-auto font-semibold">
              Documentation
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
