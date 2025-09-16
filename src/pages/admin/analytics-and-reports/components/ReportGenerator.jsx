import React, { useState } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';
import Select from '../../../../components/ui/Select';
import Input from '../../../../components/ui/Input';
import { Checkbox } from '../../../../components/ui/Checkbox';

const ReportGenerator = ({ onGenerateReport, isGenerating = false }) => {
  const [reportConfig, setReportConfig] = useState({
    template: 'executive',
    format: 'pdf',
    schedule: 'manual',
    sections: ['overview', 'metrics', 'charts'],
    recipients: '',
    title: 'Municipal Waste Management Report'
  });

  const templateOptions = [
    { value: 'executive', label: 'Executive Summary' },
    { value: 'operational', label: 'Operational Report' },
    { value: 'financial', label: 'Financial Analysis' },
    { value: 'environmental', label: 'Environmental Impact' },
    { value: 'custom', label: 'Custom Template' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV Data File' },
    { value: 'powerpoint', label: 'PowerPoint Presentation' }
  ];

  const scheduleOptions = [
    { value: 'manual', label: 'Generate Now' },
    { value: 'daily', label: 'Daily at 6:00 AM' },
    { value: 'weekly', label: 'Weekly on Monday' },
    { value: 'monthly', label: 'Monthly on 1st' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const sectionOptions = [
    { id: 'overview', label: 'Executive Overview', description: 'High-level summary and key insights' },
    { id: 'metrics', label: 'Key Performance Metrics', description: 'Operational efficiency indicators' },
    { id: 'charts', label: 'Data Visualizations', description: 'Charts and graphs' },
    { id: 'trends', label: 'Trend Analysis', description: 'Historical comparisons and forecasts' },
    { id: 'recommendations', label: 'Recommendations', description: 'Action items and suggestions' },
    { id: 'appendix', label: 'Data Appendix', description: 'Raw data tables and methodology' }
  ];

  const handleConfigChange = (key, value) => {
    setReportConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSectionToggle = (sectionId, checked) => {
    setReportConfig(prev => ({
      ...prev,
      sections: checked 
        ? [...prev?.sections, sectionId]
        : prev?.sections?.filter(id => id !== sectionId)
    }));
  };

  const handleGenerate = () => {
    onGenerateReport?.(reportConfig);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={18} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Report Generator</h3>
        </div>
        <Button
          variant="default"
          iconName="Download"
          iconSize={16}
          loading={isGenerating}
          onClick={handleGenerate}
          disabled={reportConfig?.sections?.length === 0}
        >
          Generate Report
        </Button>
      </div>
      <div className="p-6 space-y-6">
        {/* Report Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Report Title"
            type="text"
            value={reportConfig?.title}
            onChange={(e) => handleConfigChange('title', e?.target?.value)}
            placeholder="Enter report title"
          />

          <Select
            label="Report Template"
            options={templateOptions}
            value={reportConfig?.template}
            onChange={(value) => handleConfigChange('template', value)}
          />

          <Select
            label="Output Format"
            options={formatOptions}
            value={reportConfig?.format}
            onChange={(value) => handleConfigChange('format', value)}
          />

          <Select
            label="Generation Schedule"
            options={scheduleOptions}
            value={reportConfig?.schedule}
            onChange={(value) => handleConfigChange('schedule', value)}
          />
        </div>

        {/* Report Sections */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Include Sections</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sectionOptions?.map((section) => (
              <div key={section?.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                <Checkbox
                  checked={reportConfig?.sections?.includes(section?.id)}
                  onChange={(e) => handleSectionToggle(section?.id, e?.target?.checked)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground cursor-pointer">
                    {section?.label}
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    {section?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Recipients (for scheduled reports) */}
        {reportConfig?.schedule !== 'manual' && (
          <div>
            <Input
              label="Email Recipients"
              type="email"
              value={reportConfig?.recipients}
              onChange={(e) => handleConfigChange('recipients', e?.target?.value)}
              placeholder="admin@city.gov, manager@city.gov"
              description="Comma-separated email addresses for scheduled delivery"
            />
          </div>
        )}

        {/* Preview Information */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Report Preview</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Template:</span>
              <span className="font-medium">{templateOptions?.find(t => t?.value === reportConfig?.template)?.label}</span>
            </div>
            <div className="flex justify-between">
              <span>Format:</span>
              <span className="font-medium">{formatOptions?.find(f => f?.value === reportConfig?.format)?.label}</span>
            </div>
            <div className="flex justify-between">
              <span>Sections:</span>
              <span className="font-medium">{reportConfig?.sections?.length} selected</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated size:</span>
              <span className="font-medium">~{Math.max(reportConfig?.sections?.length * 2, 1)} MB</span>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Recent Reports</h4>
          <div className="space-y-2">
            {[
              { name: 'Executive Summary - August 2024', date: '2024-09-01', size: '2.4 MB', format: 'PDF' },
              { name: 'Operational Report - Q3 2024', date: '2024-08-28', size: '5.1 MB', format: 'Excel' },
              { name: 'Environmental Impact Analysis', date: '2024-08-25', size: '1.8 MB', format: 'PDF' }
            ]?.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="FileText" size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{report?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Generated on {report?.date} • {report?.size} • {report?.format}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  iconSize={14}
                  onClick={() => console.log('Download report:', report?.name)}
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;