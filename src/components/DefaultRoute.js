import { Container } from 'react-bootstrap';

function DefaultRoute() {
    return (
        <Container className='default-route'>
            <h1>No data here...</h1>
            <h2>This is not the route you are looking for!</h2>
        </Container>);
}

export { DefaultRoute }