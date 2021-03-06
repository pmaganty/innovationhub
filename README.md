<img src="./images/ihub_logo.PNG" alt="drawing" width="200"/>


# Innovation Hub
This application will allow a user to post new product or service ideas, retrieve seed funding for their ideas, and donate to other ideas they believe in.

You can view this application at:
https://innovationhub1995.herokuapp.com/

**Note that this application uses Stripe test mode**. Please use Stripe Test Mode bank account and card when prompted.

Stripe Test Card Info:

    Number: 4242424242424242
    CVC: Any 3 digits
    Date: Any future date

More test card options are listed in the Features/Search Page section of this Readme.

</br>

## Blend Project Requirements

1. **Modern JS Library/Framework**: REACT (See client folder**)
2. **Minimum 3 Interactions**: See Features section for all possible interactions
3. **Architectural Pattern**: MVC (See Architecture section for diagram)
4. **Backend service, PostgreSql database, CRUD**: Backend service provided by server.ts, routes/\*, and controllers/\*, models/\*. The models/database.sql describes the database structure and models/db (See the Data Model section).ts creates the connection to the sql server. All routes are in routes/index.ts.
5. **Third Party RESTful API**: Stripe (See routes/index.js for all stripe routes)
6. **UI components from material-ui/@core**: Used throughout application: Stack, Box, Alert, Button, Textfield, Card. Examples below.

    * client/src/components/Idea/index.tsx: Card, Box, Textfield, Button
    * client/src/components/Create/index.tsc: Alert
7. **Re-usable component I have created**: client/src/components/Idea

</br>

## Architecture

This application employs a Model-View-Controller (MVC) architecture.

![architecture](./images/architecture.PNG)

</br>

## Data Model

This application uses a PostgreSql Database.

![data-description](./images/data_description.PNG)

</br>

## Prerequisites

1. Node.js Installation
2. PostgreSql Installation
3. Chane PORT in server.ts to preferred PORT for local run
4. Create '.env' file in root directory
5. Set Google OAuth2.0 API: Add `GOOGLE_CLIENT_ID=\<google client id\>' and 'GOOGLE_CLIENT_SECRET=\<google client secret\>' to .env (Obtain at https://console.cloud.google.com/apis/ by creating new project and credentials. Make sure callback URL has a /auth/google/callback endpoint.)
6. PostgreSql: Add 'CONNECTION_STRING=\<sql server connect string\>' to .env (See https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)
7. Add google OAuth callback url: Add 'GOOGLE_LOCAL_CALLBACK=\<https://localhost:<PORT\>/auth/google/callback\>' to .env
8. Create tables in sql server using commands in models/database.sql

</br>

## Getting started

Follow the below steps to get the application up and running on your local computer

```shell
git clone https://github.com/pmaganty/innovationhub.git
cd innovationhub
npm i
cd client
npm i
cd ..
npm run start
```

Here is what you should expect from the above code:
1. Clone the github repository to your local area
2. Go into the repository directory and install all back-end dependencies using npm
3. Go into the client directory and install all front-end dependencies using npm
4. Go back to root directory and run the start script to open up localhost:3000 and see the application

</br>

## Developing

When developing the project further there are extra build compilation steps that must be taken.

### Front-end Development (Client Directory): 
If you only require testing of client directory (not backend usage), issue the below command.

```shell
npm run frontdev
```
This will open up a development server for you to view data from the client directory, but will not allow you to access any API calls. This is useful for styling purposes.

If you are testing the full environment, the client directory must be re-built after changes are made:

```shell
npm run frontbuild
```
### Back-end Development (Routes, Models, Controllers, server.ts): 

If you are developing the back-end (outside of the Client directory), you must recompile the typsescript before running the application:

```shell
npm run server
```

### For full environment build, compile, and render:

```shell
npm run dev
```
**See package.json for all scripts.**

</br>

## Features

Below are all of the possible routes a user can take on each page.

### Home Page

#### Design Explanation: 
The purpose of this page is to briefly describe the intent of the website and allow the user to easily find where to begin. The design is meant to take the user on a journey of learning about the purpose and then beginning as they scroll down. The color sheme was chosen because of the simplicity and easy-to-see nature.

#### Capabilities:

When the user is not signed in, the home page only allows the below.
1. Navigate to home 
2. Sign-in

![non-logged-in-header](./images/not_logged_in_header.PNG)

![non-logged-in-home](./images/not_logged_in_home.PNG)

When the user is signed in, the home page will allow the below:

1. Navigate to Home Page
2. Navigate to Create Page
3. Navigate to Search Page
4. Navigate to My Ideas Page

![logged-in-header](./images/logged_in_header.PNG)

![logged-in-home](./images/logged_in_home.PNG)

### Create Page

#### Design Explanation: 
The purpose of this page is to allow a user to enter a new idea into the database. The design is meant to be intuitive - it is much like any form a user has filled out on other websites. The grayed-out form color is there to convey that this is a "document" or "entry".

#### Capabilities:

1. Create a new idea by inputing **first name**, **last name**, **title** of the idea, and **description** of the idea.

    * When the user hits submit, they will be **prompted to enter their bank account and business information through Stripe** so they can receive donations.
    * **Note that this is a Stripe Test Mode application** and payment information will not actually be saved. Stripe test bank should be used when prompted for bank information:
    ![stripe-test-bank-info](./images/stripe_test_mode_bank_info.PNG)

2. Navigate to Home Page
3. Navigate to Create Page
4. Navigate to Search Page
5. Navigate to My Ideas Page

![create-page](./images/create_page.PNG)

### Search Page

#### Design Explanation: 
The purpose of this page is to allow a user to search the database for ideas. The design is meant to be intuitive - it is much like any search box a user has used. Each idea is standardized in size and has a scroll box when the description is too large so the user always sees where to donate.

#### Capabilities:

1. Search for any existing ideas containing a phrase
2. Donate to an idea

    * When the user hits donate, they will be **prompted to enter their payment information through Stripe**.
    * **Note that this is a Stripe Test Mode application** and a Stripe test card must be used. Below is a list of test cards.
    ![stripe-test-cards](./images/stripe_test_cards.PNG)
2. Navigate to Home Page
3. Navigate to Search Page
4. Navigate to Create Page
5. Navigate to My Ideas Page

![search-page](./images/search_page.PNG)

### My Ideas Page

#### Design Explanation: 
The purpose of this page is to allow a user to see all ideas they have created, how much funding they have received for each, and delete any ideas. The design is meant to be simple - each idea size is standardized and the donation amount is highlighted to be easily seen.

#### Capabilities:

1. View all ideas associated with currently logged in user
2. Delete an idea associated with currently logged in user
3. See all donations associated with an idea
4. Navigate to Home Page
5. Navigate to My Ideas Page
6. Navigate to Search Page
7. Navigate to Create Page

![my-ideas](./images/my-ideas.PNG)

</br>

## API Reference

Endpoint: **/api/ihub**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http route: *POST*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description: Add a new idea

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Inputs: 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; BODY: Object of type {firstName: string, 
                            lastName: string, 
                            title: string, 
                            description: string, 
                            email: string,
                            user_id: string}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Response: JSON Object with empty rows key


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http route: *PUT*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description: Add stripe ID to idea

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Inputs: 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; BODY: Object of type {stripe_id: string, ideas_id: string}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Response: JSON Object with empty rows key

Endpoint: **/api/ihub/search**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http route: *GET*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description: Get all ideas that match a search term

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Inputs: 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PARAMETERS: Search Term: string

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Response: JSON Object with rows key containing all database rows containing search term

Endpoint: **/onboard-user**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http route: *POST*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description: Onboard user payment information to Stripe

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Inputs: 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; BODY: Object containing user email and associated idea id {email: string, id: number}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Response: JSON Object with empty rows key

Endpoint: **/stripeAccount**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http route: *GET*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description: Get stripe account associated with stripe id

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Inputs: 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PARAMETERS: Stripe ID: string

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Response: Stripe Account object

Endpoint: **/api/ihub/stripeId/**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http route: *GET*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description: Get stripe id associated with an idea

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Inputs: 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PARAMETERS: Idea ID: number

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Response: JSON Object with rows key containing relevant rows from database

Endpoint: **/create-checkout-session**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http route: *POST*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description: Create payment method for user

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Inputs: 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; BODY: Object containing donation amount, stripe id of destination, title of the idea, and ID of idea {amount: number, stripe_id: number, title: string, idea_id: number}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Response: JSON Object with empty rows key

Endpoint: **/user**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http route: *GET*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description: Get currently authenticated user

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Inputs: 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Response: JSON Object with rows key containing current user data

Endpoint: **/api/ihub/ideas/**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http route: *GET*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description: Get all ideas associated with a user

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Inputs: 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PARAMETERS: User ID: id: string

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Response: JSON Object with rows key containing all database rows with given user ID

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http route: *DELETE*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description: Delete Idea

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Inputs:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PARAMETERS: Idea ID: id: string

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Response: JSON Object with empty rows key

Endpoint: **/api/ihub/stripeId/**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http route: *PUT*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description: Update idea with donation

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Inputs: 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PARAMETERS: Idea ID: string

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; BODY: Object of type {donation: number}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Response: JSON Object with empty rows key

Endpoint: **/api/ihub/donations/invalid/**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http route: *DELETE*

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description: Delete last donated amount on idea

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Inputs: 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PARAMETERS: Idea ID: string

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Response: JSON Object with empty rows key
