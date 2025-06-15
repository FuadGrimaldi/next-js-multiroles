"use client";
import React from "react";

type UserDetailPageProps = {
  params: { slug: string[] };
};

export default function UserDetailPage(props: UserDetailPageProps) {
  const { params } = props;

  return (
    <main>
      <div className="bg-gray-900">
        <div className="text-dark">User Detail</div>
        <p>User slug: {params.slug[0]}</p>
      </div>
    </main>
  );
}
