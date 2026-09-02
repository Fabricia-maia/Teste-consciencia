import { useState } from "react";
import { ArrowRight, RotateCcw, Sparkles, Check } from "lucide-react";

// ⚠️ CONFIGURAÇÃO OBRIGATÓRIA
// Troque o link abaixo pelo endpoint do seu formulário Formspree.
// Veja o passo a passo completo no README.md deste projeto.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjyvryag";

const QUESTIONS = [
  { q: "Quando você se sente desmotivado, o que costuma fazer?", o: ["Aceito e fico parado, esperando passar.", "Tento me forçar a fazer algo, mesmo sem vontade.", "Busco atividades que possam me animar.", "Reflito sobre o que me desmotiva e busco mudanças."] },
  { q: "Como você lida com a mudança?", o: ["Prefiro que tudo fique como está, mudanças me assustam.", "Fico resistente, mas acabo me adaptando.", "Tento ver o lado positivo, mas tenho dificuldade.", "Vejo a mudança como uma oportunidade de crescimento."] },
  { q: "Quando alguém discorda de você, você:", o: ["Ignoro e sigo em frente, como se nada tivesse acontecido.", "Fico chateado e não gosto de ser contrariado.", "Ouço o que a pessoa tem a dizer, mas não mudo de opinião.", "Estou aberto a ouvir e considerar outros pontos de vista."] },
  { q: "Você costuma reservar um tempo para si mesmo?", o: ["Não, sempre estou ocupado com outras coisas.", "Às vezes, mas me sinto culpado por isso.", "Faço isso de vez em quando, mas não é uma prioridade.", "Considero essencial e faço questão de ter esse tempo."] },
  { q: "Como você se comporta quando alguém compartilha um problema com você?", o: ["Não sei o que dizer, então fico quieto.", "Tento ajudar, mas fico nervoso.", "Ouço atentamente e ofereço conselhos quando posso.", "Busco entender profundamente e ofereço apoio genuíno."] },
  { q: "Quando alguém lhe pede um favor, como você se sente?", o: ["Sinto que não posso dizer não, mesmo que não queira fazer.", "Faço o favor, mas me sinto sobrecarregado.", "Pergunto a mim mesmo se posso ajudar de verdade.", "Avalio se posso ajudar sem comprometer meu tempo e energia."] },
  { q: "Qual é a sua reação ao receber uma boa notícia?", o: ["Não fico muito animado, é só mais um dia.", "Sinto alegria, mas logo volto à realidade.", "Fico feliz e compartilho com as pessoas que amo.", "Celebro e reflito sobre o que isso significa para mim."] },
  { q: "Quando você pensa em seus sonhos, qual é a sensação?", o: ["Não penso muito sobre isso, é só fantasia.", "Sinto que são distantes e difíceis de alcançar.", "Às vezes, imagino como seria realizá-los.", "Estou sempre planejando e buscando formas de realizá-los."] },
  { q: "Como você se sente em relação ao seu passado?", o: ["Prefiro não pensar muito sobre isso.", "Sinto que muitas coisas me incomodam e não resolvi.", "Tentei aprender com o que vivi.", "Vejo meu passado como parte do meu crescimento e aceito."] },
  { q: "Como você se sente ao fazer planos para o futuro?", o: ["Não gosto de planejar, prefiro viver o dia a dia.", "Faço planos, mas geralmente desisto deles.", "Planejo, mas fico inseguro sobre realizar.", "Estou sempre criando metas e buscando alcançá-las."] },
  { q: "Quando você enfrenta um desafio, como geralmente se sente?", o: ["Sinto que é mais fácil desistir.", "Fico apreensivo e evito pensar nisso.", "Tento encontrar uma solução, mesmo que demore.", "Vejo isso como uma chance de crescer e me fortalecer."] },
  { q: "Como você se sente em relação à sua intuição?", o: ["Não costumo prestar atenção nela.", "Às vezes, ignoro o que sinto.", "Tento ouvir minha intuição, mas nem sempre confio.", "Acredito que minha intuição me guia e sigo o que sinto."] },
  { q: "Como você se sente quando alguém elogia seu trabalho?", o: ["Não dou muita importância.", "Agradeço, mas não me sinto merecedor.", "Fico feliz e reconheço o elogio.", "Uso isso como motivação para continuar melhorando."] },
  { q: "Quando você está em grupo, como costuma agir?", o: ["Fico quieto e deixo os outros falarem.", "Tento me envolver, mas às vezes me sinto deslocado.", "Participo das conversas e compartilho minhas opiniões.", "Gosto de liderar e estimular os outros a falarem."] },
  { q: "Quando você está estressado, como costuma reagir?", o: ["Ignoro e sigo em frente, mesmo que me sinta mal.", "Fico irritado e acabo descontando em quem está perto.", "Tento encontrar um jeito de relaxar, como ouvir música ou sair.", "Faço uma pausa para refletir e encontrar soluções."] },
  { q: "Você costuma alimentar sua mente e emoções?", o: ["Não me preocupo com isso.", "Às vezes, leio ou assisto algo, mas sem foco.", "Procuro conteúdos que me inspirem e me façam refletir.", "Pratico atividades que nutrem minha mente e alma, como meditação ou leitura."] },
  { q: "Como você se sente ao final do dia?", o: ["Apenas estou feliz que o dia acabou.", "Sinto que não fiz o suficiente e me preocupo.", "Reflito sobre o que poderia ter feito diferente.", "Avalio meu dia e planejo como posso melhorar amanhã."] },
  { q: "Qual a sua abordagem em relação a relacionamentos interpessoais?", o: ["Não me envolvo muito, prefiro não pensar sobre isso.", "Sinto que estou sempre disponível para os outros, mas sem satisfação.", "Busco entender melhor as dinâmicas dos meus relacionamentos.", "Invisto tempo e energia em relacionamentos que me fazem crescer."] },
  { q: "Como você reage a críticas ou feedbacks?", o: ["Ignoro e sigo em frente.", "Fico chateado e me preocupo com a opinião dos outros.", "Tento entender o que posso aprender com isso.", "Uso o feedback como um passo para meu crescimento pessoal."] },
  { q: "Quando você está em um impasse, como reage?", o: ["Desisto e deixo para lá.", "Faço algo rápido para não pensar mais nisso.", "Busco soluções e me esforço para resolver.", "Analiso a situação com calma e busco um aprendizado."] },
  { q: "Como você se sente ao compartilhar seus pensamentos com os outros?", o: ["Prefiro não falar sobre o que sinto.", "Fico nervoso, mas tento me abrir.", "Gosto de compartilhar, mas me preocupo com a opinião deles.", "Sinto que é importante compartilhar e sou autêntico."] },
  { q: "Quando você se depara com um fracasso, como reage?", o: ["Fico desanimado e não quero tentar de novo.", "Sinto que é uma grande decepção e me culpo.", "Tentei entender o que deu errado e aprender com isso.", "Vejo o fracasso como parte do processo de crescimento."] },
  { q: "Como você lida com o tempo livre?", o: ["Não sei o que fazer e acabo perdendo tempo.", "Faço o que aparece, mas não me sinto realizado.", "Busco atividades que me interessem, mas não sempre.", "Planejo meu tempo livre para me conectar comigo mesmo."] },
  { q: "Quando você se sente inseguro sobre algo, como costuma agir?", o: ["Evito a situação.", "Fico paralisado e não sei o que fazer.", "Tento buscar informações e me preparar.", "Aceito a insegurança e sigo em frente com coragem."] },
  { q: "Como você se sente ao olhar para suas conquistas?", o: ["Não tenho muitas e não me sinto bem.", "Lembro de algumas, mas não lhes dou importância.", "Fico feliz com o que consegui, mas quero mais.", "Sinto orgulho e reconheço meu esforço e crescimento."] },
];

const PROFILES = [
  {
    key: "automatico",
    min: 25, max: 43,
    nome: "No Automático",
    cor: "#8B5A6B",
    corClara: "#C98CA0",
    frase: "Você tem vivido no piloto automático — e algo em você já sente que quer entender o porquê.",
    momento: "Sua rotina tem rodado sem muita pausa para sentir, questionar ou escolher de verdade. Isso não é preguiça, nem falta de força de vontade — é, muitas vezes, um jeito de sobreviver que a gente aprende cedo, observando como as pessoas da nossa própria história lidavam (ou fugiam) das próprias emoções. O automático protege, mas também afasta você de si mesmo(a). E o simples fato de estar aqui, respondendo com sinceridade, já é um sinal de que uma parte sua quer acordar.",
    passos: [
      { acao: "Antes de dormir, escreva 3 frases sobre como você se sentiu hoje — sem filtro, sem se corrigir.", porque: "Nomear o que se sente é o primeiro gesto contra o automático. O que não é nomeado tende a se repetir." },
      { acao: "Escolha 1 hábito da sua rotina e faça diferente essa semana, só para observar o que isso desperta em você.", porque: "Pequenas quebras de padrão mostram ao corpo que mudar é seguro — e é assim que padrões antigos começam a se soltar." },
      { acao: "Antes de dizer 'sim' a algo, pare e pergunte: isso é o que eu quero, ou um papel que aprendi a repetir?", porque: "Muitos 'sins' automáticos carregam lealdades antigas — a padrões da própria história de vida, nem sempre conscientes." },
    ],
  },
  {
    key: "sobrevivendo",
    min: 44, max: 62,
    nome: "Sobrevivendo",
    cor: "#B06A3E",
    corClara: "#E3A56B",
    frase: "Você está segurando muita coisa sozinho(a) — e talvez já não devesse.",
    momento: "A rotina pesa, os dias se acumulam, e existe uma sensação constante de estar devendo algo a si mesmo(a). É comum que esse peso não comece agora: muitas vezes aprendemos, dentro da nossa própria família, que dar conta de tudo é prova de valor, de amor, ou de pertencimento. Sobreviver funcionou até aqui — mas sustentar essa forma de viver tem um custo, e talvez a pergunta não seja 'como aguentar mais', e sim 'de onde vem essa exigência tão grande comigo mesmo(a)'.",
    passos: [
      { acao: "Anote 3 coisas boas do seu dia, todos os dias, por 7 dias seguidos.", porque: "Quando sobrevivemos, o olhar treina para enxergar só o que falta. Isso reeduca a atenção para o que já está bem." },
      { acao: "Identifique 1 compromisso que você pode recusar ou delegar essa semana.", porque: "Colocar um limite é praticar que seu tempo e sua energia têm valor — mesmo que ninguém tenha te ensinado isso antes." },
      { acao: "Separe 20 minutos essa semana só para algo que te dá prazer, sem culpa e sem produzir nada com isso.", porque: "Descansar sem precisar merecer é, para muita gente, uma crença nova a ser construída — não uma regra natural." },
    ],
  },
  {
    key: "despertando",
    min: 63, max: 81,
    nome: "Despertando",
    cor: "#C99A3D",
    corClara: "#F0C868",
    frase: "Algo em você já não aceita mais viver no automático — e isso é raro.",
    momento: "Você já questiona, já busca mais, já sente que uma mudança está a caminho. A insegurança que aparece nesse momento não é sinal de erro — é o preço natural de qualquer transformação real. Muita gente, ao chegar até aqui, sente curiosidade por entender melhor a própria história: de onde vêm certos padrões que se repetem, certas escolhas, certos medos que parecem maiores do que a situação em si. Esse é exatamente o tipo de pergunta que abre espaço para um trabalho mais profundo.",
    passos: [
      { acao: "Escolha 1 mudança que você vem adiando e defina o menor passo possível para começar essa semana.", porque: "Passos pequenos e reais vencem a insegurança mais rápido do que grandes decisões — e criam prova de que mudar é possível." },
      { acao: "Escreva tudo que está te sobrecarregando de informação e escolha só 1 ponto para focar agora.", porque: "Despertar traz excesso de clareza de uma vez. Focar em 1 coisa evita que a vontade de mudar vire paralisia." },
      { acao: "Compartilhe com alguém de confiança 1 coisa que você quer mudar na sua vida.", porque: "Dizer em voz alta é o que transforma intenção em compromisso — e retira o peso de sustentar essa mudança sozinho(a)." },
    ],
  },
  {
    key: "caminho-real",
    min: 82, max: 100,
    nome: "Caminho Real",
    cor: "#2F7A6B",
    corClara: "#6FBFA8",
    frase: "Você já caminha com consciência — o desafio agora é sustentar sem se cobrar demais.",
    momento: "Você já pratica autoconhecimento com consistência, e isso aparece na forma como lida com desafios, relações e escolhas. O ponto de atenção aqui não é aprender mais sobre si — é notar se, mesmo consciente, você ainda carrega uma exigência antiga de precisar merecer descanso ou provar seu valor a cada novo passo. Às vezes, o padrão mais difícil de ver é justamente o que se disfarça de virtude: a busca constante por evoluir, sem nunca simplesmente estar.",
    passos: [
      { acao: "Escolha 1 dia essa semana para não ter nenhuma meta de produtividade pessoal — só descansar.", porque: "Quem está no Caminho Real corre o risco de transformar até o descanso em tarefa. Este passo testa exatamente isso." },
      { acao: "Reflita: essa vontade de evoluir sempre vem de mim, ou de uma expectativa que aprendi a carregar?", porque: "Diferenciar desejo próprio de exigência herdada é o que sustenta um crescimento leve, e não um crescimento em fuga de algo." },
      { acao: "Busque uma nova fonte de aprendizado (livro, curso, mentoria) escolhida só por curiosidade, sem meta de resultado.", porque: "Aprender sem precisar 'render' é o que mantém a consciência viva sem virar mais uma cobrança." },
    ],
  },
];

function getProfile(score) {
  return PROFILES.find((p) => score >= p.min && score <= p.max) || PROFILES[0];
}

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [lead, setLead] = useState({ nome: "", email: "", whatsapp: "" });
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const score = answers.reduce((a, b) => a + b, 0);
  const profile = getProfile(score || 25);

  function selectOption(points) {
    const next = [...answers, points];
    setAnswers(next);
    if (current + 1 < QUESTIONS.length) {
      setCurrent(current + 1);
    } else {
      setScreen("lead");
    }
  }

  async function submitLead(e) {
    e.preventDefault();
    setSending(true);
    setSendError(false);
    try {
      const finalScore = answers.reduce((a, b) => a + b, 0);
      const finalProfile = getProfile(finalScore);
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nome: lead.nome,
          email: lead.email,
          whatsapp: lead.whatsapp,
          pontuacao: finalScore,
          perfil: finalProfile.nome,
        }),
      });
      if (!res.ok) throw new Error("Falha no envio");
      setScreen("result");
    } catch (err) {
      // Mesmo se o envio falhar, não travamos a pessoa fora do resultado —
      // ela já respondeu 25 perguntas e merece ver o resultado.
      setSendError(true);
      setScreen("result");
    } finally {
      setSending(false);
    }
  }

  function restart() {
    setScreen("intro");
    setCurrent(0);
    setAnswers([]);
    setLead({ nome: "", email: "", whatsapp: "" });
    setSendError(false);
  }

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .opt-btn { transition: all 0.15s ease; }
        .opt-btn:hover { transform: translateX(4px); border-color: var(--accent) !important; background: var(--accent-10) !important; }
        .cta-btn { transition: all 0.15s ease; }
        .cta-btn:hover { transform: translateY(-1px); filter: brightness(1.08); }
        .node { transition: all 0.3s ease; }
        input:focus { outline: none; border-color: #C99A3D !important; }
      `}</style>

      {screen === "intro" && <Intro onStart={() => setScreen("quiz")} />}

      {screen === "quiz" && (
        <Quiz
          index={current}
          question={QUESTIONS[current]}
          total={QUESTIONS.length}
          onSelect={selectOption}
        />
      )}

      {screen === "lead" && (
        <Lead lead={lead} setLead={setLead} onSubmit={submitLead} sending={sending} />
      )}

      {screen === "result" && (
        <Result score={score} profile={profile} onRestart={restart} sendError={sendError} />
      )}
    </div>
  );
}

function Intro({ onStart }) {
  return (
    <div style={styles.centerCol}>
      <div style={{ ...styles.card, maxWidth: 560, textAlign: "center" }}>
        <p style={styles.eyebrow}>Protótipo · Teste de Consciência Pessoal</p>
        <h1 style={styles.title}>Quanto da sua história de vida está guiando suas escolhas hoje?</h1>
        <p style={styles.body}>
          Em poucos minutos, você vai entender melhor como tem lidado com suas
          emoções, vínculos e rotina — e o quanto disso pode vir de padrões
          mais antigos do que você imagina. Ao final, um retrato do seu
          momento e passos concretos para começar a mudar.
        </p>
        <PathPreview />
        <button style={styles.ctaMain} className="cta-btn" onClick={onStart}>
          Começar <ArrowRight size={18} strokeWidth={2.5} />
        </button>
        <p style={styles.fineprint}>Leva cerca de 5 minutos.</p>
        <p style={styles.copyright}>Criado por Fabrícia Máia · Terapeuta Integrativa</p>
      </div>
    </div>
  );
}

function PathPreview() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", margin: "32px 0 28px" }}>
      {PROFILES.map((p) => (
        <div key={p.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.cor }} />
          <span style={{ fontSize: 11, color: "#9691A8", fontFamily: "Inter, sans-serif", textAlign: "center" }}>{p.nome}</span>
        </div>
      ))}
    </div>
  );
}

function Quiz({ index, question, total, onSelect }) {
  const pct = (index / total) * 100;
  return (
    <div style={styles.centerCol}>
      <div style={{ ...styles.card, maxWidth: 600 }}>
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressFill, width: `${pct}%` }} />
        </div>
        <p style={styles.progressLabel}>Pergunta {index + 1} de {total}</p>
        <h2 style={styles.question}>{question.q}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
          {question.o.map((opt, i) => (
            <button
              key={i}
              className="opt-btn"
              style={{ ...styles.optBtn, "--accent": "#C99A3D", "--accent-10": "#C99A3D1a" }}
              onClick={() => onSelect(i + 1)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Lead({ lead, setLead, onSubmit, sending }) {
  return (
    <div style={styles.centerCol}>
      <div style={{ ...styles.card, maxWidth: 480 }}>
        <p style={styles.eyebrow}>Quase lá</p>
        <h2 style={{ ...styles.title, fontSize: 24 }}>Para onde enviamos seu resultado?</h2>
        <p style={styles.body}>
          Seu retrato está pronto. Preencha abaixo para ver seu resultado
          completo, com os passos pensados para o seu momento.
        </p>
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
          <input
            required
            type="text"
            placeholder="Seu nome"
            value={lead.nome}
            onChange={(e) => setLead({ ...lead, nome: e.target.value })}
            style={styles.input}
          />
          <input
            required
            type="email"
            placeholder="Seu melhor e-mail"
            value={lead.email}
            onChange={(e) => setLead({ ...lead, email: e.target.value })}
            style={styles.input}
          />
          <input
            required
            type="tel"
            placeholder="WhatsApp (com DDD)"
            value={lead.whatsapp}
            onChange={(e) => setLead({ ...lead, whatsapp: e.target.value })}
            style={styles.input}
          />
          <button type="submit" style={styles.ctaMain} className="cta-btn" disabled={sending}>
            {sending ? "Enviando..." : "Ver meu resultado"} <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </form>
        <p style={styles.fineprint}>Seus dados são usados apenas para enviar seu resultado e, se você topar, um contato posterior.</p>
      </div>
    </div>
  );
}

function Result({ score, profile, onRestart, sendError }) {
  return (
    <div style={styles.centerCol}>
      <div style={{ ...styles.card, maxWidth: 640 }}>
        <p style={styles.eyebrow}>Seu resultado</p>
        <h1 style={{ ...styles.title, color: profile.cor }}>{profile.nome}</h1>
        <p style={{ ...styles.body, fontStyle: "italic", color: "#6B667D" }}>{profile.frase}</p>

        <PathResult activeKey={profile.key} />

        <div style={{ ...styles.section, borderColor: profile.cor + "33" }}>
          <p style={styles.sectionLabel}>O que esse resultado revela sobre você agora</p>
          <p style={styles.body}>{profile.momento}</p>
        </div>

        <div style={styles.section}>
          <p style={styles.sectionLabel}>Passos pensados para o seu momento</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 12 }}>
            {profile.passos.map((passo, i) => (
              <div key={i} style={styles.stepRow}>
                <span style={{ ...styles.stepCheck, background: profile.cor }}>
                  <Check size={13} color="#fff" strokeWidth={3} />
                </span>
                <div>
                  <p style={{ ...styles.body, fontWeight: 600, color: "#2A2640", margin: 0 }}>{passo.acao}</p>
                  <p style={{ ...styles.body, fontSize: 13.5, color: "#8B87A0", margin: "4px 0 0", lineHeight: 1.5 }}>{passo.porque}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...styles.inviteCard, background: `linear-gradient(135deg, ${profile.cor}14, ${profile.cor}05)`, borderColor: profile.cor + "40", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <Sparkles size={18} color={profile.cor} style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <p style={{ ...styles.sectionLabel, marginBottom: 4 }}>Você não precisa caminhar sozinho(a) a partir daqui</p>
              <p style={styles.body}>
                Esse resultado é uma fotografia — não um destino. Se algo aqui tocou
                você, a <strong>Conversa que Cura</strong> é uma sessão avulsa criada
                para transformar essa clareza em direcionamento real, com a terapeuta
                integrativa{" "}
                <strong>Fabrícia Máia</strong>.
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginLeft: 28 }}>
            <a
              href="https://wa.me/5562992317644"
              target="_blank"
              rel="noreferrer"
              className="cta-btn"
              style={{ ...styles.ctaMain, marginTop: 0, background: profile.cor, fontSize: 14, padding: "10px 20px", textDecoration: "none" }}
            >
              Agendar a Conversa que Cura <ArrowRight size={16} />
            </a>
            <a
              href="https://instagram.com/fabriciai.maia"
              target="_blank"
              rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", fontSize: 13.5, color: profile.cor, fontWeight: 600, textDecoration: "none", padding: "10px 4px" }}
            >
              @fabriciai.maia
            </a>
          </div>
        </div>

        {sendError && (
          <p style={{ ...styles.fineprint, color: "#B06A3E", marginTop: 12 }}>
            Não conseguimos salvar seus dados automaticamente — se quiser continuar a conversa, chama no WhatsApp acima. 🙂
          </p>
        )}

        <button style={{ ...styles.ctaMain, background: "transparent", color: "#6B667D", border: "1px solid #DEDAE8", marginTop: 24 }} className="cta-btn" onClick={onRestart}>
          <RotateCcw size={16} /> Refazer o teste
        </button>

        <p style={styles.copyright}>Teste de Consciência Pessoal © Fabrícia Máia. Todos os direitos reservados.</p>
      </div>
    </div>
  );
}

function PathResult({ activeKey }) {
  return (
    <div style={{ display: "flex", alignItems: "center", margin: "24px 0 8px", position: "relative" }}>
      <div style={{ position: "absolute", top: "50%", left: 5, right: 5, height: 2, background: "#E7E3F0", transform: "translateY(-50%)", zIndex: 0 }} />
      {PROFILES.map((p) => {
        const active = p.key === activeKey;
        return (
          <div key={p.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, position: "relative", zIndex: 1 }}>
            <div
              className="node"
              style={{
                width: active ? 20 : 10,
                height: active ? 20 : 10,
                borderRadius: "50%",
                background: active ? p.cor : "#D8D4E4",
                boxShadow: active ? `0 0 0 6px ${p.cor}22` : "none",
              }}
            />
            <span style={{ fontSize: 11, fontFamily: "Inter, sans-serif", color: active ? p.cor : "#B4AFC4", fontWeight: active ? 600 : 400, textAlign: "center" }}>
              {p.nome}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #1E2130 0%, #262A3D 100%)",
    fontFamily: "Inter, sans-serif",
    padding: "40px 20px",
  },
  centerCol: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  card: {
    background: "#FBF9F5",
    borderRadius: 16,
    padding: "36px 40px",
    width: "100%",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#9691A8",
    fontWeight: 600,
    marginBottom: 8,
  },
  title: {
    fontFamily: "'Fraunces', serif",
    fontSize: 32,
    fontWeight: 600,
    color: "#2A2640",
    margin: "0 0 12px",
    lineHeight: 1.15,
  },
  body: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "#4B4760",
    margin: 0,
  },
  fineprint: {
    fontSize: 12,
    color: "#B4AFC4",
    marginTop: 14,
  },
  ctaMain: {
    marginTop: 8,
    padding: "12px 26px",
    borderRadius: 999,
    border: "none",
    background: "#2A2640",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "Inter, sans-serif",
  },
  input: {
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #E7E3F0",
    fontSize: 14.5,
    fontFamily: "Inter, sans-serif",
    color: "#2A2640",
  },
  progressTrack: {
    height: 4,
    background: "#EDE9F3",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#C99A3D",
    borderRadius: 4,
    transition: "width 0.3s ease",
  },
  progressLabel: {
    fontSize: 12,
    color: "#B4AFC4",
    margin: "10px 0 18px",
    fontWeight: 500,
  },
  question: {
    fontFamily: "'Fraunces', serif",
    fontSize: 22,
    fontWeight: 500,
    color: "#2A2640",
    margin: 0,
    lineHeight: 1.3,
  },
  optBtn: {
    textAlign: "left",
    padding: "14px 16px",
    borderRadius: 10,
    border: "1px solid #E7E3F0",
    background: "#fff",
    fontSize: 14.5,
    color: "#3D3956",
    cursor: "pointer",
    fontFamily: "Inter, sans-serif",
    lineHeight: 1.4,
  },
  section: {
    marginTop: 26,
    paddingTop: 20,
    borderTop: "1px solid #EDE9F3",
  },
  sectionLabel: {
    fontSize: 12,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#8B87A0",
    fontWeight: 700,
    margin: "0 0 8px",
  },
  stepRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
  },
  stepCheck: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  inviteCard: {
    marginTop: 24,
    padding: "20px 22px",
    borderRadius: 12,
    border: "1px solid",
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
  },
  copyright: {
    fontSize: 11,
    color: "#C4C0D2",
    textAlign: "center",
    marginTop: 20,
  },
};
