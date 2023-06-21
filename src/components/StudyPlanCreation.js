import {Alert, DropdownButton, Dropdown} from 'react-bootstrap';

function PageListCreation(props){
    return(
        <>
            <div className="no-plan-container">
                <Alert variant="warning">
                    Ops! You don't have any study plan yet. Please, create one!
                </Alert>
            </div>
            <div className="plan-creation-button">
                <DropdownButton title="Create New Study Plan" id="bg-nested-dropdown">
                    <Dropdown.Item eventKey="1">Full-Time</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Part-Time</Dropdown.Item>
                </DropdownButton>
            </div>
        </>
    );
}

export {PageListCreation};