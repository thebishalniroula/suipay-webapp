import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-2">
          <div className="text-white">
            <Image src="/logo.svg" alt="logo" width={33} height={33} />
          </div>
          <span className="text-[24px] font-meduim text-white">SuiPay</span>
        </div>
        <Button className="bg-[#7E7AF2] hover:bg-[#5a52d5] h-[59px] text-white rounded-[20px] px-6 py-6 flex font-medium text-[18px] items-center">
          <Link href="/signup">
            Access App
            <span className="ml-1 inline-flex items-center">
              <MdArrowOutward />
            </span>
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
        <h1 className="text-[88px] leading-[1.1] font-bold text-white">
          SuiPay
        </h1>
        <h2 className="text-[64px] md:text-[72px] leading-tight font-medium text-white mt-1">
          Payments
        </h2>
        <h3 className="text-[64px] md:text-[72px] leading-tight font-medium text-white mt-1">
          onchain{" "}
          <span className="text-[#6c63ff] font-semibold">Simplified.</span>
        </h3>

        <div className="flex flex-row items-center justify-center gap-4 mt-8">
          <Link href="/signup">
            <Button className="bg-[#6c63ff] h-[59px] hover:bg-[#5a52d5] text-white rounded-full px-6 py-6 flex items-center">
              Access App{" "}
              <span className="ml-1">
                <MdArrowOutward />
              </span>
            </Button>
          </Link>

          <Button
            variant="outline"
            className="text-[#000000] h-[59px] bg-[#CFC4E7] rounded-full px-6 py-6"
          >
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
