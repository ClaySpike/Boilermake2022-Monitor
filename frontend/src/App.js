import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <>
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand className="text-light">Testing</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row className="justify-content-center">
          <Button>Testing</Button>
        </Row>
      </Container>
    </>
  );
}

export default App;
