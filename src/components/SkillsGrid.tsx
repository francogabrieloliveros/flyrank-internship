import { skillGroups } from "@/lib/data";

export function SkillsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {skillGroups.map((group) => (
        <div key={group.label} className="rigid-frame bg-paper/70 p-6">
          <h3 className="font-display text-lg">{group.label}</h3>
          {group.note && (
            <p className="mt-1 text-xs font-light italic text-ink/45">{group.note}</p>
          )}
          <ul className="mt-4 space-y-2">
            {group.items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-light text-ink/70">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
