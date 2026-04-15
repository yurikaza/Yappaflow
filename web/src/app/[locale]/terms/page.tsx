import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Yappaflow",
};

export default function TermsPage() {
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
          Terms of <span className="text-brand-orange">Service</span>
        </h1>
        <p className="text-xs text-white/25 mb-12">Last updated: April 15, 2026</p>

        <div className="space-y-10 text-sm text-white/50 leading-relaxed">
          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Yappaflow (&quot;the Service&quot;), you agree to be bound by these Terms of Service.
              If you do not agree to these terms, do not use the Service. These terms apply to all users,
              including agencies, team members, and visitors.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">2. Description of Service</h2>
            <p>
              Yappaflow is a platform that helps digital agencies manage client communications across
              WhatsApp and Instagram, generate websites using AI, and deploy projects. The Service
              integrates with third-party platforms including Meta (WhatsApp and Instagram) via their
              official APIs.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">3. Account Registration</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>You must provide accurate and complete information when creating an account.</li>
              <li>You are responsible for maintaining the security of your account credentials.</li>
              <li>You must be at least 18 years old to use the Service.</li>
              <li>One person or entity may not maintain more than one account.</li>
              <li>You are responsible for all activity that occurs under your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>Use the Service for spam, unsolicited messaging, or any form of abuse.</li>
              <li>Violate any applicable laws or regulations, including data protection laws.</li>
              <li>Send messages that violate Meta&apos;s Platform Terms or WhatsApp Business Policy.</li>
              <li>Attempt to gain unauthorized access to the Service or its related systems.</li>
              <li>Use the Service to collect, store, or process sensitive personal data without proper consent.</li>
              <li>Interfere with or disrupt the integrity or performance of the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">5. Third-Party Integrations</h2>
            <p>
              The Service integrates with Meta platforms (WhatsApp and Instagram). Your use of these
              integrations is subject to Meta&apos;s terms and policies. Yappaflow is not responsible for
              changes to third-party APIs, service interruptions, or policy changes by Meta or other
              integrated platforms. We will make reasonable efforts to maintain integrations but cannot
              guarantee uninterrupted access.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">6. Intellectual Property</h2>
            <p>
              The Service, including its design, code, and branding, is owned by Yappaflow and protected
              by intellectual property laws. You retain ownership of your content (messages, projects, assets)
              uploaded to or created through the Service. By using the Service, you grant us a limited license
              to process your content solely to provide the Service.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">7. Payment and Billing</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Paid plans are billed monthly or annually as selected during signup.</li>
              <li>All fees are non-refundable except as described in our 30-day money-back guarantee.</li>
              <li>We reserve the right to change pricing with 30 days&apos; notice.</li>
              <li>Failure to pay may result in suspension or termination of your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">8. Termination</h2>
            <p>
              You may terminate your account at any time from your account settings. We may suspend or
              terminate your account if you violate these terms, fail to pay fees, or engage in activity
              that harms other users or the Service. Upon termination, your right to use the Service
              ceases immediately. We will retain your data for 30 days after termination, after which
              it will be permanently deleted.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Yappaflow shall not be liable for any indirect,
              incidental, special, or consequential damages arising out of or related to your use of
              the Service. Our total liability for any claims arising from these terms shall not exceed
              the amount you paid us in the 12 months prior to the claim.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">10. Disclaimer of Warranties</h2>
            <p>
              The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either
              express or implied. We do not guarantee that the Service will be uninterrupted, error-free,
              or secure. We do not warrant the accuracy or completeness of any information provided
              through the Service.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of material
              changes via email or in-app notification at least 15 days before they take effect.
              Continued use of the Service after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg uppercase tracking-tight text-white mb-3">12. Contact</h2>
            <p>
              For questions about these terms, contact us at:{" "}
              <a href="mailto:legal@yappaflow.com" className="text-brand-orange hover:underline">legal@yappaflow.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
