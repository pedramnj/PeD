import {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

function LoginForm(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = { username, password };
        props.login(credentials);
        navigate("/login");
    };

    return (
        <>
        <div className="login-form-container">
            <div className='login-form-title'>
                <h2>Login</h2>
            </div>
                <Form onSubmit={handleSubmit}>
                <div className="login-form-container-2">
                <Form.Group id="email" className="form-text">
                    <Form.Label >Email</Form.Label>
                    <Form.Control 
                    type="email" 
                    value={username} 
                    onChange={ev => setUsername(ev.target.value)} 
                    required={true} />
                </Form.Group>
                <Form.Group id="password" className="form-text">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)} 
                    required={true} />
                </Form.Group>
                </div>
                    <Button className="w-50 login-submit" type="submit">Log In</Button>
                </Form>
        </div>
        </>
    );
}

export {LoginForm};