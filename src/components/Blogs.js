import React from 'react';
import { Link } from 'react-router-dom';
import { MDBCol, MDBCard, MDBCardTitle, MDBCardBody, MDBCardImage, MDBCardText, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import Badge from '../components/Badge';

const Blogs = ({ title, category, description, id, imageURL, excerpt, handleDelete, handleUpdate }) => {
  return (
    <MDBCol size="4">
      <MDBCard className='h-100 mt-2' style={{ maxWidth: "22rem" }}>
        <MDBCardImage src={imageURL} alt={title} position='top' style={{ maxWidth: "100%", height: "180px" }} />
        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>{excerpt(description)}</MDBCardText>
          <Link to={`/blog/${id}`}>Read More</Link>
          <Badge>{category}</Badge> 
          <span>
          <div className="d-flex justify-content-between">
            <MDBBtn color="danger" onClick={() => handleDelete(id)}>
              <MDBIcon icon="trash" />
            </MDBBtn>
            <Link to={`/edit/${id}`}>
              <MDBBtn color="warning" >
                <MDBIcon icon="edit" />
              </MDBBtn>
            </Link>
          </div>
          </span>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export { Blogs };


