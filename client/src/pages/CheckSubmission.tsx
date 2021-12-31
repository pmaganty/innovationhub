import React, { useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import HeaderProt from '../components/HeaderProt';
import API from '../API';

// Component checks if user idea payment information is valid
function CheckSubmission() {

    // Retrieve query parameters to get account and idea id
    const [searchParams, setSearchParams] = useSearchParams();
    const account_id = searchParams.get("account_id");
    const idea_id = searchParams.get("idea_id");

    const navigate = useNavigate();

    // Check if stripe account has valid payment details
    async function checkLastAccount() {
        const account = await API.checkStripeAccount(account_id);

        // If payment details are valid, update idea with stripe id and redirect to success page
        // else delete idea and redirect to fail page
        if (account.data.details_submitted) {
            const added = await API.updateIdeaStripeID({stripe_id: account_id, ideas_id: idea_id});
            navigate("/successfulSubmission");
        } else {
            const deleted = await API.deleteIdea(idea_id);
            navigate("/failedSubmission");
        }
    }

    // Check user payment info once at render
    useEffect(() => {
        checkLastAccount();
    }, []);

    return (
        <div>
            <HeaderProt />
        </div>
    );
}

export default CheckSubmission;