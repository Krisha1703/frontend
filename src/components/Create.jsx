import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorMessage = "Please fill out the following fields:\n";
    let hasError = false;

    if (!title) {
      errorMessage += "- Task Title\n";
      hasError = true;
    }
    if (!description) {
      errorMessage += "- Task Description\n";
      hasError = true;
    }
    if (!status) {
      errorMessage += "- Task Status\n";
      hasError = true;
    }

    if (hasError) {
      setError(errorMessage.trim());
      return;
    }

    const addTask = { title, description, status };
    const response = await fetch("https://backend-vdog.onrender.com/api/task", {
      method: "POST",
      body: JSON.stringify(addTask),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    } else {
      console.log(result);
      setError("");
      setTitle("");
      setDescription("");
      setStatus("");
      navigate("/all");
    }
  }

  return (
    <div className='container my-2'>
      {error &&
        <div className="alert alert-danger">
          {error.split('\n').map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      }
      <h2 className='text-center my-4'>Enter the data:</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label"><b>Task Title:</b></label>
          <input type="text" className="form-control"
            value={title} onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label"><b>Task Description:</b></label>
          <input type="text" className="form-control"
            value={description} onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label"><b>Task Status:</b></label>
          <input type="text" className="form-control"
            value={status} onChange={(e) => setStatus(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mb-4">Submit</button>
      </form>
    </div>
  )
}

export default Create;
