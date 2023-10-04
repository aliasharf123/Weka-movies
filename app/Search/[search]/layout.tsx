import React, { Suspense } from "react";
import ChooseContent from "./ChooseContent";

export default function Layout(props: { SearchResults: React.ReactNode }) {
  return (
    <div className="text-white flex flex-col mt-20  gap-5 ">
      <ChooseContent />
      {props.SearchResults}
    </div>
  );
}
