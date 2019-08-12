import React from "react";
import Dekoratør from "./komponenter/Dekoratør/Dekoratør";
import TemperaturPanel from "./komponenter/Målinger/TemperaturPanel/TemperaturPanel";
import RutetidPanel from "./komponenter/Rutetider/RutetidPanel";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
const Background = require("./IMG_3677.jpg");

const client = new ApolloClient({
    uri: "https://api.entur.io/journey-planner/v2/graphql",
    headers: {
        "ET-Client-Name": "hjemmeinformasjon__henning"
    }
});

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <div style={styles.content}>
                <div style={styles.grid}>
                    <TemperaturPanel
                        style={styles.temperaturPanel}
                        interval={5000}
                    />
                    <RutetidPanel style={styles.rutetidPanel} interval={5000} />
                </div>
                <Dekoratør />
            </div>
        </ApolloProvider>
    );
};

const styles = {
    content: {
        background: `url(${Background}) no-repeat center center fixed`,
        backgroundSize: "cover",
        padding: "1rem"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr",
        width: "100%"
    },
    temperaturPanel: {
        gridArea: "1 / 3"
    },
    rutetidPanel: {
        gridArea: "1 / 1"
    }
};
export default App;
