import { useState, type FormEvent } from "react";
import { ArrowRight, Building2, KeyRound, Mail } from "lucide-react";

export default function BuilderAdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onLogin();
  }

  return (
    <section className="mx-auto grid min-h-[min(720px,calc(100dvh-190px))] max-w-[980px] grid-cols-[minmax(0,1fr)_390px] border border-line bg-paper max-[800px]:grid-cols-1">
      <div className="flex flex-col justify-between bg-ink p-8 text-white sm:p-12">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center bg-[#d7ff72] text-ink"><Building2 size={19} /></span>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/70">STELLAR / ADMIN</span>
        </div>
        <div className="py-12">
          <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#d7ff72]">Property operations</p>
          <h1 className="mt-5 max-w-[520px] text-[clamp(40px,6vw,76px)] font-medium leading-[0.88] tracking-[-0.07em]">
            Every building.<br />Every next step.
          </h1>
          <p className="mt-6 max-w-[390px] text-[12px] leading-6 text-white/60">
            Review buyer activity before and after possession, coordinate follow-ups, and keep service requests moving.
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-white/15 pt-4 font-mono text-[7px] uppercase tracking-[0.1em] text-white/45">
          <span>Admin workspace</span>
          <span>Demo access</span>
        </div>
      </div>

      <div className="flex flex-col justify-center p-7 sm:p-10">
        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">Welcome back</p>
        <h2 className="mt-2 text-[30px] font-medium tracking-[-0.06em]">Admin sign in</h2>
        <p className="mt-2 text-[11px] leading-5 text-muted">Enter any valid email and password to explore this local demo.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-1.5 block font-mono text-[7px] uppercase tracking-[0.1em] text-muted">Work email</span>
            <span className="flex items-center gap-2.5 border border-line bg-white px-3.5 focus-within:border-ink">
              <Mail size={14} className="shrink-0 text-muted" />
              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@stellar.example"
                className="h-11 min-w-0 flex-1 bg-transparent text-[11px] outline-none placeholder:text-[#aaa79e]"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block font-mono text-[7px] uppercase tracking-[0.1em] text-muted">Password</span>
            <span className="flex items-center gap-2.5 border border-line bg-white px-3.5 focus-within:border-ink">
              <KeyRound size={14} className="shrink-0 text-muted" />
              <input
                type="password"
                autoComplete="current-password"
                required
                minLength={4}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter any demo password"
                className="h-11 min-w-0 flex-1 bg-transparent text-[11px] outline-none placeholder:text-[#aaa79e]"
              />
            </span>
          </label>

          <button type="submit" className="mt-2 flex h-11 w-full items-center justify-between bg-ink px-4 text-left text-[10px] font-medium text-white transition hover:bg-[#34342f]">
            Enter STELLAR Admin
            <ArrowRight size={15} className="text-[#d7ff72]" />
          </button>
        </form>

        <p className="mt-5 border-t border-line pt-4 text-[9px] leading-4 text-muted">
          Demo only. Sign-in is not verified or stored; connect an authentication service before production use.
        </p>
      </div>
    </section>
  );
}
