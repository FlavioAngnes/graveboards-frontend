import {Suspense} from "react";
import BeatmapsetPanelList from "@/app/ui/shared/beatmapsetPanelList";
import BeatmapsetPanelSkeleton from "@/app/ui/shared/beatmapsetPanelSkeleton";

const Home = async () => {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-4 w-full">
            <Suspense fallback={<BeatmapsetPanelSkeleton />}>
                <BeatmapsetPanelList />
            </Suspense>
        </div>
    );
};

export default Home;
