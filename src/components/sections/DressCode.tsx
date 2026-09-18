export function DressCode() {
  return (
    <section className="relative overflow-hidden bg-[#6a424c] py-24 text-white md:py-32">
      {/* Decoración sutil de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-44 -top-44 h-[28rem] w-[28rem] rounded-full border border-white/[0.07]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -right-44 h-[34rem] w-[34rem] rounded-full border border-white/[0.07]"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Encabezado */}
        <p className="text-xs uppercase tracking-[0.5em] text-white/60 md:text-sm">
          Código de vestimenta
        </p>

        <div className="mx-auto mt-6 h-px w-14 bg-white/35" />

        <h2 className="mt-8 font-serif text-5xl font-light italic text-[#f8f0e8] md:text-6xl lg:text-7xl">
          Formal
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">
          Queremos que este día se sienta tan especial como lo hemos imaginado.
          Te invitamos a acompañarnos con vestimenta formal.
        </p>

        {/* Detalle ornamental */}
        <div
          aria-hidden="true"
          className="mx-auto my-12 flex max-w-[190px] items-center gap-3 md:my-16"
        >
          <span className="h-px flex-1 bg-white/25" />
          <span className="font-serif text-xl text-[#f1ded9]/70">◇</span>
          <span className="h-px flex-1 bg-white/25" />
        </div>

        {/* Caballeros / Damas */}
        <div className="mx-auto grid max-w-4xl md:grid-cols-2">
          <DressColumn
            number="01"
            title="Caballeros"
            items={["Traje formal", "Camisa de vestir", "Zapato formal"]}
          />

          <DressColumn
            number="02"
            title="Damas"
            items={[
              "Vestido largo o midi",
              "Calzado elegante",
              "Accesorios a elección",
            ]}
            bordered
          />
        </div>

        {/* Nota importante */}
        <div className="mx-auto mt-14 max-w-2xl border-t border-white/15 pt-10 md:mt-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/45 md:text-xs">
            Una pequeña consideración
          </p>

          <p className="mt-5 font-serif text-xl italic leading-relaxed text-[#f1ded9] md:text-2xl">
            El blanco, ivory y tonos similares están reservados
            especialmente para la novia.
          </p>
        </div>

        <div className="mx-auto mt-9 flex max-w-[150px] items-center gap-3">
          <span className="h-px flex-1 bg-white/20" />
          <span className="font-serif text-lg text-white/45">♡</span>
          <span className="h-px flex-1 bg-white/20" />
        </div>
      </div>
    </section>
  );
}

function DressColumn({
  number,
  title,
  items,
  bordered = false,
}: {
  number: string;
  title: string;
  items: string[];
  bordered?: boolean;
}) {
  return (
    <div
      className={[
        "px-6 py-9 text-center md:px-12 md:py-5",
        bordered
          ? "border-t border-white/15 md:border-l md:border-t-0"
          : "",
      ].join(" ")}
    >
      <p className="text-[10px] tracking-[0.35em] text-white/35">
        {number}
      </p>

      <h3 className="mt-4 font-serif text-3xl italic text-[#f8f0e8] md:text-4xl">
        {title}
      </h3>

      <div className="mx-auto mt-5 h-px w-8 bg-white/25" />

      <ul className="mt-7 space-y-4 text-sm tracking-wide text-white/70 md:text-base">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
