import * as React from "react";
import axios from "axios";
import { IMåling } from "../../../typer/temperatur";
import Card from "@material-ui/core/Card";
import { CardHeader, CardContent } from "@material-ui/core";

const apiIP = "https://84.208.191.92";
//const apiIP = "http://192.168.1.31";

interface IProps {
    interval: number;
    style: any;
}

interface IMålinger {
    [key: string]: IMåling;
}

interface ILokasjoner {
    [key: string]: string;
}
const lokasjoner: ILokasjoner = {
    ute: "Ute",
    bod: "Bod"
};

const TemperaturPanel: React.StatelessComponent<IProps> = ({
    interval,
    style
}) => {
    const hentMålinger = () => {
        axios.get(`${apiIP}:9000/api/temperatures_now`).then(response => {
            console.log(response.data);
            settMålinger(response.data);
        });
    };
    const [målinger, settMålinger] = React.useState<IMålinger>({});

    React.useEffect(() => {
        hentMålinger();

        const setinterval = setInterval(() => {
            hentMålinger();
        }, interval);

        return () => clearInterval(setinterval);
    }, [interval]);

    return (
        <Card
            style={{
                ...styles.kort,
                ...style
            }}
        >
            <CardHeader title={"Temperaturer"} />
            <CardContent>
                {Object.values(målinger).map(måling => {
                    const temperatur = parseFloat(måling.temperature);
                    return (
                        <div
                            key={måling.displayName}
                            style={styles.temperaturInformasjon}
                        >
                            <div>{lokasjoner[måling.displayName]}</div>
                            <div>
                                {`${(
                                    Math.round(temperatur / 0.5) * 0.5
                                ).toFixed(1)} °C`}
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};

const styles: any = {
    kort: {
        justifySelf: "end",
        width: "15rem",
        minHeight: "10rem"
    },
    temperaturInformasjon: {
        display: "flex",
        justifyContent: "space-between"
    }
};

export default TemperaturPanel;
