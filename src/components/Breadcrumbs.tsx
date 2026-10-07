import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; path?: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbProps) {
  const location = useLocation();
  return (
    <nav className="flex items-center flex-wrap gap-1 text-sm text-deep-mauve">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {item.path ? (
            <Link to={item.path} className="hover:text-plum transition-colors font-medium">{item.label}</Link>
          ) : (
            <span className="text-plum font-semibold">{item.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight size={14} className="text-gray-400" />}
        </span>
      ))}
    </nav>
  );
}
