export default function AdminPage() {
  return (
    <div className="min-h-screen p-8 md:p-12">

      {/* Header */}
      <div className="mb-10 flex items-end justify-between border-b border-border pb-6">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-[0.2em] text-accent font-light">
            Studio Dashboard
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-foreground">
            Aesthura
          </h1>
        </div>
        <span className="text-[12px] text-foreground/40 font-light">
          {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Projects",    value: "4"  },
          { label: "Enquiries",   value: "—"  },
          { label: "Services",    value: "6"  },
          { label: "Team",        value: "—"  },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col gap-2 p-5 rounded-admin"
            style={{ backgroundColor: "hsl(var(--admin-surface))", border: "1px solid hsl(var(--admin-border))" }}
          >
            <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/40">{label}</span>
            <span className="font-display text-3xl text-foreground">{value}</span>
          </div>
        ))}
      </div>

      {/* Surface-2 panel */}
      <div
        className="rounded-admin p-6"
        style={{ backgroundColor: "hsl(var(--admin-surface-2))", border: "1px solid hsl(var(--admin-border))" }}
      >
        <p className="text-[13px] text-foreground/50 font-light">
          Admin sections — Projects, Enquiries, Services — coming next.
        </p>
      </div>

    </div>
  );
}
