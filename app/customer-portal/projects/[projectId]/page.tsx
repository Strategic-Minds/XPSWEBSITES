import { CustomerProjectDetail } from "../../../components/phoenix/PhoenixEnterpriseScreens";

type ProjectPageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function CustomerProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  return <CustomerProjectDetail projectId={projectId} />;
}
