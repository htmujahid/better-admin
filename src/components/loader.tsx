import { Loader2 } from 'lucide-react';

export function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="h-4 w-4 animate-spin" />
    </div>
  );
}
