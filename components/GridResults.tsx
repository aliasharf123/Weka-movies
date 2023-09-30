
import PaginationMovies from './PaginationMovies';
import DetaildContentCard from '@/app/(Content)/components/DetaildContentCard';

function GridResults({data , page ,  media} : any) {
    return (
      <div>
        <div className="grid grid-cols-auto-fit    gap-5 mb-5  px-10">
          {data.results &&
            data.results.map((movie : any) => {
              return <DetaildContentCard movie={movie} />;
            })}
        </div>
        {data.total_pages > 1 && (
          <PaginationMovies page={page} value={data.total_pages} />
        )}
      </div>
    );
}

export default GridResults;