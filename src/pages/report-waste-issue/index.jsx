import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import ReportForm from './components/ReportForm';
import RecentReports from './components/RecentReports';
import SuccessModal from './components/SuccessModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ReportWasteIssue = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(null);
  const [userReports, setUserReports] = useState([]);

  useEffect(() => {
    // Load user reports dari localStorage
    const savedReports = localStorage.getItem('userWasteReports');
    if (savedReports) {
      setUserReports(JSON.parse(savedReports));
    }
  }, []);

  const handleSubmitReport = async (reportData) => {
    setIsSubmitting(true);

    try {
      // Simulasi delay API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update list report
      const updatedReports = [reportData, ...userReports];
      setUserReports(updatedReports);

      // Simpan ke localStorage
      localStorage.setItem('userWasteReports', JSON.stringify(updatedReports));

      // Tampilkan modal sukses
      setSubmittedReport(reportData);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReport = (reportId) => {
    const updatedReports = userReports.filter((r) => r.id !== reportId);
    setUserReports(updatedReports);
    localStorage.setItem('userWasteReports', JSON.stringify(updatedReports));
  };

  const handleClearAllReports = () => {
    localStorage.removeItem('userWasteReports');
    setUserReports([]);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSubmittedReport(null);
  };

  

  return (
    <>
      <Helmet>
        <title>Laporkan Masalah Sampah - GresikResikPortal</title>
        <meta
          name="description"
          content="Report waste management issues in your community. Submit detailed reports with photos and location data to help keep our city clean."
        />
        <meta
          name="keywords"
          content="waste report, Pembuangan Ilegal, overflowing bins, community cleanup, environmental reporting"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <BreadcrumbTrail />

        <main className="pt-4 pb-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-error/10 rounded-lg">
                  <Icon name="AlertTriangle" size={24} className="text-error" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                    Laporkan Masalah Sampah
                  </h1>
                  <p className="text-muted-foreground">
                    Bantu jaga lingkungan tetap bersih dengan melaporkan masalah
                    pengelolaan sampah🌱.
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-card rounded-lg border border-border p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {userReports?.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Laporan
                  </div>
                </div>
                <div className="bg-card rounded-lg border border-border p-4 text-center">
                  <div className="text-2xl font-bold text-success">
                    {userReports?.filter((r) => r?.status === 'resolved')?.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Terselesaikan
                  </div>
                </div>
                <div className="bg-card rounded-lg border border-border p-4 text-center">
                  <div className="text-2xl font-bold text-secondary">
                    {userReports?.filter((r) => r?.status === 'in-progress')?.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Sedang Diproses
                  </div>
                </div>
                <div className="bg-card rounded-lg border border-border p-4 text-center">
                  <div className="text-2xl font-bold text-warning">
                    {userReports?.filter((r) => r?.status === 'pending')?.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Menunggu</div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Report Form */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Icon name="FileText" size={20} className="text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">
                      Submit New Report
                    </h2>
                  </div>

                  <ReportForm
                    onSubmit={handleSubmitReport}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>

              {/* Recent Reports Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <RecentReports
                    reports={userReports?.slice(0, 5)}
                    onDelete={handleDeleteReport}
                  />

                  {/* Button Clear All */}
                  {userReports?.length > 0 && (
                    <div className="mt-4">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleClearAllReports}
                      >
                        Hapus Semua Laporan
                      </Button>
                    </div>
                  )}

                  {/* Help Section */}
                  <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <Icon
                        name="HelpCircle"
                        size={16}
                        className="text-primary mt-0.5"
                      />
                      <div className="text-sm">
                        <p className="font-medium text-foreground mb-1">
                          Need Help?
                        </p>
                        <p className="text-muted-foreground mb-2">
                          Contact our support team for assistance with reporting
                          issues.
                        </p>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <p>📞 (555) 123-WASTE</p>
                          <p>📧 support@smartwaste.gov</p>
                          <p>🕒 Mon-Fri 8AM-6PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Success Modal */}
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleCloseSuccessModal}
          reportData={submittedReport}
        />
      </div>
    </>
  );
};

export default ReportWasteIssue;
