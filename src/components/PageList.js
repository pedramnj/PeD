import { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, OverlayTrigger, Tooltip, Alert, DropdownButton, Dropdown } from 'react-bootstrap';
import { PageList } from './ListTable.js';
import { useNavigate } from 'react-router-dom';


function PageList(props) {

    return (
        <>
            {
                props.PageListCreated ?
                <CreatedPageList 
                    discardChanges={props.discardChanges}
                    deletePage={props.deletePage}
                    savePlan={props.savePlan}
                    CFU={props.CFU}
                    notPersistentList={props.notPersistentList} 
                    PageListType={props.PageListType} 
                    Pages={props.Pages} 
                    allPages={props.allPages} 
                    getAllPages={props.getAllPages} 
                    addPage={props.addPage}/>
                :
                <PageListCreation createPageList={props.createPageList}/>
            }
        </>
    );
}

function PageListCreation(props){
    const navigate = useNavigate();
    
    const handleCreation = (plan) => {
        props.createPageList(plan);
        navigate("/Home");
    };


    return(
        <>
            <div className="no-plan-container">
                <Alert variant="warning">
                    Ops! You don't have any study plan yet. Please, create one!
                </Alert>
            </div>
            <div className="plan-creation-button">
                <DropdownButton title="Create New Study Plan" id="bg-nested-dropdown">
                    <Dropdown.Item eventKey="1" onClick={() => handleCreation(1)}>Full-Time</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => handleCreation(0)}>Part-Time</Dropdown.Item>
                </DropdownButton>
            </div>
        </>
    );
}

function CreatedPageList(props) {
    
    const [addingListShow, setAddingListShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    let editLine;

    const handleEdit = () => {
        props.savePlan();
        setShowSaveModal(false);
        setEditMode(false);
    }

    const addPage = (Page) => {
        props.addPage(Page);
        setAddingListShow(false);
    }

    const discardChanges = () => {
        props.discardChanges();
        setShowDiscardModal(false);
        setEditMode(false);
    }

    if(editMode)
    {
        editLine = (
            <Row>
                <Col>
                    <div className="credit-limit-box">
                        {props.PageListType ?
                            <h4 className='credit-font'>Total CFU : {props.CFU} <br/>(min: 60,  max: 80)</h4>
                        :
                            <h4 className='credit-font'>Total CFU : {props.CFU} <br/>(min: 20,  max: 40)</h4>
                        }   
                    </div>
                </Col>
                <Col>
                    <Button variant='primary' onClick={() => setAddingListShow(true)} className="add-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    </Button>
                </Col>
                <Col>
                    <Button variant='primary' className="save-button" onClick={() => setShowSaveModal(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                        </svg>
                    </Button>
                </Col>
            </Row>
        )
    }
    else
    {
        editLine = null;
    }

    return (
        <>
            <div className="line-title-edit">
                <div className="title-box-study-plan">
                    <h2 className="title-study-plan">Your Study Plan</h2>  
                </div>
                { editMode ?
                    <Button variant='primary' className='edit-button' onClick={() => setShowDiscardModal(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </Button>
                :
                    <Button variant='primary' className='edit-button' onClick={() => setEditMode(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                    </Button>
                }
            </div>
            <div className="list-container">
                
                <div className="header-list-table">
                    <Row className="header-row">
                        <Col className="form-responsive">Code</Col>
                        <Col className="form-responsive">Name</Col>
                        <Col className="form-responsive">CFU</Col>
                        <Col className="form-responsive">Students</Col>
                        <Col className="form-responsive">Max</Col>
                    </Row>
                </div>
                <PagesList deletePage={props.deletePage} showDeleteButton={editMode} Pages={props.notPersistentList}/>
            </div>
            {editLine}
            <AddingList
            CFU={props.CFU}
            maxCFU={props.PageListType ? 80 : 40}
            show={addingListShow}
            enrolledPages={props.notPersistentList}
            allPages={props.allPages}
            addPage={addPage}
            onHide={() => setAddingListShow(false)}/>
            <DiscardModal
            show={showDiscardModal}
            onHide={() => setShowDiscardModal(false)}
            discardChanges={() => discardChanges()}/>
            <SaveModal
            CFU={props.CFU}
            minCFU={props.PageListType ? 60 : 20}
            maxCFU={props.PageListType ? 80 : 40}
            show={showSaveModal}
            onHide={() => setShowSaveModal(false)}
            saveChanges={() => handleEdit()}/>


        </>
    );
}

function AddingList(props) {
    
    return (
        <>
        <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Add a Page
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddPagesList CFU={props.CFU} maxCFU={props.maxCFU} allPages={props.allPages} enrolledPages={props.enrolledPages} addPage={props.addPage}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

function AddPagesList(props) {
    
    const [showList, setShowList] = useState(false);

    useEffect (() => {
        if(props.allPages === undefined)
            setShowList(false);
        else
        {
            setShowList(true);
        }
    }, [showList])


    return (
        <>
            {
                showList ?
                (
                props.allPages.map((Page, index) => {
                    let PageToAdd;
                    let constraintA = "";
                    let constraintB = "";
                    let constraintC = "";
                    let constraintD = "";
                    let constraintError = 0;

                    PageToAdd = (
                        
                        <Button key={index} onClick={() => props.addPage(Page)} className="add-Page-button">
                            <Row className="Page-add-row">
                                <Col className="form-add-responsive">{Page.code}</Col>
                                <Col className="form-add-responsive">{Page.name}</Col>
                                <Col className="form-add-responsive">{Page.credits}</Col>
                            </Row>
                        </Button>
                        
                    )

                    if(props.enrolledPages !== undefined && props.enrolledPages.find(enrolledPage => enrolledPage.code === Page.code))
                    {
                        PageToAdd = null;
                    }
                    else if(Page.incompatibleWith !== null)
                    {

                        let foundPage;
                        if(props.enrolledPages !== undefined)
                            foundPage = props.enrolledPages.find(enrolledPage => Page.incompatibleWith.includes(enrolledPage.code));
                        else
                            foundPage = undefined;

                        if(foundPage !== undefined)
                        {
                            constraintA = "This Page is incompatible with a Page present in your study plan ( " + foundPage.code + " - " + foundPage.name + " ).";
                            constraintError = 1;
                        }
                    }

                    if(Page.preparatory !== null)
                    {
                        let foundPage;
                     
                        if(props.enrolledPages !== undefined)
                            foundPage = props.enrolledPages.find(enrolledPage => enrolledPage.code === Page.preparatory);
                        else
                            foundPage = undefined;

                        if(foundPage === undefined)
                        {
                            constraintB = "In order to add this Page you need to add the related preparatory Page ( " + Page.preparatory + " ).";
                            constraintError = 1;
                        }
                    }

                    if(Page.students === Page.maxStudents)
                    {
                        constraintC = "This Page reached the maximum number of students.";
                        constraintError = 1;
                    }

                    if((Page.credits + props.CFU) > props.maxCFU)
                    {
                        constraintD = "Adding this Page you will overcome the maximum number of credits.";
                        constraintError = 1;
                    }
                    
                    if(constraintError === 1)
                    {
                        
                        PageToAdd = (
                        <>
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{constraintA}<br/>{constraintB}<br/>{constraintC}<br/>{constraintD}<br/></Tooltip>}>
                                <span className="d-inline-block" style={{width: "100%"}}>
                                    <Button disabled className="add-Page-button">
                                        <Row className="Page-add-row">
                                            <Col className="form-add-responsive">{Page.code}</Col>
                                            <Col className="form-add-responsive">{Page.name}</Col>
                                            <Col className="form-add-responsive">{Page.credits}</Col>
                                        </Row>
                                    </Button>
                                </span>
                            </OverlayTrigger>
                        </>
                        
                        );
                    }
        
                    return (
                        <div key={index}>
                            {PageToAdd}
                        </div>
                    )
                })
                ) 
                : 
                null
            }
        </>
    )
}

function DiscardModal(props) {

    return (
      <>
        <Modal
            show={props.show}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
                <Modal.Title>Discarding changes</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you really sure?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Not yet
                </Button>
                <Button variant="danger" onClick={props.discardChanges}>
                    Discard
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }

  function SaveModal(props) {
    const modal = (
        <>
            <Modal
                show={props.show}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title>Saving Study Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to save your study plan?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Not yet
                    </Button>
                    <Button variant="danger" onClick={props.saveChanges}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

    const notEnoughCFU = (
        <>
            <Modal
                show={props.show}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title>Ops, looks like you added not enough CFU into your study plan [ minimum : {props.minCFU} ]</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please add more Pages into your study plan.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

    const notMuchCFU = (
        <>
            <Modal
                show={props.show}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title>Ops, looks like you added too much CFU into your study plan [ maximum : {props.maxCFU} ]</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please delete some Pages into your study plan.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

    return (
        <>
            {props.CFU >= props.minCFU ? 
                props.CFU <= props.maxCFU ? modal : notMuchCFU
                : notEnoughCFU
                }
        </>
    );
  }

export {PageList};