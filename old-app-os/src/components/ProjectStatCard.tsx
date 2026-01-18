import { ReactNode } from 'react';
import { Card, CardContent } from './ui/card';

interface ProjectStatCardProps {
  label: string;
  value: number | string;
  icon?: ReactNode;
}

export function ProjectStatCard({ label, value, icon }: ProjectStatCardProps) {
  return (
    <Card className="p-4 space-y-2">
      <div className="flex items-center justify-start">
        {icon && <span className="text-2xl">{icon}</span>}
        <span className="text-sm text-muted-foreground font-medium">
          {label}
        </span>
      </div>
      <div className="text-3xl font-bold text-primary">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </Card>
  );
}
