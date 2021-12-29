import React, { useEffect, useState, createContext } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MyIdea from "../components/MyIdea";
import API from "../API";
import HeaderProt from '../components/HeaderProt';

function MyIdeas() {

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

    async function getIdeas() {
        const curUser = await API.checkUser();
        console.log(curUser.data.id);

        userId = curUser.data.id;

        const userIdeas = await API.readUserIdeas(userId);
        console.log(userIdeas.data.rows);

        setIdeas(userIdeas.data.rows);
    }

    async function deleteIdea(event: React.MouseEvent<HTMLButtonElement>) {
        console.log("delete button clicked");
    
        let deletedIdea = await API.deleteIdea(event.currentTarget.getAttribute('data-id'));
    
        console.log(deletedIdea);

        getIdeas();
    }

    useEffect(() => {
        getIdeas();
    }, []);


    return (
        <div>
            <HeaderProt />
            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <section className="row justify-content-center">
                        <div className="col-sm-12 col-md-12 col-lg-12">
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