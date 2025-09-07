export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">RVA Glow Co</h1>
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          Professional Holiday Light Installation
        </p>
      </div>

      <div className="relative flex place-items-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Transform Your Home This Holiday Season
          </h2>
          <p className="text-xl mb-8">
            Serving Richmond, VA and surrounding areas
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
            Get Your Free Quote
          </button>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Professional Installation
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Expert installation by trained professionals with attention to every detail
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Custom Designs
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Tailored lighting designs to match your home&apos;s architecture and style
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Complete Service
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Installation, maintenance, and removal - we handle everything
          </p>
        </div>
      </div>
    </main>
  );
}