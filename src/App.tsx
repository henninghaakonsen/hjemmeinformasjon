import React from "react";
import Dekoratør from "./komponenter/Dekoratør/Dekoratør";
import TemperaturPanel from "./komponenter/Målinger/TemperaturPanel/TemperaturPanel";
import RutetidPanel from "./komponenter/Rutetider/RutetidPanel";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
    uri: "https://api.entur.io/journey-planner/v2/graphql",
    headers: {
        "ET-Client-Name": "hjemmeinformasjon__henning"
    }
});

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <Dekoratør />
            <div style={styles.content}>
                <TemperaturPanel
                    style={styles.temperaturPanel}
                    interval={5000}
                />
                <RutetidPanel style={styles.rutetidPanel} interval={5000} />
            </div>
        </ApolloProvider>
    );
};

const styles = {
    content: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr",
        padding: "1rem",
        width: "calc(100% - 2rem)"
    },
    temperaturPanel: {
        gridArea: "1 / 3"
    },
    rutetidPanel: {
        gridArea: "1 / 1"
    }
};
export default App;
