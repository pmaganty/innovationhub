import React from 'react';
import "./index.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function HomeDesc() {

  return (
    <div>
      <div className="row justify-content-center">
        <div className="row justify-content-center">
          <div id="descDiv" className="col-sm-12 col-md-12 col-lg-12">
            <div className="row justify-content-center">
              <div id="temp_top" className="col-sm-4 col-md-4 col-lg-4"></div>
            </div>
            <section className="row justify-content-center">
              <div className="col-sm-11 col-md-9 col-lg-9">
                <h3 id="description" className="text">If you've ever had an idea come across your mind but didn't know
                  where to start, this is the place to go! You will be able to provide
                  others with your vision and be able to build up funding to make
                  your project come to life. Additionally, you will be able to check out
                  other cool ideas and donate to those you truly believe in.
                </h3>
              </div>
            </section>
            <div className="row justify-content-center">
              <div id="temp_bottom" className="col-sm-4 col-md-4 col-lg-4"></div>
            </div>
          </div>
          <div id="startDiv" className="col-sm-12 col-md-12 col-lg-12">
            <section className="row justify-content-center">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <h2 id="startText">Get Started</h2>
                <section className="row justify-content-center">
                  <div id="buttonDiv" className="col-sm-auto col-md-auto col-lg-auto">
                    <Stack direction="row"sx={{
                        margin: '0 auto',
                        display: 'block',
                        '&:hover': {
                          color: 'black'
                        }
                      }} >
                      <Button sx={{
                        color: 'white',
                        border: '1px solid white',
                        margin: '20px',
                        fontSize: '20px',
                      }}
                      className="homeButton" variant="outlined" href="/auth/google">
                        Sign In
                      </Button> 
                    </Stack>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeDesc;