import React, { useRef, useState, useEffect } from "react";
import Chart from "chart.js/auto";
function Charts(prop) {
  const [y, setY] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0,
  ]);
  useEffect(() => {
    setY(prop.y);
    console.log(y);
  }, [prop.y]);
  const chartErrorAccuracyRatio = useRef(null);
  // useEffect(() => {
  //   const ctx = chartErrorAccuracyRatio.current.getContext("2d");
  //   const myChart = new Chart(ctx, {
  //     type: "bar",
  //     data: {
  //       labels: prop.x,
  //       datasets: y,
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // });
  return (
    <>
      <canvas id="myChart" ref={chartErrorAccuracyRatio} />
    </>
  );
}

export default Charts;
