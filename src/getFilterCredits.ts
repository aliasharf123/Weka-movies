import { dataType } from "@/app/(Content)/People/components/TimeLine/FilterCredits";
import { CategorizedMap } from "@/app/(Content)/People/components/TimeLine/TimelineCareer";

export const getFilterCredits = (
  credit_media_type: null | undefined | string,
  credit_department: null | undefined | string,
  data: dataType
): CategorizedMap | undefined => {
  const { CategoriesAllCredits, CategoriesMovieCredits, CategoriesTvCredits } = data;

  if (!credit_department && !credit_media_type) {
    return CategoriesAllCredits;
  }
  // Filter by Media type
  if (credit_media_type === "Tv") {
    if (credit_department) {
      if (!CategoriesTvCredits[credit_department]) return undefined;
      return { [credit_department]: CategoriesTvCredits[credit_department] };
    } else return CategoriesTvCredits;
  } else if (credit_media_type === "Movies") {
    if (credit_department) {
      if (!CategoriesMovieCredits[credit_department]) return undefined;
      return {
        [credit_department]: CategoriesMovieCredits[credit_department],
      };
    } else return CategoriesMovieCredits;
  } else {
    if (credit_department) {
      if (!CategoriesAllCredits[credit_department]) return undefined;
      return {
        [credit_department]: CategoriesAllCredits[credit_department],
      };
    } else return CategoriesAllCredits;
  }
};
