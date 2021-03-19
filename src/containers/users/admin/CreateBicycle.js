/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateBicycle = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/v1/bicycles', {
      name,
      model,
      image_url: image,
      description,
    })
      .then(response => {
        !response.data.status && history.push(`/bicycles/${response.data.id}`);
      });
  };
  return (
    <div className="bicycle-form-container d-flex justify-content-center w-100 align-items-center">
      <form className="bicycle-form w-100" onSubmit={handleSubmit}>
        <h1 className="text-center">Create Bicycle</h1>
        <div className="form-group w-100">
          <label htmlFor="exampleFormControlInput1">Name</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput2">Model</label>
          <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="Product Model" value={model} onChange={e => setModel(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput3">Image URL</label>
          <input type="text" className="form-control" id="exampleFormControlInput3" placeholder="Product Image link" value={image} onChange={e => setImage(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput4">Description</label>
          <textarea className="form-control" id="exampleFormControlInput4" placeholder="Add product description" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div className="text-center">
          <input type="submit" value="Create" className="btn text-center btn-primary" />
        </div>

      </form>
    </div>
  );
};

export default CreateBicycle;
