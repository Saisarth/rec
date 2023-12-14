// src/components/Dashboard.js
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './App';

import Chart from 'chart.js/auto';

const Dashboard = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);
  const history = useHistory();

  const handleLogout = () => {
    // Clear user data on logout
    setUserData(null);

    // Redirect to the login page
    history.push('/login');
  };

  useEffect(() => {
    // Fetch user data and setChartData accordingly
    const fetchData = async () => {
      try {
        // Simulate fetching data
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        // Calculate counts based on gender and employment type
        const genderCounts = users.reduce((acc, user) => {
          acc[user.gender] = (acc[user.gender] || 0) + 1;
          return acc;
        }, {});

        const employmentTypeCounts = users.reduce((acc, user) => {
          acc[user.company.bs] = (acc[user.company.bs] || 0) + 1;
          return acc;
        }, {});

        // (Your data processing logic here)

        // Calculate chart data
        const genderChartData = {
          labels: Object.keys(genderCounts),
          datasets: [
            {
              data: Object.values(genderCounts),
              backgroundColor: ['#36A2EB', '#FF6384'],
            },
          ],
        };

        const employmentTypeChartData = {
          labels: Object.keys(employmentTypeCounts),
          datasets: [
            {
              data: Object.values(employmentTypeCounts),
              backgroundColor: ['#FFCE56', '#4CAF50', '#FF5733'],
            },
          ],
        };

        setChartData({ gender: genderChartData, employmentType: employmentTypeChartData });
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };

    fetchData();
  }, [userData]);

  useEffect(() => {
    // Destroy the existing chart instance before rendering a new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Render the new chart
    if (chartData) {
      const ctx = document.getElementById('genderChart').getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'pie',
        data: chartData.gender,
      });
    }
  }, [chartData]);

  return (
    <div>
      <h2>Dashboard</h2>
      {userData && (
        <div>
          <p>Welcome, {userData.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      <div>
        <h3>Gender Distribution</h3>
        <canvas id="genderChart"></canvas>

        <h3>Employment Type Distribution</h3>
        <canvas id="employmentTypeChart"></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
