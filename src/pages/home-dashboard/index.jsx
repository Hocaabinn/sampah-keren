import React from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import HeroSection from './components/HeroSection';
import QuickAccessGrid from './components/QuickAccessGrid';
import CallToActionCard from './components/CallToActionCard';
import PersonalizedContent from './components/PersonalizedContent';
import Icon from '../../components/AppIcon';


const HomeDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <NavigationHeader />
      {/* Breadcrumb */}
      <div className="pt-16">
        <BreadcrumbTrail />
      </div>
      {/* Main Content */}
      <main className="pb-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Quick Access Grid */}
        <QuickAccessGrid />

        {/* Call to Action */}
        <CallToActionCard />

        {/* Personalized Content */}
        <PersonalizedContent />
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border px-4 lg:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Icon name="Recycle" size={16} color="white" strokeWidth={2.5} />
                </div>
                <span className="font-semibold text-foreground">SmartWaste</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Making waste management smarter for a cleaner, greener city.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/report-waste-issue" className="hover:text-foreground transition-colors">Report Issue</a></li>
                <li><a href="/request-pickup-service" className="hover:text-foreground transition-colors">Request Pickup</a></li>
                <li><a href="/waste-education-hub" className="hover:text-foreground transition-colors">Education Hub</a></li>
                <li><a href="/user-profile-settings" className="hover:text-foreground transition-colors">Profile</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Guidelines</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={14} color="currentColor" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={14} color="currentColor" />
                  <span>support@gresikresik.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={14} color="currentColor" />
                  <span>City Hall, Main St</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} GresikResik. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Facebook" size={18} color="currentColor" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Twitter" size={18} color="currentColor" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Instagram" size={18} color="currentColor" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeDashboard;