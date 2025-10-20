import { ReactNode } from 'react';
import { Card, CardContent } from './ui/card';

interface ProjectStatCardProps {
  label: string;
  value: number | string;
  icon?: ReactNode;
}

export function ProjectStatCard({ label, value, icon }: ProjectStatCardProps) {
  return (
    <Card className="bg-card rounded-lg p-4 space-y-2 border border-border">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">
          {label}
        </span>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <div className="text-3xl font-bold text-primary">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </Card>
  );
}
