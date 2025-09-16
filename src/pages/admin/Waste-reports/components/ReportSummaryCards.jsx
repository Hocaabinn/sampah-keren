import React from 'react';
import Icon from '../../../../components/AppIcon';

const ReportSummaryCards = ({ summaryData }) => {
  const cards = [
    {
      id: 'total-waste',
      title: 'Total Sampah Terkumpul',
      value: summaryData?.totalWaste,
      unit: 'tons',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Truck',
      color: 'bg-primary'
    },
    {
      id: 'recycling-rate',
      title: 'Tingkat Daur Ulang',
      value: summaryData?.recyclingRate,
      unit: '%',
      change: '+3.2%',
      changeType: 'positive',
      icon: 'Recycle',
      color: 'bg-success'
    },
    {
      id: 'route-efficiency',
      title: 'Efisiensi Rute',
      value: summaryData?.routeEfficiency,
      unit: '%',
      change: '-1.8%',
      changeType: 'negative',
      icon: 'Route',
      color: 'bg-warning'
    },
    {
      id: 'reports-completed',
      title: 'Laporan Selesai',
      value: summaryData?.reportsCompleted,
      unit: '',
      change: '+8',
      changeType: 'positive',
      icon: 'FileCheck',
      color: 'bg-accent'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards?.map((card) => (
        <div
          key={card?.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-modal transition-gentle hover-lift"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${card?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={card?.icon} size={24} color="white" />
            </div>
            <div className={`text-sm font-medium ${
              card?.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              {card?.change}
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">
              {card?.title}
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">
                {card?.value}
              </span>
              {card?.unit && (
                <span className="text-sm text-muted-foreground">
                  {card?.unit}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportSummaryCards;