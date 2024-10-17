  
import { Button, ListGroup } from "react-bootstrap"
import App from "../App"
import { RiDeleteBin6Line } from "react-icons/ri"
  
  
  const AppointmentInfo=({appointment,onDeleteAppointment})=>{
    return (
        <>
         <ListGroup.Item>
                <p><small>Date: {appointment.aptDate}</small></p>
                <p><strong>FirstName: {appointment.firstName}</strong></p>
                <p><strong>LastName: {appointment.lastName}</strong></p>
                <p><strong>Notes: {appointment.aptNotes}</strong></p>
                <Button onClick={()=> onDeleteAppointment(appointment.id)} size="sm" variant="danger"><RiDeleteBin6Line/> Delete</Button>
                </ListGroup.Item>
        
        
        
        </>
    )



  }

  export default AppointmentInfo;