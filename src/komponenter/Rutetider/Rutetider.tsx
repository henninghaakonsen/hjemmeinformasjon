import * as React from "react";
import { IRutetider, IEstimatedCall } from "../../typer/rutetider";
import { Typography } from "@material-ui/core";
import moment from "moment";

interface IProps {
    rutetider: IRutetider;
}

const Rutetider: React.StatelessComponent<IProps> = ({ rutetider }) => {
    return (
        <div style={styles.rutetider}>
            <Typography color="textSecondary">
                {rutetider.stopPlace.name}
            </Typography>
            {rutetider.stopPlace.estimatedCalls
                .filter(
                    (estimatedCall: IEstimatedCall) => estimatedCall.forBoarding
                )
                .map((estimatedCall: IEstimatedCall) => {
                    return (
                        <div
                            key={estimatedCall.aimedArrivalTime}
                            style={styles.rutetidInformasjon}
                        >
                            <div>
                                {estimatedCall.destinationDisplay.frontText}
                            </div>
                            <div>
                                {moment(
                                    estimatedCall.expectedDepartureTime
                                ).format("HH:mm")}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

const styles = {
    rutetider: {},
    rutetidInformasjon: {
        display: "flex",
        justifyContent: "space-between"
    }
};

export default Rutetider;
