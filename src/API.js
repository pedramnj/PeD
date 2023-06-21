import { Page } from "./Page";

const logIn = async (credentials) => {
    const response = await fetch('http://localhost:3001/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });


    if (response.ok) {
        const user = await response.json();
        return user;
    } else {
        const errDetails = await response.text();
        throw errDetails;
    }
}

const logOut = async () => {
    const response = await fetch('http://localhost:3001/api/sessions/current', {
        method: 'DELETE',
        credentials: 'include'
    });
    if (response.ok)
        return null;
}


const getUserInfo = async () => {
    const response = await fetch('http://localhost:3001/api/sessions/current', {
        credentials: 'include',
    });

    const user = await response.json();
    if (response.ok) {
        return user;
    } else {
        throw user;  // an object with the error coming from the server
    }
};

const getAllPages = async () => {
    const response = await fetch("http://localhost:3001/api/allPages");

    const PageJSON = await response.json();

    if(response.ok)
    {   
        return PageJSON.map(Page => new Page(Page.code, Page.name, Page.credits, Page.students, Page.maxStudents, Page.incompatibleWith, Page.preparatory));
    }
    else
    {
        throw response.json();
    }
}

const getAllEnrolledPages = async () => {
    const response = await fetch("http://localhost:3001/api/allEnrolledPages", { credentials: 'include' });

    const PageJSON = await response.json();

    if(response.ok)
    {
        return PageJSON.map(Page => new Page(Page.code, Page.name, Page.credits, Page.students, Page.maxStudents, Page.incompatibleWith, Page.preparatory));
    }
    else
    {
        throw PageJSON;
    }
}


const addPageToStudyPlan = async (PageId) => {
    const response = await fetch("http://localhost:3001/api/addPage", { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Page: PageId }),
        credentials: 'include',
    });

    if (!response.ok) {
        const errMessage = await response.json();
        throw errMessage;
    }
    else
    {
        const response = await fetch("http://localhost:3001/api/updatePage", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Page: PageId }),
            credentials: 'include',
        });
        if (!response.ok) {
            const errMessage = await response.json();
            throw errMessage;
        }
        else return true;
    }
}

const createStudyPlan = async (planType) => {
    const response = await fetch("http://localhost:3001/api/createStudyPlan", { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan : planType }),
        credentials: 'include',
    });

    if (!response.ok) {
        const errMessage = await response.json();
        throw errMessage;
    }
    else return true;
}

const removePage = async (PageId) => {
    const response = await fetch("http://localhost:3001/api/removePage", { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Page : PageId }),
        credentials: 'include',
    });

    if (!response.ok) {
        const errMessage = await response.json();
        throw errMessage;
    }
    else return true;
}

const API = { logIn, logOut, getUserInfo, getAllPages, getAllEnrolledPages, addPageToStudyPlan, createStudyPlan, removePage};
export default API;




