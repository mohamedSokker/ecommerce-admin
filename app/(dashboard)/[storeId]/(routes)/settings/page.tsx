import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { id } from "zod/v4/locales";
import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps {
  params: Promise<{ storeId: string }>;
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = await auth();

  const resolvedParams = await params;
  const { storeId } = resolvedParams;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId: userId,
    },
  });

  if (!store) {
    redirect("/");
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
