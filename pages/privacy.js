import React from "react";
import SEO, { SITE_URL } from "../components/SEO";
import data from "../data/portfolio.json";

const today = new Date();
const effectiveDate = today.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description={`Privacy Policy for ${data.name}`}
        canonical={`${SITE_URL}/privacy`}
      />
      <div className="container mx-auto p-2 laptop:p-0 mt-10 laptop:mt-20">
        <div className="mx-auto w-full laptop:w-4/5 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl laptop:text-4xl font-bold mb-3">Privacy Policy</h1>
            <p className="text-lg opacity-70">Effective Date: {effectiveDate}</p>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <p className="text-lg mb-2"><strong>Business Name:</strong> [Your Business Name]</p>
              <p className="text-lg"><strong>Website:</strong> [yourdomain.com]</p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-8">
                At [Your Business Name], we value your trust. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or use our services. By using our website, you agree to the practices described below.
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">1. Information We Collect</h2>
                  <p className="mb-4">We may collect the following types of information:</p>
                  <div className="space-y-3">
                    <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-4 border-l-4 border-blue-500">
                      <p><strong>Personal Information:</strong> Name, email address, phone number, and business details that you provide when contacting us, requesting a quote, or signing up for services.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-4 border-l-4 border-green-500">
                      <p><strong>Payment Information:</strong> Billing address and payment details when you purchase services (processed securely through third-party providers).</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-4 border-l-4 border-purple-500">
                      <p><strong>Technical Information:</strong> IP address, browser type, operating system, and device details collected automatically when you use our website.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-4 border-l-4 border-orange-500">
                      <p><strong>Usage Data:</strong> Pages visited, time spent on our site, and other analytical information (via tools like Google Analytics).</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">2. How We Use Your Information</h2>
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-green-500 text-xl mt-1">✓</div>
                      <p>Provide, maintain, and improve our services</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="text-green-500 text-xl mt-1">✓</div>
                      <p>Communicate about projects and updates</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="text-green-500 text-xl mt-1">✓</div>
                      <p>Process payments and manage billing</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="text-green-500 text-xl mt-1">✓</div>
                      <p>Personalize your website experience</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="text-green-500 text-xl mt-1">✓</div>
                      <p>Ensure website security and prevent fraud</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="text-green-500 text-xl mt-1">✓</div>
                      <p>Comply with legal obligations</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">3. Sharing Your Information</h2>
                  <p className="mb-4">We do not sell or rent your personal information. We may share your data only in the following cases:</p>
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Service Providers</h3>
                      <p>With trusted third parties (such as hosting providers, payment processors, or analytics tools) who help us operate our business.</p>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                      <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Legal Requirements</h3>
                      <p>If required by law or in response to valid legal requests.</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                      <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Business Transfers</h3>
                      <p>In case of a merger, acquisition, or sale of assets, your information may be transferred.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">4. Data Security</h2>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                    <p>We take data protection seriously. Our websites are built on secure frameworks and hosted with reliable providers. While no system is 100% secure, we use appropriate measures (such as SSL encryption and regular security monitoring) to safeguard your information.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">5. Cookies & Tracking</h2>
                  <p className="mb-4">Our website uses cookies and similar tracking technologies to:</p>
                  <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                      <div className="text-2xl mb-2">🎯</div>
                      <p className="font-medium">Improve user experience</p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                      <div className="text-2xl mb-2">📊</div>
                      <p className="font-medium">Analyze website traffic</p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                      <div className="text-2xl mb-2">⚙️</div>
                      <p className="font-medium">Remember preferences</p>
                    </div>
                  </div>
                  <p className="text-sm opacity-80">You can disable cookies in your browser settings, but some features may not function properly without them.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">6. Your Rights</h2>
                  <p className="mb-4">Depending on where you live, you may have the right to:</p>
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p>Access, update, or delete your personal information</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p>Request a copy of the data we hold about you</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p>Opt out of marketing communications</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p>Restrict or object to how we process your data</p>
                    </div>
                  </div>
                  <p className="text-sm opacity-80">To exercise your rights, contact us at [insert email address].</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">7. Third-Party Links</h2>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                    <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their policies separately.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">8. Children's Privacy</h2>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                    <p>Our services are not directed toward children under 13. We do not knowingly collect personal data from children. If you believe a child has provided us with personal information, please contact us immediately.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">9. Changes to This Policy</h2>
                  <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised "Effective Date." We encourage you to review this page periodically.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">10. Contact Us</h2>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                    <p className="mb-4">If you have any questions or concerns about this Privacy Policy, please reach out to us:</p>
                    <div className="space-y-2">
                      <p><strong>[Your Business Name]</strong></p>
                      <p>Email: [your email]</p>
                      <p>Phone: [your phone number]</p>
                      <p>Address: [your business address]</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


