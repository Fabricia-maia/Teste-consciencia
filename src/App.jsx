import { useState } from "react";
import { ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";

// ⚠️ CONFIGURAÇÃO OBRIGATÓRIA
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
  { q: "Como você se sente em relação ao seu passado?", o: ["Prefiro não pensar muito sobre isso.", "Sinto que muitas coisas me incomodam e não resolvi.", "Tento aprender com o que vivi.", "Vejo meu passado como parte do meu crescimento e aceito."] },
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
  { q: "Quando você se depara com um fracasso, como reage?", o: ["Fico desanimado e não quero tentar de novo.", "Sinto que é uma grande decepção e me culpo.", "Tento entender o que deu errado e aprender com isso.", "Vejo o fracasso como parte do processo de crescimento."] },
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
    titulo: "SEU RESULTADO: NO AUTOMÁTICO",
    resultadoGratuito: `Sabe quando os dias vão passando e você simplesmente vai fazendo?

Acorda, resolve o que aparece, responde o que precisa, aceita algumas coisas, deixa outras para depois... e segue.

Só que, de vez em quando, bate aquela sensação:

"Como foi que minha vida veio parar aqui?"

Talvez você nem esteja exatamente infeliz.

Mas também pode fazer tempo que você não para de verdade para se perguntar:

"É isso que eu quero?"

"Isso ainda faz sentido para mim?"

"Ou eu só continuo fazendo porque sempre fiz assim?"

Talvez você diga "sim" e só depois perceba que queria ter dito "não".

Talvez alguma coisa incomode, mas você vá deixando... deixando... até chegar uma hora em que não dá mais.

Talvez mudar pareça tão trabalhoso que você prefira continuar como está.

Ou talvez, quando alguém pergunta o que você realmente quer, você perceba que nem sabe muito bem o que responder.

E isso não significa que você não se conhece ou que não se importa com a própria vida.

Às vezes a gente simplesmente passa tanto tempo fazendo o que precisa ser feito que para de perguntar se aquilo ainda combina com a gente.

Talvez seu primeiro passo não seja mudar nada agora.

Talvez seja apenas começar a perceber:

"Quantas coisas na minha vida eu realmente escolhi... e quantas eu apenas fui aceitando?"`,
    perguntas: [
      "Se eu te perguntasse agora o que na sua vida você faz porque realmente quer — e o que faz simplesmente porque sempre foi assim — você saberia separar?",
      "Tem alguma situação que vive se repetindo e faz você pensar: \"Como eu vim parar aqui de novo?\"",
      "E se tivesse que escolher uma única coisa que gostaria de começar a fazer diferente, você saberia qual seria?",
    ],
    depoisPerguntas: `Se você conseguiu responder com clareza, ótimo.

Talvez este resultado gratuito já tenha te mostrado exatamente o que precisava enxergar neste momento.

Mas se você travou em alguma dessas perguntas, não passe por isso rápido demais.

Porque talvez você tenha acabado de perceber uma coisa importante:

você sabe que existem partes da sua vida que já não combinam tanto com você...

mas ainda não consegue perceber direito onde está escolhendo e onde está apenas repetindo.

E é justamente aí que existe uma próxima camada.`,
    premiumTexto: `Se você quiser olhar isso mais de perto...

Seu Resultado Premium — No Automático não foi feito para mandar você mudar sua vida inteira.

Muito pelo contrário.

Ele foi pensado para ajudar você a enxergar aquelas situações que hoje acontecem tão rápido que você só percebe depois.

Aquele "sim" que saiu antes de você pensar.

Aquela coisa que você continua adiando.

Aquele incômodo que você ignora.

Aquela decisão que vai sendo empurrada porque deixar tudo como está parece mais fácil.

Você vai poder observar onde seu automático aparece com mais força, construir seu Mapa de Clareza, experimentar pequenas pausas antes de responder e começar a perceber emoções e escolhas que talvez hoje passem despercebidas.

Não para virar outra pessoa.

Para começar a participar mais da própria vida.`,
    botao: "QUERO COMEÇAR A PERCEBER",
    checkout: "https://pay.kiwify.com.br/ai8EDtg",
  },
  {
    key: "sobrevivendo",
    min: 44, max: 62,
    nome: "Sobrevivendo",
    cor: "#B06A3E",
    titulo: "SEU RESULTADO: SOBREVIVENDO",
    resultadoGratuito: `Você é aquela pessoa que vai fazendo o que precisa ser feito.

Resolve uma coisa aqui, outra ali, ajuda alguém, responde mensagem, cuida do trabalho, da casa, da família...

e quando percebe:

o dia acabou e você ficou por último de novo.

Talvez você até pense:

"Eu sei que não dá para continuar assim."

Mas no dia seguinte acorda e começa tudo outra vez.

Não porque você não queira mudar.

Às vezes você está tão ocupada tentando dar conta da vida que nem sabe por onde começar a cuidar da sua.

Você está cansada, mas continua porque "tem coisa para fazer".

Diz "sim" mesmo querendo dizer "não", só para evitar problema ou não decepcionar alguém.

Pensa que vai descansar depois que resolver tudo...

mas esse "depois" quase nunca chega.

E talvez o mais complicado seja isto:

você se acostumou tanto a dar conta que pode nem perceber o quanto está cansada de ter que dar conta.

Seu resultado não está dizendo que você precisa largar tudo, mudar sua vida amanhã ou pensar mais positivo.

Talvez o primeiro passo seja bem mais simples:

começar a perceber onde, no meio de tanta coisa e tanta gente, você foi deixando você mesma para depois.`,
    perguntas: [
      "Se eu te perguntasse hoje: \"O que mais está te cansando na sua vida?\" Você saberia responder?",
      "E você consegue perceber o que você mesma continua fazendo, mesmo vendo que aquilo só te deixa ainda mais cansada?",
      "Agora imagine que você pudesse mudar uma única coisa para começar a se colocar um pouco mais na sua própria vida. Você saberia o que mudar?",
    ],
    depoisPerguntas: `Se as respostas vieram com facilidade, ótimo.

Talvez você já tenha clareza suficiente para começar por conta própria.

Mas se apareceu aquele "eu nem sei por onde começar"... preste atenção nisso.

Porque às vezes a gente sabe que está cansada.

Sabe que não quer continuar do mesmo jeito.

Só ainda não consegue perceber o que precisa parar de carregar, onde precisa colocar um limite ou por que continua assumindo tudo outra vez.

E existe uma diferença enorme entre:

"Eu sei que estou cansada."

e

"Agora eu consigo enxergar o que está acontecendo comigo."`,
    premiumTexto: `Se você quiser entender melhor de onde começar...

Seu Resultado Premium — Sobrevivendo começa justamente aí.

Ele não vai dizer para você "se priorizar mais" e encerrar o assunto.

Você vai olhar para aquilo que vem carregando, para os "sins" que dá quando queria dizer "não", para a culpa que aparece quando tenta se escolher e para coisas que talvez tenha assumido como se fossem obrigação sua.

E poderá separar melhor:

o que realmente precisa de você, o que pode ser dividido, o que pode esperar e o que talvez nem precise continuar nas suas costas.

Até aquele enorme:

"Eu preciso mudar minha vida."

começar a se transformar em algo bem mais possível:

"Entendi. É por aqui que eu posso começar."`,
    botao: "QUERO ME COLOCAR DE VOLTA NA MINHA VIDA",
    checkout: "https://pay.kiwify.com.br/dqE5eYl",
  },
  {
    key: "despertando",
    min: 63, max: 81,
    nome: "Despertando",
    cor: "#C99A3D",
    titulo: "SEU RESULTADO: DESPERTANDO",
    resultadoGratuito: `Aqui acontece uma coisa curiosa:

você já percebeu muita coisa.

Já começou a entender por que reage de determinadas maneiras.

Já reconhece algumas situações que vivem se repetindo.

Provavelmente já teve vários momentos de:

"Meu Deus... agora entendi!"

Só que existe uma parte bem irritante nisso. 😂

Você entende...

e às vezes continua fazendo igual.

Sabe que precisa colocar um limite — mas na hora não coloca.

Sabe que aquela situação não te faz bem — mas continua nela.

Sabe que precisa tomar uma decisão — mas pensa, repensa, procura mais uma resposta, conversa com alguém, assiste mais alguma coisa...

e continua sem decidir.

Talvez você já tenha pensado:

"Eu sei de onde isso vem, mas continuo fazendo."

Ou:

"Eu já deveria ter superado isso."

E talvez a pergunta mais frustrante seja:

"Se eu já entendi tanta coisa sobre mim, por que ainda continuo repetindo?"

Porque entender é uma parte da mudança.

Fazer diferente quando a situação acontece de verdade é outra.

Talvez você não precise descobrir mais cinquenta coisas sobre você agora.

Talvez precise perceber:

"Daquilo que eu já sei sobre mim... o que eu ainda não estou conseguindo colocar em prática?"`,
    perguntas: [
      "Você já entendeu várias coisas sobre você. Mas qual delas você ainda continua repetindo, mesmo sabendo que aquilo não te ajuda?",
      "Quando chega a hora de fazer diferente... o que geralmente faz você voltar atrás?",
      "E se eu tirasse da mesa estudar mais, pesquisar mais, assistir mais alguma coisa ou pensar mais um pouco e perguntasse: \"Qual é a próxima atitude concreta que você precisa tomar?\" Você saberia responder?",
    ],
    depoisPerguntas: `Se sim, maravilhoso.

Talvez você já tenha exatamente o que precisa para experimentar um movimento diferente.

Mas se percebeu que sabe explicar muito bem o que acontece com você e, mesmo assim, não sabe o que fazer quando a situação acontece de verdade... aí existe uma pista importante.

Talvez não esteja faltando mais informação.

Talvez esteja faltando transformar o que você já entendeu em alguma coisa que consiga viver.`,
    premiumTexto: `Se você está cansada de só entender...

Seu Resultado Premium — Despertando não foi criado para jogar mais informação em cima de você.

A proposta é justamente o contrário.

Você vai escolher um padrão de cada vez, perceber quando ele aparece e começar a testar pequenas respostas diferentes na vida real.

Porque talvez o que esteja faltando agora não seja mais uma explicação sobre por que você é assim.

Talvez seja aprender a atravessar aquele momento em que você pensa:

"Eu sei o que deveria fazer..."

e, dessa vez...

faz alguma coisa diferente.`,
    botao: "QUERO TRANSFORMAR O QUE SEI EM AÇÃO",
    checkout: "https://pay.kiwify.com.br/6lHlycF",
  },
  {
    key: "caminho-real",
    min: 82, max: 100,
    nome: "Caminho Real",
    cor: "#2F7A6B",
    titulo: "SEU RESULTADO: CAMINHO REAL",
    resultadoGratuito: `Você provavelmente já se observa bastante.

Percebe quando alguma coisa te incomoda.

Pensa sobre suas escolhas.

Tenta compreender suas emoções.

Procura viver de um jeito que faça sentido para você.

E isso é muito bom.

Mas existe uma armadilha aqui que quase ninguém conta:

até o autoconhecimento pode virar cobrança.

Você começa querendo se conhecer melhor...

e, quando percebe, está pensando:

"Eu já deveria saber lidar com isso."

"Não acredito que isso ainda mexe comigo."

"Eu achei que já tinha superado."

"Preciso entender o que essa situação quer me ensinar."

E sim... às vezes até descansar vira projeto de desenvolvimento pessoal. 😂

Talvez você sinta que precisa lidar "bem" com tudo porque já se conhece.

Talvez fique incomodada quando um comportamento antigo aparece novamente.

Talvez tente entender rapidamente uma emoção em vez de simplesmente sentir.

Ou ache muito mais fácil resolver sozinha do que admitir:

"Dessa vez eu preciso de ajuda."

E talvez seu próximo passo não seja se conhecer mais.

Pode ser aprender a se tratar com um pouco menos de cobrança enquanto continua se conhecendo.

Porque consciência não significa nunca mais errar.

Nunca mais se confundir.

Nunca mais voltar a um comportamento antigo.

Talvez agora a pergunta seja:

"Será que estou usando tudo o que aprendi sobre mim para viver com mais liberdade... ou para me cobrar ainda mais?"`,
    perguntas: [
      "Tudo o que aprendeu sobre si tem feito sua vida ficar mais leve... ou mais cheia de regras sobre como você deveria ser?",
      "Quando uma emoção ou comportamento antigo volta, você consegue pensar: \"Tudo bem, isso apareceu de novo.\" Ou sua primeira reação é: \"Eu já deveria ter superado isso\"?",
      "E existe alguma área da sua vida em que talvez você não precise evoluir mais, entender mais ou melhorar mais... mas simplesmente se permitir ser humana?",
    ],
    depoisPerguntas: `Se essas respostas estão claras, ótimo.

Continue colocando isso na vida.

Mas se alguma dessas perguntas te incomodou um pouquinho... talvez valha não correr para resolver o incômodo.

Porque chega uma hora em que autoconhecimento não significa descobrir mais uma coisa para consertar.

Às vezes significa perceber onde até a vontade de crescer virou uma maneira de se cobrar.`,
    premiumTexto: `Talvez seu próximo passo não seja "evoluir mais".

Seu Resultado Premium — Caminho Real não é uma nova lista de coisas que você precisa melhorar.

Ele convida você a perceber onde aquela vontade bonita de crescer, se conhecer e fazer melhor pode ter começado, sem perceber, a virar:

"Eu deveria saber."

"Eu não posso voltar."

"Eu preciso lidar melhor."

Você vai observar onde existe crescimento de verdade e onde talvez exista cobrança disfarçada de autoconhecimento.

Vai experimentar momentos em que não existe nada para corrigir, trabalhar ou melhorar.

E talvez descubra que seu próximo passo não seja se transformar em uma versão ainda "melhor" de você.

Pode ser conseguir viver tudo o que já aprendeu sobre si com um pouco mais de liberdade, flexibilidade e humanidade.`,
    botao: "QUERO CRESCER COM MAIS LEVEZA",
    checkout: "https://pay.kiwify.com.br/EmsPGr0",
  },
];

function getProfile(score) {
  return PROFILES.find((p) => score >= p.min && score <= p.max) || PROFILES[0];
}

function Paragraphs({ text, style }) {
  const blocks = text.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((b, i) => (
        <p key={i} style={{ ...styles.body, ...style, marginBottom: 14 }}>{b}</p>
      ))}
    </>
  );
}

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(() => Array(QUESTIONS.length).fill(null));
  const [lead, setLead] = useState({ nome: "", email: "", whatsapp: "" });
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const score = answers.reduce((a, b) => a + (b || 0), 0);
  const profile = getProfile(score || 25);

  function selectOption(points) {
    const next = [...answers];
    next[current] = points;
    setAnswers(next);
  }

  function goNext() {
    if (answers[current] == null) return;
    if (current + 1 < QUESTIONS.length) {
      setCurrent(current + 1);
    } else {
      setScreen("lead");
    }
  }

  function goPrev() {
    if (current > 0) {
      setCurrent(current - 1);
    }
  }

  async function submitLead(e) {
    e.preventDefault();
    setSending(true);
    setSendError(false);
    try {
      const finalScore = answers.reduce((a, b) => a + (b || 0), 0);
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
      setSendError(true);
      setScreen("result");
    } finally {
      setSending(false);
    }
  }

  function restart() {
    setScreen("intro");
    setCurrent(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
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
          selected={answers[current]}
          onSelect={selectOption}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}

      {screen === "lead" && (
        <Lead lead={lead} setLead={setLead} onSubmit={submitLead} sending={sending} />
      )}

      {screen === "result" && (
        <Result profile={profile} onRestart={restart} sendError={sendError} />
      )}
    </div>
  );
}

function Intro({ onStart }) {
  return (
    <div style={styles.centerCol}>
      <div style={{ ...styles.card, maxWidth: 560, textAlign: "center" }}>
        <p style={styles.eyebrow}>TESTE DE CONSCIÊNCIA PESSOAL</p>
        <h1 style={styles.title}>Você está vivendo do jeito que gostaria… ou apenas fazendo o que precisa ser feito?</h1>
        <p style={styles.body}>
          Em poucos minutos, responda a 25 perguntas sobre situações do dia a
          dia e descubra qual dos quatro perfis mais combina com a forma como
          você tem vivido este momento.
        </p>
        <p style={{ ...styles.body, marginTop: 12 }}>
          Talvez algumas respostas te surpreendam. Outras podem colocar em
          palavras coisas que você já sentia, mas ainda não tinha parado
          para perceber.
        </p>
        <PathPreview />
        <button style={styles.ctaMain} className="cta-btn" onClick={onStart}>
          DESCOBRIR MEU PERFIL <ArrowRight size={18} strokeWidth={2.5} />
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

function Quiz({ index, question, total, selected, onSelect, onNext, onPrev }) {
  const pct = (index / total) * 100;
  const isLast = index === total - 1;
  return (
    <div style={styles.centerCol}>
      <div style={{ ...styles.card, maxWidth: 600 }}>
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressFill, width: `${pct}%` }} />
        </div>
        <p style={styles.progressLabel}>Pergunta {index + 1} de {total}</p>
        <h2 style={styles.question}>{question.q}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
          {question.o.map((opt, i) => {
            const isSelected = selected === i + 1;
            return (
              <button
                key={i}
                className="opt-btn"
                style={{
                  ...styles.optBtn,
                  "--accent": "#C99A3D",
                  "--accent-10": "#C99A3D1a",
                  borderColor: isSelected ? "#C99A3D" : "#E7E3F0",
                  background: isSelected ? "#C99A3D1a" : "#fff",
                  fontWeight: isSelected ? 600 : 400,
                }}
                onClick={() => onSelect(i + 1)}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28 }}>
          {index > 0 ? (
            <button
              className="cta-btn"
              onClick={onPrev}
              style={{ ...styles.ctaMain, marginTop: 0, background: "transparent", color: "#6B667D", border: "1px solid #DEDAE8", padding: "12px 20px" }}
            >
              <ArrowLeft size={18} /> Anterior
            </button>
          ) : (
            <span />
          )}
          <button
            className="cta-btn"
            onClick={onNext}
            disabled={selected == null}
            style={{
              ...styles.ctaMain,
              marginTop: 0,
              opacity: selected == null ? 0.4 : 1,
              cursor: selected == null ? "not-allowed" : "pointer",
            }}
          >
            {isLast ? "Ver resultado" : "Próxima"} <ArrowRight size={18} />
          </button>
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
          Seu retrato está pronto. Preencha abaixo para ver seu resultado completo.
        </p>
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
          <input required type="text" placeholder="Seu nome" value={lead.nome} onChange={(e) => setLead({ ...lead, nome: e.target.value })} style={styles.input} />
          <input required type="email" placeholder="Seu melhor e-mail" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} style={styles.input} />
          <input required type="tel" placeholder="WhatsApp (com DDD)" value={lead.whatsapp} onChange={(e) => setLead({ ...lead, whatsapp: e.target.value })} style={styles.input} />
          <button type="submit" style={styles.ctaMain} className="cta-btn" disabled={sending}>
            {sending ? "Enviando..." : "Ver meu resultado"} <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </form>
        <p style={styles.fineprint}>Seus dados são usados apenas para enviar seu resultado e, se você topar, um contato posterior.</p>
      </div>
    </div>
  );
}

function Result({ profile, onRestart, sendError }) {
  return (
    <div style={styles.centerCol}>
      <div style={{ ...styles.card, maxWidth: 640 }}>
        <p style={styles.eyebrow}>SEU RESULTADO É</p>
        <h1 style={{ ...styles.title, color: profile.cor, marginBottom: 24 }}>{profile.nome}</h1>

        <Paragraphs text={profile.resultadoGratuito} />

        <div style={styles.section}>
          <p style={{ ...styles.body, fontStyle: "italic", color: "#8B87A0" }}>Antes de você fechar este resultado...</p>
          <p style={{ ...styles.body, fontStyle: "italic", color: "#8B87A0" }}>Quero te fazer três perguntas. Não precisa responder para mim. Responda para você.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 20 }}>
          {profile.perguntas.map((pergunta, i) => (
            <div key={i} style={styles.perguntaBox}>
              <span style={{ ...styles.perguntaNum, color: profile.cor }}>{i + 1}</span>
              <p style={{ ...styles.body, fontWeight: 500, color: "#2A2640" }}>{pergunta}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 26 }}>
          <Paragraphs text={profile.depoisPerguntas} />
        </div>

        <div style={{ ...styles.premiumCard, background: `linear-gradient(135deg, ${profile.cor}12, ${profile.cor}04)`, borderColor: profile.cor + "35" }}>
          <Paragraphs text={profile.premiumTexto} />

          <div style={{ marginTop: 20, textAlign: "center" }}>
            <p style={{ ...styles.sectionLabel, color: profile.cor, marginBottom: 4 }}>Resultado Premium — {profile.nome}</p>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 600, color: "#2A2640", margin: "4px 0 18px" }}>R$27</p>
            <a
              href={profile.checkout}
              target="_blank"
              rel="noreferrer"
              className="cta-btn"
              style={{ ...styles.ctaMain, marginTop: 0, background: profile.cor, textDecoration: "none", width: "100%", justifyContent: "center" }}
            >
              {profile.botao} <ArrowRight size={18} />
            </a>
            <p style={{ ...styles.fineprint, marginTop: 12 }}>
              Acesso ao material digital correspondente ao seu perfil após a confirmação da compra.
            </p>
          </div>
        </div>

        {sendError && (
          <p style={{ ...styles.fineprint, color: "#B06A3E", marginTop: 16 }}>
            Não conseguimos salvar seus dados automaticamente — sem problema, seu resultado continua completo abaixo.
          </p>
        )}

        <button style={{ ...styles.ctaMain, background: "transparent", color: "#6B667D", border: "1px solid #DEDAE8", marginTop: 28 }} className="cta-btn" onClick={onRestart}>
          <RotateCcw size={16} /> Refazer o teste
        </button>

        <p style={styles.copyright}>Teste de Consciência Pessoal © Fabrícia Máia. Todos os direitos reservados.</p>
      </div>
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
  centerCol: { display: "flex", justifyContent: "center", alignItems: "flex-start" },
  card: { background: "#FBF9F5", borderRadius: 16, padding: "36px 40px", width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.35)" },
  eyebrow: { fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9691A8", fontWeight: 600, marginBottom: 8 },
  title: { fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 600, color: "#2A2640", margin: "0 0 12px", lineHeight: 1.15 },
  body: { fontSize: 15, lineHeight: 1.65, color: "#4B4760", margin: 0 },
  fineprint: { fontSize: 12, color: "#B4AFC4", marginTop: 14 },
  ctaMain: { marginTop: 8, padding: "13px 26px", borderRadius: 999, border: "none", background: "#2A2640", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "Inter, sans-serif" },
  input: { padding: "12px 14px", borderRadius: 10, border: "1px solid #E7E3F0", fontSize: 14.5, fontFamily: "Inter, sans-serif", color: "#2A2640" },
  progressTrack: { height: 4, background: "#EDE9F3", borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", background: "#C99A3D", borderRadius: 4, transition: "width 0.3s ease" },
  progressLabel: { fontSize: 12, color: "#B4AFC4", margin: "10px 0 18px", fontWeight: 500 },
  question: { fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500, color: "#2A2640", margin: 0, lineHeight: 1.3 },
  optBtn: { textAlign: "left", padding: "14px 16px", borderRadius: 10, border: "1px solid #E7E3F0", background: "#fff", fontSize: 14.5, color: "#3D3956", cursor: "pointer", fontFamily: "Inter, sans-serif", lineHeight: 1.4 },
  section: { marginTop: 28, paddingTop: 22, borderTop: "1px solid #EDE9F3" },
  sectionLabel: { fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8B87A0", fontWeight: 700, margin: "0 0 8px" },
  perguntaBox: { padding: "16px 18px", borderRadius: 12, background: "#F3EFE6", display: "flex", gap: 14, alignItems: "flex-start" },
  perguntaNum: { fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, flexShrink: 0 },
  premiumCard: { marginTop: 28, padding: "24px 26px", borderRadius: 14, border: "1px solid" },
  copyright: { fontSize: 11, color: "#C4C0D2", textAlign: "center", marginTop: 24 },
};
