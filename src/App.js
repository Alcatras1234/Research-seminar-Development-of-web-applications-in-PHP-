import logo from "./logo.svg";
import "./App.css";
import { useState, useContext, createContext, useEffect } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Container,
  Row,
  Col,
  Carousel,
  Card,
  Image,
  Spinner,
} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Navigate, Link, BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
const UserContext = createContext();
const CartContext = createContext();

function AppNavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Бытовая Техника</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Главная
            </Nav.Link>
            <Nav.Link as={Link} to="/mag">
              Товары
            </Nav.Link>
          </Nav>
          <Nav className="me-right">
            <Nav.Link as={Link} to="/sing">
              Вход
            </Nav.Link>
          </Nav>
          <Nav className="me-right">
            <Nav.Link as={Link} to="/reg">
              Регистрация
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Reg() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Container>
      <Form
        onSubmit={(el) => {
          el.preventDefault();
          if (userInfo.isLoged) {
            alert("Вы уже зарегистрированы");
          } else {
            setUserInfo({ login, password, isLoged: true });
            alert("Вы зарегистрированы");
          }
        }}
      >
        <Form.Label htmlFor="inputEmail5">Email</Form.Label>
        <Form.Control
          type="Email"
          id="inputEmail5"
          aria-describedby="emailHelpBlock"
          onChange={(el) => setLogin(el.target.value)}
        />
        <Form.Text id="emailHelpBlock" muted></Form.Text>
        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
        <Form.Control
          type="password"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
          onChange={(el) => setPassword(el.target.value)}
        />
        <Form.Text id="passwordHelpBlock" muted>
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </Form.Text>
        <div style={{ marginTop: "20px" }}></div>
        <Row>
          <Col>
            <Button type="submit">Регистрация</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

function Log() {
  const { userInfo } = useContext(UserContext);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Container>
      <Form
        onSubmit={(el) => {
          el.preventDefault();
          console.log(userInfo);
          if (
            userInfo.isLoged &&
            login == userInfo.login &&
            password == userInfo.password
          ) {
            alert("Вход успешен");
          } else {
            alert("Зарегистрируйтесь для входа или верно введите данные");
          }
        }}
      >
        <Form.Label htmlFor="inputEmail5">Email</Form.Label>
        <Form.Control
          type="Email"
          id="inputEmail5"
          aria-describedby="emailHelpBlock"
          onChange={(el) => setLogin(el.target.value)}
        />
        <Form.Text id="emailHelpBlock" muted></Form.Text>
        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
        <Form.Control
          type="password"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
          onChange={(el) => setPassword(el.target.value)}
        />
        <Form.Text id="passwordHelpBlock" muted>
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </Form.Text>
        <div style={{ marginTop: "20px" }}></div>
        <Row>
          <Col>
            <Button type="submit">Войти</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/reg">Регистрация</Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

function Main() {
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image src="1.webp" rounded />
        </Col>
        <Col xs={6} md={4}>
          <Image src="14.webp" rounded />
        </Col>
        <Col xs={6} md={4}>
          <Image src="10.webp" rounded />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Приветсвуем вас в магазине Бытовой техники</h1>
          <h4>Мы продаем товары наивысшего качества по приятным ценам</h4>
        </Col>
      </Row>
    </Container>
  );
}

function Shop() {
  const { userInfo } = useContext(UserContext);
  const [items, addItems] = useServerGoods();
  if (userInfo.isLoged) {
    return (
      <Container>
        
        <h1>Товары</h1>
       
        <Row md={4} className="g-4">
          {items.map((el, id) => (
            <Col key={id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={el.ph} />
                <Card.Body>
                  <Card.Title>{el.name}</Card.Title>
                  <p>Цена: {el.cash}</p>
                  <p>Дата выхода {el.date}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Button onClick={addItems}>Ещё</Button>
      </Container>
    );
  } else {
    return (

      <>
    <h1>Войдите для просмотра товаров</h1>
    <Spinner animation="border" />
    </>);

  }
}

function useServerGoods() {
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(1);
  const fetchItems = (nth) =>
    fetch("http://localhost/goods.ru/items.php/", {
      method: "POST",
      body: JSON.stringify({
        nth,
      }),
    })
      .then((el) => el.json())
      .catch((el) => alert("Ошибка соединения"));
  useEffect(() => {
    fetchItems(0).then((el) => setItems(el));
  }, []);
  const addItems = () => {
    fetchItems(counter).then((el) => setItems((l) => l.concat(el)));
    setCounter((count) => count + 1);
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  };
  return [items, addItems];
}

function App() {
  const [userInfo, setUserInfo] = useState({
    login: "",
    password: "",
    isLoged: false,
  });
  const [cart, setCartInfo] = useState();

  return (
    <BrowserRouter>
      <AppNavBar />
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <CartContext.Provider value={{ cart, setCartInfo }}>
          <Routes>
            <Route path="/sing" exact Component={Log} />
            <Route path="/reg" exact Component={Reg} />
            <Route path="/mag" exact Component={Shop} />
            <Route path="/home" exact Component={Main} />
          </Routes>
        </CartContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
