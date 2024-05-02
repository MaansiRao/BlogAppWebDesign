
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { Blogs } from '../components/Blogs';
import Search from '../components/Search';

const Home = () => {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        loadBlogsData();
    }, []);

    const loadBlogsData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/blogs");
            setData(response.data);
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete that blog ?")) {
            try {
                await axios.delete(`http://localhost:5000/blogs/${id}`);
                toast.success("Blog deleted successfully");
                loadBlogsData();
            } catch (error) {
                toast.error("Something went wrong");
            }
        }
    };

    const excerpt = (str) => {
        if (str.length > 50) {
            str = str.substring(0, 50) + "..."
        }
        return str;
    };

    const onInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/blogs?q=${searchValue}`);
            if(response.status===200)
            {
            setData(response.data);
            }
            else{
                toast.error("Wrong");
            }
        } catch (error) {
            toast.error("Something went wrong while searching");
        }
    };

    return (
        <div className='home_bg'>
            <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch}/>
            <MDBRow>
                {data.length === 0 && (
                    <MDBTypography className='text-center mb-0' tag='h2'>
                        No Blog Found
                    </MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow>
                            {data && data.map((item, index) => (
                                <Blogs
                                    key={index}
                                    {...item}
                                    excerpt={excerpt}
                                    handleDelete={handleDelete} />
                            ))}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
        </div>
    );
};

export default Home;
