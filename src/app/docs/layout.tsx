import React from "react";
import SidebarLink from "@/components/Docs/SidebarLink";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="pb-16 pt-[130px] md:pb-20 md:pt-28 lg:pb-[400px] lg:pt-[200px]"
      id="docs"
    >
      <div className="container mx-auto">
        <div className="mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-1/4 lg:pb-0 pb-6">
            <div className="sticky top-[74px] rounded-lg border border-white p-4 shadow-solid-4 transition-all">
              <ul className="space-y-2">
                <SidebarLink />
              </ul>
            </div>
          </div>

          <div className="w-full px-4 lg:w-3/4">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </section>
  );
}
