import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Yappaflow",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* Atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSI0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Nav */}
      <div className="relative z-10 px-6 py-6">
        <a href="/" className="font-heading text-lg uppercase tracking-tight text-white hover:text-brand-orange transition-colors">
          Yappaflow
        </a>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pb-32">
        <h1 className="font-heading text-4xl sm:text-5xl uppercase tracking-tight mb-4">
          Privacy <span className="text-brand-orange">Policy</span>
        </h1>
        <p className="text-xs text-white/25 mb-12">Last updated: April 15, 2026</p>

        <div className="space-y-10 text-sm text-white/50 leading-relaxed">
          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">1. Information We Collect</h2>
            <p>When you use Yappaflow, we collect the following information:</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li><strong className="text-white/70">Account information:</strong> Phone number, name, and email address provided during registration.</li>
              <li><strong className="text-white/70">Platform data:</strong> WhatsApp and Instagram messages, contact names, and conversation metadata that you authorize us to access through Meta&apos;s APIs.</li>
              <li><strong className="text-white/70">Usage data:</strong> Pages viewed, features used, and interactions within the dashboard.</li>
              <li><strong className="text-white/70">Device information:</strong> Browser type, IP address, and device identifiers for security and analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>To provide and maintain the Yappaflow platform and its features.</li>
              <li>To display your WhatsApp and Instagram messages in your dashboard.</li>
              <li>To send messages on your behalf through connected platforms.</li>
              <li>To improve our services and develop new features.</li>
              <li>To communicate with you about your account and service updates.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">3. Data from Meta Platforms</h2>
            <p>
              Yappaflow accesses your WhatsApp and Instagram data only with the permissions you grant during login.
              We use Meta&apos;s official APIs (WhatsApp Cloud API and Instagram Graph API) to retrieve and send messages.
              We do not sell, share, or use your Meta platform data for advertising purposes.
              You can revoke access at any time from Settings &rarr; Platforms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">4. Data Storage and Security</h2>
            <p>
              Your data is stored on encrypted servers hosted by trusted cloud providers.
              We use industry-standard security measures including TLS encryption in transit, encrypted databases at rest,
              and access controls to protect your information. We retain your data only as long as your account is active
              or as needed to provide services.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">5. Data Sharing</h2>
            <p>We do not sell your personal information. We may share data only in the following cases:</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>With service providers who help us operate the platform (hosting, analytics).</li>
              <li>When required by law or to protect our legal rights.</li>
              <li>With your explicit consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>Access and download your personal data.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your account and associated data.</li>
              <li>Disconnect platform integrations at any time.</li>
              <li>Withdraw consent for data processing.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">7. Data Deletion</h2>
            <p>
              You can request deletion of your data at any time by contacting us at{" "}
              <a href="mailto:privacy@yappaflow.com" className="text-brand-orange hover:underline">privacy@yappaflow.com</a>.
              Upon request, we will delete your account and all associated data within 30 days,
              unless retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">8. Cookies</h2>
            <p>
              We use essential cookies to maintain your session and authentication state.
              We do not use third-party advertising cookies. Analytics cookies are used only to
              improve the platform experience and can be disabled in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of significant changes
              via email or an in-app notification. Continued use of Yappaflow after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">10. Contact Us</h2>
            <p>
              If you have questions about this privacy policy or your data, contact us at:{" "}
              <a href="mailto:privacy@yappaflow.com" className="text-brand-orange hover:underline">privacy@yappaflow.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
