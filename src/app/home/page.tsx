import {BeatmapsetsProvider} from "@/providers/beatmapsetsProvider";

const Home = async () => {
    return (
        <div className="flex flex-col gap-6">
            <BeatmapsetsProvider
                title="Latest Beatmaps"
                defaultSortingLayers={
                    [
                        {
                            value: 'Request.created_at',
                            order: 'desc',
                            isDefault: true
                        }
                    ]
                }/>
        </div>
    );
};

export default Home;
