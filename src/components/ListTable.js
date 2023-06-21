import { useEffect, useState } from "react";
import { Accordion, Col, Row, Button, Modal } from "react-bootstrap";

function ListTable(props) {

    return (
        <>
            <div className="title-box-list-Page">
                <h2 className="title-list-Page">List of created Pages</h2>
            </div>
            <div className="list-container">
                
                <div className="header-list-table">
                    <Row className="header-row">
                        <Col className="form-responsive">TITLE</Col>
                        <Col className="form-responsive">CREATION DATE</Col>
                        <Col className="form-responsive">AUTHOR</Col>
      
                    </Row>
                </div>
                <PageList showDeleteButton={false} Page={props.Page}/>
            </div>
        </>
    )

}

function PageList(props) {
    const [showList, setShowList] = useState(false);

    useEffect (() => {
        if(props.Page === undefined)
            setShowList(false);
        else
            setShowList(true);
    }, [props.Page])

    return (
        <>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                {
                    showList ?
                    (
                    props.Page.sort((a, b) => a.name.localeCompare(b.name)).map((Page, index) => {
                        const mandatory = props.Page.find(c => c.preparatory === Page.code);
                        return (
                            <PageRow 
                                mandatory={mandatory}
                                deletePage={props.deletePage}
                                showDeleteButton={props.showDeleteButton}
                                key={index}
                                k={index}
                                PageCode={Page.code}
                                PageName={Page.name}
                                PageCredits={Page.credits}
                                Pagetudents={Page.students}
                                PageMaxStudents={Page.maxStudents}
                                PageIncompatible={Page.incompatibleWith}
                                PageMandatory={Page.preparatory}
                                />);
                    })
                    )
                    : 
                    null
                    
                }
            </Accordion>
        </>
    )
}

function PageRow(props) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        props.deletePage(props.PageCode, props.PageCredits);
        setShowDeleteModal(false);
    }

    return (
        <>
            <Accordion.Item eventKey={props.k} className="rounded-border">
                <Accordion.Header className="rounded-border">
                    <Row className="Page-row">
                        <Col className="form-responsive">{props.PageCode}</Col>
                        <Col className="form-responsive">{props.PageName}</Col>
                        <Col className="form-responsive">{props.PageCredits}</Col>
                        <Col className="form-responsive">{props.Pagetudents}</Col>
                        <Col className="form-responsive">{props.PageMaxStudents ? props.PageMaxStudents : "-"}</Col>                        
                    </Row>
                </Accordion.Header>
                <Accordion.Body>
                    <Row className="form-responsive"> • Mandatory : {props.PageMandatory ? props.PageMandatory : "none" }</Row>
                    <Row className="form-responsive"> • Incompatible : {props.PageIncompatible ? props.PageIncompatible.replace("#", ", ") : "none"}</Row>
                    {
                        props.showDeleteButton ? 
                            <Button className="delete-button" variant="danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
                        :
                            null
                    }
                </Accordion.Body>
            </Accordion.Item>
            <DeleteModal
                mandatory={props.mandatory}
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                PageName={props.PageName}
                deletePage={handleDelete}
                />
        </>
    )
}

function DeleteModal(props) {

    const deleteModal = (
        <>
        <Modal
            show={props.show}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
                <Modal.Title>You are trying to delete {props.PageName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you really sure?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={props.deletePage}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );

    const errorModal = (
        <>
        <Modal
            show={props.show}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
                <Modal.Title>This Page is mandatory for another Page : {props.mandatory ? props.mandatory.code : null} - {props.mandatory ? props.mandatory.name : null}</Modal.Title>
            </Modal.Header>
            <Modal.Body>You can not delete this Page.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Got it
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    )

    return (
        <>
         { (props.mandatory === undefined) ? deleteModal : errorModal }
         </>
     
    );
  }

export {ListTable, PageList};