import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SecuritySettings = ({ onPasswordChange, onTwoFactorToggle, twoFactorEnabled }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors when user starts typing
    if (passwordErrors?.[field]) {
      setPasswordErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validatePassword = () => {
    const errors = {};
    
    if (!passwordData?.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData?.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData?.newPassword?.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
  };

  const handleSubmitPasswordChange = async () => {
    const errors = validatePassword();
    setPasswordErrors(errors);
    
    if (Object.keys(errors)?.length === 0) {
      setIsChangingPassword(true);
      try {
        await onPasswordChange(passwordData);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } catch (error) {
        setPasswordErrors({ submit: 'Failed to change password. Please try again.' });
      } finally {
        setIsChangingPassword(false);
      }
    }
  };

  const securityFeatures = [
    {
      title: 'Login Activity',
      description: 'Monitor recent login attempts and active sessions',
      icon: 'Activity',
      action: 'View Activity'
    },
    {
      title: 'Data Export',
      description: 'Download your personal data and activity history',
      icon: 'Download',
      action: 'Export Data'
    },
    {
      title: 'Account Deletion',
      description: 'Permanently delete your account and all associated data',
      icon: 'Trash2',
      action: 'Delete Account',
      variant: 'destructive'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Password Change Section */}
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Lock" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Change Password</h2>
            <p className="text-sm text-muted-foreground">Update your account password</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Current Password"
            type={showPasswords ? "text" : "password"}
            value={passwordData?.currentPassword}
            onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
            error={passwordErrors?.currentPassword}
            required
          />

          <Input
            label="New Password"
            type={showPasswords ? "text" : "password"}
            value={passwordData?.newPassword}
            onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
            error={passwordErrors?.newPassword}
            description="Must be at least 8 characters long"
            required
          />

          <Input
            label="Confirm New Password"
            type={showPasswords ? "text" : "password"}
            value={passwordData?.confirmPassword}
            onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
            error={passwordErrors?.confirmPassword}
            required
          />

          <Checkbox
            label="Show passwords"
            checked={showPasswords}
            onChange={(e) => setShowPasswords(e?.target?.checked)}
          />

          {passwordErrors?.submit && (
            <div className="text-sm text-error bg-error/10 p-3 rounded-md">
              {passwordErrors?.submit}
            </div>
          )}

          <Button
            variant="default"
            loading={isChangingPassword}
            iconName="Save"
            iconPosition="left"
            onClick={handleSubmitPasswordChange}
          >
            Change Password
          </Button>
        </div>
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Two-Factor Authentication</h2>
            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Icon 
              name={twoFactorEnabled ? "CheckCircle" : "Circle"} 
              size={20} 
              className={twoFactorEnabled ? "text-success" : "text-muted-foreground"} 
            />
            <div>
              <div className="font-medium text-foreground">
                Two-Factor Authentication
              </div>
              <div className="text-sm text-muted-foreground">
                {twoFactorEnabled ? 'Currently enabled' : 'Currently disabled'}
              </div>
            </div>
          </div>
          <Button
            variant={twoFactorEnabled ? "outline" : "default"}
            size="sm"
            onClick={() => onTwoFactorToggle(!twoFactorEnabled)}
          >
            {twoFactorEnabled ? 'Disable' : 'Enable'}
          </Button>
        </div>
      </div>
      {/* Security Features */}
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Security & Privacy</h2>
            <p className="text-sm text-muted-foreground">Manage your account security and data</p>
          </div>
        </div>

        <div className="space-y-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-smooth">
              <div className="flex items-center gap-3">
                <Icon name={feature?.icon} size={20} className="text-muted-foreground" />
                <div>
                  <div className="font-medium text-foreground">{feature?.title}</div>
                  <div className="text-sm text-muted-foreground">{feature?.description}</div>
                </div>
              </div>
              <Button
                variant={feature?.variant || "outline"}
                size="sm"
              >
                {feature?.action}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;