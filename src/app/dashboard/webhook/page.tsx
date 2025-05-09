"use client";

import { useState } from "react";
import AddWebhookModal from "@/components/ui/dashboard/AddHookModal";
import WebhookCard from "@/components/Webhookcard";

export default function WebHookPage() {
  const [webhooks, setWebhooks] = useState<any[]>([]);

  const addHook = (hook: any) => {
    setWebhooks((prev) => [...prev, hook]);
  };

  return (
    <main className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {webhooks.map((hook) => (
          <WebhookCard key={hook.id} hook={hook} />
        ))}
        <AddWebhookModal onAddWebhook={addHook} />
      </div>
    </main>
  );
}
