import React from 'react';
import "./index.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function HomeDesc() {
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <section className="row justify-content-center">
            <div className="col-sm-11 col-md-9 col-lg-9">
              <h1 id="welcome" className="text">Welcome to Innovation Hub</h1>
            </div>
          </section>
          <section className="row justify-content-center">
            <div className="col-sm-11 col-md-9 col-lg-9">
              <h3 className="text">If you've ever had an idea come across your mind but didn't know
                where to start, this is the place to go! You will be able to provide
                others with your vision and be able to build up funding to make
                your project come to life. Additionally, you will be able to check out
                other cool ideas and donate to those you truly believe in.
              </h3>
            </div>
          </section>
          <section className="row justify-content-center">
            <div className="col-sm-11 col-md-9 col-lg-9">
              <h2 className="text">Get Started!</h2>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" href="#outlined-buttons">
                  Create a new Idea
                </Button>
                <Button variant="outlined" href="#outlined-buttons">
                  Search for Ideas
                </Button>
              </Stack>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default HomeDesc;