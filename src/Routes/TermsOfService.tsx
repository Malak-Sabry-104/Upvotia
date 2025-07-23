import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="animate-on-scroll section-gradient-bottom-right min-h-screen pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="bg-black/20 rounded-3xl p-8 md:p-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <div className="space-y-8 text-gray-200">
            <div className="border-l-4 border-blue-400 pl-6">
              <p className="text-sm text-gray-400 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              <p className="text-lg leading-relaxed">
                Welcome to Upvotia! These Terms of Service ("Terms") govern your use of our platform where ideas meet code. 
                By using Upvotia, you agree to be bound by these terms.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing or using Upvotia, you agree to comply with and be bound by these Terms of Service and our Privacy Policy. 
                If you do not agree with any part of these terms, you may not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Platform Description</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Upvotia is a community-driven platform that connects users who have ideas for software improvements with 
                developers who can implement those ideas. Our platform facilitates:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Submission of feature requests and improvement ideas ("Wishes")</li>
                <li>Developer project submissions and showcases</li>
                <li>Community voting and engagement through upvotes</li>
                <li>Financial backing and crowdfunding through "Boosts"</li>
                <li>Collaboration between users and developers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">User Accounts</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">Account Creation</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>You must provide accurate and complete information when creating an account</li>
                    <li>You are responsible for maintaining the security of your account credentials</li>
                    <li>You must be at least 13 years old to create an account</li>
                    <li>One person may not maintain more than one account</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Account Types</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li><strong>Users:</strong> Can submit wishes, upvote content, and provide financial backing</li>
                    <li><strong>Developers:</strong> Can submit projects, respond to wishes, and showcase their work</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">Account Termination</h3>
                  <p className="text-gray-300">
                    We reserve the right to suspend or terminate accounts that violate these terms or engage in harmful behavior.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Content Guidelines</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">Acceptable Content</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Original ideas and constructive feature requests</li>
                    <li>Legitimate software projects and implementations</li>
                    <li>Respectful comments and community interactions</li>
                    <li>Accurate project information and progress updates</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">Prohibited Content</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Spam, duplicate, or low-quality submissions</li>
                    <li>Harmful, offensive, or discriminatory content</li>
                    <li>Copyright infringement or intellectual property violations</li>
                    <li>Malicious software or security vulnerabilities</li>
                    <li>False or misleading information about projects</li>
                    <li>Content that violates applicable laws or regulations</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Financial Transactions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">Boost System</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Users can provide financial backing ("Boosts") to wishes and projects</li>
                    <li>All financial transactions are processed through secure third-party payment providers</li>
                    <li>Boosts are considered donations and are generally non-refundable</li>
                    <li>Upvotia may charge a platform fee on transactions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">Developer Compensation</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Developers may receive boost funding for their projects</li>
                    <li>Payment processing and distribution are subject to our payment terms</li>
                    <li>Tax obligations are the responsibility of the recipient</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Intellectual Property</h2>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  By submitting content to Upvotia, you grant us a non-exclusive, worldwide, royalty-free license to 
                  use, display, and distribute your content on our platform.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>You retain ownership of your original content and ideas</li>
                  <li>You are responsible for ensuring you have rights to any content you submit</li>
                  <li>Upvotia respects intellectual property rights and will respond to valid DMCA notices</li>
                  <li>Users may not copy or redistribute platform content without permission</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">User Conduct</h2>
              <p className="text-gray-300 mb-4">Users agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Use the platform respectfully and constructively</li>
                <li>Provide accurate information about projects and progress</li>
                <li>Respect other users' intellectual property and privacy</li>
                <li>Follow community guidelines and moderation decisions</li>
                <li>Report violations of these terms to our moderation team</li>
              </ul>
              
              <p className="text-gray-300 mt-4 mb-2">Users agree NOT to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Engage in harassment, bullying, or discriminatory behavior</li>
                <li>Attempt to manipulate voting or boost systems</li>
                <li>Create fake accounts or impersonate others</li>
                <li>Interfere with platform operations or security</li>
                <li>Use automated tools to scrape or abuse the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Platform Availability</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>We strive to maintain platform availability but cannot guarantee 100% uptime</li>
                <li>We may perform maintenance that temporarily affects service availability</li>
                <li>We reserve the right to modify or discontinue features with reasonable notice</li>
                <li>Emergency maintenance may occur without advance notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Disclaimers</h2>
              <div className="bg-yellow-500/10 rounded-lg p-6 border border-yellow-500/20">
                <p className="text-gray-300 leading-relaxed mb-4">
                  Upvotia is provided "as is" without warranties of any kind. We disclaim all warranties, 
                  express or implied, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Merchantability and fitness for a particular purpose</li>
                  <li>Accuracy, completeness, or reliability of user-generated content</li>
                  <li>Successful completion of projects or implementation of ideas</li>
                  <li>Security or privacy of data transmission</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                To the maximum extent permitted by law, Upvotia shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, including but not limited to loss of profits, data, 
                or business opportunities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Dispute Resolution</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>We encourage users to resolve disputes amicably through our support system</li>
                <li>Binding arbitration may be required for certain disputes</li>
                <li>Class action lawsuits are waived where legally permissible</li>
                <li>Applicable law and jurisdiction will be determined based on user location</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update these Terms of Service from time to time. Material changes will be communicated 
                through the platform or via email. Continued use of Upvotia after changes constitutes acceptance 
                of the updated terms.
              </p>
            </section>

            <section className="bg-blue-400/10 rounded-lg p-6 border border-blue-400/20">
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Contact Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-300">
                <p><strong>Email:</strong> legal@upvotia.com</p>
                <p><strong>Address:</strong> Upvotia Legal Department, 123 Innovation Street, Tech City, TC 12345</p>
                <p><strong>Business Hours:</strong> Monday-Friday, 9:00 AM - 5:00 PM PST</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 