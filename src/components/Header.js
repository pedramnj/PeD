import {React, useEffect, useState} from "react";
import {Image, Modal, Button} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import logo from '../assets/logo.png';


//user password
//user2 password1
//user3 password2
//user4 password3
//user5 password4

function Header(props) {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);  
    let button;

    const logoutHandler = () => {
        setShowLogout(false);
        setShowLogoutModal(false);
        props.logout();
        navigate("/Home");
        }

    const clickLoginButton = () => {
        if(!props.isLoggedIn){
            setShowLogin(false);
            setShowLogout(false);
        }
        navigate('/login');
    }

    if(showLogin)
    {
        button = ( <Button variant="light" className="login-out-button" onClick={clickLoginButton}>Login</Button> );
    }
    else if(showLogout)
    {
            button = (
                <>  
                    <Button variant="light" className="login-out-button" onClick={() => setShowLogoutModal(true)}>Logout</Button>
                    <Logout 
                    show={showLogoutModal}
                    logout={logoutHandler}
                    onHide={() => setShowLogoutModal(false)}/>
                </>);
        
    }
    else
    {
        button = null;
    }



    

    useEffect(() => {
        if(props.isLoggedIn){
            setShowLogout(true);
            setShowLogin(false);
        }
        else
        {
            setShowLogin(true);
            setShowLogout(false);
        }
    }, [props.isLoggedIn]);

    useEffect(() => {
        if(props.showLoginModal){
            setShowLoginModal(true);
        }
    }, [props.showLoginModal]);


    return (
        <>
            <div className="title-bar">
                <div className="clear-fix"> 
                    <div className="relative-pos">
                        <div className="logo-container"></div>
                        <div className="row">
                            <div className="logo-header">
                                <a href="/">
                                    <Image href="#" src={logo} className="image-container"/>
                                </a>
                            </div>
                        </div>
                        <div className="page-titles">
                            <div id="Page Title" className="page-title">
                                Page Lists 
                            </div>
                            <div id="Page Subtitle" className="page-subtitle">
                                Minimal CMS
                            </div>
                        </div>                      
                    </div> 
                </div>
            </div>
            <div className="nav-bar">
                {props.isLoggedIn ? <h4 className="logged-as-text">Logged as s{props.matricola}</h4> : null}
                {button}
                <LoginModal show={props.showLoginModal} onHide={props.hideLoginModal} title={props.title} body={props.body}/>
            </div>
        </>
    );
}

function LoginModal(props) {
    
    const correct = props.title === "Login Successful" || props.title === "Successfully created";
    const divStyle = correct  ? 
    {
        backgroundColor: "#aeeeae95"
    } 
    :
    {
        backgroundColor: "#ffaeae95"
    } 

    return (
        <>
          <Modal 
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={divStyle}>
              <Modal.Header>
                  <Modal.Title>{props.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{props.body}</Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={props.onHide}>
                      Close
                  </Button>
              </Modal.Footer>
          </Modal>
        </>
    )
  }

function Logout(props) {

    return (
      <>
        <Modal
            show={props.show}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
                <Modal.Title>You are trying to logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you really sure?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={props.logout}>
                    Logout
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }

export { Header };