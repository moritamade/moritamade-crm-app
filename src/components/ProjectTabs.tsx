'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ProjectTabs({ id }: { id: string }) {
  const pathname = usePathname();
  const tabs = [
    { href: `/projects/${id}/overview`, label: 'Overview' },
    { href: `/projects/${id}/timeline`, label: 'Timeline' },
    { href: `/projects/${id}/costs`,    label: 'Costs' },
    { href: `/projects/${id}/files`,    label: 'Files' },
  ];

  return (
    <div className="border-b mb-4 flex gap-6">
      {tabs.map(t => {
        const active = pathname.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`pb-2 ${active ? 'border-b-2 border-black font-medium' : 'opacity-70 hover:opacity-100'}`}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
