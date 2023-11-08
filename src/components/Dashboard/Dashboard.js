// src/components/Dashboard.js

import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Dashboard.css'
import image from '../.././assets/images/profile-image.png';

const Dashboard = () => {
  // Get the current user data from the state
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [imagePath, setImagePath] = useState(image)
  const dispatch = useDispatch();

  useEffect(() => {
    if(currentUser.user.image != null){
        setImagePath(`http://localhost:3000/images/${currentUser.user.image}`)
      }
  }, [imagePath])

  return (
    <div className='dashboard'>
      <div className='dashboard-container'>
        <Card className='dashboard-portfolio'>
            <Card className='dashboard-profile' cover={<img className='dashboard-profile-image' title={currentUser.user.firstName+ " " + currentUser.user.lastName} alt={currentUser.user.firstName+ " " + currentUser.user.lastName} src={imagePath} />}>

                <p className='dashboard-profile-name'>{currentUser.user.firstName+ " " + currentUser.user.lastName}</p>

                <p className='dashboard-profile-name'>{currentUser.user.email}</p>

                <p className='dashboard-profile-name'>Age: {currentUser.user.age}</p>

                <p className='dashboard-profile-name'>Phone Number: {currentUser.user.phoneNumber}</p>
                
            </Card>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;