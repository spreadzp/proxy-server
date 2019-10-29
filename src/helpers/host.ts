import * as dotenv from "dotenv";
dotenv.config();

export enum Host {
    DEX,
    API,
    NDX_NODE
}
export module HostUrl {
    export function getUrl(typeHost: Host) {
        const Servers = [];
        Servers[Host.DEX] = [process.env.DEX_NODE];
        Servers[Host.API] = [process.env.API_NODE];
        Servers[Host.NDX_NODE] = [process.env.NDX_NODE];
        return Servers[typeHost];
    }  
}