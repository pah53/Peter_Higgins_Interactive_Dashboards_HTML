function buildGauge(wfreq) {
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 9] },
                bar: { color: "red" },
                steps: [
                    { range: [0, 3], color: "cornsilk" },
                    { range: [3, 6], color: "lightgreen" },
                    { range: [6, 9], color: "green" }
                ],
            },
        }
    ];
    
    var layout = { width: 600, height: 500 };
    Plotly.newPlot('gauge', data, layout);
}