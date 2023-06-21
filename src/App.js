import { Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';
import API from './API.js';
import { Header } from "./components/Header.js";
import { Footer } from './components/Footer.js';
import { LoginForm } from "./components/LoginForm.js";
import { HomePage } from "./components/HomePage.js";
import { DefaultRoute } from "./components/DefaultRoute.js";



function App() {
  const [Pages, setPages] = useState([]);
  const [enrolledPages, setEnrolledPages] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [studyPlan, setStudyPlan] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [studyPlanType, setStudyPlanType] = useState(null);
  const [notPersistentList, setNotPersistentList] = useState(enrolledPages === undefined ? [] : enrolledPages);
  const [CFU, setCFU] = useState(notPersistentList.reduce((acc, curr) => acc + curr.credits, 0));
  const [updated, setUpdated] = useState(false);
  const [matricola, setMatricola] = useState(null);

  useEffect(() => {
    //console.log("useEffect checkAuth");
    const checkAuth = async () => {
        const user = await API.getUserInfo(); // we have the user info here
        setLoggedIn(true);
        setStudyPlan(user.studyPlan);
        setStudyPlanType(user.fullTime);
        setMatricola(user.matricola);
    };
    checkAuth().catch(err => {
      //console.log(err);   this is the error you get if the user is not logged in
    });
    getAllPages(); 
    }, []);

  useEffect(() => {
    //console.log("useEffect enrolled");
    if(loggedIn) {
        getAllEnrolledPages();
    }
  }, [loggedIn]);

  useEffect(() => {
    //console.log("useEffect notPersistentList");
    getAllPages();
    getAllEnrolledPages().catch(err => {
      //console.log(err);    this is the error that we want to catch
      setEnrolledPages([]);
    });
  }, [updated]);

  const handleLogin = async (credentials) => {
    //console.log("handleLogin");
      try 
      {
          const user = await API.logIn(credentials);
          setLoggedIn(true);
          setStudyPlan(user.studyPlan);
          setStudyPlanType(user.fullTime);
          setMatricola(user.matricola);
          setModalTitle("Login Successful");
          setModalBody("You are now logged in, " + user.matricola + "!");
          setShowLoginModal(true);
      } 
      catch (err) 
      {
          setModalTitle("Login Failed");
          setModalBody("Wrong credentials, please try again.");
          setShowLoginModal(true);
      }
  }

  const handleLogout = async () => {
      setLoggedIn(false);
      await API.logOut();
  };

  const getAllPages = async () => {
      //console.log("getAllPages");
      const allPages = await API.getAllPages();
      setPages(allPages);
  }

  const getAllEnrolledPages = async () => {
      //console.log("getAllEnrolledPages");
      const enrolledPages = await API.getAllEnrolledPages();
      setEnrolledPages(enrolledPages);
      setNotPersistentList(enrolledPages);
      setCFU(enrolledPages.reduce((acc, curr) => acc + curr.credits, 0));
  }

  const savePlan = async () => {
      const toAdd = notPersistentList.filter(Page => enrolledPages.find(enrolled => enrolled.code === Page.code) === undefined);
      const promises = toAdd.map((Page) =>  API.addPageToStudyPlan(Page.code))
      const toDelete = enrolledPages.filter(Page => notPersistentList.find(enrolled => enrolled.code === Page.code) === undefined);
      const otherPromises = toDelete.map((Page) =>  API.removePage(Page.code));
      Promise.all([...promises, ...otherPromises])
      .then(() => {
        setUpdated(!updated);
      });
  }

  const createStudyPlan = async (planType) => {
        //console.log("createStudyPlan");
        const created = await API.createStudyPlan(planType);
        if (created)
        {
            setStudyPlan(true);
            setModalTitle("Successfully created");
            setModalBody("You have successfully created your study plan!");
            setShowLoginModal(true);
        }
        else
        {
            setModalTitle("Study Plan creation failed");
            setModalBody("Ops! Something went wrong, please try again.");
            setShowLoginModal(true);
        }
    }

  const addPage = async (Page) => {
      setNotPersistentList(oldArray => [...oldArray, Page]);
      setCFU(oldCFU => oldCFU + Page.credits);
  }

  const deletePage = async (Page, credits) => {
      setNotPersistentList([...notPersistentList].filter(c => c.code !== Page));
      setCFU(oldCFU => oldCFU - credits);
  }

  const discardChanges = () => {
    setUpdated(!updated);
  }

  return (
    <>
        <BrowserRouter>
            <Header 
              isLoggedIn ={loggedIn} 
              matricola={matricola}
              logout={handleLogout}
              showLoginModal={showLoginModal} 
              hideLoginModal={() => setShowLoginModal(false)}
              title={modalTitle} 
              body={modalBody}/>
            <Routes>
              <Route path='/' element={<Navigate replace to='/Home'/>}/>
              <Route path='/Home' element={<HomePage 
                                            discardChanges={discardChanges} 
                                            deletePage={deletePage} 
                                            savePlan={savePlan} 
                                            CFU={CFU} 
                                            notPersistentList={notPersistentList} 
                                            loggedIn={loggedIn}  
                                            enrolledPages={Pages} 
                                            addPage={addPage} 
                                            studyPlanType={studyPlanType} 
                                            createStudyPlan={createStudyPlan} 
                                            studyPlanCreated={studyPlan} 
                                            Pages={Pages} 
                                            getAllPages={getAllPages}/>}/>
              <Route path='/login' element={loggedIn ? <Navigate replace to='/Home'/> : <LoginForm login={handleLogin}/> }/>
              <Route path='*' element={<DefaultRoute />} />
            </Routes>
        </BrowserRouter>
        <Footer/>
    </>
  );
}

export default App;
