import Chart from "chart.js";
import classnames from "classnames";
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  Table
} from "reactstrap";
import {
  chartExample1,
  chartExample2,
  chartOptions,
  parseOptions,
} from "variables/charts.js";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [replitData, setReplitData] = useState([]);
  const [showAllRoads, setShowAllRoads] = useState(false);

  async function fetchData() {
    try {
      const response = await fetch("https://nestrohackathon.pavel0dibr.repl.co/roads_dashboards", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  useEffect(() => {
    fetchData().then((data) => {
      setReplitData(data);
    });
  }, []);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Traffic value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Year</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>


              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>


          <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Refuelling stations
                      </h6>
                      <h2 className="mb-0">Projected profits</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                  <Bar
                    data={{
                      labels: ["Lamovita - Ivanjska", "Milići - Vlasenica", "Šipovo - Novo Selo", "Prud - Šamac 2", "Vrbaška 2 - Ivanjska"], // Заменяем метки на числа
                      datasets: [
                        {
                          label: "Sales",
                          data: [12245, 13967, 12589, 11875, 11956], // Заменяем данные на числа
                          maxBarThickness: 10,
                        },
                      ],
                    }}
                    options={chartExample2.options}
                  />
                  </div>
                </CardBody>
              </Card>
            </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Roads info</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={() => setShowAllRoads(!showAllRoads)}
                      size="sm"
                      className={`${
                        showAllRoads ? "btn-outline-primary" : "btn-primary"
                      } `}
                    >
                      {showAllRoads ? "Hide" : "See all"}
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Best place</th>
                    <th scope="col">Clients</th>
                    <th scope="col">Oil revenue</th>
                    <th scope="col">Das revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {showAllRoads
                    ? replitData.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{item.number}</th>
                          <td>{item.name}</td>
                          <td>{item.rating}</td>
                          <td>{item.best_place}</td>
                          <td>{item.clients}</td>
                          <td>{item.oil_revenue}</td>
                          <td>{item.das_revenue}</td>
                        </tr>
                      ))
                    : replitData.slice(0, 9).map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{item.number}</th>
                          <td>{item.name}</td>
                          <td>{item.best_place}</td>
                          <td>{item.clients}</td>
                          <td>{item.oil_revenue}</td>
                          <td>{item.das_revenue}</td>
                        </tr>
                      ))}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Fuel price</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Company</th>
                    <th scope="col">Eurosuper 95</th>
                    <th scope="col">Eurodizel</th>
                    <th scope="col">Eurosuper 100</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">AdriaOil</th>
                    <td>1,62 €</td>
                    <td>1,62 €</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <th scope="row">Attendo centar (Dugo Selo)</th>
                    <td>1,62 €</td>
                    <td>1,62 €</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <th scope="row">Crodux Derivati (Petrol)</th>
                    <td>1,62 €</td>
                    <td>1,62 €</td>
                    <td>2,05 €</td>
                  </tr>
                  <tr>
                    <th scope="row">Ina</th>
                    <td>1,62 €</td>
                    <td>1,62 €</td>
                    <td>2,04 €</td>
                  </tr>
                  <tr>
                    <th scope="row">Lukoil</th>
                    <td>1,62 €</td>
                    <td>1,62 €</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <th scope="row">Mitea (Samobor)</th>
                    <td>1,61 €</td>
                    <td>1,61 €</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <th scope="row">Petrol</th>
                    <td>1,62 €</td>
                    <td>1,62 €</td>
                    <td>2,05 €</td>
                  </tr>
                  <tr>
                    <th scope="row">Shell</th>
                    <td>1,62 €</td>
                    <td>1,62 €</td>
                    <td>2,039 €</td>
                  </tr>
                  <tr>
                    <th scope="row">Tifon</th>
                    <td>1,62 €</td>
                    <td>1,62 €</td>
                    <td>2,11 €</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
