import ContentCard from "@/app/components/contentCard";
import { ContentItem } from "@/types/ContentType";
import { PageResult, SinglePerson } from "@/types/PeopleType";
import React from "react";

const getKnownFor = async (person: SinglePerson) => {
  const { id, name } = person;
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US&api_key=${process.env.NEXT_PUBLIC_DB_key}`
  );
  const KnownForData = await res.json();
  //   let KnownForData: ContentItem[] | undefined = peopleResults.results.find(
  //     (Person) => Person.id === person.id
  //   )?.known_for as ContentItem[];
  return KnownForData.cast;
};

export default async function KnownFor({ person }: { person: SinglePerson }) {
  const KnownForData = await getKnownFor(person);

  return (
    <div className="overflow-scroll   overflow-y-hidden  removeScroll">
      <div className="flex flex-row gap-3    max-lg:ml-6 ">
        {KnownForData.map((cotent: any) => (
          <ContentCard isPersonProfile movie={cotent} />
        ))}
      </div>
    </div>
  );
}
