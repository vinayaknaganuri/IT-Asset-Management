import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h2 className="asset mt-5">Welcome to the Asset Registration</h2>
      <p className="text-muted">
        Register or return IT assets by selecting the appropriate option below.
      </p>

      <h4 className="mt-4">Asset Registration - Choose Location</h4>

      <div className="row text-center">
        <div className="col-md-4 mb-3">
          <Link to="/bengaluru-assets">
            <Button color="primary" className="w-100">
               Asset Registration
            </Button>
          </Link>
        </div>

        

        <div className="col-md-4 mb-3">
          <Link to="/register-return-assets">
            <Button color="primary" className="w-100">
              Return Assets Registration
            </Button>
          </Link>
        </div>


        <div className="col-md-4 mb-3">
          <Link to="/login">
            <Button color="primary" className="w-100">
              Stock Assets Registration
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
