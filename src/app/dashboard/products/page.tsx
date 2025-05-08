"use client";

import { useState } from "react";
import AddProductModal from "@/components/ui/dashboard/AddProductModal";
import { Button } from "@/components/ui/button";
import AddBox from "@/components/AddBox";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [productModalOpen, setProductModalOpen] = useState(false);

  const addProduct = (product: any) => {
    setProducts((prev) => [...prev, { ...product, id: crypto.randomUUID() }]);
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 px-8 py-6 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-[#47278C] bg-tranaparent p-5 text-white shadow-sm min-h-[220px] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-red-600"></div>
                  <p className="font-semibold text-white capitalize">
                    {product.name}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-sm border border-[#8B5CF6] px-3 py-1 text-white hover:bg-[#2a2655] rounded-md"
                  onClick={() => navigator.clipboard.writeText(product.id)}
                >
                  Copy ID
                </Button>
              </div>

              <div className="border-t border-[#2E2A48] my-2"></div>

              <div className="text-sm text-gray-400 space-y-4">
                <div className="flex justify-between">
                  <span>Product Type:</span>
                  <span className="font-semibold text-white capitalize">
                    {product.subscriptionType === "subscription"
                      ? "Subscription"
                      : "Onetime"}
                  </span>
                </div>

                {product.subscriptionType === "subscription" && (
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold text-white">
                      {product.duration} {product.durationUnit}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="font-semibold text-white">
                    {product.price} SUI
                  </span>
                </div>
              </div>
            </div>
          ))}

          <AddProductModal
            onAddProduct={addProduct}
            open={productModalOpen}
            setOpen={setProductModalOpen}
          />
        </div>
      </main>
    </div>
  );
}
