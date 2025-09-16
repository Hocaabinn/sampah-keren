import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoForm from './components/PersonalInfoForm';
import WasteStatsDashboard from './components/WasteStatsDashboard';
import NotificationSettings from './components/NotificationSettings';
import SecuritySettings from './components/SecuritySettings';
import ActivityHistory from './components/ActivityHistory';
import AchievementBadges from './components/AchievementBadges';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const UserProfileSettings = () => {
  const { user, updateProfile, refreshUserProfile } = useAuth(); 
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setUserProfile({
        name: user.user_metadata?.name || user.user_metadata?.full_name || "User",
        email: user.email,
        phone: user.user_metadata?.phone || "",
        address: user.user_metadata?.address || "",
        city: user.user_metadata?.city || "",
        zipCode: user.user_metadata?.zipCode || "", 
        location: user.user_metadata?.location || "",
        joinDate: new Date(user.created_at).toLocaleDateString(),
        preferredLanguage: user.user_metadata?.preferredLanguage || "en",
        avatar: user.user_metadata?.avatar_url || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.user_metadata?.name || user.user_metadata?.full_name || "User"),
        stats: {
          reportsSubmitted: user.user_metadata?.reportsSubmitted || 0,
          pickupsRequested: user.user_metadata?.pickupsRequested || 0,
          impactScore: user.user_metadata?.impactScore || 0,
          communityRank: user.user_metadata?.communityRank || 0
        }
      });
    }
  }, [user]);


  const handleProfileSave = async (profileData) => {
    setIsUpdating(true);
    
    try {
      
      const updateData = {
        name: profileData.name,
        full_name: profileData.name, 
        phone: profileData.phone,
        address: profileData.address,
        city: profileData.city,
        zipCode: profileData.zipCode,
        preferredLanguage: profileData.preferredLanguage,
        ...user.user_metadata,
        ...profileData
      };

      // Update ke Supabase
      const { error } = await updateProfile(updateData);

      if (error) {
        console.error('Error updating profile:', error);
        alert('Gagal memperbarui profil: ' + error.message);
        return false;
      }

      // Update local state
      setUserProfile(prev => ({
        ...prev,
        ...profileData,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name || "User")}`
      }));

      alert('Profil berhasil diperbarui!');
      return true;

    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Terjadi kesalahan saat memperbarui profil');
      return false;
    } finally {
      setIsUpdating(false);
    }
  };


  const handleRefreshProfile = async () => {
    try {
      await refreshUserProfile();
    } catch (err) {
      console.error('Error refreshing profile:', err);
    }
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  const mockActivities = [
    { type: 'report', title: 'Waste Report Submitted', description: 'Reported overflowing trash bin on Main Street', date: '2025-09-03T10:30:00Z', status: 'completed', points: 10 },
    { type: 'pickup', title: 'Pickup Request Scheduled', description: 'Bulk waste pickup scheduled', date: '2025-09-02T14:15:00Z', status: 'pending', points: 5 }
  ];

  const mockAchievements = [
    { category: 'reporting', type: 'first_report', title: 'First Reporter', description: 'Submit your first waste report', earned: true, earnedDate: 'Sept 3, 2025', progress: 100 }
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'stats', label: 'Statistics', icon: 'BarChart3' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'activity', label: 'Activity', icon: 'Activity' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <BreadcrumbTrail />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Profile Header */}
          <ProfileHeader 
            userProfile={userProfile} 
            onEditProfile={() => setActiveTab('profile')}
            onRefreshProfile={handleRefreshProfile} //
          />

          {/* Tabs */}
          <div className="bg-card rounded-lg border border-border shadow-card mb-6">
            <div className="border-b border-border">
              <nav className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition border-b-2 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            <div className="p-6">
              {activeTab === 'profile' && (
                <PersonalInfoForm 
                  userProfile={userProfile} 
                  onSave={handleProfileSave}
                  isUpdating={isUpdating} 
                />
              )}
              {activeTab === 'stats' && <WasteStatsDashboard stats={userProfile.stats} />}
              {activeTab === 'notifications' && <NotificationSettings />}
              {activeTab === 'security' && <SecuritySettings />}
              {activeTab === 'activity' && <ActivityHistory activities={mockActivities} />}
              {activeTab === 'achievements' && <AchievementBadges achievements={mockAchievements} />}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-lg border border-border shadow-card p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" iconName="Download">Export My Data</Button>
              <Button variant="outline" iconName="HelpCircle">Get Help</Button>
              <Button variant="outline" iconName="MessageSquare">Contact Support</Button>
              <Button 
                variant="outline" 
                iconName="RefreshCw" 
                onClick={handleRefreshProfile}
              >
                Refresh Profile
              </Button>
              <Button variant="destructive" iconName="LogOut" className="ml-auto">Sign Out</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfileSettings;