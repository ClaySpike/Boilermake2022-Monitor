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

const tempData = {
  labels: [],
  datasets: [
    {
      label: 'Temperature',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ]
}

const humiData = {
  labels: [],
  datasets: [
    {
      label: 'Humidity',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ]
}

const altiData = {
  labels: [],
  datasets: [
    {
      label: 'Altitude',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ]
}

const presData = {
  labels: [],
  datasets: [
    {
      label: 'Air Pressure',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ]
}

const soundData = {
  labels: [],
  datasets: [
    {
      label: 'Sound Level',
      data: [],
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
  const [serial, setSerial] = useState([]);

  const tempRef = useRef(null);
  const humiRef = useRef(null);
  const presRef = useRef(null);
  const altiRef = useRef(null);
  const soundRef = useRef(null);

  var counter = 20.0;

  useEffect(async () => {
    fetch('http://localhost:8080/serials')
      .then((response) => response.json())
      .then((data) => setSerial(data));
  }, []);

  useEffect(() => {
    const sse = new EventSource('http://localhost:8080/stream');

    function updateCharts(data) {
      tempRef.current.data.labels.push("");

      tempRef.current.data.datasets.forEach((dataset) => {
        if (dataset.data.length >= 24) {
          tempRef.current.data.labels.shift();
          dataset.data.shift();
        }
        dataset.data.push(data.temperature);
      });
      tempRef.current.update();

      humiRef.current.data.labels.push("");

      humiRef.current.data.datasets.forEach((dataset) => {
        if (dataset.data.length >= 24) {
          humiRef.current.data.labels.shift();
          dataset.data.shift();
        }
        dataset.data.push(data.humidity);
      });
      humiRef.current.update();

      altiRef.current.data.labels.push("");

      altiRef.current.data.datasets.forEach((dataset) => {
        if (dataset.data.length >= 24) {
          altiRef.current.data.labels.shift();
          dataset.data.shift();
        }
        dataset.data.push(data.altitude);
      });
      altiRef.current.update();

      presRef.current.data.labels.push("");

      presRef.current.data.datasets.forEach((dataset) => {
        if (dataset.data.length >= 24) {
          presRef.current.data.labels.shift();
          dataset.data.shift();
        }
        dataset.data.push(data.pressure);
      });
      presRef.current.update();

      soundRef.current.data.labels.push("");

      soundRef.current.data.datasets.forEach((dataset) => {
        if (dataset.data.length >= 24) {
          soundRef.current.data.labels.shift();
          dataset.data.shift();
        }
        dataset.data.push(data.sound);
      });
      soundRef.current.update();
    }

    sse.onmessage = (e) => {
      updateCharts(JSON.parse(e.data));
    }

    sse.onerror = () => {
      sse.close();
    };

    return () => {
      sse.close();
    };
  }, []);

  return (
    <>
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand className="text-light"><img src={logo} className="App-logo"/> Room Monitoring System </Navbar.Brand>
          <DropdownButton id="dropdown-basic-button" title="Serial Numbers">
            {serial.map((item, index) => {
              return <Dropdown.Item>{item}</Dropdown.Item>
            })}
          </DropdownButton>
        </Container>
      </Navbar>
      <Container>
        <Row className="justify-content-center">
          <Row>
            <div class="grid-container">
              <div class="grid-item"><Line ref={tempRef} datasetIdKey='temp' data={tempData} options={optionsTemp} /></div>
              <div class="grid-item"><Line ref={humiRef} datasetIdKey='humi' data={humiData} options={optionsHumi} /></div>
            </div>
            <div class="grid-container">
              <div class="grid-item"><Line ref={presRef} datasetIdKey='pres' data={presData} options={optionsPres} /></div>
              <div class="grid-item"><Line ref={altiRef} datasetIdKey='alti' data={altiData} options={optionsAlti} /></div>
            </div>
            <div class="grid-container">
              <div class="grid-item"><Line ref={soundRef} datasetIdKey='sound' data={soundData} options={optionsSound} /></div>
            </div>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default App;
