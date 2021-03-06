/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const AddOptions = ({ authData }) => {
  const { id } = useParams();
  const history = useHistory();
  const [options, setOptions] = useState([]);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [parentId, setParentId] = useState('');
  if ((authData && !authData.loading && authData.loggedIn && authData.user.admin === false) || (authData && !authData.loading && !authData.loggedIn)) {
    history.push('/');
  }
  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`https://bicycle-shop-backend.herokuapp.com/api/v1/bicycles/${id}/createOption`, {
      name,
      value,
      parent_id: parentId,
      bicycle_id: id,
    })
      .then(response => {
        if (!response.data.status) {
          history.push(`/bicycles/${id}`);
        }
        if (response.data.options) {
          setOptions(response.data.options);
        }
      })
      .catch(() => {
        history.pushState('/404');
      });
  };
  useEffect(() => {
    axios.get(`https://bicycle-shop-backend.herokuapp.com/api/v1/bicycles/${id}/options`)
      .then(response => {
        setOptions(response.data);
      })
      .catch(() => {
        history.pushState('/404');
      });
  }, []);

  return (
    <div className="container add-options">
      <h2 className="text-center my-4">Current options</h2>

      <ul className="list-group">
        { options.map(option => (

          <li className="list-group-item" key={option.name + option.value}>
            <span>
              option_name:
              {' '}
              {option.name}
              ,
              {' '}
            </span>
            <span>
              option_value:
              {' '}
              {option.value}
              ,
              {' '}
            </span>
            <span>
              option_level:
              {' '}
              {option.level}
              ,
              {' '}
            </span>
            <span>
              parent_id:
              {' '}
              {!option.parent_id ? 'none' : option.parent_id }
            </span>
          </li>
        ))}

      </ul>
      <form className="option-form mb-5" onSubmit={handleSubmit}>
        <h2 className="text-center my-4">Add option</h2>
        <div className="form-group exampleFormControlInput1 ">
          <label htmlFor="exampleFormControlInput1">Name</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Option Name" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput2">Value</label>
          <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="Option Value" value={value} onChange={e => setValue(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect3">Parent</label>
          <select className="form-control" id="exampleFormControlSelect3" onChange={e => { setParentId(e.target.options[e.target.selectedIndex].id); }} required>
            <option disabled selected value="">Parent</option>
            <option value={null}>No parent / level 1 option</option>
            {options.map(option => (
              <option key={option.id} id={option.id}>
                {option.name}
                :
                {' '}

                {option.value}
                :
                {' '}
                parent_id:
                {' '}
                {!option.parent_id ? 'none' : option.parent_id }

              </option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <input type="submit" value="Add" className="btn text-center btn-primary mt-4" />
        </div>

      </form>
    </div>
  );
};

AddOptions.propTypes = {
  authData: PropTypes.object.isRequired,
};
export default AddOptions;
