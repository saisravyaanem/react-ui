import { SlCalender } from "react-icons/sl";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container,Row,Col, ListGroup,Card } from "react-bootstrap";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import { useCallback, useEffect,useState } from "react";

function App() {
  

  let [appointmentList,setAppointmentList]=useState([]);
  let [query,setQuery]=useState("");
  let [sortBy,setSortBy]=useState("firstName");
  let [orderBy,setOrderBy]=useState("asc");

  const filteredAppointments= appointmentList.filter(
    item => {
      return(
        item.firstName.toLowerCase().includes(query.toLocaleLowerCase())||
        item.lastName.toLowerCase().includes(query.toLocaleLowerCase())||
        item.aptNotes.toLowerCase().includes(query.toLocaleLowerCase())
      )
    }
  ).sort((a,b)=>{
    let order=(orderBy==="asc")?1:-1;
    return(
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1*order:1*order
    )
  })

  const fetchData=useCallback(()=>{
    fetch('./data.json')
    .then(response => response.json())
    .then(data=>{
      setAppointmentList(data)
    });
  }, [])

  useEffect(()=>{
    fetchData()
  },[fetchData])

  return (
    <div className="App">
       <Container>
        <Row>
          <Col>
          <h1 className="text-center fw-light mt-3"><SlCalender/> Appointments </h1>
          </Col>

        </Row>
       <Row className="justify-content-center">
        <AddAppointment 
        onSendAppointment={myAppointment=> 
        setAppointmentList([...appointmentList,myAppointment])} 
        lastId={appointmentList.reduce((max, item)=> 
        Number(item.id)>max?Number(item.id):max,0)}></AddAppointment>
       </Row>
       <Row className="justify-content-center">
        <Col md="4">
        <Search 
        query={query} 
        onQueryChange={myQuery=> setQuery(myQuery)}
        orderBy={orderBy}
        onOrderByChange={mySort=> setOrderBy(mySort)}
        sortBy={sortBy}
        onSortByChange={mySort=> setSortBy(mySort)}
        
        />
        </Col>
       </Row>
       <Row className="justify-content-center">
        <Col md="8">
          <Card className="mb-3">
            <Card.Header>Appointments</Card.Header>
            <ListGroup variant="flush">
            {filteredAppointments.map(appointment => (
            <AppointmentInfo key={appointment.id} appointment={appointment}
            onDeleteAppointment={
              appointmentId=> setAppointmentList(appointmentList.filter
                (appointment=> appointment.id!==appointmentId))
              
            }
            />
          ))}
            </ListGroup>
          </Card>
        </Col>
       </Row>
       </Container>
      
    </div>
  );
}

export default App;
