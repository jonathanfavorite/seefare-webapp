import { MarkerModel } from "./MarkerModel";

interface PathfindModel {
    nodes: MarkerModel[];
    times: PathFindTimes;
}
interface PathFindTimes {
    hours: number;
    minutes: number;
    seconds: number;
    hoursText: string;
    minutesText: string;
    secondsText: string;
}
export { type PathfindModel, type PathFindTimes}