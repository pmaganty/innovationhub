import React, { useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import HeaderProt from '../components/HeaderProt';
import API from '../API';

function CheckSubmission() {

    const [searchParams, setSearchParams] = useSearchParams();
    const account_id = searchParams.get("account_id");
    const idea_id = searchParams.get("idea_id");

    console.log(account_id);
    console.log(idea_id);

    const navigate = useNavigate();

    async function checkLastAccount() {
        const account = await API.checkStripeAccount(account_id);
        console.log(account.data);

        if (account.data.details_submitted) {
            const added = await API.updateIdeaStripeID({stripe_id: account_id, ideas_id: idea_id});
            navigate("/successfulSubmission");
        } else {
            const deleted = await API.deleteIdea(idea_id);
            console.log(deleted);
            navigate("/failedSubmission");
        }
    }


    useEffect(() => {
        console.log("in useeffect");
        checkLastAccount();
    }, []);

    return (
        <div>
            <HeaderProt />
        </div>
    );
}

export default CheckSubmission;