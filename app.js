function init() {

    var selector = d3.select('#selDataset');

    d3.json('samples.json').then((data) => {
        var sampleNames = data.names;

        sampleNames.forEach((sample) => {
            selector.append('option')
                .text(sample)
                .property('value', sample);
        });

        var sample = sampleNames[0];
        buildMetadata(sample);
        buildCharts(sample);
    });

}

function buildMetadata(sample) {
    d3.json('samples.json').then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        
        var metadataPanel = d3.select('#sample-metadata');
        metadataPanel.html('');
        Object.entries(result).forEach(([key, value]) => {
            metadataPanel.append('h6').text(`${key.toUpperCase()}: ${value}`);
        });

        buildGauge(result.wfreq);
    });
}

function buildCharts(sample){
    d3.json('samples.json').then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        
        var bubbleLayout = {
            title: 'Bacteria Cultures Per Sample',
            
            hovermode: 'closest',
            xaxis: {
                title: 'OTU ID'
            },
            
        };
        var bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: 'markers',
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: 'Earth'
                }
            }
        ];

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

        var yticks = otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();

        var barData = [
            {
                x: sample_values.slice(0, 10).reverse(),
                y: yticks,
                text: otu_labels.slice(0, 10).reverse(),
                type: 'bar',
                orientation: 'h',
            }
        ];

        var barLayout = {
            title: 'Top 10 Bacteria Cultures Found'
        };

        Plotly.newPlot('bar', barData, barLayout);
    })
}

function optionChanged(sample){
    buildMetadata(sample);
    buildCharts(sample);
}

init();