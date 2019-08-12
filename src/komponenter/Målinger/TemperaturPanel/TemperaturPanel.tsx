import * as React from "react";
import axios from "axios";
import { IMåling } from "../../../typer/temperatur";
import Card from "@material-ui/core/Card";
import { CardHeader, CardContent, Typography } from "@material-ui/core";
import moment from "moment";

const apiIP = "https://hjemmeinformasjon-server.herokuapp.com/";
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
        axios.get(`${apiIP}api/temperatures_now`).then(response => {
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

    const målingListe = Object.values(målinger);
    return (
        <Card
            style={{
                ...styles.kort,
                ...style
            }}
        >
            <CardHeader title={"Temperaturer"} />
            <CardContent>
                <Typography color="textSecondary">
                    {`Sist oppdatert: ${moment(
                        målingListe[0] && målingListe[0].timestamp
                    ).format("HH:mm")}`}
                </Typography>
                {målingListe.map(måling => {
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
