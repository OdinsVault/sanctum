import {API} from "./APICallService";
import {leaderboard} from "../constant";

export async function getRankings(page,limit) {
    const endpoint = `/leaderboard?page=${page}&limit=${limit}`;
    let api = await API();
    // var response = await api.get(endpoint);
    return leaderboard;
}