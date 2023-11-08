import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import './Signup.css';
import { registerUser } from "../../redux/actions/authActions";
import { Link } from 'react-router-dom';

const Signup = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState("");
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSignup = () => {
        // Call API to create a new user
        const user = {
          firstName,
          lastName,
          email,
          age,
          phoneNumber,
          image,
          password,
        };

        console.log(user)
        
        dispatch(registerUser(user));
        // Redirect to the dashboard or update the app state accordingly
      };

      const signupStatus = useSelector((state) => state.auth);
      var isSignUpError = signupStatus.loginError != null ? 'signup-error' : 'signup-error-hide';
      var error = signupStatus.loginError === null ? "" : signupStatus.loginError.err

      const validateTenDigitNumber = (_, value) => {
        const regex = /^\d{10}$/;
        if (value && !regex.test(value)) {
          return Promise.reject(new Error('Please enter a 10-digit number'));
        }
        return Promise.resolve();
      };
      
    return (
        <div className="signup">
            <div className="signup-container">
                <Form labelCol={{span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ maxWidth: 600 }}>

                    <Form.Item label="First Name" name="firstName" rules={[{required: true, message: 'First Name is required'}]}> 
                        <Input onChange={(e) => setFirstName(e.target.value)} /> 
                    </Form.Item>

                    <Form.Item label="Last Name" name="lastName" rules={[{required: true, message: 'Last Name is required'}]}> 
                        <Input onChange={(e) => setLastName(e.target.value)} /> 
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[{required: true, type:'email', message: 'Email is required'}]}> 
                        <Input onChange={(e) => setEmail(e.target.value)} /> 
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[{required: true, message: 'Password is required'}]} > 
                        <Input.Password onChange={(e) => setPassword(e.target.value)}  /> 
                    </Form.Item>            

                    <Form.Item label="Ph Number" name="phoneNumber" rules={[{required: true, message: 'Phone Number is required', validator: validateTenDigitNumber}]}> 
                        <Input onChange={(e) => setPhoneNumber(e.target.value)} /> 
                    </Form.Item>

                    <Form.Item className="signup-age-label" label="Age" name="age" rules={[{required: true, type:'number', message: 'Age is required'}]}>
                        <InputNumber min={18} max={100} onChange={(e) => setAge(e)}/> 
                    </Form.Item>
                    
                    <Form.Item className="signup-image-label" label="Image" name="image" rules={[{required: true, message: 'Image is required'}]}>
                        <Upload listType="picture-circle" onChange={(e) => setImage(e.file.originFileObj)} maxCount={1}>
                            <Button icon={<PlusOutlined />}></Button>
                        </Upload>
                    </Form.Item>

                    <div className={isSignUpError}>{error}</div>

                    <Form.Item className='signup-button' wrapperCol={{ offset: 8, span: 16 }}>
                            <Button onClick={handleSignup} type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
                <div className='signup-redirect'>Already an user? <Link to="/login">Login</Link></div>
            </div>
        </div>
    );
};

export default Signup;