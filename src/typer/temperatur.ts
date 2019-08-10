export interface IFetchNode {
    nodes: INode[];
}

export interface INode {
    displayName: string;
    id: string;
}

export interface IMåling {
    displayName: string;
    temperature: string;
    timestamp: string;
}
