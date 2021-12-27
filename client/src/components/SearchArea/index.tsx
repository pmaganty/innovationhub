import React, { useRef, useState } from 'react';
import "./index.css";
import Idea from "../Idea";
import API from "../../API";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Col, Row, Container } from "react-bootstrap";

function SearchArea() {

  const [ideas, setIdeas] = React.useState<
    Array<{
        firstName: string,
        lastName: string,
        title: string,
        description: string
    }>
>([])

  const searchRef = useRef<HTMLInputElement>();
  let searchTerm = "";

  interface Search {
    searchTerm: string;
  }

  async function getResults() {

    console.log("input changed");

    console.log(searchRef.current?.value);

    const newSearch: Search = {
      searchTerm: searchRef.current?.value!,
    };

    let temp_ideas = await API.readAll(searchRef.current?.value);   

    console.log(temp_ideas.data.rows);

    setIdeas(temp_ideas.data.rows);
    
  }

  return (
    <div className="row justify-content-center">
      <div className="col-sm-12 col-md-12 col-lg-12">
        <section className="row justify-content-center">
          <div className="col-sm-10 col-md-10 col-lg-10">
            <Box
            sx={{
              width: 2000,
              maxWidth: '100%',
            }}
            >
              <TextField fullWidth label="Search" id="fullWidth" onChange={getResults} inputRef={searchRef} />
            </Box>
          </div>
        </section>
        <section className="row justify-content-center">
          <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="row justify-content-center">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  {ideas.map( (idea: any) => (
                      <Idea
                      id = {idea.ideas_id}
                      firstName = {idea.firstName}
                      lastName = {idea.lastName}
                      title = {idea.title}
                      description= {idea.description}
                  />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
    </div>
  );
}

export default SearchArea;