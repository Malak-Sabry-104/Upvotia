import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="animate-on-scroll section-gradient-top-left min-h-screen pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="bg-black/20 rounded-3xl p-8 md:p-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <div className="space-y-8 text-gray-200">
            <div className="border-l-4 border-green-400 pl-6">
              <p className="text-sm text-gray-400 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              <p className="text-lg leading-relaxed">
                At Upvotia, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-green-400">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Username and email address when you create an account</li>
                    <li>Profile information including bio, avatar, and social media links</li>
                    <li>User type designation (regular user or developer)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Content Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Wishes, projects, and comments you submit to the platform</li>
                    <li>Images and files you upload</li>
                    <li>Upvotes and interactions with other users' content</li>
                    <li>Financial contributions and boost amounts</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">Technical Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>IP address and browser information</li>
                    <li>Device type and operating system</li>
                    <li>Usage patterns and interaction data</li>
                    <li>Cookies and local storage data</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-green-400">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Provide and maintain the Upvotia platform</li>
                <li>Enable user authentication and account management</li>
                <li>Display your content and facilitate community interactions</li>
                <li>Process financial transactions and boost payments</li>
                <li>Send important notifications about your account or platform updates</li>
                <li>Improve our services and develop new features</li>
                <li>Ensure platform security and prevent abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-green-400">Information Sharing</h2>
              <div className="space-y-4">
                <p className="text-gray-300">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations or court orders</li>
                  <li>To protect the rights, property, or safety of Upvotia, our users, or others</li>
                  <li>In connection with a business transaction (merger, acquisition, etc.)</li>
                  <li>With service providers who assist in platform operations (under strict confidentiality agreements)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-green-400">Data Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We implement industry-standard security measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 mt-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication using JWT tokens</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and monitoring systems</li>
                <li>Secure data backup and recovery procedures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-green-400">Your Rights</h2>
              <p className="text-gray-300 mb-4">You have the following rights regarding your personal data:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to certain processing of your data</li>
                <li><strong>Restriction:</strong> Request limitation of data processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-green-400">Cookies and Tracking</h2>
              <p className="text-gray-300 leading-relaxed">
                We use cookies and similar technologies to enhance your experience on Upvotia. These include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 mt-4">
                <li>Essential cookies for authentication and security</li>
                <li>Functional cookies to remember your preferences</li>
                <li>Analytics cookies to understand platform usage</li>
                <li>Performance cookies to optimize loading times</li>
              </ul>
              <p className="text-gray-300 mt-4">
                You can manage cookie preferences through your browser settings or our cookie policy page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-green-400">Children's Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Upvotia is not intended for children under 13 years of age. We do not knowingly collect personal 
                information from children under 13. If you believe we have inadvertently collected such information, 
                please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-green-400">International Users</h2>
              <p className="text-gray-300 leading-relaxed">
                Upvotia operates globally. By using our platform, you consent to the transfer and processing of 
                your information in countries where we operate, which may have different data protection laws 
                than your country of residence.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-green-400">Changes to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes 
                by posting the new policy on this page and updating the "Last updated" date. We encourage you to 
                review this policy periodically.
              </p>
            </section>

            <section className="bg-green-400/10 rounded-lg p-6 border border-green-400/20">
              <h2 className="text-2xl font-semibold mb-4 text-green-400">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-300">
                <p><strong>Email:</strong> privacy@upvotia.com</p>
                <p><strong>Address:</strong> Upvotia Privacy Team, 123 Innovation Street, Tech City, TC 12345</p>
                <p><strong>Response Time:</strong> We aim to respond to all privacy inquiries within 72 hours</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 