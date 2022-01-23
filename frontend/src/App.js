import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Pie, Line } from "react-chartjs-2";

import { useState, useEffect, useRef } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const testing = {
  labels: ['test', 'test', 'test'],
  datasets: [
    {
      label: 'Temperature',
      data: [20.25, 20, 21.6],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ]
}

function addData(chart, label, newData) {
  if (chart) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      if (dataset.data.length >= 20) {
        chart.data.labels.shift();
        dataset.data.shift();
      }
      dataset.data.push(newData);
    });
    chart.update();
  }

  setTimeout(() => {
    addData(chart, `${newData + 1}`, newData + 1);
  }, 5000);
}

function App() {
  const [data, setData] = useState(testing);

  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      console.log('ChartJS', chart);
    }
  }, []);

  var counter = 20.0;

  useEffect(() => {
    setTimeout(() => {
      addData(chartRef.current, `${counter}`, counter);
    }, 1000);
  }, []);

  return (
    <>
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand className="text-light">Testing</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row className="justify-content-center">
          <Row>
            <Button>Testing</Button>
          </Row>
          <Row>
            <div class="grid-container">
              <div class="grid-item"><Line ref={chartRef} datasetIdKey='id' data={testing} options={options} /></div>
              <div class="grid-item"><Line ref={chartRef} datasetIdKey='id' data={testing} options={options} /></div>
            </div>
            <div class="grid-container">
              <div class="grid-item"><Line ref={chartRef} datasetIdKey='id' data={testing} options={options} /></div>
              <div class="grid-item"><Line ref={chartRef} datasetIdKey='id' data={testing} options={options} /></div>
            </div>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default App;
