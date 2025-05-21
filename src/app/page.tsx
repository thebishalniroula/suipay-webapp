import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-2">
          <Image src="/logo1.svg" alt="logo" width={101} height={32} />
        </div>
        <Button rightIcon={<MdArrowOutward />} variant="primary" size="sm">
          <Link href="/signup" className="inline-flex items-center">
            Access App
          </Link>
        </Button>
      </nav>

      <div className="mt-4">
        <div className="flex items-center gap-2 text-sm text-[#fffff] text-[15px] px-3 py-1">
          <Image src="/sui.svg" alt="logo" width={14} height={18} />
          Built on Sui
        </div>
      </div>

      <div className="text-center mt-2 px-4 max-w-4xl mx-auto">
        <div className="mt-4 flex justify-center">
          <Image src="/logo1.svg" alt="SuiPay logo" width={251} height={79} />
        </div>

        <h2 className="text-[64px] md:text-[72px] leading-tight font-medium text-white mt-1">
          Payments
        </h2>
        <h3 className="text-[64px] md:text-[72px] leading-tight font-medium text-white mt-1">
          onchain{" "}
          <span className="text-[#6c63ff] font-semibold">Simplified.</span>
        </h3>

        <div className="flex flex-row items-center justify-center gap-4 mt-8">
          <Link href="/dashboard">
            <Button rightIcon={<MdArrowOutward />} variant="primary" size="sm">
              Access App{" "}
            </Button>
          </Link>

          <Button variant="secondary" size="sm">
            Documentation
          </Button>
        </div>

        <div className="w-full max-w-7xl mx-auto mt-24 px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="bg-transparent text-white p-6 rounded-xl 
                border-t-[2px] border-l-[2px] border-r-[2px] border-b-[0.05px] 
                border-[#3d3d6d]"
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
    </div>
  );
}
