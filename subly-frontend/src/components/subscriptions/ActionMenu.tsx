import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import type { Subscription } from "../../types/subscription";

interface Props {
  subscription: Subscription;
  cancelling: boolean;
  onCancel: (subscription: Subscription) => void;
}

export default function ActionMenu({ subscription, cancelling, onCancel }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = subscription.status_name === "ACTIVE";

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
        aria-label="Actions"
      >
        <MoreHorizontal size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
          {/* View */}
          <button
            onClick={() => setOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View
          </button>

          {/* Cancel — only for Active */}
          {isActive && (
            <button
              onClick={() => {
                setOpen(false);
                onCancel(subscription);
              }}
              disabled={cancelling}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelling ? "Cancelling..." : "Cancel Subscription"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
