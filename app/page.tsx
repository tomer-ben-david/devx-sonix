import { TypewriterHero } from "@/components/TypewriterHero";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-xl font-bold text-gray-900">Sonix</div>
          <nav className="hidden gap-6 md:flex">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Customers</a>
          </nav>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="text-center">
          <TypewriterHero />
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600">
            Upload your Google Drive meeting recordings. We turn them into LinkedIn posts, press releases, 
            and other content your team actually wants to share.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button className="rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors">
              Start Free Trial
            </button>
            <button className="rounded-lg border border-gray-300 px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              How it works
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Upload your meeting recordings. Get LinkedIn-ready posts in minutes.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Transcribe meetings</h3>
              <p className="mt-2 text-base text-gray-600">
                We pull from your Google Drive folder and transcribe everything. Speaker names, timestamps, the works.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Turn transcripts into posts</h3>
              <p className="mt-2 text-base text-gray-600">
                We scan the transcripts, spot the highlights, and craft LinkedIn posts that get engagement.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">You review, then publish</h3>
              <p className="mt-2 text-base text-gray-600">
                Always preview before posting. Edit if needed. One click to publish or download.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials" className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Trusted by teams at leading companies
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600 mb-4">
                "We used to spend hours turning our all-hands into LinkedIn posts. Now it takes 5 minutes. 
                And honestly? The posts perform better than what I was writing."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Sarah Chen</p>
                  <p className="text-sm text-gray-600">VP Marketing, TechCorp</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600 mb-4">
                "The transcription accuracy surprised me. Picks up names, product launches, 
                even casual asides that turn into good content later."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Michael Rodriguez</p>
                  <p className="text-sm text-gray-600">PR Director, StartupXYZ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">
            Stop letting great meetings go to waste
          </h2>
          <p className="mt-3 text-lg text-blue-100">
            Try Sonix free. No credit card required.
          </p>
          <div className="mt-6">
            <button className="rounded-lg bg-white px-8 py-3 text-base font-medium text-blue-600 hover:bg-gray-100 transition-colors">
              Get Started Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
