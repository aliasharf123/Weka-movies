import { ContentItem } from "@/types/ContentType";

function getInfo(content : ContentItem) {
    const title = content.name ?? content.title // get title of movie or tvshow 
    const type = content.media_type === 'movie' ? 'Movies' : 'TvShow' // get Media of data
    const realseData = content.release_date || content.first_air_date
    return {title , type , realseData}
}

export default getInfo;