
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MDBCard, MDBCardBody,MDBCardText,MDBCardImage, MDBIcon, MDBRow,MDBCol, MDBCardTitle } from 'mdb-react-ui-kit'; // Import MDBIcon from mdb-react-ui-kit

import Badge from '../components/Badge'; // Import Badge from its correct path

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import toast from react-toastify
import {
  MDBContainer,
  MDBTypography,
} from 'mdb-react-ui-kit'; // Import only necessary components from mdb-react-ui-kit
const excerpt=(str)=>{
    if(str.length>50){
        str=str.substring(0,50)+"..."
    }
    return str;
};
const Blog = () => {
  const [blog, setBlog] = useState(null); // Initialize blog state with null
  const { id } = useParams(); // Destructure id from useParams
  const[relatedPost,setRelatedPost]=useState([]);
 
  useEffect(() => {
    const getSingleBlog = async () => {
      console.log("hi")
      try {
        const response = await axios.get(`http://localhost:5000/blogs/${id}`);
        const relatedPostData=await axios.get(`http://localhost:5000/blogs?category=${response.data.category}&_start=0&_end=3`);
        


        if (response.status === 200 || relatedPostData.status==200) {
          setBlog(response.data);
          setRelatedPost(relatedPostData.data);
        } else {
          toast.error('Something went wrong');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Something went wrong');
      }
    };

    if (id) {
      getSingleBlog();
    }
  }, [id]);

  const styleInfo = {
    display: 'inline',
    marginLeft: '5px',
    float: 'right',
    marginTop: '7px',
  }; // Move styleInfo inside the component

  return (
    <MDBContainer style={{ border: '1px solid #d1dbe8' }}>
      <Link to="/">
        <strong style={{ float: 'left', color: 'black' }} className="mt-3">
          Go Back
        </strong>
      </Link>
      <MDBTypography tag='h2' className="text-muted mt-2" style={{display :'inline-block'}}>{blog && blog.title}
      </MDBTypography>
      <img src={blog && blog.imageURL} 
      className="img-fluid rounded"
      alt={blog && blog.title}
      style={{width:"100%",maxHeight:"600px"}} />

      <div style={{marginTop:"20px"}}>
        <div style={{height:"43px",background:"#f6f6f6"}}>
            <MDBIcon
                style={{float:"left"}}
                className="mt-3"
                icpn='calendar-alt'
                size='lg'/>
                <strong style={{float:'left',marginTop:'12px',marginLeft:'2px'}}>
                    {blog && blog.date}
                </strong>
                <Badge styleInfo={styleInfo}>{blog  && blog.category}</Badge>
            
            </div>
            <MDBTypography className='lead md-0'>
                {blog&& blog.description}
            </MDBTypography>
        </div>
        {relatedPost&&relatedPost.length>0&&(
            <>
            <h1>Related Post</h1>
            <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                { relatedPost.filter((item)=>item.id!=id).map((item,index)=>(
                    <MDBCol>
                        <MDBCard>
                         <Link to={`/blog/${item.id}`}>
                            <MDBCardImage src={item.imageURL}
                            alt={item.title} position='top'/>

                         </Link>
                         <MDBCardBody>
                            <MDBCardTitle> {item.title}</MDBCardTitle>
                            <MDBCardText>{excerpt(item.description)}</MDBCardText>
                         </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )
            )
                }

            </MDBRow>
            </>
        )}
     
    </MDBContainer>
  );
};

export default Blog;
