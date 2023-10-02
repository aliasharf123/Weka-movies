import { CastCredit } from "../types/credits";
import getInfo from "./getInfo";

export function SortingMovie(a: CastCredit, b: CastCredit, isDesc: boolean , byPopularity? : boolean) {
  const { realseData: realseDataA } = getInfo(a as any);
  const { realseData: realseDataB } = getInfo(b as any);

  if(!byPopularity){
    const Adate: Date = new Date(realseDataA as any);
    const Bdate: Date = new Date(realseDataB as any);
    
    if (!realseDataA) return 1; // to put a A DATE after if it was undifend
    if (!realseDataB) return -1; // to put a B DATE Before if it was undifend
  
    return isDesc
      ? Bdate.getTime() - Adate.getTime()
      : Adate.getTime() - Bdate.getTime();
  }
  else{
    if (!a.vote_count) return 1; // to put a A vote count after if it was undifend
    if (!b.vote_count) return -1; // to put a B vote count Before if it was undifend
    return b.vote_count - a.vote_count  // sorting by movies which had a most vote count
  }
}
