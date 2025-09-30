import React from "react";
import SEO, { SITE_URL } from "../components/SEO";
import data from "../data/portfolio.json";

const today = new Date();
const effectiveDate = today.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

export default function TermsConditionsPage() {
  return (
    <>
      <SEO
        title="Terms & Conditions"
        description={`Terms & Conditions for ${data.name}`}
        canonical={`${SITE_URL}/terms`}
      />
      <div className="container mx-auto p-2 laptop:p-0 mt-10 laptop:mt-20">
        <div className="mx-auto w-full laptop:w-4/5 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl laptop:text-4xl font-bold mb-3">Terms & Conditions</h1>
            <p className="text-lg opacity-70">Effective Date: {effectiveDate}</p>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <p className="text-lg mb-2"><strong>Business Name:</strong> [Your Business Name]</p>
              <p className="text-lg"><strong>Website:</strong> [yourdomain.com]</p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-8">
                These Terms & Conditions ("Terms") govern your use of our website and services. By using our website or signing up for our services, you agree to these Terms. Please read them carefully.
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">1. Services</h2>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                    <p className="text-lg">
                      [Your Business Name] provides web design, web development, mobile app development, hosting, and related digital services. The scope of services will be outlined in a written agreement or proposal for each client project.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">2. Payments</h2>
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                      <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Websites (Monthly Plan)</h3>
                      <p>Clients agree to a <strong>12-month minimum contract</strong> at $175/month (or the agreed amount) billed automatically.</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                      <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Websites (One-Time Build)</h3>
                      <p>A lump-sum payment is required before project delivery, plus ongoing hosting fees as agreed.</p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                      <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Ecommerce & Apps</h3>
                      <p>Pricing is custom and will be agreed upon in a project proposal or quote.</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                      <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">Invoices & Late Payments</h3>
                      <p>Payment is due upon receipt unless otherwise stated. Late payments may result in suspension of services until resolved.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">3. Refund Policy</h2>
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                      <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Websites</h3>
                      <p>If we cannot deliver a design that meets your satisfaction, we offer a full refund before final approval.</p>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                      <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Hosting & Monthly Fees</h3>
                      <p>Hosting, monthly, or maintenance fees are non-refundable once service begins.</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                      <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">Custom Apps & Ecommerce</h3>
                      <p>Due to the complexity of these projects, all deposits are non-refundable after work has started.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">4. Client Responsibilities</h2>
                  <p className="mb-4">To ensure timely completion of projects, clients agree to:</p>
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-blue-500 text-xl mt-1">📋</div>
                      <p>Provide necessary content, images, and information in a timely manner</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="text-blue-500 text-xl mt-1">💬</div>
                      <p>Respond promptly to communication and approvals</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="text-blue-500 text-xl mt-1">⚖️</div>
                      <p>Maintain all necessary rights and permissions for content supplied</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">5. Intellectual Property</h2>
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <p><strong>Ownership:</strong> Completed websites and apps remain the property of [Your Business Name] until payment is received in full.</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                      <p><strong>Transfer:</strong> After final payment, ownership of the website's design, code, and content transfers to the client (excluding third-party software or licensed tools).</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                      <p><strong>Portfolio:</strong> [Your Business Name] reserves the right to showcase completed projects in our portfolio.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">6. Hosting & Maintenance</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-green-500 text-xl mt-1">✓</div>
                      <p>Hosting services include monitoring, updates, and technical support as outlined in your plan</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="text-orange-500 text-xl mt-1">⚠️</div>
                      <p>Clients are responsible for third-party costs (e.g., domain name, plugins, or software licenses)</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="text-blue-500 text-xl mt-1">💾</div>
                      <p>If hosting is canceled, we will provide a backup of your site upon request</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">7. Termination</h2>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                    <p>Either party may terminate the agreement with written notice if the other party breaches these Terms. Clients are responsible for all fees up to the termination date.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">8. Limitation of Liability</h2>
                  <p className="mb-4">While we take all reasonable steps to ensure reliable and secure services, [Your Business Name] is not liable for:</p>
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <p>Loss of data, revenue, or profits</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <p>Downtime due to third-party providers</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <p>Security breaches outside of our direct control</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">9. Changes to Terms</h2>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <p>We may update these Terms from time to time. Any updates will be posted on this page with a revised "Effective Date." Continued use of our services means you accept the updated Terms.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">10. Governing Law</h2>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                    <p>These Terms are governed by the laws of [Your State/Country]. Any disputes shall be resolved in the courts of [Your Location].</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">11. Contact Us</h2>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                    <p className="mb-4">For questions about these Terms, please contact us:</p>
                    <div className="space-y-2">
                      <p><strong>[Your Business Name]</strong></p>
                      <p>Email: [your email]</p>
                      <p>Phone: [your phone number]</p>
                      <p>Address: [your address]</p>
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
