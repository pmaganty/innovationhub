import React, { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MyIdea from "../components/MyIdea";
import API from "../API";
import HeaderProt from '../components/HeaderProt';

function MyIdeas() {

    const navigate = useNavigate();
    
    // set state for ideas associated with user
    const [ideas, setIdeas] = React.useState<
    Array<{
        firstname: string,
        lastname: string,
        title: string,
        descr: string,
        donations: string
    }>
    >([])

    let userId = "";

    // Get all current user id and all ideas associated with that user
    async function getIdeas() {
        const curUser = await API.checkUser();
        userId = curUser.data.id;
        const userIdeas = await API.readUserIdeas(userId);
        setIdeas(userIdeas.data.rows);
    }

    // Delete idea from user ideas list when delete button clicked
    async function deleteIdea(event: React.MouseEvent<HTMLButtonElement>) {
        let deletedIdea = await API.deleteIdea(event.currentTarget.getAttribute('data-id'));
        getIdeas();
    }

        // Check if user is logged in.
    // If they are not, redirect to home.
    async function checkLoggedIn() {
        const user = await API.checkUser();
        if (user.data == "") {
          console.log("user not logged in");
          navigate("/");
        }
    }

    // Get all ideas associated with user every time page re-renders
    useEffect(() => {
        checkLoggedIn();
        getIdeas();
    }, []);

    // Render html to dom
    return (
        <div>
            <HeaderProt />
            <div className="row justify-content-center">
                <div className="col-12">
                    <section className="row justify-content-center">
                        <div className="col-12">
                            <div className="row justify-content-center">
                                {ideas.map( (idea: any) => (
                                    <div>
                                    <MyIdea
                                    id = {idea.ideas_id}
                                    firstName = {idea.firstname}
                                    lastName = {idea.lastname}
                                    title = {idea.title}
                                    description= {idea.descr}
                                    donations= {idea.donations}
                                    />
                                    <Button variant="outlined" color="error" data-id={idea.ideas_id} onClick={deleteIdea}>
                                        Delete
                                    </Button>
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default MyIdeas;