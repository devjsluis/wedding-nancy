export function DressCode() {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="uppercase tracking-[0.4em] text-[#6a424c]">
            Dress Code
          </p>

          <h2 className="mt-4 text-5xl text-[#42594a]">Código de vestimenta</h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#42594a]/75">
            Nos encantará compartir este día con ustedes. Les invitamos a vestir
            de manera formal para acompañarnos en esta celebración.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#42594a]/10 p-8">
            <h3 className="text-3xl text-[#42594a]">Caballeros</h3>

            <ul className="mt-6 space-y-3 text-[#42594a]/80">
              <li>Traje formal</li>
              <li>Camisa de vestir</li>
              <li>Zapato formal</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-[#42594a]/10 p-8">
            <h3 className="text-3xl text-[#42594a]">Damas</h3>

            <ul className="mt-6 space-y-3 text-[#42594a]/80">
              <li>Vestido largo o midi</li>
              <li>Calzado elegante</li>
              <li>Accesorios a elección</li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center text-[#6a424c]">
          Blanco, ivory y tonos similares reservados para la novia.
        </p>
      </div>
    </section>
  );
}
