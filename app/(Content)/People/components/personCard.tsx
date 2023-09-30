import Image from "next/image";
import React from "react";
import Link from "next/link";
import { PersonResult } from "@/types/PeopleType";
import getInfo from "@/src/getInfo";
import { defaultImage } from "@/src/defaultImage";
export default function PersonCard({ person }: { person: PersonResult }) {
  return (
    <div className="bg-HeaderColor rounded-xl" key={person.id}>
      <Link href={`/People/${person.id}-${person.name.replaceAll(" ", "-")}`}>
        <div className="overflow-hidden rounded-t-xl">
          <Image
            alt={person.name}
            className="rounded-t-xl hover:scale-105 duration-200 hover:brightness-75 h-[300px] object-cover w-full"
            width={200}
            height={200}
            src={
              person.profile_path
                ? `https://www.themoviedb.org/t/p/w500${person.profile_path}`
                : defaultImage
            }
          />
        </div>
      </Link>
      <div className="p-2 grid gap-1">
        <h1 className="text-lg">{person.name}</h1>
        <h1 className="text   text-sm w-full text-SecondaryText ">
          {person.known_for.map((content) => {
            const { title, type } = getInfo(content as any);
            return (
              <span
                className="w-fit  break-all  hover:text-redColor duration-200 cursor-pointer"
                key={content.id}
              >
                <Link
                  href={`/${type}/${content.id}-${title?.replaceAll(" ", "-")}`}
                >
                  {" "}
                  {title}
                </Link>
              </span>
            );
          })}
        </h1>
      </div>
    </div>
  );
}
