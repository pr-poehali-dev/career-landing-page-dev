import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const OFFICE_IMG = "https://cdn.poehali.dev/projects/bd4e4f85-e9e8-4660-ba87-151e5adcbe77/files/77a394a0-2259-432b-a032-24d534e52e88.jpg";

const NAV_LINKS = [
  { label: "О компании", href: "#about" },
  { label: "Вакансии", href: "#vacancies" },
  { label: "Культура", href: "#culture" },
  { label: "Преимущества", href: "#benefits" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const VACANCIES = [
  { title: "Senior Frontend Developer", dept: "Разработка", type: "Удалённо", salary: "от 280 000 ₽" },
  { title: "Product Manager", dept: "Продукт", type: "Гибрид", salary: "от 220 000 ₽" },
  { title: "Data Scientist", dept: "Аналитика", type: "Офис / Удалённо", salary: "от 300 000 ₽" },
  { title: "UX/UI Designer", dept: "Дизайн", type: "Удалённо", salary: "от 180 000 ₽" },
  { title: "Backend Developer (Python)", dept: "Разработка", type: "Гибрид", salary: "от 260 000 ₽" },
  { title: "Head of Marketing", dept: "Маркетинг", type: "Офис", salary: "от 250 000 ₽" },
];

const BENEFITS = [
  { icon: "Rocket", title: "Рост без потолка", desc: "Индивидуальный план развития, бюджет на обучение и конференции" },
  { icon: "Heart", title: "Забота о здоровье", desc: "ДМС с первого дня, спортивная компенсация и психологическая поддержка" },
  { icon: "Globe", title: "Работа из любой точки", desc: "Полная удалёнка, гибкий график и оплачиваемые коворкинги" },
  { icon: "Zap", title: "Крутые проекты", desc: "Продукты, которыми пользуются миллионы — никакой скучной рутины" },
  { icon: "Coffee", title: "Уют в офисе", desc: "Современные open-space, кофе, снеки и зоны отдыха" },
  { icon: "Star", title: "Бонусы и акции", desc: "Конкурентная зарплата, квартальные премии и опционы" },
];

const REVIEWS = [
  {
    name: "Алёна Смирнова",
    role: "Lead Developer, 3 года",
    text: "Здесь я выросла из джуна до тимлида за два года. Атмосфера открытости и реальная поддержка менторов — это не просто слова.",
    avatar: "А",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    name: "Максим Петров",
    role: "Product Manager, 1.5 года",
    text: "Лучшая команда, с которой я работал. Идеи принимаются всерьёз, запускаем быстро, учимся на данных — настоящий продуктовый подход.",
    avatar: "М",
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Дарья Коваль",
    role: "UX Designer, 2 года",
    text: "Кайфую от задач. Дизайн здесь — это стратегия, а не картинки. Я влияю на продукт с первого дня и вижу результат своей работы.",
    avatar: "Д",
    color: "from-pink-500 to-rose-500",
  },
];

const CULTURE_CARDS = [
  { emoji: "🔥", title: "Двигаемся быстро", desc: "Решения принимаются за часы, а не недели" },
  { emoji: "🤝", title: "Доверяем друг другу", desc: "Никакой микроменеджмент — ты профессионал" },
  { emoji: "🌱", title: "Учимся постоянно", desc: "Ошибаться — нормально, главное — расти" },
  { emoji: "🎯", title: "Думаем о результате", desc: "Важно влияние, а не количество часов" },
];

function useIntersection(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const { ref, visible } = useIntersection();
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </section>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Все");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const departments = ["Все", ...Array.from(new Set(VACANCIES.map((v) => v.dept)))];
  const filtered = activeFilter === "Все" ? VACANCIES : VACANCIES.filter((v) => v.dept === activeFilter);

  return (
    <div className="min-h-screen bg-[#070711] text-white font-body overflow-x-hidden">

      {/* NOISE OVERLAY */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px"
        }}
      />

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#070711]/90 backdrop-blur-xl border-b border-white/5" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-2xl font-bold tracking-wider bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            ORBIT
          </span>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-white/60 hover:text-violet-400 transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>
          <a href="#vacancies" className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
            Смотреть вакансии
          </a>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0e0e20] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-violet-400 transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${OFFICE_IMG})`, filter: "brightness(0.18) saturate(1.5)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-transparent to-[#070711]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/15 blur-[100px]" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto" style={{ animation: "fade-up 0.8s ease-out 0.2s both" }}>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-white/60 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Открыто {VACANCIES.length} вакансий
          </div>
          <h1 className="font-display text-6xl md:text-8xl font-bold leading-none tracking-tight mb-6">
            <span className="block text-white">СТРОЙ БУДУЩЕЕ</span>
            <span
              className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
              style={{ backgroundSize: "200%", animation: "gradient-shift 6s ease infinite" }}
            >
              ВМЕСТЕ С НАМИ
            </span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Мы создаём продукты, меняющие жизнь людей. Присоединяйся к команде, где каждый голос слышен, а работа — настоящее удовольствие.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#vacancies"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-all hover:scale-105 text-lg"
              style={{ animation: "glow-pulse 3s ease-in-out infinite" }}
            >
              <Icon name="Briefcase" size={20} />
              Открытые вакансии
            </a>
            <a
              href="#culture"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white/80 font-semibold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm text-lg"
            >
              Наша культура
              <Icon name="ArrowRight" size={20} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2" style={{ animation: "float 4s ease-in-out infinite" }}>
          <Icon name="ChevronDown" size={28} className="text-white/30" />
        </div>
      </div>

      {/* ABOUT */}
      <Section id="about" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-violet-400 font-display text-sm tracking-widest uppercase mb-4">О компании</p>
              <h2 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6">
                Мы — команда,<br />
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">одержимая качеством</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-6">
                С 2018 года мы разрабатываем цифровые продукты нового поколения. Более 200 человек в команде, офисы в Москве и Петербурге, и клиенты по всему миру.
              </p>
              <p className="text-white/50 text-lg leading-relaxed">
                Наша миссия — создавать технологии, которые реально меняют опыт людей. Мы не делаем просто «сайты» — мы строим экосистемы.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-10">
                {[["200+", "сотрудников"], ["50M+", "пользователей"], ["6 лет", "на рынке"]].map(([val, label]) => (
                  <div key={label}>
                    <div className="font-display text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{val}</div>
                    <div className="text-white/40 text-sm mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 rounded-3xl blur-xl" />
              <img
                src={OFFICE_IMG}
                alt="Наш офис"
                className="relative rounded-2xl w-full object-cover h-80 md:h-96"
                style={{ filter: "saturate(1.2) brightness(0.9)" }}
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
            </div>
          </div>
        </div>
      </Section>

      {/* VACANCIES */}
      <Section id="vacancies" className="py-28 px-6 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-violet-400 font-display text-sm tracking-widest uppercase mb-4">Вакансии</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">Найди своё место</h2>
            <p className="text-white/40 text-lg">Выбери роль, в которой раскроешься на полную</p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setActiveFilter(d)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === d
                    ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((v, i) => (
              <div
                key={i}
                className="group relative bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-violet-500/40 transition-all duration-300 hover:bg-white/6 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-cyan-500/0 group-hover:from-violet-600/5 group-hover:to-cyan-500/5 transition-all duration-300 rounded-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full font-medium">
                      {v.dept}
                    </span>
                    <span className="text-xs text-white/30 flex items-center gap-1">
                      <Icon name="MapPin" size={12} />
                      {v.type}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-cyan-400 font-semibold text-lg mb-5">{v.salary}</p>
                  <button className="w-full py-2.5 border border-white/10 rounded-xl text-sm text-white/60 hover:border-violet-500/50 hover:text-white transition-all">
                    Откликнуться
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CULTURE */}
      <Section id="culture" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-cyan-400 font-display text-sm tracking-widest uppercase mb-4">Наша культура</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">Как мы работаем</h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">Принципы, по которым живёт и дышит наша команда каждый день</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CULTURE_CARDS.map((c, i) => (
              <div
                key={i}
                className="relative group bg-gradient-to-b from-white/5 to-white/2 border border-white/8 rounded-2xl p-7 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-4xl mb-4">{c.emoji}</div>
                <h3 className="font-display text-xl font-semibold mb-2 text-white">{c.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* BENEFITS */}
      <Section id="benefits" className="py-28 px-6 relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-14">
            <p className="text-fuchsia-400 font-display text-sm tracking-widest uppercase mb-4">Преимущества</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">Почему у нас круто</h2>
            <p className="text-white/40 text-lg">Всё, что делает работу комфортной и вдохновляющей</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                className="group flex gap-5 bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-fuchsia-500/30 transition-all duration-300 hover:bg-white/5"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/30 to-cyan-500/30 border border-white/10 flex items-center justify-center group-hover:from-violet-600/50 group-hover:to-cyan-500/50 transition-all">
                  <Icon name={b.icon} size={22} className="text-violet-300" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white mb-1">{b.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* REVIEWS */}
      <Section id="reviews" className="py-28 px-6 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-cyan-400 font-display text-sm tracking-widest uppercase mb-4">Отзывы</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">Говорит команда</h2>
            <p className="text-white/40 text-lg">Живые истории от тех, кто уже внутри</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="relative bg-white/3 border border-white/8 rounded-2xl p-7 overflow-hidden group hover:border-white/15 transition-all duration-300"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${r.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                <div className="relative">
                  <Icon name="Quote" size={28} className="text-white/10 mb-4" />
                  <p className="text-white/60 leading-relaxed mb-6 text-sm">{r.text}</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center font-display font-bold text-white text-sm`}>
                      {r.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{r.name}</div>
                      <div className="text-white/30 text-xs">{r.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACTS */}
      <Section id="contacts" className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-violet-900/40 to-cyan-900/20 border border-white/10 rounded-3xl p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-fuchsia-600/5 to-cyan-600/10 rounded-3xl" />
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />
            <div className="relative">
              <p className="text-violet-400 font-display text-sm tracking-widest uppercase mb-4">Контакты</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Готов стартовать?</h2>
              <p className="text-white/50 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                Напиши нам — расскажем о вакансиях подробнее и ответим на любые вопросы о команде и процессах.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <input
                  type="text"
                  placeholder="Твоё имя"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold px-10 py-4 rounded-2xl hover:opacity-90 transition-all hover:scale-105 text-lg">
                <Icon name="Send" size={20} />
                Отправить заявку
              </button>
              <div className="mt-8 flex flex-wrap gap-6 justify-center text-white/30 text-sm">
                <a href="mailto:hr@orbit.team" className="flex items-center gap-2 hover:text-violet-400 transition-colors">
                  <Icon name="Mail" size={16} />
                  hr@orbit.team
                </a>
                <a href="tel:+74951234567" className="flex items-center gap-2 hover:text-violet-400 transition-colors">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </a>
                <span className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Москва, Пресненская наб. 12
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/20 text-sm">
          <span className="font-display text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">ORBIT</span>
          <span>© 2024 Orbit. Все права защищены.</span>
          <div className="flex flex-wrap gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-white/50 transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}