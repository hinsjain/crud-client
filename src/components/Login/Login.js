import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userlogin } from '../../redux/actions/authActions';
import { Link } from 'react-router-dom';
import './Login.css'

const Login = () => {

    const loginStatus = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = () => {
        // Call API for authentication
        const user = {
            email,
          password,
        };
        dispatch(userlogin(user));
        // Redirect to the dashboard or update the app state accordingly
    };

    var isLoginError = loginStatus.loginError != null ? 'login-error' : 'login-error-hide';

    return(
        <div className='login'>
            <div className='login-container'>
                <Form name="basic" labelCol={{span: 8}} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} autoComplete="off">
                    <Form.Item label="Email" name="email" rules={[{required: true, type:'email', message: 'Please input your username/email'}]}> 
                        <Input onChange={(e) => setEmail(e.target.value)} /> 
                    </Form.Item>
                    
                    <Form.Item label="Password" name="password" rules={[{required: true, message: 'Please input your password!'}]} > 
                        <Input.Password onChange={(e) => setPassword(e.target.value)}  /> 
                    </Form.Item>

                    <div className={isLoginError}>Invalid Credentials!</div>

                    <Form.Item className='login-button' wrapperCol={{ offset: 8, span: 16 }}>
                        <Button onClick={handleLogin} type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
                <div className='login-redirect'>Don't have an account? <Link to="/signup">Signup</Link></div>
            </div>
        </div>
    )
};

export default Login;