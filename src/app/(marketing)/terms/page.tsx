export default function TermsPage() {
  return (
    <div className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Terms of Use
          </h1>
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground text-lg">
              Last updated: December 2025
            </p>

            <h2 className="text-2xl font-semibold">1. Open Source License</h2>
            <p>
              This boilerplate is released under the MIT License. You are free
              to use, copy, modify, merge, publish, distribute, sublicense,
              and/or sell copies of the software, subject to the conditions of
              the MIT License.
            </p>

            <h2 className="text-2xl font-semibold">2. Demo Application</h2>
            <p>
              This demo application is provided for demonstration purposes only.
              Any accounts created on this demo are for testing the boilerplate
              features. Do not store sensitive or production data on this demo
              instance.
            </p>

            <h2 className="text-2xl font-semibold">3. No Warranty</h2>
            <p>
              The software is provided &quot;as is&quot;, without warranty of
              any kind, express or implied, including but not limited to the
              warranties of merchantability, fitness for a particular purpose,
              and noninfringement.
            </p>

            <h2 className="text-2xl font-semibold">4. Your Responsibility</h2>
            <p>
              When using this boilerplate for your own projects, you are
              responsible for implementing proper security measures, complying
              with applicable laws, and creating your own terms of service and
              privacy policy appropriate for your use case.
            </p>

            <h2 className="text-2xl font-semibold">5. Contributions</h2>
            <p>
              Contributions to this project are welcome. By submitting a pull
              request, you agree that your contributions will be licensed under
              the same MIT License that covers this project.
            </p>

            <h2 className="text-2xl font-semibold">6. Third-Party Services</h2>
            <p>
              This boilerplate integrates with various third-party services and
              libraries. Each of these has its own terms of service and
              licensing terms that you should review when using them in your
              projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
