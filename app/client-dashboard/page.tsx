// app/client-dashboard/page.tsx — legacy redirect to canonical portal
import { redirect } from 'next/navigation';
export default function LegacyClientDashboard({ searchParams }: { searchParams?: Record<string,string> }) {
  const qs = searchParams ? new URLSearchParams(searchParams as Record<string,string>).toString() : '';
  redirect(`/customer-portal/dashboard${qs ? '?' + qs : ''}`);
}
