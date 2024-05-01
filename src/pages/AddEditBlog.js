
// import React from 'react'
// import {useState} from 'react';
// import { MDBValidation,MDBInput,MDBBtn } from 'mdb-react-ui-kit';
// import axios from 'axios';
// import {useNavigate} from "react-router-dom";
// import {toast} from "react-toastify";
// //qgvl3ds1
// const initialState={
//     title:"",
//     description:"",
//     category:"",
//     imageURL:""
// }
// const options=["Travel","Fashion","Fitness","Sports","Food","Tech"];
// const handleSubmit=(e)=>{};
// const onInputChange=(e)=>{};

// const onUploadImage=(file)=>{
//     console.log("file",file);
//     setFormValue({ ...formValue, imageURL: file.name });
   
// };

// const onCategoryChange=()=>{};

// const AddEditBlog = () => {
//     const [formValue,setFormValue]=useState(initialState);
//     const [categoryErrMsg,setCategoryErrMsg]=useState(null);
//     const {title,description,category,imageUrl}=formValue;
//     const navigate=useNavigate();
//   return (
//     <MDBValidation className="row g-3" style={{marginTop:"100px"}} noValidate onSubmit={handleSubmit}  >
//         <p className='fs-2 fw-bold'>Add Blog</p>
//         <div
//             style={{
//                 margin:"auto",
//                 padding:"15px",
//                 maxWidth:"400px",
//                 alignContent:"centre",

//             }}>
//             <MDBInput
//                 value={title || ""}
//                 name="title"
//                 type="text"
//                 onChange={onInputChange}
//                 required
//                 label="Title"
//                 validation='please provide a title'
//                 invalid />
//             <br/>
//             <MDBInput
//                 value={description || ""}
//                 name="description"
//                 type="text"
//                 onChange={onInputChange}
//                 required
//                 label="Description"
//                 validation='please provide a description'
//                 textarea
//                 rows={4}
//                 invalid />
//             <br/>
//             <MDBInput
//                 value={title}
//                 name="imageURL"
//                 type="file"
//                 onChange={(e)=>onUploadImage(e.target.files[0])}
//                 required
                
//                 //validation='please provide a title'
//                 invalid />
//             <br/>
            
//             <select className='categoryDropdown'  onChange={onCategoryChange} value={category}>
//                 <option>Please select category</option>
//                 {options.map((option,index)=>(
//                     <option value={option || ""} key={index} >
//                         {option}
//                         </option>
//                 ))}

//             </select>
//             <br/>
//             <br />
//             <MDBBtn type="submit" style={{marginRight:"10px"}}>Add</MDBBtn>
//             <MDBBtn color="danger" style={{marginRight:"10px"}} onClick={()=>navigate("/")}>Go Back</MDBBtn>
            


            
//         </div>

//     </MDBValidation>
//   )
// }

// export default AddEditBlog
import React, { useState, useEffect } from 'react';

import { MDBValidation, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate ,useParams} from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
    title: "",
    description: "",
    category: "",
    imageURL: ""
};

const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];

const AddEditBlog = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [categoryErrMsg, setCategoryErrMsg] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const { title, description, category, imageURL } = formValue;
    const navigate = useNavigate();


    const{id}=useParams();
    useEffect(()=>
    {
        if(id){
            setEditMode(true);
            getSingleBlog(id)
        
        }
        else{
            setEditMode(false);
            setFormValue({...initialState})
        }

    },[id]);
    const getSingleBlog= async(id)=>{
        const singleBlog=await axios.get(`http://localhost:5000/blogs/${id}`);
        if(singleBlog.status===200){
        setFormValue({...singleBlog.data});
        }
        else{
            toast.error("An error occured");
        }
    }
    const getDate=()=>{
        let today=new Date();
        let dd=String(today.getDate()).padStart(2,"0");
        let mm=String(today.getMonth()+1).padStart(2,"0");
        let yyyy=today.getFullYear();
        today=mm+ "/" + dd +"/"+ yyyy;
        return today;
    }

 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category) {
            setCategoryErrMsg("Please select a category");
            return; // Prevent form submission if category is not selected
        }
        const imageValidation=!editMode? imageURL:true;
        if (title && description && category && imageURL) {
            try {
                const currentDate = new Date();

                if(!editMode)
                {
                    const updatedBlogData = { ...formValue, date: currentDate };
                    const response = await axios.post("http://localhost:5000/blogs", updatedBlogData);
                    console.log("Response:", response);
                    if (response.status === 201) {
                        toast.success("Blog created successfully");
                        setFormValue(initialState); // Reset form after successful submission
                        navigate('/'); // Navigate to home page after successful creation
                    } else {
                        toast.error("Something went wrong");
                    }
                    
                }
                else
                {
                    const response = await axios.put(`http://localhost:5000/blogs/${id}`, formValue);
                    console.log("Response:", response);
                    if (response.status === 200) {
                        toast.success("Blog updated successfully");
                        setFormValue(initialState); // Reset form after successful submission
                        navigate('/'); // Navigate to home page after successful creation
                    } else {
                        toast.error("Something went wrong");
                    }
                    

                }
               
            } catch (error) {
                console.error("Error creating blog:", error);
                toast.error("Failed to create blog");
            }
        }
    };
    
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    };
    
    const onUploadImage = async (file) => {
        console.log("file", file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "qgvl3ds1");
        try {
            const response = await axios.post("http://api.cloudinary.com/v1_1/dmoir8cz3/image/upload", formData);
            toast.info("Image Uploaded Successfully");
            setFormValue({ ...formValue, imageURL: response.data.url });
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image");
        }
    };
    

    const onCategoryChange = (e) => {
        setCategoryErrMsg(null);
        setFormValue({
            ...formValue,
            category: e.target.value
        });
    };

    return (
        <MDBValidation className="row g-3" style={{ marginTop: "100px" }} noValidate onSubmit={handleSubmit}>
            <p className='fs-2 fw-bold'>{editMode?"Update Blog":"Add Blog"}</p>
            <div style={{ margin: "auto", padding: "15px", maxWidth: "400px", textAlign: "center" }}>
                <MDBInput
                    value={title}
                    name="title"
                    type="text"
                    onChange={onInputChange}
                    required
                    label="Title"
                    validation='Please provide a title'
                    invalid
                />
                <br />
                <MDBInput
                value={description || ""}
                name="description"
                type="text"
                onChange={onInputChange}
                required
                label="Description"
                validation='please provide a description'
                textarea
                rows={4}
                invalid />
            <br/>
            {!editMode &&(
                 <><MDBInput
                 name="image"
                 type="file"
                 onChange={(e) => onUploadImage(e.target.files[0])}
                 required
                 
                 validation='Please provide an image'
                 invalid
             />
             <br />
             </>


            )}
               
                <select className='categoryDropdown' onChange={onCategoryChange} value={category}>
                    <option>Please select category</option>
                    {options.map((option, index) => (
                        <option value={option} key={index}>
                            {option}
                        </option>
                    ))}
                </select>
                {categoryErrMsg && (
                    <div className='categoryErrMsg'>{categoryErrMsg}</div>
                )}
                <br />
                <br />
                <MDBBtn type="submit" style={{ marginRight: "10px" }}>Add</MDBBtn>
                <MDBBtn color="danger" style={{ marginRight: "10px" }} onClick={() => navigate("/")}>Go Back</MDBBtn>
            </div>
        </MDBValidation>
    );
}

export default AddEditBlog;

