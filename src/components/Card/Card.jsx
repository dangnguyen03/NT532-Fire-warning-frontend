import React, { useState, useEffect } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {motion, AnimateSharedLayout} from 'framer-motion';
import { UilTimes } from "@iconscout/react-unicons";
import ReactApexChart from "react-apexcharts";
import ApexCharts from 'apexcharts';

const Card = (props) => {
  
  const [expanded, setExpanded] = useState(false);

  // Sử dụng useEffect để theo dõi sự thay đổi của prop param và cập nhật state khi nó thay đổi
  useEffect(() => {
    setExpanded(false); // Reset expanded state khi param thay đổi
  }, [props]);
  return (
    <AnimateSharedLayout >
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </AnimateSharedLayout>
  );
};

// Compact Card
function CompactCard({ param, setExpanded }) {
  const Png = param.png;
  return (
    <motion.div 
      className="CompactCard "
      style={{
        backgroundImage: param.color.backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        />
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>{param.value}</span>
        <span>Chi tiết</span>
      </div>
    </motion.div>
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
  const data = {
    options: {
      chart: {
        id:'chartData',
        type: "bar",
        height: "auto",
      },
      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled:false,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      
      grid: {
        show: true,
      },
      xaxis: {
        categories: [ "6h ago", "5h ago", "4h ago", "3h ago", "2h ago", "1h ago", "At now"],
        labels: {
          style: {
                  colors: 'white',
                  fontSize: '15px',
          },
        },
      },
      
      yaxis: {
        labels: {
          style: {
              colors: 'white',
              fontSize: '17px',
          },
        },
      },
    },
  };
  let count = 0;
useEffect(() => {
  const interval = setInterval(() => {
    ApexCharts.exec("chartData", "updateSeries", [
      {
        data: param.series.data
      },
    ]);
  
    count++;
  
    if (count >= 2) {
      clearInterval(interval);
    }
  }, 1000);

  return () => {
    clearInterval(interval);
  };}, [param.series]);


  return (
    <motion.div
    animate={{
      y: -10,
      x: 150,
      scale: 1,
      rotate: 0,
    }}
      className="ExpandedCard "
      style={{
        backgroundImage: param.color.backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        boxShadow: param.color.boxShadow,
        color: 'white'
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
        <span style={{color: "white"}}>{param.title}</span>
      <div className="chartContainer">
        <ReactApexChart className='text-black' options={data.options} series={param.series} type="bar"/>
      </div>
      <span>Last 6 hours</span>
    </motion.div>
  );
}

export default Card;
