import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
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
import logo from './logo.png'

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

const optionsTemp = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Temperature',
    },
  },
};

const optionsPres = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Pressure',
    },
  },
};

const optionsHumi = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Humidity',
    },
  },
};

const optionsAlti = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Altitude',
    },
  },
};

const optionsSound = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sound Intensity',
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

  const tempRef = useRef(null);
  const humiRef = useRef(null);
  const presRef = useRef(null);
  const altiRef = useRef(null);
  const soundRef = useRef(null);

  var counter = 20.0;

  useEffect(() => {
    setTimeout(() => {
      addData(tempRef.current, `${counter}`, counter);
    }, 1000);
  }, []);

  return (
    <>
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand className="text-light"><img src={logo} className="App-logo"/> Working Title Lol </Navbar.Brand>
          <DropdownButton id="dropdown-basic-button" title="Serial Numbers">
            <Dropdown.Item href="#/action-1">Serial Number 1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Serial Number 2</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Serial Number 3</Dropdown.Item>
          </DropdownButton>
        </Container>
      </Navbar>
      <Container>
        <Row className="justify-content-center">
          <Row>
            <div class="grid-container">
              <div class="grid-item"><Line ref={tempRef} datasetIdKey='id' data={testing} options={optionsTemp} /></div>
              <div class="grid-item"><Line ref={humiRef} datasetIdKey='id' data={testing} options={optionsHumi} /></div>
            </div>
            <div class="grid-container">
              <div class="grid-item"><Line ref={presRef} datasetIdKey='id' data={testing} options={optionsPres} /></div>
              <div class="grid-item"><Line ref={altiRef} datasetIdKey='id' data={testing} options={optionsAlti} /></div>
            </div>
            <div class="grid-container">
              <div class="grid-item"><Line ref={soundRef} datasetIdKey='id' data={testing} options={optionsSound} /></div>
            </div>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default App;
