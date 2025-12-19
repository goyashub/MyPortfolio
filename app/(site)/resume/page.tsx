export default function ResumePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl rounded-lg bg-gray-900 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold">John Doe</h1>
          <p className="text-xl text-gray-400">Senior Full-Stack Engineer</p>
        </div>

        <section className="mb-8">
          <h2 className="mb-4 border-b border-gray-700 pb-2 text-2xl font-semibold">Experience</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Lead Developer</h3>
              <p className="text-gray-400">Company Name • 2020 - Present</p>
              <p className="mt-2 text-gray-300">
                Led development of scalable web applications using Next.js, TypeScript, and PostgreSQL.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 border-b border-gray-700 pb-2 text-2xl font-semibold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'SwiftUI', 'AWS'].map(
              (skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-red-600/20 px-3 py-1 text-sm text-red-400"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </section>

        <div className="mt-8 text-center">
          <a
            href="/Resume_ShubhamGoyal.pdf"
            download="Resume_ShubhamGoyal.pdf"
            className="inline-block rounded-md bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  )
}


