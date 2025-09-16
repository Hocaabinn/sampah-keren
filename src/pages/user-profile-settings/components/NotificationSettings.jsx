import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NotificationSettings = ({ settings, onSave }) => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: settings?.emailNotifications,
    smsNotifications: settings?.smsNotifications,
    pushNotifications: settings?.pushNotifications,
    reportUpdates: settings?.reportUpdates,
    pickupReminders: settings?.pickupReminders,
    communityNews: settings?.communityNews,
    weeklyDigest: settings?.weeklyDigest,
    frequency: settings?.frequency,
    quietHours: settings?.quietHours
  });

  const [isSaving, setIsSaving] = useState(false);

  const frequencyOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'daily', label: 'Daily Digest' },
    { value: 'weekly', label: 'Weekly Summary' },
    { value: 'never', label: 'Never' }
  ];

  const quietHoursOptions = [
    { value: 'none', label: 'No Quiet Hours' },
    { value: '22-08', label: '10 PM - 8 AM' },
    { value: '23-07', label: '11 PM - 7 AM' },
    { value: '00-06', label: '12 AM - 6 AM' }
  ];

  const handleCheckboxChange = (field, checked) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSelectChange = (field, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(notificationSettings);
    } catch (error) {
      console.error('Failed to save notification settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Bell" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Notification Preferences</h2>
          <p className="text-sm text-muted-foreground">Manage how you receive updates and alerts</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Notification Channels */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Notification Channels</h3>
          <div className="space-y-4">
            <Checkbox
              label="Email Notifications"
              description="Receive notifications via email"
              checked={notificationSettings?.emailNotifications}
              onChange={(e) => handleCheckboxChange('emailNotifications', e?.target?.checked)}
            />
            <Checkbox
              label="SMS Notifications"
              description="Receive text message alerts"
              checked={notificationSettings?.smsNotifications}
              onChange={(e) => handleCheckboxChange('smsNotifications', e?.target?.checked)}
            />
            <Checkbox
              label="Push Notifications"
              description="Receive browser push notifications"
              checked={notificationSettings?.pushNotifications}
              onChange={(e) => handleCheckboxChange('pushNotifications', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Notification Types */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">What to Notify</h3>
          <div className="space-y-4">
            <Checkbox
              label="Report Status Updates"
              description="Get notified when your waste reports are updated"
              checked={notificationSettings?.reportUpdates}
              onChange={(e) => handleCheckboxChange('reportUpdates', e?.target?.checked)}
            />
            <Checkbox
              label="Pickup Reminders"
              description="Reminders for scheduled waste pickups"
              checked={notificationSettings?.pickupReminders}
              onChange={(e) => handleCheckboxChange('pickupReminders', e?.target?.checked)}
            />
            <Checkbox
              label="Community News"
              description="Updates about local waste management initiatives"
              checked={notificationSettings?.communityNews}
              onChange={(e) => handleCheckboxChange('communityNews', e?.target?.checked)}
            />
            <Checkbox
              label="Weekly Activity Digest"
              description="Summary of your weekly waste management activity"
              checked={notificationSettings?.weeklyDigest}
              onChange={(e) => handleCheckboxChange('weeklyDigest', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Frequency Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Notification Frequency"
            description="How often to receive notifications"
            options={frequencyOptions}
            value={notificationSettings?.frequency}
            onChange={(value) => handleSelectChange('frequency', value)}
          />

          <Select
            label="Quiet Hours"
            description="When to pause notifications"
            options={quietHoursOptions}
            value={notificationSettings?.quietHours}
            onChange={(value) => handleSelectChange('quietHours', value)}
          />
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-border">
          <Button
            variant="default"
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
            onClick={handleSave}
          >
            Save Notification Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;