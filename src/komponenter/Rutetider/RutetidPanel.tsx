import * as React from "react";
import Card from "@material-ui/core/Card";
import { CardHeader, CardContent } from "@material-ui/core";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { IRutetider } from "../../typer/rutetider";
import Rutetider from "./Rutetider";

interface IProps {
    interval: number;
    style: any;
}

const query = gql`
    {
        stopPlace(id: "NSR:StopPlace:58243") {
            id
            name
            estimatedCalls(timeRange: 72100, numberOfDepartures: 10) {
                realtime
                aimedArrivalTime
                aimedDepartureTime
                expectedArrivalTime
                expectedDepartureTime
                date
                forBoarding
                forAlighting
                destinationDisplay {
                    frontText
                }
            }
        }
    }
`;

const RutetidPanel: React.FunctionComponent<IProps> = ({ interval, style }) => {
    const { loading, data } = useQuery<IRutetider>(query);

    return (
        <Card
            style={{
                ...styles.kort,
                ...style
            }}
        >
            <CardHeader title={"Rutetider"} />
            <CardContent>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    data && <Rutetider rutetider={data} />
                )}
            </CardContent>
        </Card>
    );
};

const styles: any = {
    kort: {
        justifySelf: "start",
        width: "15rem",
        minHeight: "10rem"
    }
};

export default RutetidPanel;
