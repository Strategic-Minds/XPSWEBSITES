import { InstallerJobDetail } from "../../../components/phoenix/PhoenixEnterpriseScreens";

type InstallerJobPageProps = {
  params: Promise<{ jobId: string }>;
};

export default async function InstallerJobPage({ params }: InstallerJobPageProps) {
  const { jobId } = await params;
  return <InstallerJobDetail jobId={jobId} />;
}
