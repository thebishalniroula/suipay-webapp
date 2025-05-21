"use client";

import AddWebhookModal from "@/components/ui/dashboard/AddHookModal";
import WebhookCard from "@/components/Webhookcard";
import useGetWebhooks from "@/hooks/use-get-webhooks";
import { useState } from "react";

export default function WebHookPage() {
  const { data } = useGetWebhooks();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="p-6">
      <div className="flex gap-4 flex-wrap">
        {data?.webhooks.map((hook) => (
          <WebhookCard key={hook.id} hook={hook} />
        ))}
        <AddWebhookModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </main>
  );
}
