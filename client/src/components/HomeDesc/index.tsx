import React from 'react';
import "./index.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// Homedesc component for non-logged-in user
function HomeDesc() {

  return (
    <div>
      <div className="row justify-content-center">
        <div className="row justify-content-center">
          <div id="descDiv" className="col-sm-12 col-md-12 col-lg-12">
            {/*temp box for line above text*/}
            <div className="row justify-content-center">
              <div id="temp_top" className="col-4"></div>
            </div>
            <section className="row justify-content-center">
              <div className="col-9">
                <h3 id="description" className="text">If you've ever had an idea come across your mind but didn't know
                  where to start, this is the place to go! You will be able to provide
                  others with your vision and be able to build up funding to make
                  your project come to life. Additionally, you will be able to check out
                  other cool ideas and donate to those you truly believe in.
                </h3>
              </div>
            </section>
            {/*temp box for line below text*/}
            <div className="row justify-content-center">
              <div id="temp_bottom" className="col-4"></div>
            </div>
          </div>
          <div id="startDiv" className="col-12">
            <div className="row justify-content-center">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <h2 id="startText">Get Started</h2>
                {/*section to all user to sign in*/}
                <section className="row justify-content-center">
                  <div id="buttonDiv" className="col-auto">
                    <Stack direction="row"sx={{
                        margin: '0 auto',
                        display: 'block',
                      }} >
                      <Button sx={{
                        color: 'white',
                        border: '1px solid white',
                        margin: '20px',
                        fontSize: '20px',
                        "&:hover": {
                          backgroundColor: "#056291",
                        }
                      }}
                      className="homeButton" variant="outlined" href="/auth/google">
                        Sign In
                      </Button> 
                    </Stack>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeDesc;