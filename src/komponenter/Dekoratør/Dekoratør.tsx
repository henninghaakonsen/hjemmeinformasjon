import * as React from "react";
import moment from "moment";
import "moment/locale/nb";

const Dekoratør: React.StatelessComponent = () => {
    const hentTid = () => {
        return moment()
            .locale("nb")
            .format("LLLL");
    };

    const [tid, settTid] = React.useState(hentTid);

    React.useEffect(() => {
        const interval = setInterval(() => {
            settTid(hentTid());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.dekoratør}>
            <h2
                style={styles.tittel}
                children={`${tid.charAt(0).toLocaleUpperCase()}${tid.slice(
                    1,
                    tid.length
                )}`}
            />
        </div>
    );
};

const styles: any = {
    dekoratør: {
        backgroundColor: "#3E3832",
        display: "flex",
        justifyContent: "space-between",
        height: "2rem",
        padding: "1rem 1rem 1rem 1rem",
        width: "100%"
    },
    tittel: {
        color: "white",
        margin: "0"
    }
};

export default Dekoratør;
