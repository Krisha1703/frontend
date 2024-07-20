import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const [error, setError] = useState("");

  const {id} = useParams();
  const navigate = useNavigate();

  const getSingleTask = async (id) => {
     
      const response = await fetch(`https://backend-vdog.onrender.com/api/task/${id}`);

      const result = await response.json();

      if(!response.ok){
        console.log(result.error);
        setError(result.error);
      }

      else{
        setError("");
        console.log("Updated Task ", result);
        setTitle(result.title);
        setDescription(result.description);
        setStatus(result.status);
      }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedTask = {title, description, status}

    const response = await fetch(`https://backend-vdog.onrender.com/api/task/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedTask),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();

    if (!response.ok){
        console.log(result.error);
        setError(result.error);
    }
    else{
        setError("");
        navigate("/all");
    }
  }

  useEffect(() => {
    getSingleTask(id);
  },[id]);

  return (
    <div className='container my-2'>
        {error &&
            <div className="alert alert-danger" >
                {error}
            </div>
        }
        <h2 className='text-cener my-4'>Edit the data:</h2>
        
        <form onSubmit={handleUpdate}>
            <div className="mb-3">
                <label className="form-label"><b>Task Title:</b></label>
                <input type="text" className="form-control" 
                        value={title}  onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label"><b>Task Description:</b></label>
                <input type="text" className="form-control" 
                    value={description}  onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label"><b>Task Status:</b></label>
                <input type="text" className="form-control" 
                        value={status}  onChange={(e) => setStatus(e.target.value)}
                />
            </div>

            

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    </div>
  )
}

export default Update