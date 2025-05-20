import { BarChart3, Clock, Code2, Database, Globe, Layers, Shield, Smartphone } from "lucide-react"

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Powerful Features</h2>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Everything you need to build, deploy, and scale your web applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large feature card */}
          <div className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 p-6 rounded-lg border">
            <div className="flex flex-col h-full">
              <div className="flex items-start">
                <Globe className="h-6 w-6 text-slate-800 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Global Deployment</h3>
                  <p className="text-muted-foreground mb-4">
                    Deploy your applications to multiple regions worldwide with just a few clicks. Ensure low latency
                    and high availability for all your users.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Regular feature cards */}
          <div className="p-6 rounded-lg border">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-slate-800 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Enterprise Security</h3>
                <p className="text-muted-foreground">
                  Bank-level security with advanced encryption and compliance certifications.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border">
            <div className="flex items-start">
              <Database className="h-5 w-5 text-slate-800 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Scalable Storage</h3>
                <p className="text-muted-foreground">
                  Automatically scale your storage needs as your application grows.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border">
            <div className="flex items-start">
              <Layers className="h-5 w-5 text-slate-800 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Modular Architecture</h3>
                <p className="text-muted-foreground">
                  Build with reusable components that scale with your business needs.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 p-6 rounded-lg border">
            <div className="flex items-start">
              <BarChart3 className="h-5 w-5 text-slate-800 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                <p className="text-muted-foreground">
                  Gain valuable insights with real-time analytics and customizable dashboards to track performance
                  metrics.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border">
            <div className="flex items-start">
              <Code2 className="h-5 w-5 text-slate-800 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Developer API</h3>
                <p className="text-muted-foreground">
                  Comprehensive API with extensive documentation for seamless integration.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border">
            <div className="flex items-start">
              <Smartphone className="h-5 w-5 text-slate-800 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Mobile Optimized</h3>
                <p className="text-muted-foreground">Responsive design ensures perfect performance on all devices.</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border">
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-slate-800 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Round-the-clock support from our expert team whenever you need assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
