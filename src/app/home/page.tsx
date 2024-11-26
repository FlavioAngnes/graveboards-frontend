import {Suspense} from "react";
import BeatmapsetList from "@/components/beatmapsets/beatmapsetList";
import BeatmapsetPanelSkeleton from "@/components/beatmapsets/beatmapsetPanelSkeleton";

const Home = async () => {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-4 w-full">
            <Suspense fallback={<BeatmapsetPanelSkeleton />}>
                <BeatmapsetList />
            </Suspense>
        </div>
    );
};

export default Home;
