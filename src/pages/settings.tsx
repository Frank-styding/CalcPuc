"use client";
import { HeaderTitle } from "@/components/ui/HeaderTitle";
import { ApiConfigForm } from "@/components/settings/ApiConfigForm";
import Layout from "@/components/ui/layout";
import { HomeIcon } from "@/components/icons/HomeIcon";
import { useRouter } from "next/router";

export default function SettingsPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <Layout
      header={<HeaderTitle title="Configuración" />}
      contain={
        <div className="p-4 overflow-y-auto h-full">
          <div className="max-w-2xl mx-auto">
            <ApiConfigForm />
          </div>
        </div>
      }
      buttons={[{ icon: <HomeIcon />, onClick: handleGoHome }]}
    />
  );
}
