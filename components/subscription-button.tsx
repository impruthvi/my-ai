"use client";

import { useState } from "react";
import axios from "axios";
import { Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  isPro,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log("BILLING_ERROR", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      variant={isPro ? "default" : "premium"}
      onClick={onClick}
    >
      {isPro ? "Manage Subscription" : "Upgrade to Pro"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
