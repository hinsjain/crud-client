import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, modifyUser, removeUser } from '../../redux/actions/userActions';
import { Button, Popconfirm, Space, Table, Modal, Form, Input, Select, InputNumber } from 'antd';
import './UserList.css'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Option } from 'antd/es/mentions';

const UserList = () => {

    const dispatch = useDispatch();
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const currentUser = useSelector((state) => state.auth.currentUser);

    const userList = useSelector((state) => state.user);

    useEffect(() => {
        if(currentUser.user.role !== 1){
            alert("You don't have access to this page")
            window.location.href="/";
        }

        dispatch(fetchUsers())
    }, [dispatch, currentUser.user.role])

    const handleDelete = (userId) => {
        setSelectedUserId(userId);
        handleConfirmDelete(userId);
    }

    const handleConfirmDelete = (selectedUserId) => {
        if (selectedUserId) {
            dispatch(removeUser(selectedUserId));
            setSelectedUserId(null);
        }
    }
    
    const handleCancelDelete = () => {
        setSelectedUserId(null);
    }

    const handleEdit = (user) => {
        setSelectedUser(user);      
        setSelectedUserId(user.id)
        setIsModalVisible(true);
    }

    const handleCancelEdit = () => {
        
        setSelectedUser(null);
        setSelectedUserId(null);
        setIsModalVisible(false);
        window.location.reload();
    }

    const handleUpdate = (values) => {
        // Update the user using the values
        dispatch(modifyUser(values, selectedUserId))
        setIsModalVisible(false);
    }

    if(userList.error === "Invalid Token"){
        localStorage.clear();
        alert("current session expired")
        window.location.href="/login";
    }

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            render: (text, record) => (
                <span>{`${record.firstName} ${record.lastName}`}</span>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Phone Number',
          dataIndex: 'phoneNumber',
          key: 'phoneNumber',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (text, record) => (
                record.role === 1 ? "Admin" : "User"
            ),
          },
        {
            title: 'Actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button className='edit-button-icon' icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                    </Button>
                    <Popconfirm
                        title="Confirm to delete this user?"
                        onConfirm={() => handleDelete(record.id)}
                        onCancel={handleCancelDelete}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                </Space>
            ),
        },
      ];

      const handleRoleChange = (value) => {
        setSelectedRole(parseInt(value))
      }

      const validateTenDigitNumber = (_, value) => {
        const regex = /^\d{10}$/;
        if (value && !regex.test(value)) {
          return Promise.reject(new Error('Please enter a 10-digit number'));
        }
        return Promise.resolve();
      };

    return (
        <div className='userlist'>
            <div className='userlist-container'>
                <Table columns={columns} dataSource={userList.users} 
                rowKey="id"
                pagination={{
                    pageSize: 8,
                    }}
                    bordered
                />;

                <Modal
                title="Edit User"
                visible={isModalVisible}
                onCancel={handleCancelEdit}
                footer={null}
            >
                {selectedUser != null ? selectedUser.password = "" : null}
                {selectedUser != null ? (selectedUser.role === 1 ? selectedUser.role = "Admin" : selectedUser.role = "User") : null}
                <Form
                    name="editUser"
                    initialValues={selectedUser}
                    onFinish={handleUpdate}
                >
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter first name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter last name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, type:"email", message: 'Please enter email' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please enter Password' }]}
                    >
                        <Input.Password value=""/>
                    </Form.Item>

                    <Form.Item
                        name="age"
                        label="Age"
                        rules={[{ required: true,  message: 'Please enter age' }]}
                    >
                        <InputNumber  min={18} max={100} />
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please enter phone number', validator: validateTenDigitNumber }]}
                    >
                        <Input minLength={10} maxLength={10}  />
                    </Form.Item>

                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: 'Please enter phone number' }]}
                    >
                        
                        <Select onChange={handleRoleChange}>
                            <Option value={1}>Admin</Option>
                            <Option value={2}>User</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>

                        <Button className='edit-cancel-button' onClick={handleCancelEdit} type="primary">
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            </div>
        </div>
    )
}

export default UserList