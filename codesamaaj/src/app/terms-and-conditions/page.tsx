import React from 'react';
// import { Section } from './Section';
// import { ListItem } from './ListItem';
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
  
export function ListItem({ children }: ListItemProps) {
    return (
      <li className="flex items-start space-x-2">
        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-500 flex-shrink-0" />
        <span>{children}</span>
      </li>
    );
}

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12 bg-white shadow-sm">
        <div className="border-b pb-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
          <p className="text-gray-600 mt-2">Effective Date: 28/11/2024</p>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 mb-8">
            Welcome to Code Samaaj! These Terms and Conditions ("Terms") govern your access to and use of our platform (the "Platform") for listing and participating in bootcamps, workshops, and other activities. By accessing or using the Platform, you agree to comply with these Terms. If you do not agree, please refrain from using the Platform. The Admin/Owner of the Code Samaaj community is Abhishek P Nair.
          </p>

          <Section title="1. Use of the Platform">
            <ul className="list-none space-y-2">
              <ListItem>Code Samaaj is a community of developers.</ListItem>
              <ListItem>By using the Platform, you agree to provide accurate and up-to-date information during registration.</ListItem>
              <ListItem>Any misuse of the Platform, including providing false information or engaging in unauthorized activities, may result in account suspension or termination.</ListItem>
            </ul>
          </Section>

          <Section title="2. Event Listings and Participation">
            <ul className="list-none space-y-2">
              <ListItem>Organizers are responsible for providing accurate details about their events, including dates, times, and content.</ListItem>
              <ListItem>Participants must adhere to the rules and guidelines set by the event organizers during the bootcamp or workshop.</ListItem>
            </ul>
          </Section>

          <Section title="3. Payments and Refund Policy">
            <h3 className="text-lg font-medium text-gray-900 mb-2">a. Payments</h3>
            <ul className="list-none space-y-2 mb-4">
              <ListItem>Payments for events must be made through the Platform's authorized payment gateway.</ListItem>
              <ListItem>All transactions are subject to our third-party payment processor's terms and conditions.</ListItem>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mb-2">b. Refund Policy</h3>
            <ul className="list-none space-y-2">
              <ListItem>Refunds can only be initiated if there is a valid and appropriate reason for the request.</ListItem>
              <ListItem>Refund requests must be made at least 3 days before the start date of the bootcamp.</ListItem>
              <ListItem>Approved refunds will be processed to the original payment method within 7-14 working days.</ListItem>
            </ul>
          </Section>

          <Section title="4. Code of Conduct">
            <p className="mb-4">To maintain a safe and respectful community, all users agree to:</p>
            <ul className="list-none space-y-2">
              <ListItem>Treat others with respect and professionalism.</ListItem>
              <ListItem>Avoid inappropriate behavior, including harassment, discrimination, or disruptive activities.</ListItem>
              <ListItem>Refrain from sharing or distributing unauthorized or pirated content from any bootcamp.</ListItem>
            </ul>
          </Section>

          <Section title="5. Intellectual Property">
            <ul className="list-none space-y-2">
              <ListItem>All content provided by Code Samaaj, including logos, text, and materials, is the property of Code Samaaj or the respective event organizers.</ListItem>
              <ListItem>Users may not copy, distribute, or use this content without prior written permission.</ListItem>
            </ul>
          </Section>

          <Section title="6. Limitation of Liability">
            <ul className="list-none space-y-2">
              <ListItem>Code Samaaj and its Admin, Abhishek P Nair, are not liable for any loss, damage, or inconvenience caused by errors, cancellations, or changes in event schedules.</ListItem>
              <ListItem>Users participate in events at their own risk, and Code Samaaj is not responsible for any issues arising from third-party services or interactions.</ListItem>
            </ul>
          </Section>

          <Section title="7. Termination">
            <p>We reserve the right to terminate or suspend access to the Platform for users who violate these Terms or engage in activities that harm the community or its members.</p>
          </Section>

          <Section title="8. Changes to Terms">
            <p>Code Samaaj may update these Terms from time to time. Changes will be effective immediately upon posting, and your continued use of the Platform constitutes acceptance of the revised Terms.</p>
          </Section>

          <Section title="9. Contact Us">
            <p className="mb-4">If you have questions or concerns about these Terms, please contact us at:</p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Code Samaaj</h3>
              <p className="text-gray-700 mb-2">Admin: Abhishek P Nair</p>
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