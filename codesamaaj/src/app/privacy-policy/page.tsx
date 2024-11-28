import React from 'react';
import { Mail, Phone } from 'lucide-react';

interface SectionProps {
    title: string;
    children: React.ReactNode;
  }
  
function Section({ title, children }: SectionProps) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
        <div className="text-gray-700 space-y-2">{children}</div>
      </div>
    );
}


interface ListItemProps {
    children: React.ReactNode;
  }
  
function ListItem({ children }: ListItemProps) {
    return (
      <li className="flex items-start space-x-2">
        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-500 flex-shrink-0" />
        <span>{children}</span>
      </li>
    );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12 bg-white shadow-sm">
        <div className="border-b pb-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600 mt-2">Effective Date: 28/11/2024</p>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 mb-8">
            Code Samaaj ("we," "our" or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your information when you access our platform (the "Platform") for listing or participating in bootcamps, workshops, and related activities. By using our Platform, you agree to the terms of this Privacy Policy. If you do not agree, please refrain from using the Platform.
          </p>

          <Section title="1. Information We Collect">
            <h3 className="text-lg font-medium text-gray-900 mb-2">a. Personal Information</h3>
            <ul className="list-none space-y-2 mb-4">
              <ListItem>For Bootcamp Organizers: Name, email address, phone number, company/institution details, and payment information.</ListItem>
              <ListItem>For Participants: Name, email address, phone number, educational background, and payment details (if applicable).</ListItem>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mb-2">b. Non-Personal Information</h3>
            <ul className="list-none space-y-2">
              <ListItem>Device information, browser type, operating system, and IP address.</ListItem>
              <ListItem>Usage data, such as pages viewed, clicks, and time spent on the Platform.</ListItem>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <ul className="list-none space-y-2">
              <ListItem>Facilitate registration and participation in bootcamps or workshops.</ListItem>
              <ListItem>Enable organizers to list and manage their events.</ListItem>
              <ListItem>Communicate important updates, such as event reminders and confirmations.</ListItem>
              <ListItem>Process payments securely.</ListItem>
              <ListItem>Improve the functionality and user experience of the Platform.</ListItem>
              <ListItem>Comply with legal obligations.</ListItem>
            </ul>
          </Section>

          <Section title="3. How We Share Your Information">
            <p className="mb-4">We do not sell your personal information. However, we may share it in the following circumstances:</p>
            <ul className="list-none space-y-2">
              <ListItem>With Organizers: To provide participant details for registered events.</ListItem>
              <ListItem>With Service Providers: Payment processors, hosting services, and analytics providers who help us operate the Platform.</ListItem>
              <ListItem>For Legal Compliance: If required by law, regulation, or court order.</ListItem>
            </ul>
          </Section>

          <Section title="4. Data Security">
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or misuse. However, no system is completely secure, and we cannot guarantee absolute security.</p>
          </Section>

          <Section title="5. Cookies and Tracking Technologies">
            <p>We use cookies and similar technologies to enhance your experience on the Platform. These cookies may collect information about your usage patterns for analytics and personalization purposes. You can control cookie settings through your browser preferences.</p>
          </Section>

          <Section title="6. Your Rights">
            <p className="mb-4">Depending on your jurisdiction, you may have the following rights:</p>
            <ul className="list-none space-y-2">
              <ListItem>Access, correct, or delete your personal information.</ListItem>
              <ListItem>Object to or restrict certain processing activities.</ListItem>
              <ListItem>Withdraw consent for data processing.</ListItem>
            </ul>
            <p className="mt-4">To exercise these rights, please get in touch with us at codesamaaj@gmail.com</p>
          </Section>

          <Section title="7. Third-Party Links">
            <p>Our Platform may contain links to third-party websites or services. We are not responsible for their privacy practices, and we encourage you to review their privacy policies before providing any information.</p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>Our Platform is not intended for individuals under 13 years of age. We do not knowingly collect personal information from children.</p>
          </Section>

          <Section title="9. Changes to This Privacy Policy">
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date.</p>
          </Section>

          <Section title="10. Contact Us">
            <p className="mb-4">If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Code Samaaj</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <Mail className="w-5 h-5 mr-2" />
                  <a href="mailto:codesamaaj@gmail.com" className="hover:text-gray-900">codesamaaj@gmail.com</a>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="w-5 h-5 mr-2" />
                  <a href="tel:8861691501" className="hover:text-gray-900">8861691501</a>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}