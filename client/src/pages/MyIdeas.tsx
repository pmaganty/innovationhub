import React, { useEffect } from 'react';
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
        descr: string
    }>
    >([])

    async function getIdeas() {
        const curUser = await API.checkUser();
        console.log(curUser.data.id);

        const userIdeas = await API.readUserIdeas(curUser.data.id);
        console.log(userIdeas.data.rows);

        setIdeas(userIdeas.data.rows);
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
                                    <MyIdea
                                    firstName = {idea.firstname}
                                    lastName = {idea.lastname}
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

export default MyIdeas;