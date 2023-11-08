import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './CreateUser.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { createUser, resetState } from '../../redux/actions/userActions';
import { PlusOutlined } from "@ant-design/icons";

const CreateUser = () => {

    const { Option } = Select;
   
    const options = [
        { label: "Admin", value: 1 },
        { label: "User", value: 2 },
    ];

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(2);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const createUserStatus = useSelector((state) => state.user);

    useEffect(() => {
        if(currentUser.user.role !== 1){
            alert("You don't have access to this page")
            window.location.href="/";
        }
        dispatch(resetState())
    }, [dispatch, currentUser.user.role])

    const handlecreateuser = () => {
        const user = {
            firstName,
            lastName,
            email,
            age,
            phoneNumber,
            image,
            password,
            role
          };
          
          dispatch(createUser(user))
    }

    const handleSelect = (value) => {
        setRole(value);
      };

    const handleCancelCreation = () => {
        window.location.href="/";
    }

    var isCreateUserError = createUserStatus.error != null ? 'createuser-error' : 'createuser-error-hide';
    var error = createUserStatus.error === null ? "" : createUserStatus.error;

    if(createUserStatus.users.length > 0) {
        window.location.href = "/userlist"
        dispatch(resetState())
    }

    const validateTenDigitNumber = (_, value) => {
        const regex = /^\d{10}$/;
        if (value && !regex.test(value)) {
          return Promise.reject(new Error('Please enter a 10-digit number'));
        }
        return Promise.resolve();
      };

  return (
    <div className="createuser">
            <div className="createuser-container">
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
                        <Input onChange={(e) => {setPhoneNumber(e.target.value)}} /> 
                    </Form.Item>

                    <Form.Item className="createuser-age-label" label="Age" name="age" rules={[{required: true, type:'number', message: 'Age is required'}]}>
                        <InputNumber min={18} max={100} onChange={(e) => setAge(e)}/> 
                    </Form.Item>
                    
                    <Form.Item label="Role" name="role" rules={[{required: true, message: 'Please select type of user'}]}> 
                        <Select className='createuser-role'
                            value={role}
                            onChange={handleSelect}
                        >
                            {options.map((option) => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item className="createuser-image-label" label="Image" name="image" rules={[{required: true, message: 'Image is required'}]}>
                        <Upload listType="picture-circle" onChange={(e) => setImage(e.file.originFileObj)} maxCount={1}>
                            <Button icon={<PlusOutlined />}></Button>
                        </Upload>
                    </Form.Item>

                    <div className={isCreateUserError}>{error}</div>

                    <Form.Item className='createuser-button' wrapperCol={{ offset: 8, span: 16 }}>
                            <Button className='createuser-button-submit' onClick={handlecreateuser} type="primary" htmlType="submit">Create User</Button>
                            <Button onClick={handleCancelCreation} type="primary">Cancel</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
  )
}

export default CreateUser