import { MarkerModel } from "./MarkerModel";

interface PathfindModel {
    nodes: MarkerModel[];
    times: PathFindTimes;
    miles: number;
    bridges: number;
}
interface PathFindTimes {
    hours: number;
    minutes: number;
    seconds: number;
    timeText: string;
}
export { type PathfindModel, type PathFindTimes}