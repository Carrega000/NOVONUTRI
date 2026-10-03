"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./cinematic-landing-hero.css";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* Adaptação do CinematicHero fornecido pelo usuário.
   Mantidos: seção pinada, cartão expansível, entrada 3D do celular,
   widgets escalonados, contadores, badges, recuo e saída do cartão.
   scrub:true faz o estado depender diretamente do scroll, sem atraso.
   Não há intro automática, loop de flutuação ou movimento pelo mouse. */
export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  mealImage?: string;
}

function Icon({ name, className = "" }: { name: "camera" | "home" | "chart" | "drop" | "flame" | "walk"; className?: string }) {
  const paths = {
    camera: <><path d="M4 6h4l2-3h4l2 3h4v15H4z" /><circle cx="12" cy="13" r="4" /></>,
    home: <path d="m3 10 9-7 9 7v11h-6v-7H9v7H3z" />,
    chart: <path d="M4 20V10h5v10m1 0V4h5v16m1 0v-7h5v7M2 20h21" />,
    drop: <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13z" />,
    flame: <path d="M12 2c1 6 7 7 7 13a7 7 0 0 1-14 0c0-3 2-5 4-7-1 4 2 5 3 5 2-4 0-7 0-11z" />,
    walk: <><circle cx="14" cy="4" r="2" /><path d="m6 12 5-3 4 4 5 1M11 9l-1 7-5 5m5-5 6 5m-3-9 2-3" /></>,
  };
  return <svg className={`nc-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export function CinematicHero({
  brandName = "Nutri",
  tagline1 = "Acompanhe sua alimentação",
  tagline2 = "com apenas uma foto",
  cardHeading = "Seu prato. Seus dados. Seu progresso.",
  cardDescription = <>Registre suas refeições e acompanhe calorias, proteínas, carboidratos e gorduras em uma única visão.</>,
  metricValue = 1250,
  metricLabel = "kcal consumidas",
  ctaHeading = "Sua alimentação, mais simples.",
  ctaDescription = "Da primeira foto aos hábitos do dia a dia. Conheça os recursos para acompanhar sua rotina.",
  mealImage = "/images/almoco-brasileiro.png",
  className = "",
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const endMetric = Number.isFinite(metricValue) ? Math.max(0, metricValue) : 1250;

  useEffect(() => {
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add({
        mobile: "(max-width: 767px)",
        desktop: "(min-width: 768px)",
        reduce: "(prefers-reduced-motion: reduce)",
      }, (context) => {
        const { mobile, reduce } = context.conditions!;
        const root = containerRef.current!;
        const select = gsap.utils.selector(root);
        const formatted = new Intl.NumberFormat("pt-BR");
        const counters = { calories: 0, protein: 0, carbs: 0, fat: 0 };
        const drawCounters = () => {
          const values = [counters.calories, counters.protein, counters.carbs, counters.fat];
          [".counter-val", ".protein-val", ".carbs-val", ".fat-val"].forEach((selector, index) => {
            const el = root.querySelector(selector);
            if (el) el.textContent = formatted.format(Math.round(values[index]));
          });
        };
        const ringEnd = 402 * (1 - Math.min(endMetric / 2000, 1));
        const macroTargets = [125.664 * (1 - 85 / 130), 125.664 * (1 - 160 / 250), 125.664 * (1 - 30 / 65)];

        // Reduced motion: same content in normal document flow, no pinned section.
        if (reduce) {
          Object.assign(counters, { calories: endMetric, protein: 85, carbs: 160, fat: 30 });
          drawCounters();
          gsap.set(select(".progress-ring"), { strokeDashoffset: ringEnd });
          gsap.set(select(".macro-progress"), { strokeDashoffset: (index: number) => macroTargets[index] });
          return;
        }

        // The opening title is readable immediately; all movement below belongs to scrollTl.
        gsap.set(select(".main-card"), { y: window.innerHeight + 200, autoAlpha: 1 });
        gsap.set(select(".card-left-text, .card-right-text, .mockup-scroll-wrapper, .floating-badge, .phone-widget"), { autoAlpha: 0 });
        gsap.set(select(".cta-wrapper"), { autoAlpha: 0, scale: .8, filter: "blur(30px)" });
        gsap.set(select(".progress-ring"), { strokeDashoffset: 402 });
        gsap.set(select(".macro-progress"), { strokeDashoffset: 125.664 });
        drawCounters();

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => mobile ? "+=5400" : "+=7000",
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: self => {
              root.style.setProperty("--story-progress", String(self.progress));
              // Avoid focusing CTA links while the foreground card still covers them.
              const cta = root.querySelector<HTMLElement>(".cta-wrapper");
              if (cta) cta.inert = self.progress < .965;
            },
          },
        });

        // Original cinematic sequence and overlap timings.
        scrollTl
          .to(select(".hero-text-wrapper, .bg-grid-theme"), { scale: 1.15, filter: "blur(20px)", opacity: .2, ease: "power2.inOut", duration: 2 }, 0)
          .to(select(".scroll-hint"), { autoAlpha: 0, duration: .7 }, 0)
          .to(select(".main-card"), { y: 0, ease: "power3.inOut", duration: 2 }, 0)
          .to(select(".main-card"), { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
          .fromTo(select(".mockup-scroll-wrapper"),
            { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: .6 },
            { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8")
          .fromTo(select(".phone-widget"), { y: 40, autoAlpha: 0, scale: .95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: .12, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
          .to(select(".progress-ring"), { strokeDashoffset: ringEnd, duration: 2, ease: "power3.inOut" }, "-=1.2")
          .to(select(".macro-progress"), { strokeDashoffset: (index: number) => macroTargets[index], duration: 2, ease: "power3.inOut" }, "<")
          .to(counters, { calories: endMetric, protein: 85, carbs: 160, fat: 30, duration: 2, ease: "expo.out", onUpdate: drawCounters }, "<")
          .fromTo(select(".floating-badge"), { y: 100, autoAlpha: 0, scale: .7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: .2 }, "-=2.0")
          .fromTo(select(".card-left-text"), { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
          .fromTo(select(".card-right-text"), { x: 50, autoAlpha: 0, scale: .8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
          .to({}, { duration: 2.5 })
          .set(select(".hero-text-wrapper"), { autoAlpha: 0 })
          .set(select(".cta-wrapper"), { autoAlpha: 1 })
          .to({}, { duration: 1.5 })
          .to(select(".mockup-scroll-wrapper, .floating-badge, .card-left-text, .card-right-text"), { scale: .9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: .05 })
          .to(select(".main-card"), { width: mobile ? "92vw" : "85vw", height: "85%", borderRadius: mobile ? "32px" : "40px", ease: "expo.inOut", duration: 1.8 }, "pullback")
          .to(select(".cta-wrapper"), { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
          .to(select(".main-card"), { y: () => -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

        return () => {
          const cta = root.querySelector<HTMLElement>(".cta-wrapper");
          if (cta) cta.inert = false;
          root.style.removeProperty("--story-progress");
        };
      });
    }, containerRef);
    return () => { media.revert(); ctx.revert(); };
  }, [endMetric]);

  return (
    <div ref={containerRef} className={`nutrition-cinematic ${className}`} {...props}>
      <div className="bg-grid-theme" aria-hidden="true" />
      <div className="hero-text-wrapper">
        <span className="hero-eyebrow">NUTRIÇÃO NA SUA ROTINA</span>
        <h1><span className="text-track">{tagline1}</span><span className="text-days">{tagline2}</span></h1>
        <p className="hero-description">Tire uma foto da sua refeição e veja estimativas de calorias, proteínas, carboidratos e gorduras, além de sugestões para acompanhar sua alimentação.</p>
      </div>
      <div className="scroll-hint"><span>Role para conhecer</span><span className="scroll-mark" aria-hidden="true" /></div>

      <div className="cta-wrapper">
        <span className="hero-eyebrow">UMA VISÃO COMPLETA DA SUA ROTINA</span>
        <h2>{ctaHeading}</h2><p>{ctaDescription}</p>
        <a className="nc-button" href="#recursos">Explorar os recursos</a>
      </div>

      <div className="card-layer">
        <div ref={mainCardRef} className="main-card premium-depth-card">
          <div className="card-sheen" aria-hidden="true" />
          <div className="card-grid">
            <div className="card-right-text"><span className="brand-kicker">NUTRIÇÃO INTELIGENTE</span><h2>{brandName}<span>.</span></h2><p>Mais clareza.<br />Um dia de cada vez.</p></div>

            <div className="mockup-scroll-wrapper">
              <div className="mockup-scale">
                <div ref={mockupRef} className="iphone-bezel">
                  <div className="hardware-btn hardware-mute" aria-hidden="true" /><div className="hardware-btn hardware-volume-up" aria-hidden="true" /><div className="hardware-btn hardware-volume-down" aria-hidden="true" /><div className="hardware-btn hardware-power" aria-hidden="true" />
                  <div className="phone-screen">
                    <div className="screen-glare" aria-hidden="true" /><div className="dynamic-island" aria-hidden="true" />
                    <div className="phone-status" aria-hidden="true"><span>9:41</span><span>▮▮▮ ▰</span></div>
                    <div className="app-interface" aria-label="Demonstração ilustrativa do painel nutricional">
                      <div className="phone-widget app-header"><strong>{brandName}<span>.</span></strong><span className="streak">15 dias de foco</span></div>
                      <div className="phone-widget day-label"><strong>Hoje</strong><span>Seu resumo</span></div>
                      <div className="phone-widget calories-panel">
                        <div><strong className="counter-val">{endMetric.toLocaleString("pt-BR")}</strong><span className="metric-label">{metricLabel}</span><small>Meta ilustrativa: 2.000 kcal</small></div>
                        <div className="main-ring"><svg viewBox="0 0 176 176" aria-hidden="true"><circle cx="88" cy="88" r="64" fill="none" stroke="#3a3a43" strokeWidth="15" /><circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#fff" strokeWidth="15" /></svg><Icon name="flame" /></div>
                      </div>
                      <div className="macros-row">
                        {[
                          {label: "Proteínas", value: 85, valueClass: "protein-val", color: "#e98087", initial: "P"},
                          {label: "Carboidratos", value: 160, valueClass: "carbs-val", color: "#e8b47d", initial: "C"},
                          {label: "Gorduras", value: 30, valueClass: "fat-val", color: "#92a6d5", initial: "G"},
                        ].map(macro => <div className="phone-widget macro-card" key={macro.label}><strong><span className={macro.valueClass}>{macro.value}</span><small> g</small></strong><span className="macro-label">{macro.label}</span><div className="macro-ring"><svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="20" fill="none" stroke="#383841" strokeWidth="6" /><circle className="macro-progress" cx="26" cy="26" r="20" fill="none" stroke={macro.color} strokeWidth="6" /></svg><span style={{color:macro.color}}>{macro.initial}</span></div></div>)}
                      </div>
                      <div className="phone-widget recent-title"><strong>Refeições recentes</strong><span>Exemplo</span></div>
                      <div className="phone-widget meal-card"><img src={mealImage} width={58} height={62} alt="Arroz, feijão, frango grelhado e salada" /><div><strong>Almoço brasileiro</strong><span>520 kcal</span><small>40 g P · 63 g C · 12 g G</small></div></div>
                      <div className="phone-widget routine-line"><span><Icon name="drop" />Água hoje</span><strong>1,5 / 2 L</strong></div>
                      <div className="phone-widget routine-line"><span><Icon name="walk" />Caminhada</span><strong>30 min</strong></div>
                      <div className="phone-widget phone-nav"><span><Icon name="home" />Início</span><span><Icon name="chart" />Progresso</span><span><Icon name="walk" />Rotina</span><span className="phone-add" aria-hidden="true">+</span></div>
                      <div className="home-indicator" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <div className="floating-badge badge-photo"><span className="badge-icon"><Icon name="camera" /></span><div><strong>Da foto ao registro</strong><span>Seu prato em nutrientes</span></div></div>
                <div className="floating-badge badge-progress"><span className="badge-icon"><Icon name="chart" /></span><div><strong>Seu progresso, à vista</strong><span>Alimentação, água e movimento</span></div></div>
              </div>
            </div>

            <div className="card-left-text"><span className="card-kicker">DA FOTO AO ACOMPANHAMENTO</span><h3>{cardHeading}</h3><p>{cardDescription}</p><span className="illustrative-label">Demonstração com valores ilustrativos.</span></div>
          </div>
        </div>
      </div>
      <div className="story-track" aria-hidden="true"><span /></div>
    </div>
  );
}
