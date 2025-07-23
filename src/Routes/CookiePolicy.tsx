import React from 'react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="animate-on-scroll section-gradient-top-left min-h-screen pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="bg-black/20 rounded-3xl p-8 md:p-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          
          <div className="space-y-8 text-gray-200">
            <div className="border-l-4 border-purple-400 pl-6">
              <p className="text-sm text-gray-400 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              <p className="text-lg leading-relaxed">
                This Cookie Policy explains how Upvotia uses cookies and similar technologies to enhance your browsing 
                experience, analyze platform usage, and provide personalized features.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">What Are Cookies?</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Cookies are small text files that are stored on your device when you visit a website. They help websites 
                remember your preferences, login status, and other information to improve your user experience.
              </p>
              <div className="bg-purple-400/10 rounded-lg p-4 border border-purple-400/20">
                <p className="text-gray-300">
                  <strong>Note:</strong> Cookies cannot access, read, or modify any other data on your computer. 
                  They are simply text files that contain information about your interaction with our website.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-800/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3 text-green-400">Essential Cookies</h3>
                  <p className="text-gray-300 mb-3">
                    These cookies are necessary for the basic functionality of Upvotia and cannot be disabled.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li><strong>Authentication:</strong> Remember your login status and user session</li>
                    <li><strong>Security:</strong> Protect against CSRF attacks and maintain secure connections</li>
                    <li><strong>Form Data:</strong> Temporarily store form information to prevent data loss</li>
                    <li><strong>Site Preferences:</strong> Remember your language and accessibility settings</li>
                  </ul>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">Functional Cookies</h3>
                  <p className="text-gray-300 mb-3">
                    These cookies enhance your user experience by remembering your preferences and choices.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li><strong>User Preferences:</strong> Remember your filter settings and display preferences</li>
                    <li><strong>Theme Settings:</strong> Store your preferred color scheme and layout options</li>
                    <li><strong>Recently Viewed:</strong> Keep track of recently viewed wishes and projects</li>
                    <li><strong>Notification Preferences:</strong> Remember your notification and email settings</li>
                  </ul>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3 text-yellow-400">Analytics Cookies</h3>
                  <p className="text-gray-300 mb-3">
                    These cookies help us understand how users interact with Upvotia to improve our platform.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li><strong>Usage Analytics:</strong> Track page views, session duration, and user journeys</li>
                    <li><strong>Feature Usage:</strong> Monitor which features are most popular and effective</li>
                    <li><strong>Error Tracking:</strong> Identify and fix technical issues and bugs</li>
                    <li><strong>Performance Metrics:</strong> Measure page load times and optimization opportunities</li>
                  </ul>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3 text-red-400">Marketing Cookies</h3>
                  <p className="text-gray-300 mb-3">
                    These cookies are used to deliver relevant advertisements and measure their effectiveness.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li><strong>Targeted Advertising:</strong> Show relevant ads based on your interests</li>
                    <li><strong>Social Media Integration:</strong> Enable sharing and social media features</li>
                    <li><strong>Campaign Tracking:</strong> Measure the effectiveness of marketing campaigns</li>
                    <li><strong>Retargeting:</strong> Show relevant content to returning visitors</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Third-Party Cookies</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may use third-party services that set their own cookies. These services include:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800/20 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Analytics Services</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Google Analytics</li>
                    <li>• Mixpanel</li>
                    <li>• Hotjar</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/20 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Payment Processing</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Stripe</li>
                    <li>• PayPal</li>
                    <li>• Payment security providers</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/20 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Social Media</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• GitHub OAuth</li>
                    <li>• Google OAuth</li>
                    <li>• Social sharing widgets</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/20 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Support Services</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Customer support chat</li>
                    <li>• Error reporting tools</li>
                    <li>• CDN services</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Cookie Management</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Browser Settings</h3>
                  <p className="text-gray-300 mb-3">
                    You can control cookies through your browser settings. Most browsers allow you to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>View and delete cookies stored on your device</li>
                    <li>Block cookies from specific websites</li>
                    <li>Block third-party cookies entirely</li>
                    <li>Clear all cookies when you close the browser</li>
                    <li>Receive notifications when cookies are being set</li>
                  </ul>
                </div>

                <div className="bg-orange-500/10 rounded-lg p-6 border border-orange-500/20">
                  <h3 className="text-xl font-semibold mb-3 text-orange-400">Impact of Disabling Cookies</h3>
                  <p className="text-gray-300 mb-3">
                    Please note that disabling certain cookies may affect your experience on Upvotia:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>You may need to log in repeatedly</li>
                    <li>Your preferences and settings may not be saved</li>
                    <li>Some features may not work properly</li>
                    <li>You may see less relevant content and advertisements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Opt-Out Options</h3>
                  <p className="text-gray-300 mb-3">
                    For specific types of cookies, you can opt out through these methods:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li><strong>Analytics:</strong> Use Google Analytics Opt-out Browser Add-on</li>
                    <li><strong>Advertising:</strong> Visit the Network Advertising Initiative opt-out page</li>
                    <li><strong>Social Media:</strong> Adjust privacy settings in your social media accounts</li>
                    <li><strong>Platform Settings:</strong> Use our cookie preference center (coming soon)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Cookie Retention</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Session Cookies</h3>
                  <p className="text-gray-300 text-sm">
                    Temporary cookies that are deleted when you close your browser. Used for essential functions 
                    like maintaining your login session.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Persistent Cookies</h3>
                  <p className="text-gray-300 text-sm">
                    Stored on your device for a specific period (typically 30 days to 2 years) or until you 
                    manually delete them. Used for preferences and analytics.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Mobile Apps and Local Storage</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                In addition to cookies, our mobile applications and web platform may use other technologies:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong>Local Storage:</strong> Store data locally in your browser for offline functionality</li>
                <li><strong>Session Storage:</strong> Temporary storage that's cleared when you close the tab</li>
                <li><strong>IndexedDB:</strong> Browser database for storing larger amounts of structured data</li>
                <li><strong>Web Beacons:</strong> Small images that help track email opens and page views</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Updates to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Cookie Policy to reflect changes in our practices or applicable laws. 
                When we make material changes, we will notify you by updating the "Last updated" date and 
                may provide additional notice through the platform or email.
              </p>
            </section>

            <section className="bg-purple-400/10 rounded-lg p-6 border border-purple-400/20">
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Questions About Cookies?</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have questions about our use of cookies or this policy, please contact us:
              </p>
              <div className="space-y-2 text-gray-300">
                <p><strong>Email:</strong> cookies@upvotia.com</p>
                <p><strong>Privacy Team:</strong> privacy@upvotia.com</p>
                <p><strong>Response Time:</strong> We typically respond within 48 hours</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Useful Resources</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Learn More About Cookies</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <a href="https://allaboutcookies.org" className="hover:text-purple-400">All About Cookies</a></li>
                    <li>• <a href="https://cookiepedia.co.uk" className="hover:text-purple-400">Cookiepedia</a></li>
                    <li>• <a href="https://ico.org.uk/for-the-public/online/cookies/" className="hover:text-purple-400">ICO Cookie Guide</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Browser Cookie Settings</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <a href="https://support.google.com/chrome/answer/95647" className="hover:text-purple-400">Chrome</a></li>
                    <li>• <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="hover:text-purple-400">Firefox</a></li>
                    <li>• <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="hover:text-purple-400">Safari</a></li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy; 