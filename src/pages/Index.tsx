import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const OFFICE_IMG = "https://cdn.poehali.dev/projects/bd4e4f85-e9e8-4660-ba87-151e5adcbe77/files/77a394a0-2259-432b-a032-24d534e52e88.jpg";
const LOGO_IMG = "https://cdn.poehali.dev/projects/bd4e4f85-e9e8-4660-ba87-151e5adcbe77/bucket/9f87a5cf-f144-4da5-8c2b-8a99ad4af7d0.jpg";

const NAV_LINKS = [
  { label: "О компании", href: "#about" },
  { label: "Вакансии", href: "#vacancies" },
  { label: "Культура", href: "#culture" },
  { label: "Преимущества", href: "#benefits" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const VACANCIES = [
  { title: "Продавец-консультант", dept: "Розница", type: "г. Новочеркасск", salary: "от 50 000 ₽" },
  { title: "Продавец-консультант", dept: "Розница", type: "Военвед", salary: "от 50 000 ₽" },
  { title: "Старший продавец", dept: "Розница", type: "Офис", salary: "от 65 000 ₽" },
  { title: "Управляющий магазином", dept: "Управление", type: "Офис", salary: "от 90 000 ₽" },
  { title: "Менеджер по продажам B2B", dept: "Продажи", type: "Офис / Разъезды", salary: "от 80 000 ₽" },
  { title: "Специалист сервисного центра", dept: "Сервис", type: "Офис", salary: "от 55 000 ₽" },
];

const BENEFITS = [
  { icon: "TrendingUp", title: "Карьерный рост", desc: "Реальный путь от продавца до управляющего — у нас много историй успеха внутри команды" },
  { icon: "Banknote", title: "Прозрачный доход", desc: "Оклад + % с продаж без потолка. Чем больше продаёшь — тем больше зарабатываешь" },
  { icon: "GraduationCap", title: "Обучение за счёт компании", desc: "Тренинги по продажам, продуктовое обучение от Samsung, Xiaomi, МТС и Билайн" },
  { icon: "Users", title: "Команда как семья", desc: "22 года вместе — люди приходят и остаются. Коллектив, которому можно доверять" },
  { icon: "MapPin", title: "Удобное расположение", desc: "Магазины по всей Ростовской области — работай рядом с домом" },
  { icon: "Gift", title: "Скидки на технику", desc: "Сотрудники покупают смартфоны и гаджеты по специальным корпоративным ценам" },
];

const REVIEWS = [
  {
    name: "Алёна Ткачёва",
    role: "Управляющая магазином, 5 лет",
    text: "Пришла продавцом-консультантом, через три года стала управляющей. Здесь реально видят тех, кто работает и хочет расти.",
    avatar: "А",
    color: "from-orange-500 to-amber-400",
  },
  {
    name: "Михаил Дорофеев",
    role: "Старший продавец, 2 года",
    text: "Нравится, что компания давно на рынке и стабильная. Зарплата всегда вовремя, руководство адекватное, коллеги поддерживают.",
    avatar: "М",
    color: "from-orange-600 to-red-500",
  },
  {
    name: "Светлана Крымова",
    role: "Менеджер по продажам, 3 года",
    text: "Работаю с корпоративными клиентами — интересно и доходно. Компания даёт все инструменты, остальное зависит от тебя.",
    avatar: "С",
    color: "from-amber-400 to-orange-500",
  },
];

const CULTURE_CARDS = [
  { emoji: "🤝", title: "Мы — семья", desc: "100 человек, которые знают друг друга по именам и всегда помогут" },
  { emoji: "📈", title: "Растём вместе", desc: "Компания открывает новые магазины — значит, открываются и новые возможности" },
  { emoji: "🏆", title: "Лидеры региона", desc: "22 года на рынке — безусловный лидер среди независимых ритейлеров Юга России" },
  { emoji: "💡", title: "Честность и доверие", desc: "Прозрачные условия, понятные KPI и руководство, которое слышит сотрудников" },
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
    <div className="min-h-screen bg-white text-gray-900 font-body overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm" : "bg-white/80 backdrop-blur-md"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="shrink-0">
            <img src={LOGO_IMG} alt="Цифроград" className="h-9 w-auto" />
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-gray-500 hover:text-orange-500 transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>
          <a href="#vacancies" className="hidden md:inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors shadow-sm">
            Смотреть вакансии
          </a>
          <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-lg">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-orange-500 transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${OFFICE_IMG})`, filter: "brightness(0.25) saturate(0.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-gray-950" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/20 blur-[120px]" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto" style={{ animation: "fade-up 0.8s ease-out 0.2s both" }}>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-orange-400/30 rounded-full px-4 py-1.5 text-sm text-white/70 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            Открыто {VACANCIES.length} вакансий
          </div>
          <h1 className="font-display text-6xl md:text-8xl font-bold leading-none tracking-tight mb-6">
            <span className="block text-white">РАБОТА В ЛИДЕРЕ</span>
            <span
              className="block bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent"
              style={{ backgroundSize: "200%", animation: "gradient-shift 6s ease infinite" }}
            >
              СОТОВОГО РИТЕЙЛА
            </span>
          </h1>
          <p className="text-white/55 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            «Цифроград» — это 22 года на рынке, 100 сотрудников и сеть магазинов по всей Ростовской области. Магазины Xiaomi, Samsung, МТС и Билайн — всё под одной крышей.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#vacancies"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:scale-105 text-lg shadow-lg shadow-orange-500/30"
            >
              <Icon name="Briefcase" size={20} />
              Открытые вакансии
            </a>
            <a
              href="#culture"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white/85 font-semibold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all backdrop-blur-sm text-lg"
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
      <Section id="about" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-orange-500 font-display text-sm tracking-widest uppercase mb-4">О компании</p>
              <h2 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
                Лидер сотового<br />
                <span className="text-orange-500">ритейла Юга России</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                С 2002 года «Цифроград» непрерывно развивается: открываются новые магазины, появляются новые услуги. Мы — семья магазинов под собственным брендом, а также официальные фирменные магазины Xiaomi и Samsung.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed">
                Дополнительно развиваем дилерские магазины МТС и Билайн по всей Ростовской области. Наш штат — 100 человек, и мы продолжаем расти.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-10">
                {[["2002", "год основания"], ["100+", "сотрудников"], ["№1", "в регионе"]].map(([val, label]) => (
                  <div key={label}>
                    <div className="font-display text-3xl font-bold text-orange-500">{val}</div>
                    <div className="text-gray-400 text-sm mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-orange-100 rounded-3xl" />
              <img
                src={OFFICE_IMG}
                alt="Наш офис"
                className="relative rounded-2xl w-full object-cover h-80 md:h-96"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-orange-200" />
            </div>
          </div>
        </div>
      </Section>

      {/* VACANCIES */}
      <Section id="vacancies" className="py-28 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-500 font-display text-sm tracking-widest uppercase mb-4">Вакансии</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 text-gray-900">Найди своё место</h2>
            <p className="text-gray-400 text-lg">Выбери роль, в которой раскроешься на полную</p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setActiveFilter(d)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === d
                    ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                    : "bg-white text-gray-500 hover:bg-orange-50 hover:text-orange-500 border border-gray-200"
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
                className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-orange-500 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full font-medium">
                    {v.dept}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Icon name="MapPin" size={12} />
                    {v.type}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
                  {v.title}
                </h3>
                <p className="text-orange-500 font-semibold text-lg mb-5">{v.salary}</p>
                <button className="w-full py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50 transition-all">
                  Откликнуться
                </button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CULTURE */}
      <Section id="culture" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-500 font-display text-sm tracking-widest uppercase mb-4">Наша культура</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 text-gray-900">Как мы работаем</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Принципы, по которым живёт и дышит наша команда каждый день</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CULTURE_CARDS.map((c, i) => (
              <div
                key={i}
                className="group bg-gray-50 border border-gray-100 rounded-2xl p-7 hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{c.emoji}</div>
                <h3 className="font-display text-xl font-semibold mb-2 text-gray-800 group-hover:text-orange-500 transition-colors">{c.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* BENEFITS */}
      <Section id="benefits" className="py-28 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-500 font-display text-sm tracking-widest uppercase mb-4">Преимущества</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 text-gray-900">Почему у нас круто</h2>
            <p className="text-gray-400 text-lg">Всё, что делает работу комфортной и вдохновляющей</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                className="group flex gap-5 bg-white border border-gray-100 rounded-2xl p-6 hover:border-orange-200 hover:shadow-md hover:shadow-orange-50 transition-all duration-300"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-500 transition-all">
                  <Icon name={b.icon} size={22} className="text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-gray-800 mb-1">{b.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* REVIEWS */}
      <Section id="reviews" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-500 font-display text-sm tracking-widest uppercase mb-4">Отзывы</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 text-gray-900">Говорит команда</h2>
            <p className="text-gray-400 text-lg">Живые истории от тех, кто уже внутри</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-7 hover:border-orange-200 hover:shadow-md hover:shadow-orange-50 transition-all duration-300"
              >
                <Icon name="Quote" size={28} className="text-orange-200 mb-4" />
                <p className="text-gray-600 leading-relaxed mb-6 text-sm">{r.text}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center font-display font-bold text-white text-sm`}>
                    {r.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{r.name}</div>
                    <div className="text-gray-400 text-xs">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACTS */}
      <Section id="contacts" className="py-28 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white border border-gray-100 rounded-3xl p-10 md:p-14 text-center shadow-xl shadow-orange-50 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500" />
            <div className="relative">
              <p className="text-orange-500 font-display text-sm tracking-widest uppercase mb-4">Контакты</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">Готов к нам?</h2>
              <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                Оставь заявку — наш HR свяжется с тобой, расскажет о подходящих вакансиях и ответит на все вопросы.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <input
                  type="text"
                  placeholder="Твоё имя"
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors"
                />
              </div>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-2xl transition-all hover:scale-105 text-lg shadow-lg shadow-orange-200">
                <Icon name="Send" size={20} />
                Отправить заявку
              </button>
              <div className="mt-8 flex flex-wrap gap-6 justify-center text-gray-400 text-sm">
                <a href="mailto:hr@cifrograd.ru" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                  <Icon name="Mail" size={16} />
                  hr@cifrograd.ru
                </a>
                <span className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Ростовская область
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-8 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
          <img src={LOGO_IMG} alt="Цифроград" className="h-7 w-auto" />
          <span>© 2002–2024 Цифроград. Все права защищены.</span>
          <div className="flex flex-wrap gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-orange-500 transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
