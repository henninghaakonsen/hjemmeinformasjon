export interface IRutetider {
    stopPlace: {
        name: string;
        estimatedCalls: IEstimatedCall[];
    };
}

export interface IEstimatedCall {
    aimedArrivalTime: string;
    aimedDepartureTime: string;
    date: string;
    destinationDisplay: IDestinationDisplay;
    expectedArrivalTime: string;
    expectedDepartureTime: string;
    forAlighting: boolean;
    forBoarding: boolean;
    realtime: boolean;
}

export interface IDestinationDisplay {
    frontText: string;
}
