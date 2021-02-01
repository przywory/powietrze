const level1 = 25;
const level2 = 50;
const level3 = 75;
const level4 = 100;

export const calculatePM25CAQI = (measurement: number) => {
    const concentration1 = 10;
    const concentration2 = 20;
    const concentration3 = 30;
    const concentration4 = 60;
    if (measurement >= 0 && measurement <= concentration1)
    {
        return ((level1 - 0) / (concentration1 - 0)) * (measurement - 0) + 0;
    }
    else
    {
        if (measurement > concentration1 && measurement <= concentration2)
        {
            return ((level2 - level1) / (concentration2 - concentration1)) * (measurement - concentration1) + level1;
        }
        else
        {
            if (measurement > concentration2 && measurement <= concentration3)
            {
                return ((level3 - level2) / (concentration3 - concentration2)) * (measurement - concentration2) + level2;
            }
            else
            {
                if (measurement > concentration3 && measurement <= concentration4)
                {
                    return ((level4 - level3) / (concentration4 - concentration3)) * (measurement - concentration3) + level3;
                }
                else
                {
                    if (measurement > concentration4)
                    {
                        return 101;
                    }
                }
            }
        }
    }
}

export const calculatePM10CAQI = (measurement: number) => {
    const concentration1 = 15;
    const concentration2 = 30;
    const concentration3 = 50;
    const concentration4 = 100;
    if (measurement >= 0 && measurement <= concentration1)
    {
        return ((level1 - 0) / (concentration1 - 0)) * (measurement - 0) + 0;
    }
    else
    {
        if (measurement > concentration1 && measurement <= concentration2)
        {
            return ((level2 - level1) / (concentration2 - concentration1)) * (measurement - concentration1) + level1;
        }
        else
        {
            if (measurement > concentration2 && measurement <= concentration3)
            {
                return ((level3 - level2) / (concentration3 - concentration2)) * (measurement - concentration2) + level2;
            }
            else
            {
                if (measurement > concentration3 && measurement <= concentration4)
                {
                    return ((level4 - level3) / (concentration4 - concentration3)) * (measurement - concentration3) + level3;
                }
                else
                {
                    if (measurement > concentration4)
                    {
                        return 101;
                    }
                }
            }
        }
    }
}


export const CAQIScaleData = [
    {
        "label": "Bardzo dobra",
        "color": "#79bc6a",
        "to": 25,
        "from": 0,
    },
    {
        "label": "Dobra",
        "color": "#bbcf4c",
        "to": 50,
        "from": 25.01,
    },
    {
        "label": "Średnia",
        "color": "#eec20b",
        "to": 75,
        "from": 50.01
    },
    {
        "label": "Zła",
        "color": "#f29305",
        "to": 99.99,
        "from": 75.01,
    },
    {
        "label": "Bardzo zła",
        "color": "#960018",
        "to": 1000,
        "from": 100.01,
    }
]

export const getCAQIdata = (caqi: number) => {

    if (caqi <= level1) {
        return CAQIScaleData[0]
    }

    if (caqi <= level2) {
        return CAQIScaleData[1]
    }

    if (caqi <= level3) {
        return CAQIScaleData[2]
    }

    if (caqi <= level4) {
        return CAQIScaleData[3]
    }

    return CAQIScaleData[4]
}
