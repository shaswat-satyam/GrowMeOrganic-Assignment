# Grow Me Organic Assignment

This public Repository is a repository for deploying Vite Based React App in TypeScript.
The application demonstrates a paginated data table with server-side data fetching, row selection, and custom features as described in the assignment.

Deployed Link - https://shaswatgrowmeorganic-assignment.netlify.app/

## About the Project

Project is created using Vite to create a React Frontend App to consume an API to display a Table showing various Artifacts present at Art Institute Chicago,

We are using various tools to Complete the process of deployment which are listed below

### Node.js

It is JavaScript Runtime Environment to provide a engine to run Javascript Code.

#### NPM

It stands for Node Package Manager.
It is used to manage the various packages we have installed in our project via package.json and package.lock.

##### React

It is an Open Source UI library developed by Meta, which creates a virtual DOM tree to reconcile the various changes in the DOM tree which arise when changinge state.

##### PrimeReact

It is an open source React UI component Library which can help us style the site with sensible defaults options.

#### Vite

Vite is a build tool to help in bundling and dev server setup for web applications.

### Git

It is the tool used for managing the various version of our code using in form of commits and branches.

#### Github

It is the platform to store a remote copy of our repository in the cloud which helps us in deployment process.

#### Netlify

It is the platform which provides easy solutions for deploying softwares and helps abstract the various complexitites of Cloud Deployment.

## Working

The basic flow of the code is

1. When User loads the site, we generate some state via useState which includes the data that we fetch, the current page and the items to be added and selected items (can be changed so that It will only hold the Id and help make it more consise)
2. Every time the user changes the current page we fetch the new data from APIs.
3. If the user adds an Item by clicking on the checkbox we add the item to the selectedItems state.
4. If the user selects the column checkbox, we add all the items of the page to selectedItems.
5. Else if the user submits some number, we set the number of items to toBeSelected state.
6. For all the items which are not selected or are to be fetched we add them to the selectedItems state.

## Future Scope

- We can optimise the selectedItems state such that we only hold the id.
- We can add some caching to the fetching.
- We can rename few states and few files to be more succinct.
- We can add some CSS to handle author data and others.
- We can add options on how to reconile this toBeSelected number of items and selectedItems.
  Currently we use the first in ascending order in the API payload.
