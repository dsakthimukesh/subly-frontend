import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { generateApiKey } from "../../api/api";

interface Props {
  apiKey: string;
  onRegenerate: (newKey: string) => void;
}

export default function ApiKeySection({ apiKey, onRegenerate }: Props) {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRegenerate = async () => {
    setLoading(true);
    try {
      const res = await generateApiKey();
      // API returns the key — handle both plain string and object shapes
      const newKey = typeof res === "string" ? res : res?.api_key ?? res?.key ?? String(res);
      onRegenerate(newKey);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
      {/* Section header */}
      <div>
        <h2 className="text-base font-semibold text-gray-900">API Key</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Use this key to authenticate API requests from your application.
        </p>
      </div>

      {/* Key input + actions */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Your API Key</label>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              readOnly
              value={apiKey || "No API key generated yet"}
              className="w-full bg-gray-100 border border-transparent rounded-lg px-3 py-2 text-sm text-gray-600 font-mono outline-none pr-10 truncate"
            />
            {apiKey && (
              <button
                onClick={handleCopy}
                title="Copy to clipboard"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
              >
                <Copy size={14} />
              </button>
            )}
          </div>

          <button
            onClick={handleRegenerate}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            {loading ? "Generating..." : "Regenerate"}
          </button>
        </div>

        {copied && (
          <p className="text-xs text-green-600">Copied to clipboard!</p>
        )}

        <p className="text-xs text-gray-400">
          Keep your API key secure. Never share it publicly.
        </p>
      </div>
    </div>
  );
}
