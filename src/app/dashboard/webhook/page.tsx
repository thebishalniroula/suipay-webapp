"use client";
import AddWebhookModal from "@/components/ui/dashboard/AddHookModal";
import { useState } from "react";
export default function WebHookPage() {
  const [webhooks, setWebhooks] = useState<any[]>([]);

  const addHook = (hook: any) => {
    setWebhooks((prev: any) => [...prev, hook]);
  };

  return (
    <main className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {webhooks.map((hook: any) => (
          <div
            key={hook.id}
            className="text-white border border-[#47278C] p-4 rounded-lg"
          >
            <p className="mb-2">{hook.url}</p>
            <small className="text-gray-400">ID: {hook.id}</small>
          </div>
        ))}

        <AddWebhookModal onAddWebhook={addHook} />
      </div>
    </main>
  );
}
