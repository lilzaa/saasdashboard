import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
        <Construction size={24} className="text-muted-foreground" strokeWidth={1.5} />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-[13px] text-muted-foreground mt-1 max-w-xs">
          This section is coming soon. Check back later for updates.
        </p>
      </div>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-[13px] font-medium">
        In progress
      </div>
    </div>
  );
}
