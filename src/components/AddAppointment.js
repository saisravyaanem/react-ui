import { Card, Col, Row,Form, Button } from "react-bootstrap";
import { useState } from "react";
import AppointmentInfo from "./AppointmentInfo";



const AddAppointment=({onSendAppointment,lastId})=>{

    const clearData={
        firstName: '',
        lastName:'',
        aptDate:'',
        aptTime:'',
        aptNotes:''
    }

    let [toggleForm,setToggleForm]=useState(false);
    let [formData,setformData]=useState(clearData);

    function formDataPublish(){
        const appointmentInfo={
            id: lastId +1,
            firstName: formData.firstName,
            lastName:formData.lastName,
            aptDate: formData.aptDate+''+formData.aptTime,
            aptNotes:formData.aptNotes

        }
        onSendAppointment(appointmentInfo);
            setformData(clearData);
            setToggleForm(!toggleForm);

        
    }
    return(
        <>
        <Col md="8">
            <Card className="mb-3">
                <Card.Header>Add Appointment
                    <Button size="sm" 
                    className="small float-end" onClick={()=>{setToggleForm(!toggleForm)}}> +</Button>
                </Card.Header>
               { toggleForm &&
                <Card.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>FirstName</Form.Label>
                            <Form.Control type="text" placeHolder="FirstName" id="firstName"
                            onChange={(event)=>setformData({
                                ...formData,firstName: event.target.value
                            })}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>LastName</Form.Label>
                            <Form.Control type="text" placeHolder="Last" id="lastName"
                           onChange={(event)=>setformData({
                            ...formData,lastName: event.target.value
                        })} />                             
                        </Form.Group>
                    </Row>
                    <Form.Group as={Col} className="mb-3">
                            <Form.Label>Appontment Date</Form.Label>
                            <Form.Control type="date" id="date"
                            onChange={(event)=>setformData({
                                ...formData,aptDate: event.target.value
                            })}/>          
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Appontment Time</Form.Label>
                            <Form.Control type="time" id="time"
                            onChange={(event)=>setformData({
                                ...formData,aptTime: event.target.value
                            })}/>          
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Comments</Form.Label>
                            <Form.Control as="textarea" placeholder="comments" id="aptNotes"
                            onChange={(event)=>setformData({
                                ...formData,aptNotes: event.target.value
                            })}
                            />          
                        </Form.Group>
                        <Button variant="primary" onClick={formDataPublish}>Submit</Button>
                </Form>
            </Card.Body>
               } 
            </Card>


        </Col>
        
        </>
    )

}

export default AddAppointment;