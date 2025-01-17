import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { googleLogout } from '@react-oauth/google';
import './Settings.css';
import Logout from './authentication/Logout';

function Settings({ user, setUser, updateUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [goal, setGoal] = useState('');
  const [weightChange, setWeightChange] = useState('');
  const [diningHall, setDiningHall] = useState('');

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${user.email}`);
        const data = response.data;

        // Populate fields with the data from the backend
        setName(data.name || '');
        setEmail(data.email || '');
        setGender(data.gender || '');
        setAge(data.age || '');
        setWeight(data.weight || '');
        setHeight(data.height || '');
        setActivityLevel(data.activityLevel || '');
        setGoal(data.goal || '');
        setWeightChange(data.weightChange || '');
        setDiningHall(data.diningHall || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user && user.email) {
      fetchUserData();
    }
  }, [user]);

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem('token');
  };

  const handleSave = async () => {
    const updatedUser = {
      name,
      email,
      age,
      gender,
      weight,
      height,
      activityLevel,
      goal,
      weightChange,
      diningHall,
    };

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/settings`, updatedUser);
      setUser(updatedUser);
      updateUser(updatedUser);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Settings saved successfully!');
    }
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <form>
        {/* Name */}
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        {/* Email (read-only) */}
        <label>
          Email:
          <input
            type="email"
            value={email}
            readOnly
          />
        </label>

        {/* Gender */}
        <label>
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        {/* Age */}
        <label>
          Age (years):
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>

        {/* Weight */}
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>

        {/* Height */}
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>

        {/* Amount of Weight to Gain/Lose */}
        <label>
          Amount of Weight to Gain/Lose (kg):
          <input
            type="number"
            value={weightChange}
            onChange={(e) => setWeightChange(e.target.value)}
          />
        </label>

        {/* Activity Level */}
        <label>
          Activity Level:
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
          >
            <option value="">Select activity level</option>
            <option value="Sedentary">Sedentary: little or no exercise</option>
            <option value="Exercise 1-3 times/week">Exercise 1-3 times/week</option>
            <option value="Exercise 4-5 times/week">Exercise 4-5 times/week</option>
            <option value="Daily exercise or intense exercise 3-4 times/week">
              Daily exercise or intense exercise 3-4 times/week
            </option>
            <option value="Intense exercise 6-7 times/week">Intense exercise 6-7 times/week</option>
            <option value="Very intense exercise daily, or physical job">
              Very intense exercise daily, or physical job
            </option>
          </select>
        </label>

        {/* Fitness Goal */}
        <label>
          Fitness Goal:
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="">Select your goal</option>
            <option value="Maintain">Maintain</option>
            <option value="Cut">Cut</option>
            <option value="Bulk">Bulk</option>
          </select>
        </label>

        {/* Preferred Dining Hall */}
        <label>
          Preferred Dining Hall:
          <select
            value={diningHall}
            onChange={(e) => setDiningHall(e.target.value)}
          >
            <option value="">Select a dining hall</option>
            <option value="Warren Dining Hall">Warren Dining Hall</option>
            <option value="Marciano Dining Hall">Marciano Dining Hall</option>
            <option value="West Dining Hall">West Dining Hall</option>
          </select>
        </label>
      </form>

      <div className="button-group">
        <button type="button" className="primary-button" onClick={handleSave}>
          Save Changes
        </button>
        <button type="button" className="secondary-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Settings;
