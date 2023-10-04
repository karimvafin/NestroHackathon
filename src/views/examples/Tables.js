import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Media,
  Progress,
  Row,
  Table
} from "reactstrap";

const Tables = () => {

  const [gasStations, setGasStations] = useState([]);
  const [showAllRoads, setShowAllRoads] = useState(false);
  const [shoppingMalls, setShoppingMalls] = useState([]);
  const [showAllMalls, setShowAllMalls] = useState(false);
  const [parkingStations, setParkingStations] = useState([]);
  const [showAllParkings, setShowAllParkings] = useState(false);
  const [cafeSupermarkets, setCafeSupermarkets] = useState([]);
  const [showAllCafeSupermarkets, setShowAllCafeSupermarkets] = useState(false);
  const [carDealerships, setCarDealerships] = useState([]);
  const [showAllCarDealerships, setShowAllCarDealerships] = useState(false);

  useEffect(() => {
  fetch('https://nestrohackathon.pavel0dibr.repl.co/gas_station')
    .then((response) => response.json())
    .then((data) => setGasStations(data));
}, []);

useEffect(() => {
  fetch('https://nestrohackathon.pavel0dibr.repl.co/shopping_malls')
    .then((response) => response.json())
    .then((data) => setShoppingMalls(data));
}, []);

useEffect(() => {
  fetch('https://nestrohackathon.pavel0dibr.repl.co/parking_taxistand_trainstation_transitstation')
    .then((response) => response.json())
    .then((data) => setParkingStations(data));
}, []);

useEffect(() => {
  fetch('https://nestrohackathon.pavel0dibr.repl.co/cafe_supermarket')
    .then((response) => response.json())
    .then((data) => setCafeSupermarkets(data));
}, []);

useEffect(() => {
  fetch('https://nestrohackathon.pavel0dibr.repl.co/car_dealer_rental_repair_wash')
    .then((response) => response.json())
    .then((data) => setCarDealerships(data));
}, []);

const calculateRelativeRating = (rating) => {
  return rating + '%';
};


  return (
    <>
      <Header />
      <Container className="mt--7" fluid>

        <Row>
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">Gas station</h3>
            <div className="col text-right">
              <button
                className="btn btn-primary"
                onClick={() => setShowAllRoads(!showAllRoads)}
              >
                {showAllRoads ? 'Hide' : 'See all'}
              </button>
            </div>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Coordinates</th>
                <th scope="col">Rating</th>
                <th scope="col">User rating</th>
                <th scope="col">Relative to the average rating of Nestro</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {showAllRoads
                ? gasStations.map((station, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">{station.name}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{station.coordinates}</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          {station.rating >= 4 ? (
                            <i className="bg-success" />
                          ) : (
                            <i className="bg-danger" />
                          )}
                          {station.rating}
                        </Badge>
                      </td>
                      <td>{station.user_ratings_total}</td>
                      <td>
                        <div className="">
                          <span className="mr-2">{station['relative to Nestro']}%</span>
                          <div>
                            <Progress
                              max="100"
                              value={station['relative to Nestro']}
                              barClassName={
                                station['relative to Nestro'] >= 70
                                  ? 'bg-success'
                                  : 'bg-danger'
                              }
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                      </td>
                    </tr>
                  ))
                : gasStations.slice(0, 5).map((station, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">{station.name}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{station.coordinates}</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          {station.rating >= 4 ? (
                            <i className="bg-success" />
                          ) : (
                            <i className="bg-danger" />
                          )}
                          {station.rating}
                        </Badge>
                      </td>
                      <td>{station.user_ratings_total}</td>
                      <td>
                        <div className="">
                          <span className="mr-2">{station['relative to Nestro']}%</span>
                          <div>
                            <Progress
                              max="100"
                              value={station['relative to Nestro']}
                              barClassName={
                                station['relative to Nestro'] >= 70
                                  ? 'bg-success'
                                  : 'bg-danger'
                              }
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
          <CardFooter className="py-4">
          </CardFooter>
        </Card>
      </div>
    </Row>



        <Row className="mt-5">
      <div className="col">
        <Card className="bg-default shadow">
          <CardHeader className="bg-transparent border-0">
            <h3 className="text-white mb-0">Shopping malls</h3>
            <div className="col text-right">
              <button
                className="btn btn-primary"
                onClick={() => setShowAllMalls(!showAllMalls)}
              >
                {showAllMalls ? 'Hide' : 'See all'}
              </button>
            </div>
          </CardHeader>
          <Table className="align-items-center table-dark table-flush" responsive>
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Coordinates</th>
                <th scope="col">Rating</th>
                <th scope="col">User rating</th>
                <th scope="col">Relative to the average rating</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {showAllMalls
                ? shoppingMalls.map((mall, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">{mall.name}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{mall.coordinates}</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          {mall.rating >= 4 ? (
                            <i className="bg-success" />
                          ) : (
                            <i className="bg-danger" />
                          )}
                          {mall.rating}
                        </Badge>
                      </td>
                      <td>{mall.user_ratings_total}</td>
                      <td>
                        <div className="">
                          <span className="mr-2">{mall['relative to the average']}%</span>
                          <div>
                            <Progress
                              max="100"
                              value={mall['relative to the average']}
                              barClassName={
                                mall['relative to the average'] >= 70
                                  ? 'bg-success'
                                  : 'bg-danger'
                              }
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                      </td>
                    </tr>
                  ))
                : shoppingMalls.slice(0, 5).map((mall, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">{mall.name}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{mall.coordinates}</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          {mall.rating >= 4 ? (
                            <i className="bg-success" />
                          ) : (
                            <i className="bg-danger" />
                          )}
                          {mall.rating}
                        </Badge>
                      </td>
                      <td>{mall.user_ratings_total}</td>
                      <td>
                        <div className="">
                          <span className="mr-2">{mall['relative to the average']}%</span>
                          <div>
                            <Progress
                              max="100"
                              value={mall['relative to the average']}
                              barClassName={
                                mall['relative to the average'] >= 70
                                  ? 'bg-success'
                                  : 'bg-danger'
                              }
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </Card>
      </div>
    </Row>

    <div style={{ height: '48px' }}></div>
    <div className="block">
    <Col xl="4">
  <Card className="shadow">
    <CardHeader className="border-0">
      <Row className="align-items-center">
        <div className="col">
          <h3 className="mb-0">Parking stations</h3>
        </div>
        <div className="col text-right">
          <button
            className="btn btn-primary"
            onClick={() => setShowAllParkings(!showAllParkings)}
          >
            {showAllParkings ? 'Hide' : 'See all'}
          </button>
        </div>
      </Row>
    </CardHeader>
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Coordinates</th>
          <th scope="col">Rating</th>
          <th scope="col">User rating</th>
        </tr>
      </thead>
      <tbody>
        {showAllParkings
          ? parkingStations.map((station, index) => (
              <tr key={index}>
                <th scope="row">{station.name}</th>
                <td>{station.coordinates}</td>
                <td>{station.rating}</td>
                <td>{station.user_ratings_total}</td>
              </tr>
            ))
          : parkingStations.slice(0, 9).map((station, index) => (
              <tr key={index}>
                <th scope="row">{station.name}</th>
                <td>{station.coordinates}</td>
                <td>{station.rating}</td>
                <td>{station.user_ratings_total}</td>
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
          <h3 className="mb-0">Cafe & Supermarkets</h3>
        </div>
        <div className="col text-right">
          <button
            className="btn btn-primary"
            onClick={() => setShowAllCafeSupermarkets(!showAllCafeSupermarkets)}
          >
            {showAllCafeSupermarkets ? 'Hide' : 'See all'}
          </button>
        </div>
      </Row>
    </CardHeader>
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Coordinates</th>
          <th scope="col">Rating</th>
          <th scope="col">User rating</th>
        </tr>
      </thead>
      <tbody>
        {showAllCafeSupermarkets
          ? cafeSupermarkets.map((station, index) => (
              <tr key={index}>
                <th scope="row">{station.name}</th>
                <td>{station.coordinates}</td>
                <td>{station.rating}</td>
                <td>{station.user_ratings_total}</td>
              </tr>
            ))
          : cafeSupermarkets.slice(0, 9).map((station, index) => (
              <tr key={index}>
                <th scope="row">{station.name}</th>
                <td>{station.coordinates}</td>
                <td>{station.rating}</td>
                <td>{station.user_ratings_total}</td>
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
          <h3 className="mb-0">Car Dealerships</h3>
        </div>
        <div className="col text-right">
          <button
            className="btn btn-primary"
            onClick={() => setShowAllCarDealerships(!showAllCarDealerships)}
          >
            {showAllCarDealerships ? 'Hide' : 'See all'}
          </button>
        </div>
      </Row>
    </CardHeader>
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Coordinates</th>
          <th scope="col">Rating</th>
          <th scope="col">User rating</th>
        </tr>
      </thead>
      <tbody>
        {showAllCarDealerships
          ? carDealerships.map((dealer, index) => (
              <tr key={index}>
                <th scope="row">{dealer.name}</th>
                <td>{dealer.coordinates}</td>
                <td>{dealer.rating}</td>
                <td>{dealer.user_ratings_total}</td>
              </tr>
            ))
          : carDealerships.slice(0, 9).map((dealer, index) => (
              <tr key={index}>
                <th scope="row">{dealer.name}</th>
                <td>{dealer.coordinates}</td>
                <td>{dealer.rating}</td>
                <td>{dealer.user_ratings_total}</td>
              </tr>
            ))}
      </tbody>
    </Table>
  </Card>
</Col>

    </div>
    
      </Container>
    </>
  );
};

export default Tables;
