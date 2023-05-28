import React from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

function SprintBurndown({chartData}) {
  return (
    <div style={{border: '1px solid #787878', borderRadius: 16}}>
      <div className="flex">
        <p className="text-left text-tg-text-color font-bold text-base mt-8 mx-6">
          Sprint Burndown
        </p>
      </div>
      <p className="text-sm italic ml-6 mt-4">
        Track and manage the total work remaining within a sprint.
      </p>
      <div
        className="chart-container xl:mt-7 2xl:mt-12 xl:mb-10 2xl:mb-13 3xl:mb-20"
        style={{
          width: '91%',
          marginLeft: '5%',
        }}
      >
        <Line data={chartData} options={{elements: {point: {radius: 0}}}} />
      </div>
    </div>
  );
}
export default SprintBurndown;
