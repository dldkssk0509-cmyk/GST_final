import type React from "react";
import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import { esgItems, irItems, merits, navItems, newsItems, products } from "./data";
import heroVideoSrc from "./assets/hero.mp4";
import heroPosterSrc from "./assets/hero-poster.png";

const fadeUp = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0 },
};

const aboutMenuItems = [
  { label: "기업 개요", href: "/company-overview/index.html" },
  { label: "비전 & 미션", href: "#about" },
  { label: "핵심 가치", href: "#about" },
  { label: "CEO 메시지", href: "#about" },
  { label: "글로벌 네트워크", href: "#about" },
  { label: "특허 및 인증", href: "#about" },
];

function Reveal({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 86%", "end 18%"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });
  const opacity = useTransform(smoothProgress, [0, 0.18, 0.88, 1], [0, 1, 1, 0.96]);
  const y = useTransform(smoothProgress, [0, 0.22, 1], [42, 0, -8]);

  return (
    <section
      ref={ref}
      id={id}
      className={className}
    >
      <motion.div
        className="h-full"
        style={{ opacity, y }}
      >
        {children}
      </motion.div>
    </section>
  );
}

function SequenceItem({
  children,
  className = "",
  index,
  progress,
  step = 0.14,
  start = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  index: number;
  progress: MotionValue<number>;
  step?: number;
  start?: number;
}) {
  const itemStart = start + index * step;
  const itemEnd = Math.min(itemStart + 0.24, 0.98);
  const opacity = useTransform(progress, [itemStart, itemEnd], [0, 1]);
  const y = useTransform(progress, [itemStart, itemEnd], [34, 0]);

  return (
    <motion.div className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);

  return (
    <header className="absolute left-0 top-0 z-30 w-full px-[clamp(24px,3.2vw,46px)] py-6 text-white">
      <div className="mx-auto flex max-w-[1319px] items-center justify-between">
        <img src="/assets/logo.png" alt="GST" className="h-[31px] w-[83px] object-contain" />
        <nav className="hidden items-center gap-[clamp(24px,3.9vw,57px)] text-[16px] uppercase tracking-[0px] lg:flex">
          {navItems.map((item) =>
            item === "ABOUT" ? (
              <div key={item} className="group relative py-2">
                <a
                  href="#about"
                  className="inline-flex items-center transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66a8ff]"
                >
                  {item}
                </a>
                <div className="pointer-events-none absolute left-1/2 top-full w-[214px] -translate-x-1/2 translate-y-2 rounded-[8px] border border-white/10 bg-[#06141d]/78 px-3 py-3 opacity-0 shadow-[0_24px_60px_rgba(0,0,0,0.42)] ring-1 ring-[#61a9ff]/10 backdrop-blur-xl transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:translate-y-1 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-1 group-focus-within:opacity-100">
                  <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-white/10 bg-[#06141d]/78 backdrop-blur-xl" />
                  {aboutMenuItems.map((menuItem) => (
                    <a
                      key={menuItem.label}
                      href={menuItem.href}
                      className="group/item relative flex min-h-[38px] items-center border-b border-white/[0.07] px-2 text-[14px] font-medium text-white/78 transition-all duration-200 last:border-b-0 hover:translate-x-1 hover:text-white focus-visible:translate-x-1 focus-visible:text-white focus-visible:outline-none"
                    >
                      <span className="mr-3 h-px w-4 bg-white/18 transition-all duration-200 group-hover/item:w-6 group-hover/item:bg-[#6eb2ff] group-focus-visible/item:w-6 group-focus-visible/item:bg-[#6eb2ff]" />
                      {menuItem.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item} href={`#${item.toLowerCase().replace("&", "and")}`} className="transition-colors hover:text-white/70">
                {item}
              </a>
            ),
          )}
        </nav>
        <button
          aria-label="menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="grid size-8 place-items-center text-white transition-opacity hover:opacity-70"
        >
          <Menu size={31} strokeWidth={1.8} />
        </button>
      </div>
      <div
        className={`absolute left-[clamp(24px,3.2vw,46px)] right-[clamp(24px,3.2vw,46px)] top-[calc(100%-10px)] overflow-hidden rounded-[10px] border border-white/10 bg-[#06141d]/82 shadow-[0_24px_60px_rgba(0,0,0,0.42)] ring-1 ring-[#61a9ff]/10 backdrop-blur-xl transition-all duration-200 lg:hidden ${
          isMobileMenuOpen ? "max-h-[520px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 py-3 text-[15px] font-medium uppercase tracking-[0px]">
          {navItems.map((item) =>
            item === "ABOUT" ? (
              <div key={item} className="border-b border-white/[0.07]">
                <button
                  type="button"
                  aria-expanded={isMobileAboutOpen}
                  onClick={() => setIsMobileAboutOpen((open) => !open)}
                  className="flex w-full items-center justify-between py-3 text-left text-white transition-colors hover:text-[#8dc4ff]"
                >
                  <span>{item}</span>
                  <span className={`text-[18px] leading-none transition-transform duration-200 ${isMobileAboutOpen ? "rotate-45 text-[#8dc4ff]" : ""}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${isMobileAboutOpen ? "max-h-[280px] pb-3" : "max-h-0"}`}>
                  <div className="space-y-1 border-l border-[#6eb2ff]/35 pl-4">
                    {aboutMenuItems.map((menuItem) => (
                      <a
                        key={menuItem.label}
                        href={menuItem.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-[14px] normal-case text-white/70 transition-all duration-200 hover:translate-x-1 hover:text-white"
                      >
                        {menuItem.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item}
                href={`#${item.toLowerCase().replace("&", "and")}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block border-b border-white/[0.07] py-3 transition-colors last:border-b-0 hover:text-[#8dc4ff]"
              >
                {item}
              </a>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <Reveal className="relative h-[min(716px,82vh)] min-h-[560px] overflow-hidden bg-[#09171f]">
      <Header />
      {!isVideoLoaded && (
        <img
          src={heroPosterSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setIsVideoLoaded(true)}
        onCanPlay={() => setIsVideoLoaded(true)}
      />
      <div className="absolute inset-0 bg-[rgba(1,9,14,0.24)]" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-8 text-center text-white">
        <motion.p
          className="mb-[14px] text-[clamp(16px,1.4vw,20px)] font-medium uppercase"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          보이지 않는 제어로, 공정의 완벽을 만들다
        </motion.p>
        <motion.h1
          className="max-w-[900px] text-[clamp(42px,4.45vw,64px)] font-bold uppercase leading-[1.15]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.82, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Invisible Control,
          <br />
          Perfect Processes
        </motion.h1>
      </div>
    </Reveal>
  );
}

function MeritSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 32%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 95, damping: 25, mass: 0.35 });

  return (
    <Reveal id="about" className="bg-[#09171f] px-6 pb-[116px] pt-[129px] text-white md:pb-[117px] md:pt-[135px]">
      <div ref={ref} className="section-wrap">
        <motion.h2
          className="text-center text-[clamp(34px,3.35vw,48px)] font-bold uppercase leading-tight"
          variants={fadeUp}
          transition={{ duration: 0.7 }}
        >
          Beyond Precision,
          <br />
          Toward Innovation
        </motion.h2>
        <div className="mx-auto mt-[116px] grid max-w-[1168px] grid-cols-1 gap-12 md:grid-cols-3 md:gap-0">
          {merits.map((item, index) => (
            <SequenceItem
              key={item.index}
              className="diamond-card group relative flex h-[280px] flex-col items-center justify-center gap-6 text-center transition-transform duration-300 hover:-translate-y-2 md:h-[337px]"
              index={index}
              progress={progress}
              start={0.08}
              step={0.2}
            >
              <h3 className="relative z-10 text-[clamp(20px,1.7vw,24px)] font-medium uppercase transition-colors duration-300 group-hover:text-white">
                {item.title}
              </h3>
              <p className="relative z-10 text-[20px] font-medium uppercase text-white/90 transition-colors duration-300">{item.index}</p>
            </SequenceItem>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function ProductSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 74%", "end 28%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  return (
    <Reveal id="products" className="bg-[#09171f] px-6 pb-0 pt-[1px] text-white">
      <div ref={ref} className="section-wrap">
        <div className="space-y-0">
          {products.map((product, index) => (
            <SequenceItem
              key={product.title}
              className="py-12 lg:py-0"
              index={index}
              progress={progress}
              start={0.05}
              step={0.26}
            >
              <article className="grid min-h-[581px] items-center gap-[50px] lg:grid-cols-[minmax(420px,602px)_minmax(460px,666px)]">
                <div>
                  <p className="mb-[14px] text-[20px] font-bold uppercase">{product.eyebrow}</p>
                  <h2 className="text-[48px] font-bold leading-tight">{product.title}</h2>
                  <p className="mt-[21px] max-w-[602px] text-[clamp(19px,1.7vw,24px)] font-medium leading-normal">{product.description}</p>
                </div>
                <div className="overflow-hidden">
                  <img src={product.image} alt={product.title} className="aspect-[666/581] w-full object-cover" />
                </div>
              </article>
            </SequenceItem>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function RndSection() {
  return (
    <Reveal id="r&d" className="relative h-[681px] overflow-hidden text-white">
      <img src="/assets/rnd.png" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-black/10" />
      <div className="section-wrap relative h-full px-[clamp(24px,4.2vw,60px)]">
        <h2 className="absolute left-[clamp(24px,4.2vw,60px)] top-[60px] text-[48px] font-bold uppercase">R&D</h2>
        <div className="absolute left-[50%] top-[48.5%] max-w-[657px] translate-y-[28px] pr-6 max-lg:left-6 max-lg:top-[52%] max-lg:translate-y-0">
          <h3 className="text-[clamp(28px,2.55vw,36px)] font-medium uppercase leading-tight">
            끊임없는 연구개발, 흔들림 없는
            <br />
            글로벌 경쟁력
          </h3>
          <p className="mt-5 text-[clamp(17px,1.4vw,20px)] font-medium uppercase">
            친환경 기술로 에너지 소비를 절감하고, 지속 가능한 산업 발전을 선도합니다.
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function EsgSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 34%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 95, damping: 25, mass: 0.35 });

  return (
    <Reveal id="esg" className="bg-white px-6 py-[124px] text-black">
      <div ref={ref} className="section-wrap">
        <h2 className="text-[48px] font-bold uppercase">ESG</h2>
        <div className="mt-[72px] max-w-[1031px] space-y-[45px]">
          {esgItems.map((item, index) => (
            <SequenceItem
              key={item.label}
              className="group grid cursor-default grid-cols-1 gap-4 rounded-sm px-0 py-2 transition-colors duration-300 hover:bg-[#f6f8fa] md:grid-cols-[185px_1fr] md:gap-[66px]"
              index={index}
              progress={progress}
              start={0.1}
              step={0.22}
            >
              <article className="contents">
                <h3 className="text-[clamp(34px,3.35vw,48px)] font-bold text-[#979797] transition-colors duration-300 group-hover:text-[#111]">
                  {item.label}
                </h3>
                <p className="self-center text-[clamp(22px,2.25vw,32px)] font-medium text-[#979797] transition-colors duration-300 group-hover:text-[#222]">
                  {item.text}
                </p>
              </article>
            </SequenceItem>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function NewsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 82%", "end 36%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 95, damping: 25, mass: 0.35 });

  return (
    <Reveal id="insights" className="bg-[#ededed] px-6 py-[30px]">
      <div ref={ref} className="section-wrap">
        <h2 className="text-[clamp(38px,3.35vw,48px)] font-bold capitalize">news & notices</h2>
        <div className="mt-[35px] grid bg-white px-[clamp(24px,2.85vw,41px)] py-[clamp(34px,5vw,74px)] md:grid-cols-3">
          {newsItems.map((item, index) => (
            <SequenceItem
              key={item.title}
              className="group min-h-[139px] border-[#d9d9d9] py-2 transition-transform duration-300 hover:-translate-y-1 md:border-r md:px-9 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              index={index}
              progress={progress}
              start={0.12}
              step={0.18}
            >
              <article>
                <p className="text-[14px] font-medium text-[#006fff]">{item.date}</p>
                <h3 className="mt-[14px] min-h-[56px] text-[16px] font-medium leading-normal text-black transition-colors group-hover:text-[#006fff]">
                  {item.title}
                </h3>
                <p className="mt-8 text-[16px] font-medium text-[#979797] transition-colors group-hover:text-black">view +</p>
              </article>
            </SequenceItem>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function IrSection() {
  return (
    <Reveal id="ir" className="bg-white px-6 py-[126px]">
      <div className="section-wrap grid gap-[80px] lg:grid-cols-[567px_528px] lg:justify-center lg:gap-[103px]">
        <motion.article className="group min-w-0" whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
          <h2 className="mb-[19px] text-[20px] font-medium">주가정보</h2>
          <div className="relative min-h-[508px] w-full overflow-hidden text-white">
            <img src="/assets/stock.png" alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-black/5" />
            <h3 className="relative px-[clamp(24px,7vw,42px)] pt-[54px] text-[32px] font-medium leading-tight">
              투자자와 함께하는
              <br />
              글로벌 성장 여정
            </h3>
            <div className="relative mt-10 space-y-[9px] px-[clamp(24px,7vw,42px)] text-black">
              {[
                ["전일종가", "48,500"],
                ["전일대비", "-1,100"],
                ["등락률", "-2.22%"],
                ["거래량", "381,051"],
              ].map(([label, value]) => (
                <div key={label} className="flex h-[48px] items-center justify-between rounded-full bg-white px-7 text-[13px] font-medium">
                  <span>{label}</span>
                  <span className={label === "전일종가" ? "text-[19px] text-red-600" : ""}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.article>
        <motion.article className="group min-w-0" whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
          <h2 className="mb-[26px] text-[20px] font-medium">IR</h2>
          <div className="border-y border-black/30">
            {irItems.map((item) => (
              <a key={item.title} href="#" className="block border-b border-black/20 py-[22px] transition-colors last:border-b-0 hover:bg-[#f7f9fb]">
                <span className="inline-flex rounded-full bg-[#006fff] px-[10px] py-[5px] text-[9px] font-medium text-white">IR자료</span>
                <p className="mt-[15px] truncate text-[16px] font-medium text-black">{item.title}</p>
                <p className="mt-[10px] text-[9px] font-medium text-[#666]">{item.date}</p>
              </a>
            ))}
          </div>
        </motion.article>
      </div>
    </Reveal>
  );
}

function CareersSection() {
  return (
    <Reveal id="careers" className="relative h-[623px] overflow-hidden text-white">
      <img src="/assets/careers.png" alt="" className="absolute inset-0 h-full w-full object-cover object-bottom transition-transform duration-700 hover:scale-[1.025]" />
      <div className="career-overlay absolute inset-0" />
      <div className="section-wrap relative h-full px-[clamp(24px,8.5vw,123px)] pt-[70px]">
        <h2 className="text-[clamp(32px,2.8vw,40px)] font-bold">Cool the Future with Us</h2>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-black/31 backdrop-blur-[1px]">
        <div className="section-wrap flex flex-col gap-5 px-[clamp(24px,8.5vw,123px)] py-[21px] md:h-[101px] md:flex-row md:items-center">
          <p className="text-[20px] font-medium">현재 진행중인 공고</p>
          <div className="flex flex-1 flex-wrap items-center gap-7 md:ml-[64px]">
            {[
              ["신입", "2"],
              ["경력", "2"],
              ["인턴", "0"],
            ].map(([label, count]) => (
              <div key={label} className="flex items-end gap-5 border-white/50 pr-7 md:border-r">
                <span className="pb-2 text-[20px] font-medium">{label}</span>
                <span className="text-[48px] font-bold leading-none">{count}</span>
                <span className="pb-1 text-[20px] font-medium">건</span>
              </div>
            ))}
          </div>
          <a href="#" className="group inline-flex h-[52px] w-[222px] items-center justify-center gap-3 border border-white text-[20px] font-medium transition-colors hover:bg-white hover:text-black">
            공고보러가기
            <ArrowRight size={25} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function Footer() {
  return (
    <footer className="bg-black px-6 py-[44px] text-[14px] font-medium text-white">
      <div className="section-wrap flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-[13px]">
          <p>
            <span className="mr-8">Address</span> 경기도 화성시 동탄산단6길 15-13
          </p>
          <p>
            <span className="mr-[58px]">Tel</span> 031-371-2200
          </p>
          <p>
            <span className="mr-[52px]">Fax</span> 031-371-2300
          </p>
        </div>
        <div className="flex flex-col gap-5 md:items-end">
          <a className="rounded-full bg-white/25 px-[19px] py-[9px]" href="#">
            개인정보처리방침
          </a>
          <p>Copyright ⓒ Global Standard Technology All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <MeritSection />
      <ProductSection />
      <RndSection />
      <EsgSection />
      <NewsSection />
      <IrSection />
      <CareersSection />
      <Footer />
    </main>
  );
}
