import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  async function getData() {
    const response = await fetch("https://backend-vdog.onrender.com/api/task");
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    } else {
      setData(result);
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`https://backend-vdog.onrender.com/api/task/${id}`, {
      method: "DELETE"
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    } else {
      setError("Deleted Successfully!");
      setTimeout(() => {
        setError("");
        getData();
      }, 2000);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='container my-2 mb-5'>
      {error &&
        <div className="alert alert-danger">
          {error}
        </div>
      }
      <h2 className='text-center text-white' style={{ marginTop: "3vw" }}>All Tasks</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {data?.map((ele) => (
          <div key={ele._id} className='col-span-1 my-4'>
            <div className="card bg-black rounded p-4">
              <div className="card-body">
                <h5 className="card-title text-info text-opacity-75">{ele.title}</h5>
                <h6 className="card-subtitle my-2 text-white">{ele.description}</h6>
                <p className="card-text text-warning">{ele.status}</p>
                <div className="flex gap-2 mt-2">
                  <a href="#" className="btn btn-danger" style={{marginRight: "2vw"}} onClick={() => handleDelete(ele._id)}>
                    Delete
                  </a>
                  <Link to={`/${ele._id}`} className="btn btn-primary">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Read;
