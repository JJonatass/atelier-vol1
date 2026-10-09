/* =======================================================================
   0.1–0.2 — OS 17 ODS E OS 4 EIXOS
   ======================================================================= */
function ArtOdsExplorer({data,setData,goHome}){
  const defaults = {interesse1:[],interesse2:[],interesse3:[],interesse4:[],curiosidade:'',transversal:'',step:0,done:false};
  const [s,patch] = useSlice(data,setData,'odsExplorer',defaults);
  const [showSummary,setShowSummary] = useState(!!s.done);
  const meta = ARTIFACTS.find(a=>a.id==='odsExplorer');

  function eixoOptions(n){ return ODS_LIST.filter(o=>o.eixo===n).map(o=>'ODS '+o.num+' — '+o.title); }

  const steps = [
    {label:'O que são os ODS?',
     book:<>
       <p>"A máquina não é um fim em si mesma, mas um meio. O seu valor reside na capacidade de servir e potencializar a vida humana, não de a substituir ou diminuir."</p>
       <p>Os <strong>Objetivos de Desenvolvimento Sustentável (ODS)</strong>, lançados pela Organização das Nações Unidas (ONU) em 2015 como parte da <strong>Agenda 2030</strong>, representam um marco na história da cooperação internacional. Mais do que uma lista de metas, os ODS são um <strong>plano de ação universal</strong> que reconhece a interconexão dos desafios globais e a necessidade de uma abordagem integrada para resolvê-los.</p>
       <p>Composta por <strong>17 objetivos interligados e 169 metas específicas</strong>, a Agenda 2030 abrange uma vasta gama de questões cruciais para o futuro do planeta e da humanidade — da erradicação da pobreza e da fome até a promoção da paz, da igualdade de gênero, do acesso à educação e saúde de qualidade, do trabalho decente, da indústria, inovação e infraestrutura, da redução das desigualdades, do consumo e produção responsáveis, da ação contra a mudança global do clima, da vida na água, da vida terrestre, até a criação de parcerias para alcançar esses propósitos.</p>
       <p>A força dos ODS reside em sua <strong>universalidade</strong>: eles não se limitam a países em desenvolvimento, mas convocam todos os 193 Estados-membros da ONU a se engajarem ativamente.</p>
     </>,
     teach:{
       why:"Os ODS são o ponto de partida do livro: mostram que os produtos que você vai desenvolver podem gerar impacto positivo na sociedade e no meio ambiente desde o início da sua formação. Entender que os desafios são interligados evita enxergar cada problema como uma ilha.",
       how:["Fixe os números: 17 objetivos interligados e 169 metas, parte da Agenda 2030 lançada pela ONU em 2015.","Perceba que a agenda é universal: convoca todos os 193 Estados-membros, não só países em desenvolvimento.","Leve a ideia de interconexão para o seu olhar: progresso em uma área pode impulsionar outras.","Anote o que mais chamou sua atenção; isso será o gancho para escolher seus ODS nos próximos passos."],
       example:"Combater a pobreza (ODS 1) está diretamente ligado à melhoria da saúde (ODS 3), à educação de qualidade (ODS 4) e ao trabalho decente (ODS 8).",
       mistakes:["Achar que os ODS são só para países em desenvolvimento (o livro destaca que a agenda convoca todos os Estados-membros).","Tratar os ODS como uma lista solta de metas, em vez de um plano de ação integrado em que os desafios estão ligados."]
     },
     render:()=><Field type="textarea" label="O que mais te chamou atenção nos ODS até agora? (opcional)" value={s.curiosidade} onChange={v=>patch({curiosidade:v})} rows={2} />
    },
    {label:'Eixo 1 — Pessoas',
     book:<p>Pensando de forma didática, o livro agrupa os 17 ODS em 4 grandes eixos temáticos. O <strong>Eixo 1 — Pessoas</strong> tem foco no bem-estar humano: pobreza, fome, saúde, educação, igualdade de gênero e saneamento.</p>,
     teach:{
       why:"Reúne os objetivos de bem-estar humano (ODS 1 a 6).",
       how:["Leia os cards de ODS do eixo e as ideias de Pense em.","Marque os ODS que mais conectam com problemas que você já percebeu."],
       example:"No livro, o ODS 3 (Saúde e Bem-Estar) sugere telemedicina, prontuários eletrônicos integrados, aplicativos de monitoramento de saúde e sistemas de gestão de vacinação."
     },
     render:()=>(
       <div>
         {ODS_LIST.filter(o=>o.eixo===1).map(o=><OdsCard key={o.num} ods={o} />)}
         <CheckGroup label="Quais desses ODS mais conectam com problemas que você já percebeu no seu dia a dia?" options={eixoOptions(1)} values={s.interesse1} onChange={v=>patch({interesse1:v})} />
       </div>
     )
    },
    {label:'Eixo 2 — Planeta',
     book:<p>O <strong>Eixo 2 — Planeta</strong> tem foco na sustentabilidade ambiental: energia limpa, mudança climática, vida na água e vida terrestre.</p>,
     teach:{
       why:"O eixo Planeta reúne os objetivos de sustentabilidade ambiental (ODS 7, 13, 14 e 15).",
       how:["Leia os cards de ODS do eixo e as ideias de Pense em.","Marque os ODS que mais conectam com problemas que você já percebeu."],
       example:"O livro cita, para o ODS 15 (Vida Terrestre), sistemas de monitoramento de desmatamento por satélite, aplicativos para identificação de espécies e plataformas de gestão de áreas de conservação."
     },
     render:()=>(
       <div>
         {ODS_LIST.filter(o=>o.eixo===2).map(o=><OdsCard key={o.num} ods={o} />)}
         <CheckGroup label="Quais desses ODS mais conectam com problemas que você já percebeu no seu dia a dia?" options={eixoOptions(2)} values={s.interesse2} onChange={v=>patch({interesse2:v})} />
       </div>
     )
    },
    {label:'Eixo 3 — Prosperidade',
     book:<p>O <strong>Eixo 3 — Prosperidade</strong> tem foco no desenvolvimento econômico e inclusivo: trabalho decente, indústria e inovação, cidades sustentáveis e consumo responsável.</p>,
     teach:{
       why:"O eixo Prosperidade liga desenvolvimento econômico e inclusão (ODS 8, 9, 11 e 12).",
       how:["Leia os cards de ODS do eixo e as ideias de Pense em.","Marque os ODS que mais conectam com problemas que você já percebeu."],
       example:"O livro sugere, para o ODS 12 (Consumo e Produção Responsáveis), aplicativos de gestão de resíduos, plataformas de economia circular e ferramentas de rastreabilidade de produtos."
     },
     render:()=>(
       <div>
         {ODS_LIST.filter(o=>o.eixo===3).map(o=><OdsCard key={o.num} ods={o} />)}
         <CheckGroup label="Quais desses ODS mais conectam com problemas que você já percebeu no seu dia a dia?" options={eixoOptions(3)} values={s.interesse3} onChange={v=>patch({interesse3:v})} />
       </div>
     )
    },
    {label:'Eixo 4 — Paz e Parcerias',
     book:<p>O <strong>Eixo 4 — Paz e Parcerias</strong> tem foco na governança e colaboração: redução das desigualdades, instituições eficazes e parcerias para alcançar os outros 16 objetivos.</p>,
     teach:{
       why:"O eixo Paz e Parcerias trata de governança e colaboração. O ODS 17 fortalece os meios de implementação e a parceria global para alcançar todos os outros objetivos.",
       how:["Leia os cards do eixo (ODS 10, 16 e 17) e as ideias de Pense em.","Marque os ODS que mais conectam com problemas que você já percebeu."],
       example:"O livro cita, para o ODS 16 (Paz, Justiça e Instituições Eficazes), plataformas de transparência governamental, sistemas de acesso à informação pública e ferramentas para facilitar a participação cívica."
     },
     render:()=>(
       <div>
         {ODS_LIST.filter(o=>o.eixo===4).map(o=><OdsCard key={o.num} ods={o} />)}
         <CheckGroup label="Quais desses ODS mais conectam com problemas que você já percebeu no seu dia a dia?" options={eixoOptions(4)} values={s.interesse4} onChange={v=>patch({interesse4:v})} />
       </div>
     )
    },
    {label:'Transversalidade das ODS',
     book:<>
       <p>É fundamental entender que os 17 ODS não operam isoladamente; eles são interconectados e transversais. Um projeto de tecnologia com propósito frequentemente aborda múltiplas ODS simultaneamente, criando um <strong>efeito multiplicador de impacto positivo</strong>.</p>
       <p>Por exemplo: uma plataforma de educação a distância (ODS 4) que oferece cursos profissionalizantes sobre energias renováveis pode, ao mesmo tempo, promover trabalho decente (ODS 8) e energia limpa e acessível (ODS 7). Um aplicativo de gestão inteligente de resíduos em cidades (ODS 11) pode, por meio da otimização da coleta e reciclagem, contribuir para o consumo e produção responsáveis (ODS 12) e a ação contra a mudança do clima (ODS 13).</p>
     </>,
     teach:{
       why:"Transversalidade significa que uma ação voltada para um ODS pode, e muitas vezes deve, contribuir para o avanço de outros. Pensar assim exige soluções integradas e holísticas, e multiplica o impacto do projeto.",
       how:["Comece pelo ODS principal da sua ideia.","Pergunte quais outros ODS a mesma solução tocaria como efeito colateral positivo.","Escreva a ligação em uma frase: solução, ODS principal e ODS secundários."],
       example:"No livro, um sistema de monitoramento de qualidade da água com IoT (ODS 6) pode, ao fornecer dados a comunidades mais vulneráveis, ajudar também na redução das desigualdades (ODS 10) e na saúde e bem-estar (ODS 3).",
       mistakes:["Pensar que cada solução serve a um único ODS e só pode ser aplicada isoladamente.","Citar ODS sem explicar a ligação real com a solução."]
     },
     render:()=><Field type="textarea" label="Dê um exemplo de como uma solução digital poderia conectar dois ODS ao mesmo tempo" value={s.transversal} onChange={v=>patch({transversal:v})} placeholder="Ex.: um app de caronas comunitárias (ODS 11) que também reduz emissões de CO2 (ODS 13)." rows={3} />
    },
  ];

  if(showSummary){
    const todos = [...s.interesse1,...s.interesse2,...s.interesse3,...s.interesse4];
    const markedNums = todos.map(label=>parseInt(label.replace('ODS ',''),10));
    const txt = `OS 17 ODS E OS 4 EIXOS\n\nODS que mais conectam com problemas percebidos:\n${todos.map(i=>'- '+i).join('\n')||'—'}\n\nExemplo de transversalidade:\n${s.transversal||'—'}\n\nCuriosidade/observação:\n${s.curiosidade||'—'}`;
    return (
      <SummaryShell title={meta.title} n={meta.n} id={meta.id} summaryText={txt} onEdit={()=>setShowSummary(false)} onHome={()=>{patch({done:true});goHome();}}>
        <CanvasFrame label="Meu mapa de ODS" filename="meu-mapa-de-ods">
          <h3 style={{marginTop:0}}>Meu Mapa de ODS</h3>
          <p className="mini-note" style={{marginBottom:'14px'}}>Em destaque: os ODS que mais conectam com problemas que já percebi.</p>
          <div className="ods-poster-grid">
            {ODS_LIST.map(o=>(
              <div key={o.num} className={"ods-chip"+(markedNums.includes(o.num)?' marked':'')} style={{background:EIXO_META[o.eixo].color}} title={o.title}>{o.num}</div>
            ))}
          </div>
          <div className="grid-2">
            <div className="brief-cell"><span className="lbl">ODS escolhidos</span><p>{todos.length? todos.join(' · ') : '—'}</p></div>
            <div className="brief-cell"><span className="lbl">Exemplo de transversalidade</span><p>{s.transversal||'—'}</p></div>
          </div>
        </CanvasFrame>
        <p className="field-hint">Siga para 0.3–0.8 "Tecnologia com Propósito" para escolher o ODS do seu próprio projeto.</p>
        <CopyButton text={txt} />
      </SummaryShell>
    );
  }
  return <Screen title={meta.title} n={meta.n} stepIndex={s.step} setStepIndex={i=>patch({step:i})} steps={steps} onDone={()=>setShowSummary(true)} />;
}

/* =======================================================================
   0.3–0.8 — TECNOLOGIA COM PROPÓSITO (por que ODS importam, SEV)
   ======================================================================= */
function ArtPropositoSustentavel({data,setData,goHome}){
  const defaults = {motivos:[],focoOds:'',dados:['',''],fontes:'',enunciado:'',estudoCaso:{app:'',propostaValor:'',pontoForte:'',pontoFraco:'',inovacao:''},sev:{sustentavel:{value:null,justificativa:''},escalavel:{value:null,justificativa:''},viavel:{value:null,justificativa:''}},step:0,done:false};
  const [s,patch] = useSlice(data,setData,'propositoSustentavel',defaults);
  const [showSummary,setShowSummary] = useState(!!s.done);
  const meta = ARTIFACTS.find(a=>a.id==='propositoSustentavel');
  const ods = odsByNum(s.focoOds);

  const motivosOpcoes = [
    'Impacto Social e Ambiental Genuíno — "lucro com propósito"',
    'Oportunidades de Mercado e Inovação',
    'Relevância e Competitividade Profissional',
    'Regulamentação e Tendências Globais',
  ];

  const steps = [
    {label:'Por que ODS importam para quem faz tecnologia',
     book:<>
       <p>A Agenda 2030 não é apenas um conjunto de metas idealistas definidas em fóruns internacionais; ela representa <strong>um mapa estratégico</strong> para um futuro mais resiliente, justo e próspero. Para profissionais e estudantes de tecnologia, compreender e integrar as ODS em seu trabalho é cada vez mais crucial por diversos motivos:</p>
       <p><strong>Impacto Social e Ambiental Genuíno:</strong> empresas focadas apenas no lucro imediato podem criar soluções que agravam problemas sociais e ambientais. As ODS orientam um modelo de "lucro com propósito", onde o sucesso se mede tanto por resultados financeiros quanto pelo impacto positivo.</p>
       <p><strong>Oportunidades de Mercado e Inovação:</strong> a busca por soluções para os desafios globais das ODS abre vastas oportunidades de mercado em áreas como saneamento, energia limpa, cidades sustentáveis e agricultura.</p>
       <p><strong>Relevância e Competitividade Profissional:</strong> investidores, consumidores e colaboradores valorizam cada vez mais práticas sustentáveis e socialmente responsáveis.</p>
       <p><strong>Regulamentação e Tendências Globais:</strong> governos implementam crescentes regulamentações alinhadas às metas de sustentabilidade.</p>
     </>,
     teach:{
       why:"Conhecer os ODS é cada vez mais importante para quem faz tecnologia, e os quatro motivos do livro mostram que não é só idealismo: há impacto, mercado, carreira e regulação em jogo.",
       how:["Leia os quatro motivos: impacto genuíno, mercado e inovação, competitividade profissional e regulamentação.","Escolha os que mais te convencem, pensando no seu futuro profissional.","Guarde-os: servirão de argumento para defender o propósito do seu projeto."],
       example:"O livro cita usar inteligência artificial para otimizar recursos hídricos, plataformas digitais para democratizar a educação e blockchain para dar transparência a cadeias produtivas sustentáveis.",
       mistakes:["Ver os ODS apenas como metas idealistas de fóruns internacionais; o livro os descreve como um mapa estratégico.","Medir sucesso só pelo lucro imediato, sem considerar o impacto positivo."]
     },
     render:()=><CheckGroup label="Quais desses motivos mais te convencem a pensar em ODS no seu projeto?" options={motivosOpcoes} values={s.motivos} onChange={v=>patch({motivos:v})} />
    },
    {label:'Escolha o ODS do seu projeto',
     book:<p>Todo projeto de tecnologia com propósito deve ter clareza sobre qual (ou quais) ODS pretende atender. Escolha o ODS que mais se conecta com a ideia que você quer desenvolver — os outros artefatos deste capítulo e do próximo vão usar essa escolha como referência.</p>,
     teach:{
       why:"Ter clareza sobre qual ODS o projeto atende dá direção às decisões seguintes. No quiz do livro: os ODS conectam problemas locais a metas globais e dão legitimidade ao projeto.",
       how:["Volte aos ODS que você marcou no artefato anterior.","Escolha o que mais se conecta com a ideia que você quer desenvolver.","Leia o card do ODS escolhido para confirmar que o foco faz sentido."]
     },
     render:()=>(
       <div>
         <SelectField label="ODS foco do seu projeto" value={s.focoOds} onChange={v=>patch({focoOds:v})} options={odsOptions()} />
         {ods && <OdsCard ods={ods} />}
       </div>
     )
    },
    {label:'Pesquisa: dados que comprovam o problema',
     book:<p>Escolha um ODS e investigue um problema real em sua cidade ou região que se relacione a ele. Levante ao menos <strong>dois dados ou estatísticas em fontes confiáveis</strong> (IBGE, ONU, relatórios locais).</p>,
     teach:{
       why:"Dados dão base ao problema: comparam como ele se manifesta em contextos diferentes e oferecem números que servirão de linha de base para medir resultados depois.",
       how:["Busque números claros, como porcentagens, índices e totais.","Consulte fontes confiáveis: organizações internacionais (ONU, PNUD), nacionais (IBGE, IPEA) ou acadêmicas, e relatórios de ONGs locais.","Compare fontes diferentes para evitar viés, por exemplo IBGE com relatórios de ONGs locais.","Traga para o contexto local: dados globais são importantes, mas números locais mostram proximidade e impacto direto.","Registre fonte e ano (usando a norma ABNT) e relacione cada dado a pelo menos um ODS."],
       example:"O livro cita: 33 milhões de brasileiros em insegurança alimentar (ONU Brasil, 2023, ODS 2); 37% dos brasileiros gastam mais de 1h30 por dia em deslocamentos (IBGE, 2022, ODS 11); 40% das casas de uma comunidade sem saneamento básico (relatório da ONG Água Viva, 2021, ODS 6).",
       mistakes:["Usar apenas dados globais, sem trazer números do contexto local.","Apoiar-se em uma única fonte, sem comparar com outras.","Esquecer que um dado pode se relacionar a mais de um ODS (insegurança alimentar afeta também saúde e pobreza)."]
     },
     render:()=>(
       <div>
         <ListField label="Dados/estatísticas encontrados" items={s.dados} onChange={v=>patch({dados:v})} placeholder="Ex.: 33 milhões de brasileiros vivem em insegurança alimentar (ONU Brasil, 2023)." minRows={2} />
         <Field label="Fontes consultadas" value={s.fontes} onChange={v=>patch({fontes:v})} placeholder="Ex.: IBGE, ONU Brasil, relatório da prefeitura…" />
       </div>
     )
    },
    {label:'Enunciado do problema ligado ao ODS',
     book:<p>Escreva um enunciado do problema (≤ 250 caracteres), conectando o dado coletado ao impacto social ou ambiental observado.</p>,
     teach:{
       why:"O enunciado é uma frase curta, objetiva e mensurável que serve de guia para toda a equipe. O livro diz que, se você não consegue explicar o problema em uma frase simples, ainda tem apenas um tema.",
       how:["Siga a estrutura quem, problema, causa e impacto.","Use o dado coletado no passo anterior para sustentar a frase.","Fale do que acontece de concreto, sem adjetivos vagos.","Confira se cabe em até 250 caracteres."],
       example:"Enunciado do livro (ODS 11): moradores de bairros periféricos enfrentam dificuldades de mobilidade devido à falta de transporte público eficiente e acessível, resultando em altos custos e perda de tempo diário. Ele diz quem sofre, o que acontece, a causa e o impacto.",
       mistakes:["Escrever uma frase sem estrutura, como Precisamos criar um app para melhorar a saúde ou A saúde pública precisa de inovação digital (o livro dá esses exemplos como enunciados inadequados).","Ir direto para a solução em vez de descrever o problema.","Passar de 250 caracteres."]
     },
     render:()=><Field type="textarea" label="Enunciado do problema (≤ 250 caracteres)" value={s.enunciado} onChange={v=>patch({enunciado:v})} placeholder="Ex.: Moradores de bairros periféricos enfrentam dificuldades de mobilidade devido à falta de transporte público eficiente e acessível." rows={3} />
    },
    {label:'Estudo de caso: uma solução que já existe',
     book:<p>Pesquise um aplicativo, plataforma ou iniciativa digital que busque resolver um problema social ligado a algum ODS (ex.: mobilidade urbana, saúde, educação, sustentabilidade). Descreva sua proposta de valor, aponte um ponto forte e um ponto fraco, e proponha uma inovação ou melhoria que poderia ser aplicada ao contexto brasileiro.</p>,
     teach:{
       why:"Benchmarking significa aprender com os outros: evita retrabalho, ensina com erros alheios, mostra padrões de mercado e ajuda a mapear lacunas que podem virar inovação.",
       how:["Escolha uma solução que já tente resolver um problema ligado ao ODS.","Colete informações: baixe o app ou acesse o site, leia avaliações, consulte matérias ou relatórios e teste as funcionalidades principais.","Compare público-alvo, funcionalidades, pontos fortes, pontos fracos e oportunidades de melhoria.","Marque as lacunas como possíveis inovações e adapte ao contexto brasileiro."],
       example:"Na tabela do livro (ODS 11), o concorrente Caronas Comunitárias tem como forte o baixo custo e a proximidade, como fraco a pouca adesão e baixa confiança, e como oportunidade a verificação local e gamificação. O App Transporte Público não cobre cidades médias, o que abre a oportunidade de expandir para periferias.",
       mistakes:["Ignorar os pontos fortes e focar só nos pontos fracos (alternativa errada do quiz do livro)."]
     },
     render:()=>(
       <div>
         <Field label="Nome do app/plataforma/iniciativa" value={s.estudoCaso.app} onChange={v=>patch({estudoCaso:{...s.estudoCaso,app:v}})} />
         <Field type="textarea" rows={2} label="Proposta de valor" value={s.estudoCaso.propostaValor} onChange={v=>patch({estudoCaso:{...s.estudoCaso,propostaValor:v}})} />
         <Field label="Ponto forte" value={s.estudoCaso.pontoForte} onChange={v=>patch({estudoCaso:{...s.estudoCaso,pontoForte:v}})} />
         <Field label="Ponto fraco" value={s.estudoCaso.pontoFraco} onChange={v=>patch({estudoCaso:{...s.estudoCaso,pontoFraco:v}})} />
         <Field type="textarea" rows={2} label="Uma inovação/melhoria para o contexto brasileiro" value={s.estudoCaso.inovacao} onChange={v=>patch({estudoCaso:{...s.estudoCaso,inovacao:v}})} />
       </div>
     )
    },
    {label:'Sustentável, escalável e viável?',
     book:<>
       <p>Ao desenvolver soluções com foco nas ODS, é crucial que elas não sejam apenas pontuais, mas possuam três características essenciais para garantir seu impacto a longo prazo:</p>
       <p><strong>Sustentabilidade:</strong> o projeto deve ser capaz de se manter ao longo do tempo, do ponto de vista ambiental, social e econômico. Uma solução que depende unicamente de financiamento filantrópico pontual tem baixa sustentabilidade.</p>
       <p><strong>Escalabilidade:</strong> a solução deve ter o potencial de crescer e alcançar um número maior de pessoas ou um território mais amplo, sem perder sua eficácia ou aumentar proporcionalmente seus custos.</p>
       <p><strong>Viabilidade:</strong> o projeto deve ser tecnicamente factível, economicamente viável e socialmente aceito.</p>
     </>,
     teach:{
       why:"Segundo o livro, considerar a transversalidade e garantir que o projeto seja sustentável, escalável e viável é o que transforma uma boa ideia em uma solução digital com propósito real e duradouro.",
       how:["Sustentável: o projeto se mantém no tempo em três dimensões, ambiental (não esgotar recursos), social (inclusão, justiça, equidade) e econômica (modelo de negócio ou financiamento que garanta continuidade).","Escalável: pode alcançar mais pessoas ou um território maior sem perder eficácia nem aumentar proporcionalmente os custos.","Viável: tecnicamente factível, com custo compatível com os benefícios e aceito pela comunidade ou usuários-alvo.","Responda sim ou não a cada critério e justifique."],
       example:"O livro dá dois exemplos: uma solução que depende só de financiamento filantrópico pontual tem baixa sustentabilidade, e uma aplicação de saúde pode ser replicada em diferentes regiões, o que mostra escalabilidade.",
       mistakes:["Propor algo grande demais para o contexto: no quiz do livro, um app simples de consumo de água é viável para o 1º período de ADS, enquanto um satélite climático global ou um sistema bancário com blockchain internacional não são.","Responder sim sem justificar."]
     },
     render:()=>(
       <div>
         <div className="summary-block">
           <YesNo label="Sustentável? (se mantém ao longo do tempo — ambiental, social e econômico)" value={s.sev.sustentavel.value} onChange={v=>patch({sev:{...s.sev,sustentavel:{...s.sev.sustentavel,value:v}}})} />
           <Field type="textarea" rows={2} label="Justifique" value={s.sev.sustentavel.justificativa} onChange={v=>patch({sev:{...s.sev,sustentavel:{...s.sev.sustentavel,justificativa:v}}})} />
         </div>
         <div className="summary-block">
           <YesNo label="Escalável? (cresce sem perder eficácia nem aumentar custos proporcionalmente)" value={s.sev.escalavel.value} onChange={v=>patch({sev:{...s.sev,escalavel:{...s.sev.escalavel,value:v}}})} />
           <Field type="textarea" rows={2} label="Justifique" value={s.sev.escalavel.justificativa} onChange={v=>patch({sev:{...s.sev,escalavel:{...s.sev.escalavel,justificativa:v}}})} />
         </div>
         <div className="summary-block">
           <YesNo label="Viável? (tecnicamente factível, economicamente viável, socialmente aceita)" value={s.sev.viavel.value} onChange={v=>patch({sev:{...s.sev,viavel:{...s.sev.viavel,value:v}}})} />
           <Field type="textarea" rows={2} label="Justifique" value={s.sev.viavel.justificativa} onChange={v=>patch({sev:{...s.sev,viavel:{...s.sev.viavel,justificativa:v}}})} />
         </div>
       </div>
     )
    },
  ];

  if(showSummary){
    const sevTxt = (k,label)=>`${label}: ${s.sev[k].value===true?'Sim':s.sev[k].value===false?'Não':'—'} — ${s.sev[k].justificativa||'—'}`;
    const txt = `TECNOLOGIA COM PROPÓSITO\n\nODS foco: ${ods?('ODS '+ods.num+' — '+ods.title):'—'}\n\nDados de pesquisa:\n${s.dados.filter(Boolean).map(d=>'- '+d).join('\n')||'—'}\nFontes: ${s.fontes||'—'}\n\nEnunciado do problema:\n${s.enunciado||'—'}\n\nEstudo de caso: ${s.estudoCaso.app||'—'}\nProposta de valor: ${s.estudoCaso.propostaValor||'—'}\nPonto forte: ${s.estudoCaso.pontoForte||'—'}\nPonto fraco: ${s.estudoCaso.pontoFraco||'—'}\nInovação proposta: ${s.estudoCaso.inovacao||'—'}\n\nSUSTENTÁVEL, ESCALÁVEL, VIÁVEL\n${sevTxt('sustentavel','Sustentável')}\n${sevTxt('escalavel','Escalável')}\n${sevTxt('viavel','Viável')}`;
    const sevLabelOf = k => k==='sustentavel'?'Sustentável':k==='escalavel'?'Escalável':'Viável';
    return (
      <SummaryShell title={meta.title} n={meta.n} id={meta.id} summaryText={txt} onEdit={()=>setShowSummary(false)} onHome={()=>{patch({done:true});goHome();}}>
        <CanvasFrame label="Ficha do Projeto" filename="ficha-do-projeto">
          <div className="brief-head">
            {ods && <div className="brief-badge" style={{background:EIXO_META[ods.eixo].color}}>{ods.num}</div>}
            <div>
              <div className="mini-note" style={{textTransform:'uppercase',letterSpacing:'.04em',fontWeight:700}}>{ods? (EIXO_META[ods.eixo].label+' · ODS '+ods.num) : 'ODS não definido'}</div>
              <h3 style={{margin:0}}>{ods? ods.title : 'Escolha um ODS'}</h3>
            </div>
          </div>
          <div className="brief-quote">{s.enunciado || 'Enunciado do problema ainda não escrito.'}</div>
          <div className="stat-row">
            {s.dados.filter(Boolean).map((d,i)=>(<div className="stat-pill" key={i}><span className="n">Dado {i+1}</span><p>{d}</p></div>))}
          </div>
          <div className="brief-grid" style={{marginBottom:'14px'}}>
            <div className="brief-cell"><span className="lbl">Estudo de caso</span><p><strong>{s.estudoCaso.app||'—'}</strong> — {s.estudoCaso.propostaValor||'—'}</p></div>
            <div className="brief-cell"><span className="lbl">Sua inovação proposta</span><p>{s.estudoCaso.inovacao||'—'}</p></div>
          </div>
          <div className="gauge-row">
            {['sustentavel','escalavel','viavel'].map(k=>(
              <div key={k} className={"gauge "+(s.sev[k].value===true?'ok':s.sev[k].value===false?'no':'pending')}>
                <div className="lbl">{sevLabelOf(k)}</div>
                <div className="v">{s.sev[k].value===true?'✓ Sim':s.sev[k].value===false?'✗ Não':'?'}</div>
                <p>{s.sev[k].justificativa||'—'}</p>
              </div>
            ))}
          </div>
        </CanvasFrame>
        <CopyButton text={txt} />
      </SummaryShell>
    );
  }
  return <Screen title={meta.title} n={meta.n} stepIndex={s.step} setStepIndex={i=>patch({step:i})} steps={steps} onDone={()=>setShowSummary(true)} />;
}
