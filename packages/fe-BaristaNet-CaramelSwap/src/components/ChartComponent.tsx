// 'use client';

// import {
//   AreaSeries,
//   createChart,
//   ColorType,
//   IChartApi,
// } from 'lightweight-charts';
// import React, { useEffect, useRef } from 'react';

// interface ChartComponentProps {
//   data: { time: string; value: number }[];
//   colors?: {
//     backgroundColor?: string;
//     lineColor?: string;
//     textColor?: string;
//     areaTopColor?: string;
//     areaBottomColor?: string;
//   };
// }

// export const ChartComponent: React.FC<ChartComponentProps> = ({
//   data,
//   colors: {
//     backgroundColor = 'white',
//     lineColor = '#2962FF',
//     textColor = 'black',
//     areaTopColor = '#2962FF',
//     areaBottomColor = 'rgba(41, 98, 255, 0.28)',
//   } = {},
// }) => {
//   const chartContainerRef = useRef<HTMLDivElement | null>(null);
//   const chartRef = useRef<IChartApi | null>(null); // Ref to hold chart instance

//   useEffect(() => {
//     const handleResize = () => {
//       if (chartRef.current && chartContainerRef.current) {
//         chartRef.current.applyOptions({
//           width: chartContainerRef.current.clientWidth,
//         });
//       }
//     };

//     if (chartContainerRef.current) {
//       const chart = createChart(chartContainerRef.current, {
//         layout: {
//           background: { type: ColorType.Solid, color: backgroundColor },
//           textColor,
//         },
//         width: chartContainerRef.current.clientWidth,
//         height: 300,
//       });

//       chartRef.current = chart; // Store chart instance

//       const newSeries = chart.addSeries(AreaSeries, {
//         lineColor,
//         topColor: areaTopColor,
//         bottomColor: areaBottomColor,
//       });

//       newSeries.setData(data);
//       chart.timeScale().fitContent();

//       window.addEventListener('resize', handleResize);

//       return () => {
//         window.removeEventListener('resize', handleResize);
//         chart.remove();
//       };
//     }
//   }, [
//     data,
//     backgroundColor,
//     lineColor,
//     textColor,
//     areaTopColor,
//     areaBottomColor,
//   ]);

//   return <div ref={chartContainerRef} />;
// };

'use client';

import {
  AreaSeries,
  createChart,
  ColorType,
  type IChartApi,
  AreaData,
  Time,
} from 'lightweight-charts';
import type React from 'react';
import { useEffect, useRef } from 'react';

interface ChartComponentProps {
  data: { time: string | number; value: number }[] | undefined;
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
  };
}

export const ChartComponent: React.FC<ChartComponentProps> = ({
  data,
  colors: {
    backgroundColor = 'white',
    lineColor = '#2962FF',
    textColor = 'black',
    areaTopColor = '#2962FF',
    areaBottomColor = 'rgba(41, 98, 255, 0.28)',
  } = {},
}) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null); // Ref to hold chart instance

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        width: chartContainerRef.current.clientWidth,
        height: 400,
      });

      chartRef.current = chart; // Store chart instance

      const newSeries = chart.addSeries(AreaSeries, {
        lineColor,
        topColor: areaTopColor,
        bottomColor: areaBottomColor,
      });

      // newSeries.setData(data);

      newSeries.setData(data as AreaData<Time>[]);

      const logo = document.getElementById('tv-attr-logo');
      if (logo) {
        logo.classList.add('hidden');
      }

      chart.timeScale().fitContent();

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};
