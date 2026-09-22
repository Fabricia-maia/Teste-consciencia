import { useState } from "react";
import { ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";

// CONFIGURAÇÃO PRESERVADA
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjyvryag";

const QUESTIONS = [
  { dimension: "perceber", q: "Quando percebe que não está bem emocionalmente, o que costuma fazer?", o: ["Tento seguir normalmente e não penso muito nisso.", "Tento entender o que estou sentindo e o que estou precisando naquele momento.", "Sei que não estou bem, mas nem sempre consigo entender o que estou sentindo.", "Tento identificar o que estou sentindo e o que pode ter mexido comigo."] },
  { dimension: "perceber", q: "Quando pensa no que quer para a sua vida, o que mais acontece?", o: ["Sei o que faz sentido para mim e considero isso quando faço minhas escolhas.", "Tenho percebido melhor o que faz sentido para mim, mesmo com algumas dúvidas.", "Quase nunca paro para pensar no que eu realmente quero.", "Sei mais o que esperam de mim do que aquilo que eu quero."] },
  { dimension: "perceber", structural: true, q: "Quando você reage de um jeito que depois costuma se arrepender, em que momento geralmente percebe o que está acontecendo?", o: ["Às vezes percebo a tempo e consigo reagir de outro jeito.", "Percebo durante a situação, mas nem sempre consigo parar.", "Quando percebo o que está acontecendo, consigo parar antes de continuar reagindo.", "Geralmente só percebo depois que tudo já aconteceu."] },
  { dimension: "compreender", structural: true, q: "Quando uma situação do presente mexe muito com você, o que costuma acontecer?", o: ["Percebo que aquilo mexeu muito comigo, mas nem sempre entendo por quê.", "Reajo ao que aconteceu e geralmente fica por isso mesmo.", "Tento perceber se minha reação tem relação com alguma coisa que já vivi.", "Tento entender de onde vem minha reação antes de decidir o que fazer."] },
  { dimension: "compreender", structural: true, q: "Quando percebe que está repetindo uma situação que já te fez mal antes, o que costuma acontecer?", o: ["Quando reconheço o padrão, tento fazer diferente antes de repetir tudo de novo.", "Percebo que estou repetindo, mas não sei muito bem como fazer diferente.", "Tento entender o que me leva a repetir e começo a mudar algumas atitudes.", "Geralmente só percebo quando tudo já aconteceu de novo."] },
  { dimension: "compreender", structural: true, q: "Quando algo dá errado em uma situação em que você também estava envolvido, o que costuma fazer?", o: ["Penso primeiro no que a outra pessoa ou a situação fez dar errado.", "Reconheço o que foi minha parte e penso no que posso fazer diferente numa próxima vez.", "Fico pensando no que eu deveria ter feito diferente e acabo me culpando.", "Tento separar o que dependia de mim daquilo que não dependia."] },
  { dimension: "compreender", q: "Quando alguém faz uma crítica sobre você, o que costuma acontecer?", o: ["Fico incomodado e continuo pensando no que a pessoa disse.", "Minha primeira reação é me defender ou explicar por que fiz aquilo.", "Penso no que foi dito e, se fizer sentido, revejo minha atitude.", "Tento avaliar se existe alguma verdade no que ouvi."] },
  { dimension: "escolher", structural: true, q: "Quando alguém te pede algo que você não gostaria de fazer, o que costuma acontecer?", o: ["Penso no que quero antes de responder, mas às vezes acabo cedendo.", "Aceito para não desagradar, mesmo ficando incomodado depois.", "Acabo aceitando antes mesmo de pensar se quero fazer aquilo.", "Antes de responder, penso se quero e se posso fazer aquilo."] },
  { dimension: "escolher", structural: true, q: "Quando percebe que sua vida não está indo na direção que gostaria, o que costuma fazer?", o: ["Penso bastante em mudar, mas acabo adiando.", "Revejo o que está ao meu alcance e começo por alguma coisa que posso mudar.", "Vou levando e espero que as coisas melhorem.", "Começo a mudar algumas coisas, mesmo sem saber ainda qual é o melhor caminho."] },
  { dimension: "escolher", structural: true, q: "Quando está muito irritado, magoado ou preocupado e precisa tomar uma decisão, o que costuma fazer?", o: ["Tento entender o que estou sentindo antes de decidir.", "Prefiro esperar um pouco para conseguir pensar melhor.", "Acabo decidindo na hora, muito levado pelo que estou sentindo.", "Tento deixar o que estou sentindo de lado e decido assim mesmo."] },
  { dimension: "escolher", anchor: true, q: "Quando precisa tomar uma decisão importante e não tem certeza do que fazer, o que costuma acontecer?", o: ["Vou adiando porque tenho medo de escolher errado.", "Avalio o que sei naquele momento e faço uma escolha.", "Escolho com o que sei naquele momento e, se precisar, ajusto depois.", "Penso em tantas possibilidades que tenho dificuldade de decidir."] },
  { dimension: "sustentar", anchor: true, q: "Depois de fazer uma escolha importante para você que desagradou alguém, o que costuma acontecer?", o: ["Fico desconfortável, mas tento lembrar por que fiz aquela escolha.", "Fico tão mal que muitas vezes acabo voltando atrás.", "Mantenho minha escolha, mas fico me culpando por bastante tempo.", "O desconforto existe, mas mantenho minha escolha enquanto ela continuar fazendo sentido para mim."] },
  { dimension: "sustentar", structural: true, q: "Quando entra em conflito com alguém importante para você, o que costuma fazer?", o: ["Tento entender os dois lados e digo o que é importante para mim.", "Tento entender o lado da pessoa sem esquecer o meu.", "Tento fazer a pessoa entender o meu lado.", "Acabo cedendo para evitar que a situação piore."] },
  { dimension: "sustentar", structural: true, q: "Quando percebe que uma decisão que tomou não foi boa para você, o que costuma fazer?", o: ["Reavalio a situação e considero mudar de decisão.", "Continuo com a decisão porque já escolhi e não gosto de voltar atrás.", "Penso em voltar atrás, mas tenho dificuldade de fazer isso.", "Se percebo que aquela decisão não faz mais sentido, mudo o rumo."] },
  { dimension: "sustentar", anchor: true, q: "Quando decide mudar um comportamento antigo, o que costuma acontecer depois de um tempo?", o: ["Acabo voltando ao que fazia antes e muitas vezes só percebo depois.", "Às vezes volto ao comportamento antigo, mas consigo perceber e começar de novo.", "Quando percebo que voltei ao comportamento antigo, tento retomar a mudança.", "Percebo que voltei ao comportamento antigo, mas tenho dificuldade de sair dele novamente."] },
  { dimension: "sustentar", structural: true, q: "Quando percebe que uma atitude sua prejudicou alguém, o que costuma fazer?", o: ["Reconheço que errei, mas tenho dificuldade de falar sobre isso com a pessoa.", "Tenho dificuldade de reconhecer que errei.", "Reconheço meu erro e procuro reparar o que aconteceu.", "Procuro reparar o que aconteceu e penso no que preciso fazer diferente dali para frente."] },
];

// Matriz congelada: índice da alternativa visível (A/B/C/D) -> N0/N1/N2/N3
const LEVEL_MATRIX = [
  [0,3,1,2], [3,2,0,1], [2,1,3,0], [1,0,2,3],
  [3,1,2,0], [0,3,1,2], [1,0,3,2], [2,1,0,3],
  [1,3,0,2], [3,2,0,1], [0,2,3,1], [2,0,1,3],
  [3,2,1,0], [2,0,1,3], [0,3,2,1], [1,0,2,3],
];

const PROFILES = {
  automatico: {
    key: "automatico", nome: "No Automático", cor: "#8B5A6B",
    resultadoGratuito: `Sabe quando os dias vão passando e você simplesmente vai fazendo?

Acorda, resolve o que aparece, responde o que precisa, aceita algumas coisas, deixa outras para depois... e segue.

Só que, de vez em quando, bate aquela sensação:

“Como foi que minha vida veio parar aqui?”

Talvez você nem esteja exatamente infeliz.

Mas algumas coisas podem estar acontecendo tão no automático que você só percebe depois.

Depois que disse “sim” e percebeu que queria ter dito “não”.

Depois que reagiu de um jeito e pensou: “Por que eu fiz isso de novo?”

Depois que uma situação se repetiu.

Depois que o incômodo ficou grande demais para continuar ignorando.

E não significa que você não pense sobre a própria vida.

O ponto pode ser outro:

muitas vezes você percebe o que estava acontecendo quando já aconteceu.

Enquanto isso, o costume, a pressa, aquilo que esperam de você ou simplesmente o jeito que sempre fez acabam decidindo primeiro.

E é assim que algumas coisas vão permanecendo.

Não necessariamente porque você escolheu continuar.

Mas porque talvez ainda não tenha existido espaço suficiente entre o que acontece e a sua resposta.

Por isso, seu primeiro movimento não precisa ser mudar sua vida inteira.

Pode ser muito menor — e muito mais importante:

começar a perceber antes.

Antes do “sim”.
Antes da reação.
Antes de repetir.
Antes de simplesmente seguir.

Porque talvez a pergunta agora não seja:
“O que eu preciso mudar?”

Talvez seja:
“O que eu começaria a escolher diferente se conseguisse perceber enquanto ainda posso escolher?”`,
    premiumTitulo: "E SE O AUTOMÁTICO ESTIVER DECIDINDO MAIS COISAS POR VOCÊ DO QUE VOCÊ IMAGINA?",
    premiumTexto: `Você acabou de reconhecer um movimento importante.

Mas saber que ele existe é diferente de começar a enxergar como ele pode aparecer nas situações comuns da sua vida.

Porque o automático raramente chega dizendo: “Oi, sou eu escolhendo por você.” 😂

Ele aparece nas pequenas coisas: na resposta que sai rápido demais, no “sim” que vem antes da pergunta “eu quero?”, na situação que se repete e parece apenas azar, na reação que só faz sentido depois.

E quanto mais familiar um padrão é, mais fácil é confundi-lo com: “Eu sou assim mesmo.”

Foi por isso que eu criei o Resultado Premium — No Automático.

Para você não ficar apenas com o nome do seu perfil, mas ter um material para aprofundá-lo, reconhecer como esse funcionamento pode aparecer na vida real e começar a observar aquilo que hoje ainda passa rápido demais.

Porque talvez você não precise mudar tudo.

Talvez precise começar a enxergar o que acontece antes da repetição.`,
    botao: "QUERO ENXERGAR ALÉM DO AUTOMÁTICO",
    checkout: "https://pay.kiwify.com.br/ai8EDtg",
  },
  sobrevivendo: {
    key: "sobrevivendo", nome: "Sobrevivendo", cor: "#B06A3E",
    resultadoGratuito: `Você já percebe que alguma coisa não está bem.

Talvez seja uma situação que se repete.

Uma relação que pesa.

Uma rotina que já não faz sentido.

Um limite que você sabe que precisa colocar.

Ou simplesmente aquela sensação de:

“Eu não quero continuar desse jeito.”

O problema é que perceber isso nem sempre significa saber o que fazer com isso.

Você sente o incômodo.

Pensa sobre ele.

Talvez reclame, tente mudar alguma coisa, prometa para si mesmo que dessa vez vai ser diferente...

mas, quando a vida acontece de verdade, acaba entrando no mesmo funcionamento outra vez.

Diz “sim” querendo dizer “não”.

Vai adiando uma decisão.

Continua carregando coisas que já percebeu que estão pesadas.

Reage do mesmo jeito e depois pensa:

“Eu sabia que isso ia acontecer.”

E é aí que o Sobrevivendo é diferente do No Automático.

Você já percebe que existe alguma coisa acontecendo.

Só que ainda pode ser difícil enxergar com clareza o que mantém você preso nisso.

Às vezes parece que o problema está na situação.
Na outra pessoa.
Na falta de tempo.
Nas responsabilidades.
No medo de decepcionar.

E sim, tudo isso pode ter peso.

Mas existe uma pergunta que começa a abrir outra porta:

“O que eu continuo fazendo, aceitando ou adiando que também ajuda essa situação a continuar como está?”

Não para se culpar.

Mas para começar a encontrar aquilo que realmente está nas suas mãos.

Porque existe uma diferença enorme entre perceber:

“Isso está me fazendo mal.”

e conseguir enxergar:

“Agora estou começando a entender como isso continua acontecendo na minha vida.”

E talvez seja exatamente aí que você esteja.

Não sem perceber.
Não sem querer mudar.

Mas tentando descobrir onde começa a sua parte nessa mudança.`,
    premiumTitulo: "SE VOCÊ JÁ PERCEBE QUE ALGUMA COISA NÃO ESTÁ BEM... POR QUE AINDA É TÃO DIFÍCIL FAZER DIFERENTE?",
    premiumTexto: `Essa talvez seja a parte mais frustrante do Sobrevivendo.

Você não está completamente no escuro. Você percebe.

Percebe o incômodo. Percebe algumas repetições. Percebe aquilo que pesa. Percebe situações que já não gostaria de continuar vivendo do mesmo jeito.

E mesmo assim... algumas coisas continuam.

É justamente aí que vale olhar mais de perto.

Porque entre “isso não está me fazendo bem” e “estou começando a enxergar o que posso fazer diferente” existe um espaço enorme.

O Resultado Premium — Sobrevivendo foi criado para aprofundar esse perfil e te ajudar a observar diferentes formas pelas quais esse funcionamento pode estar aparecendo na sua vida.

Com reflexões, Mapa da Clareza, práticas e um experimento de 7 dias, você terá um próximo passo para sair apenas da identificação e começar a olhar para esse movimento com mais clareza.

Não para encontrar um culpado.

Para começar a perceber onde você ainda tem escolha.`,
    botao: "QUERO OLHAR MAIS FUNDO",
    checkout: "https://pay.kiwify.com.br/dqE5eYl",
  },
  despertando: {
    key: "despertando", nome: "Despertando", cor: "#C99A3D",
    resultadoGratuito: `Aqui acontece uma coisa curiosa:

você já percebe muita coisa.

Começa a reconhecer seus padrões.

Entende melhor por que algumas situações mexem tanto com você.

Percebe quando está repetindo algo que já não quer mais.

E provavelmente já teve vários momentos de:

“Meu Deus... agora entendi!”

Só que existe uma parte bem irritante nisso. 😂

Entender não significa conseguir fazer diferente todas as vezes.

Às vezes você percebe que precisa colocar um limite — e coloca.

Em outras, sabe exatamente o que gostaria de dizer... mas acaba cedendo.

Às vezes toma uma decisão importante para você.

Em outras, começa a duvidar dela quando alguém se incomoda.

Tem momentos em que reconhece um padrão enquanto ele está acontecendo e consegue escolher diferente.

E tem outros em que só pensa:

“Eu sabia. E fiz de novo.”

É justamente por isso que esse momento pode ser tão confuso.

Porque você já não consegue dizer:

“Eu não percebia.”

Mas também ainda não consegue dizer:

“Eu consigo viver de acordo com aquilo que percebo.”

Existe um espaço entre essas duas coisas.

E talvez seja nele que você esteja agora.

Não faltando consciência.
Não voltando para trás.

Mas aprendendo uma parte do autoconhecimento sobre a qual se fala muito menos:

como continuar fazendo diferente quando fazer diferente fica desconfortável.

Quando aparece culpa.
Quando alguém não gosta.
Quando você tem medo de escolher errado.
Quando o comportamento antigo volta.
Quando aquilo que você entendeu sobre si precisa sair da cabeça e participar de uma escolha real.

Por isso, talvez você não precise descobrir mais cinquenta coisas sobre você agora.

Talvez a pergunta mais importante seja:

“Daquilo que eu já consigo perceber e compreender sobre mim... o que ainda oscila quando preciso viver diferente?”`,
    premiumTitulo: "VOCÊ JÁ ENTENDEU MUITA COISA SOBRE VOCÊ. MAS ENTENDER ESTÁ MUDANDO A SUA VIDA?",
    premiumTexto: `Essa pergunta incomoda um pouquinho, eu sei. 😂

Porque chega um momento em que descobrir mais um padrão, assistir mais um vídeo ou ter mais um daqueles “Nossa, sou exatamente assim!” já não é suficiente.

Você pode saber por que reage. Saber onde precisa colocar um limite. Saber qual conversa está adiando. Saber que está repetindo um comportamento.

E ainda assim...

na hora em que a vida acontece, fazer diferente pode ser outra história.

É justamente esse espaço entre perceber e viver diferente que o Resultado Premium — Despertando aprofunda.

Você vai encontrar reflexões, Mapa da Clareza, práticas e um experimento de 7 dias para observar como esse movimento pode aparecer na sua vida e começar a levar aquilo que você já percebe para a experiência.

Porque talvez você não precise de mais uma descoberta sobre você.

Talvez precise descobrir o que acontece quando aquilo que você já sabe precisa virar escolha.`,
    botao: "QUERO LEVAR ISSO PARA A VIDA REAL",
    checkout: "https://pay.kiwify.com.br/6lHlycF",
  },
  "caminho-real": {
    key: "caminho-real", nome: "Caminho Real", cor: "#2F7A6B",
    resultadoGratuito: `Tem uma coisa importante no seu resultado:

você não chegou a lugar nenhum.

E isso é uma boa notícia. 😂

Porque Caminho Real não é um lugar onde você finalmente aprende a lidar bem com tudo, nunca mais repete um padrão e toma sempre as decisões certas.

A vida continua acontecendo.

Você ainda pode ter medo.
Pode ficar confuso.
Pode reagir de um jeito e depois pensar:
“Não era assim que eu queria ter lidado com isso.”

Pode tomar uma decisão e descobrir mais tarde que ela já não faz sentido.

Pode colocar um limite e sentir culpa.

Pode voltar a um comportamento que achava que já tinha deixado para trás.

A diferença está no que acontece depois — e, cada vez mais, durante.

Você tende a perceber mais cedo o que está acontecendo com você.

Consegue olhar para uma situação e reconhecer não apenas o que o outro fez, mas também qual é a sua parte nela.

Aquilo que você percebe começa a participar das suas escolhas.

E quando uma escolha deixa de fazer sentido, existe mais espaço para rever.

Quando você erra, existe mais possibilidade de reconhecer e reparar.

Quando um padrão antigo reaparece, isso não precisa significar que todo o caminho foi perdido.

Você pode perceber.
Reajustar.
Retomar.
E continuar.

Isso não é controle.
Não é ter todas as respostas.
E definitivamente não é viver em paz consigo mesmo 24 horas por dia. 😂

É algo bem mais real:

você começa a estar presente na própria vida enquanto ela acontece.

Talvez seja justamente isso que diferencia este momento dos anteriores.

Antes, compreender alguma coisa sobre você podia ser o ponto de chegada.

Agora, compreender começa a ser só uma parte.

Porque aquilo que você percebe sobre si já consegue atravessar a reflexão e chegar à vida real:

na conversa que você decide ter.
no limite que coloca.
na escolha que sustenta.
na decisão que revê.
no erro que repara.
na mudança que retoma.

E talvez essa seja uma das partes mais bonitas — e menos glamourosas 😂 — do autoconhecimento:

você não precisa acertar sempre para viver com consciência.

Precisa conseguir se perceber enquanto vive, participar das próprias escolhas e voltar para si quando perceber que se afastou delas.

Por isso, Caminho Real não significa:
“Agora eu sei quem sou.”

Talvez signifique algo muito mais interessante:

“Eu consigo me escutar, escolher, rever e continuar me encontrando enquanto vivo.”`,
    premiumTitulo: "E AGORA QUE VOCÊ JÁ SE PERCEBE MAIS... O QUE AINDA NÃO PERCEBEU?",
    premiumTexto: `Caminho Real tem uma armadilha curiosa:

quanto mais você aprende a se observar, mais fácil pode parecer que já conhece seus próprios movimentos.

Até a vida apresentar uma situação nova. 😂

Porque consciência não é uma resposta que você encontra uma vez e guarda.

Ela aparece na conversa difícil. Na escolha que precisa ser sustentada. Na decisão que precisa ser revista. No padrão que reaparece. Na capacidade de reconhecer, reparar e retomar.

Seu resultado não está dizendo: “Parabéns. Você chegou.”

Está dizendo algo muito mais interessante:

“Você já consegue participar mais conscientemente da própria vida. Agora existe mais coisa para observar.”

O Resultado Premium — Caminho Real é um convite para aprofundar esse movimento.

Com reflexões, Mapa da Clareza, práticas e um experimento de 7 dias, você poderá olhar para diferentes formas pelas quais consciência, escolha, revisão e retomada aparecem na vida real.

Não para alcançar uma versão melhor de você.

Mas para continuar descobrindo quem você é enquanto vive.`,
    botao: "QUERO IR ALÉM DO MEU RESULTADO",
    checkout: "https://pay.kiwify.com.br/EmsPGr0",
  },
};

function analyzeAnswers(answers) {
  const levels = answers.map((answer, i) => LEVEL_MATRIX[i][answer - 1]);
  const count = [0,1,2,3].map(n => levels.filter(v => v === n).length);
  const active = levels.filter(v => v >= 2).length;
  const n3 = count[3];

  const byDimension = {};
  QUESTIONS.forEach((question, i) => {
    (byDimension[question.dimension] ||= []).push(levels[i]);
  });

  const anchors = [levels[10], levels[11], levels[14]];
  const n3EveryDimension = ["perceber","compreender","escolher","sustentar"]
    .every(d => byDimension[d].some(v => v === 3));
  const escolherActive = byDimension.escolher.filter(v => v >= 2).length;
  const sustentarActive = byDimension.sustentar.filter(v => v >= 2).length;

  const caminhoReal =
    active >= 12 &&
    n3 >= 5 &&
    n3EveryDimension &&
    escolherActive >= 3 &&
    sustentarActive >= 4 &&
    anchors.every(v => v !== 0) &&
    anchors.filter(v => v >= 2).length >= 2;

  if (caminhoReal) return { profile: PROFILES["caminho-real"], levels, count, byDimension, anchors };

  const perceber = byDimension.perceber;
  const noAutomatico =
    count[0] >= 8 ||
    (count[0] >= 5 && perceber.filter(v => v === 0).length >= 2 && levels[2] === 0);

  if (noAutomatico) return { profile: PROFILES.automatico, levels, count, byDimension, anchors };
  const perceberActive = byDimension.perceber.filter(v => v >= 2).length;
  const compreenderActive = byDimension.compreender.filter(v => v >= 2).length;
  const iniciouMovimento = escolherActive >= 1;
  const despertandoPorCircuito = perceberActive >= 2 && compreenderActive >= 3 && iniciouMovimento;

  if (active >= 8 || despertandoPorCircuito) {
    return { profile: PROFILES.despertando, levels, count, byDimension, anchors };
  }
  return { profile: PROFILES.sobrevivendo, levels, count, byDimension, anchors };
}

function Paragraphs({ text, style }) {
  const blocks = text.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  return <>{blocks.map((b, i) => <p key={i} style={{ ...styles.body, ...style, marginBottom: 14 }}>{b}</p>)}</>;
}

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(() => Array(QUESTIONS.length).fill(null));
  const [lead, setLead] = useState({ nome: "", email: "", whatsapp: "" });
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const analysis = answers.every(a => a != null) ? analyzeAnswers(answers) : null;
  const profile = analysis?.profile;

  function selectOption(optionIndex) {
    const next = [...answers];
    next[current] = optionIndex;
    setAnswers(next);
  }

  function goNext() {
    if (answers[current] == null) return;
    if (current + 1 < QUESTIONS.length) setCurrent(current + 1);
    else setScreen("lead");
  }

  function goPrev() {
    if (current > 0) setCurrent(current - 1);
  }

  async function submitLead(e) {
    e.preventDefault();
    setSending(true);
    setSendError(false);
    const finalAnalysis = analyzeAnswers(answers);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nome: lead.nome,
          email: lead.email,
          whatsapp: lead.whatsapp,
          perfil: finalAnalysis.profile.nome,
          niveis: `N0:${finalAnalysis.count[0]} | N1:${finalAnalysis.count[1]} | N2:${finalAnalysis.count[2]} | N3:${finalAnalysis.count[3]}`,
          respostas: answers.map((a, i) => `${i + 1}${["A","B","C","D"][a - 1]}`).join(" | "),
          ancoras: `Q11:N${finalAnalysis.anchors[0]} | Q12:N${finalAnalysis.anchors[1]} | Q15:N${finalAnalysis.anchors[2]}`,
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
        input:focus { outline: none; border-color: #C99A3D !important; }
      `}</style>

      {screen === "intro" && <Intro onStart={() => setScreen("instructions")} />}
      {screen === "instructions" && <Instructions onStart={() => setScreen("quiz")} />}
      {screen === "quiz" && (
        <Quiz index={current} question={QUESTIONS[current]} total={QUESTIONS.length}
          selected={answers[current]} onSelect={selectOption} onNext={goNext} onPrev={goPrev} />
      )}
      {screen === "lead" && <Lead lead={lead} setLead={setLead} onSubmit={submitLead} sending={sending} />}
      {screen === "result" && profile && <Result profile={profile} onRestart={restart} sendError={sendError} />}
    </div>
  );
}

function Intro({ onStart }) {
  return (
    <div style={styles.centerCol}>
      <div style={{ ...styles.card, maxWidth: 560, textAlign: "center" }}>
        <p style={styles.eyebrow}>TESTE DE CONSCIÊNCIA PESSOAL</p>
        <h1 style={styles.title}>Quanto daquilo que você percebe sobre si realmente participa da sua vida?</h1>
        <p style={styles.body}>Às vezes a gente sabe exatamente o que gostaria de fazer... e faz outra coisa. 😂</p>
        <p style={{ ...styles.body, marginTop: 12 }}>
          Este teste vai te ajudar a observar como aquilo que você percebe sobre si aparece nas situações comuns da vida — nas suas reações, escolhas, limites e decisões.
        </p>
        <button style={styles.ctaMain} className="cta-btn" onClick={onStart}>
          COMEÇAR O TESTE <ArrowRight size={18} strokeWidth={2.5} />
        </button>
        <p style={styles.copyright}>Criado por Fabrícia Máia · Terapeuta Integrativa</p>
      </div>
    </div>
  );
}

function Instructions({ onStart }) {
  return (
    <div style={styles.centerCol}>
      <div style={{ ...styles.card, maxWidth: 560 }}>
        <p style={styles.eyebrow}>ANTES DE COMEÇAR...</p>
        <h2 style={{ ...styles.title, fontSize: 27 }}>Aqui não existe resposta certa.</h2>
        <p style={styles.body}>E não vale escolher aquela que parece mais bonita. 😏</p>
        <p style={{ ...styles.body, marginTop: 14 }}>
          Responda pensando no que acontece <strong>na vida real</strong>:
        </p>
        <p style={{ ...styles.question, fontSize: 19, marginTop: 18 }}>
          “O que eu costumo fazer quando isso acontece comigo?”
        </p>
        <p style={{ ...styles.body, marginTop: 18 }}>
          Escolha a alternativa que mais se aproxima de como você costuma agir <strong>hoje</strong> — não de como gostaria de agir.
        </p>
        <button style={styles.ctaMain} className="cta-btn" onClick={onStart}>
          ENTENDI. VAMOS LÁ <ArrowRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

function Quiz({ index, question, total, selected, onSelect, onNext, onPrev }) {
  const pct = ((index + 1) / total) * 100;
  const isLast = index === total - 1;
  return (
    <div style={styles.centerCol}>
      <div style={{ ...styles.card, maxWidth: 600 }}>
        <div style={styles.progressTrack}><div style={{ ...styles.progressFill, width: `${pct}%` }} /></div>
        <p style={styles.progressLabel}>Pergunta {index + 1} de {total}</p>
        <h2 style={styles.question}>{question.q}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
          {question.o.map((opt, i) => {
            const isSelected = selected === i + 1;
            return (
              <button key={i} className="opt-btn"
                style={{ ...styles.optBtn, "--accent": "#C99A3D", "--accent-10": "#C99A3D1a",
                  borderColor: isSelected ? "#C99A3D" : "#E7E3F0",
                  background: isSelected ? "#C99A3D1a" : "#fff",
                  fontWeight: isSelected ? 600 : 400 }}
                onClick={() => onSelect(i + 1)}>
                {opt}
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28 }}>
          {index > 0 ? (
            <button className="cta-btn" onClick={onPrev}
              style={{ ...styles.ctaMain, marginTop: 0, background: "transparent", color: "#6B667D", border: "1px solid #DEDAE8", padding: "12px 20px" }}>
              <ArrowLeft size={18} /> Anterior
            </button>
          ) : <span />}
          <button className="cta-btn" onClick={onNext} disabled={selected == null}
            style={{ ...styles.ctaMain, marginTop: 0, opacity: selected == null ? 0.4 : 1, cursor: selected == null ? "not-allowed" : "pointer" }}>
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
        <p style={styles.body}>Seu retrato está pronto. Preencha abaixo para ver seu resultado completo.</p>
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
        <div style={{ ...styles.premiumCard, background: `linear-gradient(135deg, ${profile.cor}12, ${profile.cor}04)`, borderColor: profile.cor + "35" }}>
          <p style={{ ...styles.question, color: profile.cor, fontSize: 19, marginBottom: 14 }}>{profile.premiumTitulo}</p>
          <Paragraphs text={profile.premiumTexto} />
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <p style={{ ...styles.sectionLabel, color: profile.cor, marginBottom: 4 }}>Resultado Premium — {profile.nome}</p>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 600, color: "#2A2640", margin: "4px 0 18px" }}>R$27</p>
            <a href={profile.checkout} target="_blank" rel="noreferrer" className="cta-btn"
              style={{ ...styles.ctaMain, marginTop: 0, background: profile.cor, textDecoration: "none", width: "100%", justifyContent: "center" }}>
              {profile.botao} <ArrowRight size={18} />
            </a>
            <p style={{ ...styles.fineprint, marginTop: 12 }}>Acesso ao material digital correspondente ao seu perfil após a confirmação da compra.</p>
          </div>
        </div>
        {sendError && <p style={{ ...styles.fineprint, color: "#B06A3E", marginTop: 16 }}>Não conseguimos salvar seus dados automaticamente — sem problema, seu resultado continua completo abaixo.</p>}
        <button style={{ ...styles.ctaMain, background: "transparent", color: "#6B667D", border: "1px solid #DEDAE8", marginTop: 28 }} className="cta-btn" onClick={onRestart}>
          <RotateCcw size={16} /> Refazer o teste
        </button>
        <p style={styles.copyright}>Teste de Consciência Pessoal © Fabrícia Máia. Todos os direitos reservados.</p>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "linear-gradient(180deg, #1E2130 0%, #262A3D 100%)", fontFamily: "Inter, sans-serif", padding: "40px 20px" },
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
  sectionLabel: { fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8B87A0", fontWeight: 700, margin: "0 0 8px" },
  premiumCard: { marginTop: 28, padding: "24px 26px", borderRadius: 14, border: "1px solid" },
  copyright: { fontSize: 11, color: "#C4C0D2", textAlign: "center", marginTop: 24 },
};
