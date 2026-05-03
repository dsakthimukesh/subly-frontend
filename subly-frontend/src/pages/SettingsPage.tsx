import { useEffect, useState } from "react";
import type { Company } from "../types/company";
import { getCompany } from "../api/api";
import CompanyForm from "../components/settings/CompanyForm";
import ApiKeySection from "../components/settings/ApiKeySection";

export default function SettingsPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      try {
        const data = await getCompany();
        setCompany(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage your company settings and preferences
        </p>
      </div>

      {/* Company Information */}
      <CompanyForm company={company} loading={loading} />

      {/* API Key */}
      <ApiKeySection apiKey={apiKey} onRegenerate={setApiKey} />
    </div>
  );
}
