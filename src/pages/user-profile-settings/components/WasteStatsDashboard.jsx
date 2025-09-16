import React from 'react';
import Icon from '../../../components/AppIcon';

const WasteStatsDashboard = ({ stats }) => {
  const statCards = [
    {
      title: 'Reports Submitted',
      value: stats?.reportsSubmitted,
      icon: 'AlertTriangle',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12 this month',
      changeType: 'positive'
    },
    {
      title: 'Pickup Requests',
      value: stats?.pickupsRequested,
      icon: 'Truck',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: '+8 this month',
      changeType: 'positive'
    },
    {
      title: 'Environmental Impact',
      value: `${stats?.impactScore} pts`,
      icon: 'Leaf',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+45 this month',
      changeType: 'positive'
    },
    {
      title: 'Community Rank',
      value: `#${stats?.communityRank}`,
      icon: 'Trophy',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: 'Top 15%',
      changeType: 'neutral'
    }
  ];

  const monthlyData = [
    { month: 'Jan', reports: 3, pickups: 2 },
    { month: 'Feb', reports: 5, pickups: 3 },
    { month: 'Mar', reports: 4, pickups: 4 },
    { month: 'Apr', reports: 7, pickups: 5 },
    { month: 'May', reports: 6, pickups: 3 },
    { month: 'Jun', reports: 8, pickups: 6 }
  ];

  const maxValue = Math.max(...monthlyData?.map(d => Math.max(d?.reports, d?.pickups)));

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards?.map((stat, index) => (
          <div key={index} className="bg-card rounded-lg border border-border shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                stat?.changeType === 'positive' ? 'bg-success/10 text-success' :
                stat?.changeType === 'negative'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
              }`}>
                {stat?.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {stat?.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat?.title}
            </div>
          </div>
        ))}
      </div>
      {/* Activity Chart */}
      <div className="bg-card rounded-lg border border-border shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Monthly Activity</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Reports</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <span className="text-muted-foreground">Pickups</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {monthlyData?.map((data, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-8 text-sm text-muted-foreground font-medium">
                {data?.month}
              </div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${(data?.reports / maxValue) * 100}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-foreground">
                    {data?.reports}
                  </div>
                </div>
                <div className="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-secondary rounded-full transition-all duration-300"
                    style={{ width: `${(data?.pickups / maxValue) * 100}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-foreground">
                    {data?.pickups}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WasteStatsDashboard;