export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Privacy Policy
          </h1>
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground text-lg">
              Last updated: December 2025
            </p>

            <h2 className="text-2xl font-semibold">1. About This Demo</h2>
            <p>
              This is a demo application for the Next Bard boilerplate. This
              privacy policy applies to the demo instance. If you use this
              boilerplate for your own project, you should create a privacy
              policy appropriate for your specific use case.
            </p>

            <h2 className="text-2xl font-semibold">2. Data Collection</h2>
            <p>
              The demo collects minimal data necessary for demonstrating
              authentication features, including email addresses and account
              information you provide during sign-up. This data is used solely
              for demonstration purposes.
            </p>

            <h2 className="text-2xl font-semibold">3. Data Storage</h2>
            <p>
              Demo data is stored in a PostgreSQL database. As this is an
              open-source project, the database may be reset periodically.
              Please do not store any sensitive or important information in the
              demo.
            </p>

            <h2 className="text-2xl font-semibold">4. No Data Selling</h2>
            <p>
              We do not sell, trade, or otherwise transfer your information to
              third parties. The demo is provided free of charge with no
              commercial intent.
            </p>

            <h2 className="text-2xl font-semibold">5. Open Source</h2>
            <p>
              This project is open source. You can review the complete codebase
              to see exactly how data is handled. We encourage transparency and
              welcome contributions to improve privacy practices.
            </p>

            <h2 className="text-2xl font-semibold">
              6. Your Implementation Responsibility
            </h2>
            <p>
              When deploying this boilerplate for production use, you are
              responsible for implementing appropriate privacy measures,
              including GDPR compliance, data encryption, and creating a privacy
              policy that accurately reflects your data practices.
            </p>

            <h2 className="text-2xl font-semibold">7. Contact</h2>
            <p>
              For questions about this demo or the boilerplate, please open an
              issue on the GitHub repository.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
