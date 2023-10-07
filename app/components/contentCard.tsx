import { ContentItem } from "@/types/ContentType";
import AddFavorite from "../../components/Favorite";
import Link from "next/link";
import Image from "next/image";
import getInfo from "@/src/getInfo";
import StarIconClient from "@/components/clientBottomTree/StarIconClient";
import { defaultImage } from "@/src/defaultImage";

export default function ContentCard({
  movie,
  isPersonProfile,
}: {
  movie: ContentItem;
  isPersonProfile?: boolean;
}) {
  const { title, type, realseData } = getInfo(movie);
  const RealeseYear = new Date(realseData as any).getFullYear();

  return (
    <div
      key={movie.id}
      className={`relative   ${
        isPersonProfile
          ? " md:min-w-[11rem] max-w-[10rem] min-w-[10rem]  md:max-w-[11rem] h-64"
          : "md:min-w-[12rem] max-w-[11rem] min-w-[11rem] md:max-w-[12rem] h-[17rem] md:h-72"
      }   group  animate__animated animate__fadeIn`}
    >
      <Image
        className=" rounded-xl brightness-[.80] duration-300  object-cover  relative "
        src={
          movie.poster_path
            ? `https://www.themoviedb.org/t/p/w500${movie.poster_path}`
            : defaultImage
        }
        alt={title as any}
        fill
      />
      <div className="flex text-yellow-400  top-0 absolute bg-black rounded-full p-1 px-2 m-2 text-xs  items-center">
        <StarIconClient />
        <p className=" text-gray-300">{movie.vote_average}</p>
      </div>
      <div className="p-2 rounded-b-lg h-fit pb-2 absolute bottom-0 w-full flex flex-col gap-3">
        <div className="grid leading-5">
          <h1 className="font-semibold  duration-300 truncate">{title}</h1>
          <p className="text-gray-300">{RealeseYear || "no Realese Year"}</p>
        </div>
        <div className="flex gap-2 justify-between">
          <Link
            href={`/${type}/${movie.id}-${title?.replace(" ", "-")}`}
            passHref
            className="bg-redColorTransparent rounded-lg px-2 p-1  hover:brightness-125 "
          >
            See More
          </Link>
          <div className="bg-WhiteTransparent rounded-lg flex justify-center items-center  relative px-2 text-xl">
            <AddFavorite movie={movie} />
          </div>
        </div>
      </div>
    </div>
  );
}
