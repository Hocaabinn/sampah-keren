import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfileHeader = ({ userProfile, onEditProfile }) => {
  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Profile Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-4 border-primary/20">
            <Image
              src={userProfile?.avatar}
              alt={`${userProfile?.name}'s profile picture`}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={onEditProfile}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-smooth shadow-card focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Edit profile picture"
          >
            <Icon name="Camera" size={16} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {userProfile?.name}
              </h1>
              <p className="text-muted-foreground font-caption mb-2">
                {userProfile?.email}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size={14} />
                  <span>{userProfile?.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Calendar" size={14} />
                  <span>Joined {userProfile?.joinDate}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-primary">
                  {userProfile?.stats?.reportsSubmitted}
                </div>
                <div className="text-xs text-muted-foreground">Reports</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-secondary">
                  {userProfile?.stats?.pickupsRequested}
                </div>
                <div className="text-xs text-muted-foreground">Pickups</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-accent">
                  {userProfile?.stats?.impactScore}
                </div>
                <div className="text-xs text-muted-foreground">Impact</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;