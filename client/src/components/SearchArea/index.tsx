import React, { useRef, useState } from 'react';
import "./index.css";
import Idea from "../Idea";
import API from "../../API";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Col, Row, Container } from "react-bootstrap";
import HomeImg from "../HomeImg";

// Component for search results
function SearchArea() {

  // Set state for all ideas associated with a search input
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

  // Function will take the search entry and get all matching ideas from database
  async function getResults() {

    const newSearch: Search = {
      searchTerm: searchRef.current?.value!,
    };

    if (searchRef.current?.value) {
      let temp_ideas = await API.readAll(searchRef.current?.value);   
      setIdeas(temp_ideas.data.rows);
    } else {
      setIdeas([]);
    }

  }

  // Render div to dom everytime new search input entered
  return (
    <div>
      <section className="row justify-content-center">
        <div className="col-12">
          <HomeImg />
        </div>
      </section>
      <div className="row justify-content-center">
        <div className="col-12">
          <section className="row justify-content-center">
            <div id="searchBox" className="col-10">
              <Box
              sx={{
                width: 2000,
                maxWidth: '100%',
                marginTop: '30px'
              }}
              >
                <TextField fullWidth label="Search" id="fullWidth" onChange={getResults} inputRef={searchRef} />
              </Box>
            </div>
          </section>
          <section className="row justify-content-center">
            <div className="col-12">
                <div className="row justify-content-center">
                    {ideas.map( (idea: any) => (
                        <Idea
                        id = {idea.ideas_id}
                        firstName = {idea.firstName}
                        lastName = {idea.lastName}
                        title = {idea.title}
                        description= {idea.descr}
                    />
                    ))}
                </div>
              </div>
            </section>
          </div>
        </div>
    </div>
  );
}

export default SearchArea;