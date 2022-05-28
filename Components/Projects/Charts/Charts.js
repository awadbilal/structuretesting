import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';

export const Linechart = ({ info, height, width, decimalPlaces, dotSize }) => {
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
      width={width}
      height={height}
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: 'transparent',
        backgroundGradientFrom: '#3D1273',
        backgroundGradientTo: '#3D1273',
        decimalPlaces: decimalPlaces,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: dotSize,
          strokeWidth: '1',
          stroke: '#FFFFFF',
        },
      }}
      bezier
      style={{
        paddingBottom: 0,
        paddingLeft: 0,
        marginLeft: 0,
        borderRadius: 16,
      }}
    />
  );
};
