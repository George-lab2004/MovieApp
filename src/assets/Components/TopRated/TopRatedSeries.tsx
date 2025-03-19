import { useEffect, useState } from "react";
import { axiosInstanceURL, Series } from "../../../Services/EndPoints/URLS";
import Header from "../Shared/Header";
import MediaCard from "../Media/MediaCard/MediaCard";
interface Similar {
  original_title?: string;
  poster_path?: string;
  vote_average?: number;
  id: number;
}
export default function TopRatedSeries() {
  const [series, setSeries] = useState<Similar[]>([]);
  const [show] = useState(false);
  async function getSeries() {
    const response = await axiosInstanceURL.get(Series.TopRated);
    setSeries(response?.data?.results);
    console.log(response?.data?.results);
  }
  useEffect(() => {
    getSeries();
  }, []);

  return (
    <div className="Top-Rated">
      <div className="my-5 mt-8">
        <Header title="Top Rated Series" />
      </div>
      <div className="relative flex overflow-x-auto space-x-4 p-5">
        {series.map((Series) => (
          <MediaCard key={Series.id} media={Series} show={show} />
        ))}
      </div>
    </div>
  );
}
