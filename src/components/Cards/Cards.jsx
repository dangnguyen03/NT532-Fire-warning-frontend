import React, {useState, useEffect} from "react";
import "./Cards.css";
import { cardsData } from "../../Data/Data";
import Card from "../Card/Card";
import socketIOClient from 'socket.io-client';


const Cards = (props) => {

  const [datas, setDatas] = useState(cardsData);
  const [dtReal, setdtReal] = useState([]);
  useEffect(()=> {
    const socket = socketIOClient(process.env.REACT_APP_SOCKET);
    socket.on('value', (newData) => {
        let dt =[]
        dt.push(newData.humid);
        dt.push(newData.temp);
        dt.push(newData.gas);
        setdtReal(dt);
    });
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/data/getAverage/5C:CF:7F:49:CE:AF`);
        // console.log(`${process.env.REACT_APP_API_TB_HOURS}/${props?.macAddr}`)

        const apiData = await response.json();
        updateSeriesData(apiData);
        console.log(apiData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  const data = [
    {
      series: [
        {
          name: "humid",
          data: [null, null, null, null, null, null, null],
        },
      ],
    },
    {
      series: [
        {
          name: "temp",
          data: [null, null, null, null, null, null, null],
        },
      ],
    },
    {
      series: [
        {
          name: "gas",
          data: [null, null, null, null, null, null, null],
        },
      ],
    }
  ]
  const [dataSeries, setDataSeries] = useState(data)

  function updateSeriesData(apiData) {
    let dataTemp = [];
    let dataHumid = [];
    let dataGas = [];
    
    apiData.forEach(data => {
      dataTemp.push(data.temp);
      dataGas.push(data.gas);
      dataHumid.push(data.humid);
    });

    let newcardsData = [...data]

    newcardsData[0].series.data = dataHumid;
    newcardsData[1].series.data = dataTemp;
    newcardsData[2].series.data = dataGas;

    setDatas(cardsData);
    setDataSeries(newcardsData)
  }

  return (
    <div className="Cards mt-[25px]">
      {datas.map((card, index) => (
        <div className="parentContainer" key={card.id}>
          <Card
            key={card.id}  
            title={card.title}
            color={card.color}
            barValue={card.barValue}
            value={dtReal[index]}
            png={card.png}
            series={dataSeries[index].series}
          />
        </div>
      ))}


    </div>
  );
};

export default Cards;
