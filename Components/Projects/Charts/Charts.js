import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LineChart, BarChart } from 'react-native-chart-kit';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export const Linechart = ({ info }) => {
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);
  const [zData, setZData] = useState([]);

  useEffect(() => {
    const newX = [],
      newY = [],
      newZ = [];

    for (let i = 0; i < info.x.length; i++) {
      newX.push(Math.round(info.x[i] * 10000) / 10000);
      newY.push(Math.round(info.y[i] * 10000) / 10000);
      newZ.push(Math.round(info.z[i] * 10000) / 10000);
    }

    setXData(info?.x);
    setYData(info?.y);
    setZData(info?.z);
  }, []);

  return (
    <LineChart
      data={{
        labels: ['X', 'Y', 'Z'],
        datasets: [
          {
            data: xData,
            strokeWidth: '1',
            color: (opacity = 1) => '#FA3003',
          },
          {
            data: yData,
            strokeWidth: '1',
            color: (opacity = 1) => '#10A9B0',
          },
          {
            data: zData,
            strokeWidth: '1',
            color: (opacity = 1) => '#F7931A',
          },
        ],
      }}
      withShadow={false}
      withInnerLines={false}
      withOuterLines={false}
      width={300}
      height={300}
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: 'transparent',
        backgroundGradientFrom: '#3D1273',
        backgroundGradientTo: '#3D1273',
        decimalPlaces: 4,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '3',
          strokeWidth: '1',
          stroke: '#FFFFFF',
        },
      }}
      bezier
      style={{
        borderRadius: 16,
      }}
    />
  );
};

export const Barchart = () => {
  return <BarChart />;
};
