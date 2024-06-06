import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import UsersEdit from "./views/users/edit";
import UsersView from "./views/users/show";
import UserList from "./views/users/index";
import UserAdd from "./views/users/create";

import BusquedaSolicitudes from "./views/solicitudes/busqueda_solicitudes_publica"
import SolicitudesList from "./views/solicitudes/index"
import Calculator from "./views/calculator/calculator"

import Home from "./views/Home";

import Login from "./components/Login";


export default function App() {
    const [user, setUser] = useState([]);

    return (
        <div>
            {
                !user.length > 0 
                ? 
                    <div className="d-flex justify-content-center">
                    <Login setUser={setUser} />
                    </div>
                : 
            <Router>
                <div>
                    <Header />
                    <Container fluid className="p-0">
                        <Row className="no-gutters">
                            <Col xs="2">
                                <Sidebar />
                            </Col>
                            <Col xs="10">
                                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                                <Switch>
                                    <Route path="/calculator">
                                        <Calculator/>
                                    </Route>
                                    <Route path="/busqueda-solicitudes">
                                        <BusquedaSolicitudes/>
                                    </Route>
                                    <Route path="/users/create">
                                        <UserAdd />
                                    </Route>
                                    <Route path="/users/:id/edit">
                                        <UsersEdit />
                                    </Route>
                                <Route path="/users/:id">
                                        <UsersView />
                                    </Route>
                                    <Route path="/solicitudes">
                                        <SolicitudesList />
                                    </Route>
                                    <Route path="/users">
                                        <UserList />
                                    </Route>
                                    <Route path="/">
                                        <Home />
                                    </Route>
                                </Switch>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Router>
            }

        </div>
    );
}
