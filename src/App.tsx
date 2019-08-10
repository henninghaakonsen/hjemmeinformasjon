import React from "react";
import Dekoratør from "./komponenter/Dekoratør/Dekoratør";
import TemperaturPanel from "./komponenter/Målinger/TemperaturPanel/TemperaturPanel";

const App: React.FC = () => {
    return (
        <div>
            <Dekoratør />
            <div style={styles.content}>
                <TemperaturPanel
                    style={styles.temperaturPanel}
                    interval={5000}
                />
            </div>
        </div>
    );
};

const styles = {
    content: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr",
        margin: "1rem",
        width: "100%"
    },
    temperaturPanel: {
        gridArea: "1 / 3"
    }
};
export default App;
