/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const User = ({ authData }) => {
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    console.log(authData);
    if (!authData.loggedIn) {
      history.push('/');
    }
  }, []);
  return (
    <div>
      {id}
    </div>
  );
};
const mapStateToProps = state => ({
  authData: state.auth,
});
export default connect(mapStateToProps, null)(User);
