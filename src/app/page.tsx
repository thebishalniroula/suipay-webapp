export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-2">
          <div className="text-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L4 7L12 12L20 7L12 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-xl font-semibold text-white">SuiPay</span>
        </div>
        <a
          href="#"
          className="bg-[#6c63ff] hover:bg-[#5a52d5] text-white rounded-full px-4 py-2 flex items-center"
        >
          Access App <span className="ml-1">→</span>
        </a>
      </nav>

      <div className="mt-8">
        <div className="flex items-center gap-2 text-sm text-[#a3a3ff] border border-[#3d3d6d] rounded-full px-3 py-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="#a3a3ff" strokeWidth="2" />
          </svg>
          Built on Sui
        </div>
      </div>

      <div className="text-center mt-12 px-4 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
          SuiPay
          <br />
          Payments
          <br />
          onchain <span className="text-[#6c63ff]">Simplified.</span>
        </h1>

        <div className="flex flex-row items-center justify-center gap-4 mt-12">
          <a
            href="#"
            className="bg-[#6c63ff] hover:bg-[#5a52d5] text-white rounded-full px-6 py-2 flex items-center"
          >
            Access App <span className="ml-1">→</span>
          </a>
          <a
            href="#"
            className="text-white border border-[#3d3d6d] rounded-full px-6 py-2"
          >
            Documentation
          </a>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto mt-24 px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="bg-[#131325] border border-[#3d3d6d] text-white rounded-xl overflow-hidden p-6"
            >
              <div className="pb-2">
                <h3 className="text-xl font-medium">SuiPay Benefit {num}</h3>
              </div>
              <div className="text-sm text-gray-400">
                <p>Subscriptions onchain Simplified.</p>
                <p className="mt-1">
                  SuiPay Subscriptions onchain Simplified. SuiPay
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
