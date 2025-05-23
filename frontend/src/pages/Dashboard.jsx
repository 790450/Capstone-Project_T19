import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardSidebar from '@/components/shared/DashboardSidebar';
import BottomNavBar from '@/components/shared/BottomNavBar';
import DashboardProfile from '@/components/shared/DashboardProfile';
import AlertPreference from '@/components/shared/AlertPreference';
import { toast } from 'sonner';
import DashboardPersonalizedNews from '@/components/shared/DashboardPersonalizedNews';
import AlertHistory from '@/components/shared/AlertHistory';

const Dashboard = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  const [tab, setTab] = useState('');
  const [currentPreferences, setcurrentPreferences] = useState(null);

  // Set tab from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

  // Fetch user preferences on tab change
  useEffect(() => {
    const fetchPreferences = async () => {
      if (tab === 'alerts' && currentUser?._id) {
        try {
          const res = await fetch(`/api/alertsettings/${currentUser._id}`);
          const data = await res.json();
          if (res.ok) {
            setcurrentPreferences(data);
          } else {
            console.error(data.message);
          }
        } catch (err) {
          console.error('Failed to load preferences:', err);
        }
      }
    };
    fetchPreferences();
  }, [tab, currentUser]);

  // Save preferences handler

  const userId = currentUser?._id;

  const savePreferences = async (preferences) => {
    try {
      const res = await fetch(`/api/alertsettings/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        categories: preferences.categories,
        frequency: preferences.frequency,
      
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setcurrentPreferences(data);
        toast.success('Preferences updated successfully');
      } else {
        toast.error(data.message || 'Failed to update preferences');
      }
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Error saving preferences');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full">
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      <BottomNavBar />

      <div className="w-full">
        {tab === 'profile' && <DashboardProfile />}
        {tab === 'alerts' && (
          <AlertPreference
            currentPreferences={currentPreferences}
            onSave={savePreferences}
          />
        )}
        {tab === "personalized" && <DashboardPersonalizedNews />}
        {tab === "history" && <AlertHistory />}
      </div>
    </div>
  );
};

export default Dashboard;
