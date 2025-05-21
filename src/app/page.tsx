import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { redirect } from "next/navigation";

const benefits = [
  {
    title: "Seamless Recurring Payments",
    description:
      "Set up subscription payments that run on autopilot—no need for intermediaries or timely approvals.",
  },
  {
    title: "Built on Sui Blockchain",
    description:
      "Every transaction is verifiable and tamper-proof, ensuring full transparency and security.",
  },
  {
    title: "Open & Permissionless",
    description:
      "No gatekeepers. Anyone with a wallet can start a plan or accept recurring payments instantly..",
  },
];

export default async function Home() {
  const token = (await cookies()).get("token")?.value;
  if (token) redirect("/dashboard");

  return (
    <div className="flex flex-col items-center min-h-screen">
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-2">
          <Image src="/logo1.svg" alt="logo" width={101} height={32} />
        </div>
        <Button rightIcon={<MdArrowOutward />} variant="primary" size="sm">
          <Link href="/dashboard" className="inline-flex items-center">
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

      <div className="text-center mt-2 px-4 max-w-6xl mx-auto">
        <div className="mt-4 flex justify-center">
          <Image src="/logo1.svg" alt="SuiPay logo" width={251} height={79} />
        </div>

        <h2 className="text-[64px] md:text-[72px] leading-[85px] font-medium text-white">
          Payments
          <br />
          onchain{" "}
          <span className="text-[#6c63ff] font-semibold">Simplified.</span>
        </h2>

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

        <div className="w-full max-w-[1400px] mx-auto mt-24 px-3 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-transparent text-white p-5 rounded-xl 
        border-t-[2px] border-l-[2px] border-r-[2px] border-b-[0.05px] 
        border-[#3d3d6d]"
              >
                <div className="pb-2">
                  <h3 className="text-xl font-medium">
                    {index + 1}. {benefit.title}
                  </h3>
                </div>
                <div className="text-md text-gray-400">
                  <p className="mt-2">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
