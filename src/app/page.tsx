import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import "./nutrition-landing.css";

const features = [
  { number: "01", title: "Registre sua alimentação com apenas uma foto", text: "Fotografe sua refeição para obter estimativas de calorias, proteínas, carboidratos e gorduras. Confira os alimentos identificados e ajuste as porções antes de salvar.", detail: "Fotografe. Revise. Registre." },
  { number: "02", title: "Encontre os alimentos da sua rotina", text: "Pesquise por nome ou marca e consulte as informações nutricionais. Use o código de barras para facilitar o registro de produtos no dia a dia.", detail: "Busca por nome, marca e código de barras." },
  { number: "03", title: "Acompanhe seu progresso com mais clareza", text: "Monitore peso, medidas e metas nutricionais. Receba sugestões com IA para organizar sua alimentação de acordo com seus objetivos.", detail: "Sua evolução, em uma única visão." },
  { number: "04", title: "Água e movimento também fazem parte", text: "Registre sua ingestão de água e os exercícios diários. Reúna seus hábitos para acompanhar alimentação, hidratação e atividade física.", detail: "Uma visão completa da sua rotina." },
];

export default function Home() {
  return (
    <main className="nutrition-page" id="inicio">
      <a className="nutrition-skip" href="#recursos">Pular apresentação e ver recursos</a>
      <CinematicHero brandName="Nutri" />

      <section className="nutrition-features" id="recursos" aria-labelledby="features-title">
        <div className="nutrition-section-heading"><span>FEITO PARA O SEU DIA A DIA</span><h2 id="features-title">Da primeira foto<br />a uma rotina mais completa.</h2><p>Conheça os quatro recursos que reúnem o acompanhamento da sua alimentação em um só lugar.</p></div>
        <div className="nutrition-features-grid">{features.map(feature => <article key={feature.number}><span className="nutrition-feature-number">{feature.number}</span><h3>{feature.title}</h3><p>{feature.text}</p><span className="nutrition-feature-detail">{feature.detail}</span></article>)}</div>
      </section>

      <section className="nutrition-how" id="como-funciona" aria-labelledby="how-title"><div><span className="nutrition-overline">SIMPLES DE COMEÇAR</span><h2 id="how-title">Fotografe.<br />Confira.<br />Acompanhe.</h2></div><ol><li><strong>Mostre sua refeição</strong><p>Enquadre o prato com boa iluminação para deixar os alimentos visíveis.</p></li><li><strong>Revise a estimativa</strong><p>Ajuste porções, ingredientes e detalhes do preparo quando necessário.</p></li><li><strong>Veja seu dia completo</strong><p>Reúna suas refeições, a água consumida e os exercícios registrados.</p></li></ol></section>

      <section className="nutrition-faq" id="duvidas" aria-labelledby="faq-title"><h2 id="faq-title">Antes da primeira foto.</h2><details><summary>Os valores calculados pela foto são exatos?</summary><p>São estimativas. Quantidades, preparo e ingredientes que não aparecem na imagem podem alterar os valores. A revisão das porções faz parte do registro.</p></details><details><summary>O painel mostra dados reais de uma pessoa?</summary><p>Não. As telas desta apresentação usam dados ilustrativos para demonstrar o acompanhamento de refeições, nutrientes e hábitos.</p></details><details><summary>As sugestões substituem um nutricionista?</summary><p>Não. Elas ajudam a organizar o acompanhamento da alimentação. Necessidades específicas e planos alimentares clínicos devem ser avaliados por um profissional.</p></details></section>
      <footer className="nutrition-footer"><a href="#inicio" aria-label="Nutri, voltar ao início">Nutri.</a><span>Sua alimentação, mais simples.</span><a href="#recursos">Conhecer os recursos</a></footer>
    </main>
  );
}
