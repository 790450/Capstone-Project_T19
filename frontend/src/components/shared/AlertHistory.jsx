import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AlertHistory = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlertHistory = async () => {
      try {
        const res = await fetch(`/api/alert/history/${currentUser._id}`); 
        const data = await res.json();
        if (res.ok) {
          setAlerts(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching alert history:', error);
      }
    };

    if (currentUser?._id) {
      fetchAlertHistory();
    }
  }, [currentUser]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Alert History</h2>
      {alerts.length === 0 ? (
        <p className="text-gray-600">No alert history found.</p>
      ) : (
        <ul className="space-y-3">
          {alerts.map((alert) => (
            <li key={alert._id} className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-800">{alert.message}</p>
              <p className="text-sm text-gray-500">{new Date(alert.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertHistory;
