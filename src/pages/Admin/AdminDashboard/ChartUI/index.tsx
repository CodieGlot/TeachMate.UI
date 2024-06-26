import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartsProps {
    chartType: 'bar' | 'pie' | 'candlestick' | 'heatmap';
}

export const Charts: React.FC<ChartsProps> = ({ chartType }) => {
    // Define chartOptions with the type ApexOptions for type safety
    const chartOptions: Record<ChartsProps['chartType'], { options: ApexOptions; series: ApexOptions['series'] }> = {
        bar: {
            series: [{ name: 'Sample Data', data: [10, 20, 30, 40] }],
            options: { chart: { type: 'bar' }, xaxis: { categories: ['A', 'B', 'C', 'D'] } },
        },
        pie: {
            series: [10, 20, 30],
            options: { chart: { type: 'pie' }, labels: ['A', 'B', 'C'] },
        },
        candlestick: {
            series: [{ data: [{ x: new Date(), y: [20, 30, 40, 50] }] }],
            options: { chart: { type: 'candlestick' } },
        },
        heatmap: {
            series: [{ name: 'Metric1', data: [10, 20, 30, 40] }],
            options: { chart: { type: 'heatmap' }, xaxis: { categories: ['X1', 'X2', 'X3', 'X4'] } },
        },
    };

    return (
        <Chart
            options={chartOptions[chartType].options}
            series={chartOptions[chartType].series}
            type={chartType}
            width="100%"
            height="100%"
        />
    );
};