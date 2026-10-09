/* =======================================================================
   1.1 — INVESTIGAR O PROBLEMA
   ======================================================================= */
function ArtInvestigarProblema({data,setData,goHome}){
  const defaults = {tema:'',odsRelacionado:'',onde:'',quando:'',comoObservou:'',usuariosPrimarios:'',atoresSecundarios:'',atoresInfluencia:'',porques:['','','','',''],causasControlaveis:'',causasIncontrolaveis:'',curtoPrazo:'',longoPrazo:'',odsAfetados:[],indicadorProcesso:'',indicadorResultado:'',indicadorComplementar:'',enunciado:'',step:0,done:false};
  const [s,patch] = useSlice(data,setData,'investigarProblema',defaults);
  const [showSummary,setShowSummary] = useState(!!s.done);
  const meta = ARTIFACTS.find(a=>a.id==='investigarProblema');
  const ods = odsByNum(s.odsRelacionado);

  const steps = [
    {label:'Por que começar pelo problema?',
     book:<>
       <p>"Definir o problema é metade da solução. Só quando entendemos a dor, conseguimos criar um remédio eficaz."</p>
       <p>Começar pelo problema é o jeito mais seguro de não desperdiçar <strong>tempo, dinheiro e energia criativa</strong>. Muitas equipes de tecnologia se apaixonam por soluções — um app novo, uma IA de última geração, uma plataforma com funcionalidades incríveis — mas esquecem de verificar se existe, de fato, um problema relevante a ser resolvido. O resultado é comum: produtos bonitos, caros e sofisticados que acabam sem uso real porque não atacam uma dor concreta.</p>
       <p>Problematizar significa <strong>investigar e organizar o desafio antes de pensar em soluções</strong>, em quatro movimentos: investigar o contexto, identificar os atores, mapear causas e reconhecer os impactos — até construir indicadores que permitam medir mudanças.</p>
     </>,
     teach:{
       why:"A tecnologia é um meio, não um fim: o valor aparece quando você alivia uma dor específica de pessoas reais, em um contexto concreto, com resultados que podem ser verificados e medidos. Cada linha de código e cada tela precisa estar a serviço de algo que importa para alguém.",
       how:["Investigue o contexto: onde e em que condições o problema aparece.","Identifique os atores: quem é afetado, quem se beneficia, quem sofre as consequências.","Mapeie as causas: por que isso acontece e o que mantém o problema vivo.","Reconheça os impactos: o que está em jogo se nada for resolvido.","Construa indicadores e finalize com um enunciado curto do problema."],
       example:"Tema do exemplo didático do livro: mobilidade urbana em periferias (ODS 11). A partir dele, a equipe chega a um enunciado, ao contexto, às causas, aos impactos e aos indicadores, tudo antes de pensar em qualquer app.",
       mistakes:["Se apaixonar pela solução (um app novo, uma IA de ponta, uma plataforma cheia de funções) sem verificar se existe um problema relevante.","Entregar um produto bonito e caro que acaba sem uso real por não atacar uma dor concreta."]
     },
     render:()=>(
       <div>
         <Field label="Tema/problema que você quer investigar" value={s.tema} onChange={v=>patch({tema:v})} placeholder="Ex.: mobilidade urbana em periferias" />
         <SelectField label="ODS relacionado" value={s.odsRelacionado} onChange={v=>patch({odsRelacionado:v})} options={odsOptions()} />
         {ods && <OdsCard ods={ods} />}
       </div>
     )
    },
    {label:'Investigar o contexto',
     book:<>
       <p><strong>Pergunta-chave:</strong> Onde e em que condições o problema aparece?</p>
       <p><strong>Objetivo:</strong> situar o problema em tempo, espaço e circunstâncias. <strong>Como fazer:</strong> observe o ambiente real em que o problema ocorre (visitas de campo, observação direta, shadowing); pergunte quando o problema é mais evidente (horários de pico, épocas do ano, fases da vida); use dados secundários (notícias, relatórios, estatísticas) para complementar a visão.</p>
       <p>Exemplo (ODS 6 – Água Potável): o problema do desperdício de água se manifesta mais fortemente no período de estiagem, em bairros com saneamento precário e sistemas de encanamento antigos.</p>
     </>,
     teach:{
       why:"Um problema só fica claro quando é situado em tempo, espaço e circunstâncias. O objetivo é situar o problema em tempo, espaço e circunstâncias.",
       how:["Vá ao ambiente real onde o problema ocorre: visita de campo, observação direta, shadowing.","Descubra quando ele é mais evidente: horários de pico, épocas do ano, fases da vida.","Complemente com dados secundários: notícias, relatórios, estatísticas."],
       example:"No exemplo didático de mobilidade urbana: quem são os afetados (trabalhadores informais e estudantes de bairros periféricos), onde (cidades médias brasileiras com transporte público irregular) e quando (todos os dias, principalmente nos horários de pico, de manhã e no final da tarde)."
     },
     render:()=>(
       <div>
         <Field label="Onde o problema aparece?" value={s.onde} onChange={v=>patch({onde:v})} placeholder="Ex.: bairros periféricos de cidades médias" />
         <Field label="Quando é mais evidente?" value={s.quando} onChange={v=>patch({quando:v})} placeholder="Ex.: horários de pico, manhã e final da tarde" />
         <Field type="textarea" label="Como você observou/pretende observar isso?" value={s.comoObservou} onChange={v=>patch({comoObservou:v})} rows={2} placeholder="Visitas de campo, observação direta, dados secundários…" />
       </div>
     )
    },
    {label:'Identificar os atores',
     book:<>
       <p><strong>Pergunta-chave:</strong> Quem é afetado, quem se beneficia e quem sofre as consequências?</p>
       <p><strong>Como fazer:</strong> liste os <strong>usuários primários</strong> (quem sofre a dor), identifique os <strong>atores secundários</strong> (quem interage com eles) e avalie também os <strong>atores de influência</strong> (políticas públicas, ONGs, empresas, gestores).</p>
       <p>Exemplo (ODS 2 – Fome Zero): primários — famílias em insegurança alimentar; secundários — agricultores com excedentes de produção; de influência — ONGs, secretarias municipais de assistência social.</p>
     </>,
     teach:{
       why:"Mapear os grupos envolvidos direta e indiretamente evita enxergar só uma parte do problema e mostra quem pode ajudar ou travar a mudança.",
       how:["Liste os usuários primários: quem sofre a dor.","Identifique os atores secundários: quem interage com eles.","Avalie os atores de influência: políticas públicas, ONGs, empresas, gestores."],
       example:"No exemplo didático de mobilidade urbana, os afetados diretamente são trabalhadores informais e estudantes que moram em bairros periféricos."
     },
     render:()=>(
       <div>
         <Field type="textarea" rows={2} label="Usuários primários (quem sofre a dor)" value={s.usuariosPrimarios} onChange={v=>patch({usuariosPrimarios:v})} />
         <Field type="textarea" rows={2} label="Atores secundários (quem interage com eles)" value={s.atoresSecundarios} onChange={v=>patch({atoresSecundarios:v})} />
         <Field type="textarea" rows={2} label="Atores de influência (políticas, ONGs, empresas, gestores)" value={s.atoresInfluencia} onChange={v=>patch({atoresInfluencia:v})} />
       </div>
     )
    },
    {label:'Mapear causas',
     book:<>
       <p><strong>Pergunta-chave:</strong> Por que isso acontece? Quais fatores mantêm o problema vivo?</p>
       <p><strong>Como fazer:</strong> use a técnica dos <strong>5 porquês</strong> — pergunte repetidamente "por quê?" até chegar à causa estrutural — ou construa um diagrama de <strong>Ishikawa (espinha de peixe)</strong> para organizar causas em categorias (infraestrutura, comportamento, políticas, recursos). Diferencie causas <strong>controláveis</strong> (mudáveis pela solução) e <strong>incontroláveis</strong> (restrições externas).</p>
       <p>Exemplo (ODS 11 – Mobilidade Urbana): longas esperas em pontos de ônibus → causa 1: baixa frota disponível; causa 2: falta de manutenção em veículos; causa 3: ausência de planejamento de linhas para periferias.</p>
     </>,
     teach:{
       why:"O objetivo é chegar às causas raízes, e não apenas aos sintomas.",
       how:["Pergunte \"por quê?\" repetidamente até chegar à causa estrutural.","Se preferir, organize as causas em categorias (infraestrutura, comportamento, políticas, recursos) num diagrama de Ishikawa, a espinha de peixe.","Separe o que é controlável (pode ser mudado pela sua solução) do que é incontrolável (restrição externa)."],
       example:"Causas principais do exemplo didático de mobilidade: oferta insuficiente de linhas e horários irregulares; longas distâncias até os terminais; falta de integração entre ônibus, metrô e bicicletas compartilhadas; baixa prioridade de investimento em mobilidade periférica.",
       mistakes:["Identificar apenas sintomas, e não causas raízes."]
     },
     render:()=>(
       <div>
         <ListField label="Técnica dos 5 porquês (cada linha aprofunda mais)" items={s.porques} onChange={v=>patch({porques:v})} placeholder="Por quê?" minRows={5} />
         <Field type="textarea" rows={2} label="Causas controláveis (mudáveis pela sua solução)" value={s.causasControlaveis} onChange={v=>patch({causasControlaveis:v})} />
         <Field type="textarea" rows={2} label="Causas incontroláveis (restrições externas)" value={s.causasIncontrolaveis} onChange={v=>patch({causasIncontrolaveis:v})} />
       </div>
     )
    },
    {label:'Reconhecer os impactos',
     book:<>
       <p><strong>Pergunta-chave:</strong> O que está em jogo caso o problema não seja resolvido?</p>
       <p><strong>Como fazer:</strong> liste consequências <strong>de curto prazo</strong> (cotidiano imediato) e <strong>de longo prazo</strong> (efeitos estruturais); verifique impactos em <strong>mais de um ODS</strong> (transversalidade).</p>
       <p>Exemplo (ODS 3 – Saúde e Bem-Estar): curto prazo — idosos esquecem medicação → internações evitáveis; longo prazo — sobrecarga no sistema público de saúde, redução da expectativa de vida.</p>
     </>,
     teach:{
       why:"Mostrar o que está em jogo prova a relevância do problema em dimensões sociais, econômicas e ambientais.",
       how:["Liste as consequências de curto prazo, as do cotidiano imediato.","Liste as de longo prazo, os efeitos estruturais.","Verifique se o problema afeta mais de um ODS (transversalidade)."],
       example:"No exemplo didático de mobilidade: social, perda de convivência familiar e aumento da evasão escolar por atrasos; econômico, queda de produtividade e custo de deslocamento maior (tarifas altas e vários transportes); ambiental, mais emissões de CO₂ pelo uso de motos e carros."
     },
     render:()=>(
       <div>
         <Field type="textarea" rows={2} label="Consequências de curto prazo" value={s.curtoPrazo} onChange={v=>patch({curtoPrazo:v})} />
         <Field type="textarea" rows={2} label="Consequências de longo prazo" value={s.longoPrazo} onChange={v=>patch({longoPrazo:v})} />
         <CheckGroup label="Outros ODS afetados por esse problema (transversalidade)" options={odsOptions().map(o=>o.label)} values={s.odsAfetados} onChange={v=>patch({odsAfetados:v})} />
       </div>
     )
    },
    {label:'Construir indicadores',
     book:<>
       <p>Não basta compreender o problema: é preciso <strong>medir se a solução realmente gerou impacto</strong>. Usamos três tipos de indicadores:</p>
       <p><strong>a) Indicadores de Processo</strong> — medem etapas de execução, esforço ou engajamento. Exemplo (ODS 2): número de estabelecimentos cadastrados em plataforma de doação de alimentos.</p>
       <p><strong>b) Indicadores de Resultado</strong> — medem efeitos concretos gerados para os usuários. Exemplo (ODS 11): redução do tempo médio de espera em pontos de ônibus em bairros periféricos.</p>
       <p><strong>c) Indicadores Complementares</strong> — medem percepções subjetivas ou efeitos indiretos. Exemplo (ODS 3): grau de satisfação dos idosos com o lembrete de medicamentos (pesquisa de opinião).</p>
     </>,
     teach:{
       why:"Entender o problema não basta: é preciso medir se a solução realmente gerou impacto. O indicador de processo acompanha se o projeto está sendo implementado corretamente, o de resultado mostra se o problema está sendo resolvido e o complementar capta nuances que números duros não mostram.",
       how:["O que podemos contar (quantitativo)?","O que podemos observar (comportamentos)?","O que podemos perguntar (percepção/qualidade)?","O que mudará a curto prazo (processo) e a longo prazo (resultado)?"],
       example:"No exemplo didático de mobilidade: processo, tempo médio de espera no ponto de ônibus (em minutos); resultado, redução no gasto mensal com transporte (% da renda familiar); complementar, satisfação dos usuários com o transporte (pesquisa de percepção).",
       mistakes:["Medir atividade em vez de impacto real, como comemorar downloads sem verificar se o gasto das famílias caiu (padrão \"métricas irrelevantes\" do livro)."]
     },
     render:()=>(
       <div>
         <Field label="Indicador de processo" value={s.indicadorProcesso} onChange={v=>patch({indicadorProcesso:v})} placeholder="O que podemos contar (quantitativo)?" />
         <Field label="Indicador de resultado" value={s.indicadorResultado} onChange={v=>patch({indicadorResultado:v})} placeholder="O que mudará a longo prazo?" />
         <Field label="Indicador complementar" value={s.indicadorComplementar} onChange={v=>patch({indicadorComplementar:v})} placeholder="O que podemos perguntar (percepção/qualidade)?" />
       </div>
     )
    },
    {label:'Enunciado do problema',
     book:<>
       <p>Esse processo gera um <strong>enunciado do problema</strong>: uma frase curta, objetiva e mensurável (até 250 caracteres) que serve de guia para toda a equipe — deve dizer <strong>quem sofre</strong>, <strong>o que acontece</strong>, <strong>a causa</strong> e o <strong>impacto</strong>.</p>
       <p>Exemplo: "Moradores de bairros periféricos enfrentam dificuldades de mobilidade devido à falta de transporte público eficiente e acessível, resultando em altos custos e perda de tempo diário."</p>
     </>,
     teach:{
       why:"O enunciado é a frase curta, objetiva e mensurável que serve de guia para toda a equipe. Se você não consegue explicar o problema em uma frase simples, ainda tem apenas um tema.",
       how:["Responda: quem é afetado diretamente?","O que acontece de concreto, sem adjetivos vagos?","Por que isso acontece (causa principal)?","Quais impactos surgem se nada mudar?","Junte tudo em uma frase de até 250 caracteres."],
       example:"O enunciado do livro funciona porque diz quem sofre (moradores de periferia), o que acontece (dificuldade de mobilidade), a causa (falta de transporte eficiente e acessível), o impacto (altos custos e perda de tempo) e cabe em menos de 250 caracteres.",
       mistakes:["Usar adjetivos vagos em vez de descrever o que acontece de concreto.","Não conseguir explicar o problema em uma frase simples (ter só um tema)."]
     },
     render:()=><Field type="textarea" label="Enunciado do problema (≤ 250 caracteres)" value={s.enunciado} onChange={v=>patch({enunciado:v})} rows={3} />
    },
  ];

  if(showSummary){
    const txt = `INVESTIGAR O PROBLEMA\n\nTema: ${s.tema||'—'}\nODS relacionado: ${ods?('ODS '+ods.num+' — '+ods.title):'—'}\n\nContexto\nOnde: ${s.onde||'—'}\nQuando: ${s.quando||'—'}\nComo observou: ${s.comoObservou||'—'}\n\nAtores\nPrimários: ${s.usuariosPrimarios||'—'}\nSecundários: ${s.atoresSecundarios||'—'}\nInfluência: ${s.atoresInfluencia||'—'}\n\nCausas (5 porquês)\n${s.porques.filter(Boolean).map((p,i)=>(i+1)+'. '+p).join('\n')||'—'}\nControláveis: ${s.causasControlaveis||'—'}\nIncontroláveis: ${s.causasIncontrolaveis||'—'}\n\nImpactos\nCurto prazo: ${s.curtoPrazo||'—'}\nLongo prazo: ${s.longoPrazo||'—'}\nOutros ODS afetados: ${s.odsAfetados.join(', ')||'—'}\n\nIndicadores\nProcesso: ${s.indicadorProcesso||'—'}\nResultado: ${s.indicadorResultado||'—'}\nComplementar: ${s.indicadorComplementar||'—'}\n\nENUNCIADO DO PROBLEMA\n${s.enunciado||'—'}`;
    const ultimoPorque = s.porques.filter(Boolean).slice(-1)[0];
    return (
      <SummaryShell title={meta.title} n={meta.n} id={meta.id} summaryText={txt} onEdit={()=>setShowSummary(false)} onHome={()=>{patch({done:true});goHome();}}>
        <CanvasFrame label="Canvas do Problema" filename="canvas-do-problema">
          <div className="brief-head">
            {ods && <div className="brief-badge" style={{background:EIXO_META[ods.eixo].color}}>{ods.num}</div>}
            <div>
              <div className="mini-note" style={{textTransform:'uppercase',letterSpacing:'.04em',fontWeight:700}}>{s.tema||'Tema não definido'}</div>
              <h3 style={{margin:0}}>{ods? ('ODS '+ods.num+' — '+ods.title) : 'ODS não definido'}</h3>
            </div>
          </div>
          <div className="brief-quote">{s.enunciado || 'Enunciado do problema ainda não escrito.'}</div>
          <div className="brief-grid">
            <div className="brief-cell"><span className="lbl">Contexto (quem, onde, quando)</span><p><strong>Onde:</strong> {s.onde||'—'}<br/><strong>Quando:</strong> {s.quando||'—'}<br/><strong>Usuários primários:</strong> {s.usuariosPrimarios||'—'}</p></div>
            <div className="brief-cell"><span className="lbl">Causa raiz</span><p>{ultimoPorque||'—'}</p></div>
            <div className="brief-cell"><span className="lbl">Impactos</span><p><strong>Curto prazo:</strong> {s.curtoPrazo||'—'}<br/><strong>Longo prazo:</strong> {s.longoPrazo||'—'}</p></div>
            <div className="brief-cell"><span className="lbl">Indicadores</span><p><strong>Processo:</strong> {s.indicadorProcesso||'—'}<br/><strong>Resultado:</strong> {s.indicadorResultado||'—'}<br/><strong>Complementar:</strong> {s.indicadorComplementar||'—'}</p></div>
          </div>
        </CanvasFrame>
        <CopyButton text={txt} />
      </SummaryShell>
    );
  }
  return <Screen title={meta.title} n={meta.n} stepIndex={s.step} setStepIndex={i=>patch({step:i})} steps={steps} onDone={()=>setShowSummary(true)} />;
}

/* =======================================================================
   1.2 — O RISCO DE CRIAR SOLUÇÕES SEM COMPREENDER A REALIDADE
   ======================================================================= */
const RISCOS = [
  {id:'tecnossolucao', nome:'Tecnossolução', oQue:'Acreditar que "mais tecnologia" resolve tudo, independentemente do contexto.', exemplo:'Criar um aplicativo sofisticado de agendamento médico para comunidades rurais sem acesso à internet estável.', resultado:'Investimento alto em um sistema que não resolve o problema central — o acesso básico a infraestrutura de saúde.', ods:'ODS 3 (Saúde e Bem-Estar), ODS 10 (Redução das Desigualdades).'},
  {id:'vies', nome:'Viés de confirmação', oQue:'Buscar apenas dados que confirmem a ideia que a equipe já tinha em mente.', exemplo:'Antes mesmo de pesquisar, a equipe decide que o problema é "falta de aplicativos de reciclagem" e só entrevista usuários já engajados em sustentabilidade, ignorando quem nunca separa lixo.', resultado:'A solução serve a um grupo já convertido e não gera impacto ampliado.', ods:'ODS 12 (Consumo e Produção Responsáveis).'},
  {id:'feature', nome:'Funcionalidade supérflua (feature creep)', oQue:'Adicionar recursos extras que não atacam a dor principal.', exemplo:'Um app de doação de alimentos começa simples, mas logo a equipe adiciona chat, gamificação, ranking de doadores, loja virtual… até que a função principal — conectar excedente a famílias — fica escondida.', resultado:'O usuário se perde em funções inúteis e abandona a solução.', ods:'ODS 2 (Fome Zero), ODS 12 (Consumo Responsável).'},
  {id:'escopo', nome:'Escopo nebuloso', oQue:'Tentar resolver um problema amplo demais, sem recorte claro.', exemplo:'Em vez de focar em "melhorar transporte escolar em uma cidade pequena", o time declara que vai resolver "mobilidade urbana no Brasil".', resultado:'Objetivos inalcançáveis, cronogramas inviáveis e um projeto que nunca sai do papel.', ods:'ODS 11 (Cidades e Comunidades Sustentáveis).'},
  {id:'aderencia', nome:'Baixa aderência', oQue:'Mesmo que a solução seja tecnicamente boa, o usuário não muda comportamento porque a solução não se encaixa no seu contexto.', exemplo:'Aplicativo de lembrete de medicamentos que exige internet 24h e smartphones modernos, quando o público-alvo são idosos com celulares simples.', resultado:'Poucos downloads, desinstalações rápidas, frustração dos usuários.', ods:'ODS 3 (Saúde e Bem-Estar), ODS 10 (Redução das Desigualdades).'},
  {id:'metricas', nome:'Métricas irrelevantes', oQue:'Medir atividade em vez de impacto real.', exemplo:'Comemorar 50 mil downloads de um aplicativo de transporte solidário, sem verificar se ele realmente reduziu o gasto das famílias com deslocamento ou se diminuiu emissões de CO₂.', resultado:'Sensação de sucesso sem transformação concreta.', ods:'ODS 13 (Ação Climática), ODS 11 (Cidades Sustentáveis).'},
];

const RISCO_TEACH = {
  tecnossolucao:{
    why:"Tecnologia sofisticada não substitui o básico: se o problema central é o acesso a infraestrutura de saúde, o investimento alto em um sistema não o resolve.",
    how:["Pergunta de verificação (sugestão): qual é o problema central e a tecnologia escolhida ataca esse problema?","Pergunta de verificação (sugestão): o público tem as condições para usá-la, como internet estável?"]
  },
  vies:{
    why:"Quando só se buscam dados que confirmam a ideia inicial, a solução serve a um grupo já convertido e não gera impacto ampliado.",
    how:["Pergunta de verificação (sugestão): pesquisei antes de decidir qual é o problema?","Pergunta de verificação (sugestão): ouvi também quem está fora do grupo já engajado, como quem nunca separa lixo?"]
  },
  feature:{
    why:"Cada recurso extra que não ataca a dor principal esconde a função essencial, e o usuário se perde e abandona a solução.",
    how:["Pergunta de verificação (sugestão): qual é a função principal, por exemplo conectar excedente de alimentos a famílias?","Pergunta de verificação (sugestão): cada nova função (chat, gamificação, ranking, loja virtual) ataca essa dor principal?"]
  },
  escopo:{
    why:"Um problema amplo demais leva a objetivos inalcançáveis, cronogramas inviáveis e um projeto que nunca sai do papel.",
    how:["Pergunta de verificação (sugestão): o problema tem recorte claro, em vez de algo amplo como \"mobilidade urbana no Brasil\"?","Sugestão: faça um recorte claro, como 'transporte escolar em uma cidade pequena'."]
  },
  aderencia:{
    why:"Uma solução tecnicamente boa não gera mudança se não se encaixa no contexto do usuário, e o resultado é poucos downloads e desinstalações rápidas.",
    how:["Pergunta de verificação (sugestão): conheço a realidade do público-alvo, por exemplo idosos com celulares simples?","Pergunta de verificação (sugestão): a solução exige mais do que o usuário tem, como internet 24h e smartphones modernos?"]
  },
  metricas:{
    why:"Medir atividade em vez de impacto dá a sensação de sucesso sem transformação concreta.",
    how:["Pergunta de verificação (sugestão): meus indicadores medem o efeito real, por exemplo o gasto das famílias com deslocamento ou as emissões de CO₂?","Pergunta de verificação (sugestão): estou comemorando apenas números de uso, como 50 mil downloads?"]
  }
};

function ArtRiscosSolucao({data,setData,goHome}){
  const defaults = {checks:{}, enunciadoTeste:'', cabeEmFrase:null, step:0, done:false};
  const [s,patch] = useSlice(data,setData,'riscosSolucao',defaults);
  const [showSummary,setShowSummary] = useState(!!s.done);
  const meta = ARTIFACTS.find(a=>a.id==='riscosSolucao');
  function setCheck(id,field,val){ patch({checks:{...s.checks,[id]:{...(s.checks[id]||{}),[field]:val}}}); }

  const riscoSteps = RISCOS.map(r=>({
    label:r.nome,
    book:<>
      <p><strong>O que é:</strong> {r.oQue}</p>
      <p><strong>Exemplo prático:</strong> {r.exemplo}</p>
      <p><strong>Resultado:</strong> {r.resultado}</p>
      <p><strong>ODS relacionados:</strong> {r.ods}</p>
    </>,
    teach:RISCO_TEACH[r.id],
    render:()=>(
      <div>
        <YesNo label={"Esse risco está presente na sua ideia atual?"} value={(s.checks[r.id]||{}).presente} onChange={v=>setCheck(r.id,'presente',v)} />
        <Field type="textarea" rows={2} label="Como evitar (ou por que não se aplica)?" value={(s.checks[r.id]||{}).nota} onChange={v=>setCheck(r.id,'nota',v)} />
      </div>
    )
  }));

  const steps = [
    {label:'Por que ir direto para a solução é arriscado',
     book:<>
       <p>"Se você não consegue explicar o problema em uma frase simples, ainda não tem um problema — tem apenas um tema."</p>
       <p>Ir direto para a solução é tentador. É comum que, diante de um tema inspirador, equipes já queiram abrir o Figma, escrever código ou pensar em funcionalidades. O problema é que soluções construídas sem compreender a realidade tendem a falhar: custam caro, não são usadas e, muitas vezes, reforçam desigualdades em vez de resolvê-las.</p>
       <p>Vamos ver, um a um, os padrões de erro mais comuns quando a problematização é ignorada — e verificar se algum deles está presente na sua ideia atual.</p>
     </>,
     teach:{
       why:"Soluções construídas sem compreender a realidade tendem a falhar: custam caro, não são usadas e, muitas vezes, reforçam desigualdades em vez de resolvê-las.",
       how:["Antes de abrir o Figma ou escrever código, passe pela problematização.","Revise, um a um, os seis padrões de erro e verifique se algum está presente na sua ideia."],
       mistakes:["Diante de um tema inspirador, já querer abrir o Figma, escrever código ou pensar em funcionalidades."]
     },
     render:()=>(<p className="mini-note">Avance para revisar, um a um, os 6 padrões de erro descritos no livro.</p>)
    },
    ...riscoSteps,
    {label:'O teste final do enunciado',
     book:<p>Assim como no exemplo didático do livro, um enunciado de problema bem construído diz quem sofre, o que acontece, a causa e o impacto — e cabe em menos de 250 caracteres. Cole aqui o enunciado do artefato "1.1 Investigar o Problema" (ou escreva um novo) e teste se ele resiste.</p>,
     teach:{
       why:"Se você não consegue explicar o problema em uma frase simples, ainda não tem um problema, tem apenas um tema. O teste mostra se a problematização resultou em algo claro.",
       how:["Verifique se diz quem sofre.","Verifique se diz o que acontece.","Verifique se mostra a causa.","Verifique se aponta o impacto.","Confira se cabe em menos de 250 caracteres."],
       example:"\"Moradores de bairros periféricos enfrentam dificuldades de mobilidade devido à falta de transporte público eficiente e acessível, resultando em altos custos e perda de tempo diário.\" (exemplo didático do livro)"
     },
     render:()=>(
       <div>
         <Field type="textarea" rows={3} label="Seu enunciado do problema" value={s.enunciadoTeste} onChange={v=>patch({enunciadoTeste:v})} placeholder={(data.investigarProblema&&data.investigarProblema.enunciado)||''} />
         <YesNo label="Ele cabe em uma frase objetiva, mensurável e com menos de 250 caracteres?" value={s.cabeEmFrase} onChange={v=>patch({cabeEmFrase:v})} />
       </div>
     )
    },
  ];

  if(showSummary){
    const presentes = RISCOS.filter(r=>(s.checks[r.id]||{}).presente===true);
    const txt = `RISCOS DE CRIAR SEM COMPREENDER A REALIDADE\n\n`+RISCOS.map(r=>{
      const c = s.checks[r.id]||{};
      return `${r.nome}: ${c.presente===true?'PRESENTE':c.presente===false?'não presente':'não avaliado'}${c.nota?(' — '+c.nota):''}`;
    }).join('\n')+`\n\nEnunciado testado: ${s.enunciadoTeste||'—'}\nCabe em uma frase objetiva? ${s.cabeEmFrase===true?'Sim':s.cabeEmFrase===false?'Não':'—'}`;
    return (
      <SummaryShell title={meta.title} n={meta.n} id={meta.id} summaryText={txt} onEdit={()=>setShowSummary(false)} onHome={()=>{patch({done:true});goHome();}}>
        <CanvasFrame label="Raio-X de Riscos" filename="raio-x-de-riscos">
          <div className="risk-score">
            <div className="num">{presentes.length}/6</div>
            <p style={{margin:0}}>riscos presentes na ideia atual{presentes.length===0? ' — bom sinal, mas revise com calma.':'.'}</p>
          </div>
          <div className="risk-grid">
            {RISCOS.map(r=>{
              const c = s.checks[r.id]||{};
              const cls = c.presente===true?'presente':c.presente===false?'ausente':'';
              return (
                <div key={r.id} className={"risk-card "+cls}>
                  <h5>{r.nome}</h5>
                  <p><strong>{c.presente===true?'⚠ Presente':c.presente===false?'✓ Não presente':'Não avaliado'}</strong></p>
                  {c.nota && <p style={{marginTop:'6px'}}>{c.nota}</p>}
                </div>
              );
            })}
          </div>
          <div className="brief-quote" style={{marginTop:'16px'}}>{s.enunciadoTeste || 'Enunciado ainda não testado.'}</div>
          <span className={"badge "+(s.cabeEmFrase?'success':'warning')}>{s.cabeEmFrase===true?'Passa no teste':s.cabeEmFrase===false?'Precisa de ajuste':'Não avaliado'}</span>
        </CanvasFrame>
        <CopyButton text={txt} />
      </SummaryShell>
    );
  }
  return <Screen title={meta.title} n={meta.n} stepIndex={s.step} setStepIndex={i=>patch({step:i})} steps={steps} onDone={()=>setShowSummary(true)} />;
}

/* =======================================================================
   1.3 — PROCESSOS DE LEVANTAMENTO DO PROBLEMA (métodos ágeis)
   ======================================================================= */
const METODOS_LEVANTAMENTO = [
  {id:'designThinking', icon:'🧑‍🤝‍🧑', label:'Design Thinking', blurb:'Entrevistas rápidas e observação em campo, centradas no ser humano.'},
  {id:'leanInception', icon:'⚡', label:'Lean Inception', blurb:'Workshop rápido para alinhar problema, usuários e objetivos com a equipe.'},
  {id:'userStoryMapping', icon:'🗺️', label:'User Story Mapping', blurb:'Mapeia a jornada do usuário como uma sequência de histórias.'},
  {id:'jtbd', icon:'🎯', label:'Jobs To Be Done (JTBD)', blurb:'Descobre a tarefa que o usuário quer realizar, independentemente da solução.'},
];

function ArtLevantamentoAgil({data,setData,goHome}){
  const defaults = {equipe:'',metodoEscolhido:'',entrevistas:[{id:uid(),pessoa:'',resumo:''},{id:uid(),pessoa:'',resumo:''},{id:uid(),pessoa:'',resumo:''}],qualProblema:'',quemUsuarios:'',quaisObjetivos:'',historiasUsuario:[{id:uid(),persona:'',objetivo:'',beneficio:''}],jtbdSituacao:'',jtbdAcao:'',jtbdResultado:'',diagnostico:'',step:0,done:false};
  const [s,patch] = useSlice(data,setData,'levantamentoAgil',defaults);
  const [showSummary,setShowSummary] = useState(!!s.done);
  const meta = ARTIFACTS.find(a=>a.id==='levantamentoAgil');
  function setEnt(i,field,val){ const next=[...s.entrevistas]; next[i]={...next[i],[field]:val}; patch({entrevistas:next}); }
  function addEnt(){ patch({entrevistas:[...s.entrevistas,{id:uid(),pessoa:'',resumo:''}]}); }
  function removeEnt(i){ const next=s.entrevistas.filter((_,idx)=>idx!==i); patch({entrevistas:next.length?next:[{id:uid(),pessoa:'',resumo:''}]}); }
  function setHist(i,field,val){ const next=[...s.historiasUsuario]; next[i]={...next[i],[field]:val}; patch({historiasUsuario:next}); }
  function addHist(){ patch({historiasUsuario:[...s.historiasUsuario,{id:uid(),persona:'',objetivo:'',beneficio:''}]}); }
  function removeHist(i){ const next=s.historiasUsuario.filter((_,idx)=>idx!==i); patch({historiasUsuario:next.length?next:[{id:uid(),persona:'',objetivo:'',beneficio:''}]}); }
  const jtbd = `Quando eu ${s.jtbdSituacao||'[situação]'}, preciso de ${s.jtbdAcao||'[ação]'}, para que eu possa ${s.jtbdResultado||'[resultado]'}.`;
  const historiaTexto = h => `Como ${h.persona||'[persona]'}, quero ${h.objetivo||'[objetivo]'}, para ${h.beneficio||'[benefício]'}.`;
  const metodoAtual = METODOS_LEVANTAMENTO.find(m=>m.id===s.metodoEscolhido);

  function metodoStep(id){
    if(id==='designThinking') return {
      label:'Design Thinking — entrevistas rápidas',
      book:<>
        <p><strong>O que é:</strong> abordagem centrada no ser humano, que busca entender profundamente necessidades e dores. <strong>Como aplicar:</strong> entrevistas rápidas, observação em campo, imersão no cotidiano do usuário. Exemplo (ODS 4 – Educação): observar uma sala de aula em escola pública para entender por que alunos abandonam os estudos.</p>
        <p>Faça ao menos <strong>3 entrevistas rápidas</strong> com pessoas que vivenciam o problema.</p>
      </>,
      teach:{
        why:"Ouvir diretamente quem vive o problema é aprender com o usuário em vez de supor o que ele precisa.",
        how:["Escolha pessoas que vivenciam o problema.","Faça ao menos 3 entrevistas rápidas.","Complemente com observação em campo e imersão no cotidiano do usuário."],
        example:"No caso dos idosos que esquecem medicação, a equipe começou com entrevistas rápidas para ouvir diretamente idosos e cuidadores."
      },
      render:()=>(
        <div>
          {s.entrevistas.map((e,i)=>(
            <div className="grid-2" key={e.id}>
              <Field label={"Pessoa entrevistada "+(i+1)} value={e.pessoa} onChange={v=>setEnt(i,'pessoa',v)} />
              <div style={{display:'flex',gap:'8px',alignItems:'flex-end'}}>
                <div style={{flex:1}}><Field label="O que ela disse (resumo)" value={e.resumo} onChange={v=>setEnt(i,'resumo',v)} /></div>
                <button className="icon-btn" style={{marginBottom:'16px'}} onClick={()=>removeEnt(i)}>×</button>
              </div>
            </div>
          ))}
          <button className="add-row-btn" onClick={addEnt}>+ adicionar entrevista</button>
        </div>
      )
    };
    if(id==='leanInception') return {
      label:'Lean Inception',
      book:<p><strong>O que é:</strong> workshop intensivo (geralmente 1 semana) para alinhar visão entre equipe, usuários e stakeholders. <strong>Como aplicar:</strong> dinâmicas rápidas para definir <strong>qual problema resolver</strong>, <strong>quem são os usuários</strong> e <strong>quais são os objetivos</strong>. Exemplo (ODS 11 – Cidades Sustentáveis): prefeitura, comunidade e técnicos mapeiam juntos os desafios do transporte público em bairros periféricos.</p>,
      teach:{
        why:"Alinha a visão entre equipe, usuários e stakeholders sobre o que será atacado.",
        how:["Reúna equipe, usuários e demais envolvidos.","Use dinâmicas rápidas para definir qual problema resolver.","Defina quem são os usuários.","Defina quais são os objetivos."],
        example:"Prefeitura, comunidade e técnicos mapeando juntos os desafios do transporte público em bairros periféricos (ODS 11)."
      },
      render:()=>(
        <div>
          <Field type="textarea" rows={2} label="Qual problema resolver?" value={s.qualProblema} onChange={v=>patch({qualProblema:v})} />
          <Field type="textarea" rows={2} label="Quem são os usuários?" value={s.quemUsuarios} onChange={v=>patch({quemUsuarios:v})} />
          <Field type="textarea" rows={2} label="Quais são os objetivos?" value={s.quaisObjetivos} onChange={v=>patch({quaisObjetivos:v})} />
        </div>
      )
    };
    if(id==='userStoryMapping') return {
      label:'User Story Mapping',
      book:<>
        <p><strong>O que é:</strong> técnica visual para mapear a jornada do usuário como histórias: <strong>"Como [persona], quero [objetivo], para [benefício]."</strong> Exemplo (ODS 12 – Consumo Responsável): mapear a experiência de uma família ao tentar separar lixo reciclável e entregá-lo para coleta seletiva.</p>
        <p>Assim como no JTBD, monte cada história preenchendo os três blocos abaixo — um mapa de jornada geralmente reúne <strong>várias histórias</strong> encadeadas, então adicione quantas forem necessárias.</p>
      </>,
      teach:{
        why:"Transformar a rotina do usuário em histórias deixa visíveis as etapas que ele percorre e os pontos em que sente dor.",
        how:["Identifique as etapas que o usuário percorre.","Descreva a necessidade em cada etapa.","Aponte os possíveis pontos de dor.","Escreva cada história no formato \"Como [persona], quero [objetivo], para [benefício]\"."],
        example:"A rotina dos idosos foi descrita como: acordar, lembrar do remédio, tomar, registrar. Outro exemplo (ODS 2): \"Como agricultor, quero vender meus alimentos frescos rapidamente, para garantir renda e evitar desperdício.\""
      },
      render:()=>(
        <div>
          {s.historiasUsuario.map((h,i)=>(
            <div key={h.id} style={{marginBottom:'16px',paddingBottom:'16px',borderBottom: i<s.historiasUsuario.length-1 ? '1px dashed var(--line)' : 'none'}}>
              <div className="grid-3">
                <Field label="Como... (persona)" value={h.persona} onChange={v=>setHist(i,'persona',v)} placeholder="Ex.: uma mãe que trabalha fora" />
                <Field label="...quero (objetivo)" value={h.objetivo} onChange={v=>setHist(i,'objetivo',v)} placeholder="Ex.: separar o lixo reciclável rapidamente" />
                <div style={{display:'flex',gap:'8px',alignItems:'flex-end'}}>
                  <div style={{flex:1}}><Field label="...para (benefício)" value={h.beneficio} onChange={v=>setHist(i,'beneficio',v)} placeholder="Ex.: não perder tempo na correria do dia" /></div>
                  <button className="icon-btn" style={{marginBottom:'16px'}} onClick={()=>removeHist(i)}>×</button>
                </div>
              </div>
              <div className="code-block">{historiaTexto(h)}</div>
            </div>
          ))}
          <button className="add-row-btn" onClick={addHist}>+ adicionar história</button>
        </div>
      )
    };
    return {
      label:'Jobs To Be Done (JTBD)',
      book:<>
        <p><strong>O que é:</strong> método que busca descobrir a "tarefa" que o usuário deseja realizar, independente da solução existente. <strong>Como aplicar:</strong> "Quando eu [situação], preciso de [ação], para que eu possa [resultado]."</p>
        <p>Exemplo (ODS 3 – Saúde e Bem-Estar): "Quando quero cuidar da minha saúde, preciso de lembretes simples, para que eu não esqueça de tomar meus remédios."</p>
      </>,
      teach:{
        why:"O foco é a tarefa que o usuário quer realizar, independentemente da solução que já exista.",
        how:["Investigue situações reais.","Complete a frase: \"Quando eu [situação], preciso de [ação], para que eu possa [resultado]\"."],
        example:"ODS 2: \"Quando tenho excedente de produção, preciso de um canal simples para vender, para que eu não perca alimentos nem renda.\""
      },
      render:()=>(
        <div>
          <Field label="Quando eu... (situação)" value={s.jtbdSituacao} onChange={v=>patch({jtbdSituacao:v})} />
          <Field label="...preciso de (ação)" value={s.jtbdAcao} onChange={v=>patch({jtbdAcao:v})} />
          <Field label="...para que eu possa (resultado)" value={s.jtbdResultado} onChange={v=>patch({jtbdResultado:v})} />
          <div className="code-block">{jtbd}</div>
        </div>
      )
    };
  }

  const steps = [
    {label:'Por que usar métodos ágeis',
     book:<>
       <p>"Métodos ágeis no levantamento do problema significam ouvir cedo, testar hipóteses rápido e corrigir a rota antes de investir em soluções complexas."</p>
       <p>O levantamento do problema é a etapa de descoberta: investigar causas, ouvir os atores envolvidos e compreender os impactos antes de imaginar qualquer solução. Nos métodos ágeis essa investigação não é longa, burocrática ou distante — acontece de forma <strong>colaborativa, iterativa e rápida</strong>: colaboração (todos os envolvidos participam), iteração (ciclos curtos validam hipóteses em poucos dias), rapidez, e foco no usuário (decisões guiadas pela experiência real).</p>
     </>,
     teach:{
       why:"Nos métodos ágeis a investigação não é longa, burocrática ou distante: acontece de forma colaborativa, iterativa e rápida, priorizando aprender com o usuário em vez de supor o que ele precisa.",
       how:["Colaboração: todos os envolvidos participam, em vez de uma pesquisa isolada.","Iteração: o objetivo é melhorar continuamente, não acertar de primeira.","Rapidez: ciclos curtos validam hipóteses em poucos dias.","Foco no usuário: decisões guiadas pela experiência real."],
       mistakes:["Fazer uma pesquisa isolada, longa e distante do usuário.","Decidir com base em suposições da equipe."]
     },
     render:()=><Field label="Quem vai participar do levantamento com você?" value={s.equipe} onChange={v=>patch({equipe:v})} placeholder="Ex.: eu, mais 2 colegas de equipe, e um professor orientador" />
    },
    {label:'Escolha o método de levantamento',
     render:()=>(
       <div>
         <p className="mini-note" style={{marginBottom:'14px'}}>O livro apresenta 4 métodos ágeis complementares para o levantamento do problema. Escolha um para aplicar agora — você pode voltar aqui depois e repetir o passo com outro método.</p>
         <div className="method-grid">
           {METODOS_LEVANTAMENTO.map(m=>(
             <div key={m.id} className={"method-card"+(s.metodoEscolhido===m.id?' selected':'')} onClick={()=>patch({metodoEscolhido:m.id})}>
               <div className="method-card-icon">{m.icon}</div>
               <h4>{m.label}</h4>
               <p>{m.blurb}</p>
             </div>
           ))}
         </div>
       </div>
     )
    },
    ...(metodoAtual ? [metodoStep(metodoAtual.id)] : []),
    {label:'Síntese: diagnóstico claro',
     book:<p>Como no exemplo do livro (idosos que esquecem medicação): ao combinar entrevistas, User Story Mapping e JTBD, uma equipe chega a um diagnóstico claro — o problema não era "falta de disciplina", mas "ausência de lembretes simples adaptados a celulares básicos". Escreva o diagnóstico que emergiu da sua investigação.</p>,
     teach:{
       why:"O levantamento serve para chegar a um diagnóstico claro do que realmente acontece, indo além da primeira impressão.",
       how:["Reúna o que apareceu nas entrevistas, nas histórias e na tarefa central do usuário.","Escreva o que realmente descobriu."],
       example:"Equipe dos idosos: aplicou entrevistas, User Story Mapping e JTBD e concluiu que o problema não era apenas \"falta de disciplina\", mas ausência de lembretes simples adaptados a celulares básicos."
     },
     render:()=><Field type="textarea" label="Diagnóstico claro (o que realmente descobrimos)" value={s.diagnostico} onChange={v=>patch({diagnostico:v})} rows={3} />
    },
  ];

  if(showSummary){
    const historias = (s.historiasUsuario||[]).filter(h=>h.persona||h.objetivo||h.beneficio).map(historiaTexto);
    let metodoTxt = '(nenhum método escolhido)';
    if(s.metodoEscolhido==='designThinking') metodoTxt = 'Design Thinking\n'+(s.entrevistas.filter(e=>e.pessoa).map(e=>'- '+e.pessoa+': '+e.resumo).join('\n')||'—');
    else if(s.metodoEscolhido==='leanInception') metodoTxt = `Lean Inception\nQual problema: ${s.qualProblema||'—'}\nQuem: ${s.quemUsuarios||'—'}\nObjetivos: ${s.quaisObjetivos||'—'}`;
    else if(s.metodoEscolhido==='userStoryMapping') metodoTxt = 'User Story Mapping\n'+(historias.length?historias.map(h=>'- '+h).join('\n'):'—');
    else if(s.metodoEscolhido==='jtbd') metodoTxt = 'Jobs To Be Done (JTBD)\n'+jtbd;
    const txt = `LEVANTAMENTO ÁGIL DO PROBLEMA\n\nEquipe: ${s.equipe||'—'}\nMétodo escolhido: ${metodoAtual?metodoAtual.label:'—'}\n\n${metodoTxt}\n\nDiagnóstico\n${s.diagnostico||'—'}`;
    return (
      <SummaryShell title={meta.title} n={meta.n} id={meta.id} summaryText={txt} onEdit={()=>setShowSummary(false)} onHome={()=>{patch({done:true});goHome();}}>
        <CanvasFrame label={"Board — "+(metodoAtual?metodoAtual.label:'Levantamento Ágil')}>
          <div className="board">
            <div className="board-col">
              <h4>Método escolhido</h4>
              <div className="board-item"><span className="lbl">{metodoAtual?metodoAtual.icon+' '+metodoAtual.label:'—'}</span>{metodoAtual?metodoAtual.blurb:'Nenhum método selecionado ainda.'}</div>
              <div className="board-item"><span className="lbl">Equipe</span>{s.equipe||'—'}</div>
            </div>
            <div className="board-col">
              <h4>{metodoAtual?metodoAtual.label:'Resultado'}</h4>
              {s.metodoEscolhido==='designThinking' && (s.entrevistas.filter(e=>e.pessoa).length ? s.entrevistas.filter(e=>e.pessoa).map(e=>(<div className="board-item" key={e.id}><span className="lbl">{e.pessoa}</span>{e.resumo}</div>)) : <p className="mini-note">Sem entrevistas registradas.</p>)}
              {s.metodoEscolhido==='leanInception' && (<>
                <div className="board-item"><span className="lbl">Qual problema</span>{s.qualProblema||'—'}</div>
                <div className="board-item"><span className="lbl">Quem</span>{s.quemUsuarios||'—'}</div>
                <div className="board-item"><span className="lbl">Objetivos</span>{s.quaisObjetivos||'—'}</div>
              </>)}
              {s.metodoEscolhido==='userStoryMapping' && (historias.length ? historias.map((h,i)=>(<div className="board-item" key={i}>{h}</div>)) : <p className="mini-note">Sem histórias registradas.</p>)}
              {s.metodoEscolhido==='jtbd' && <div className="board-item mono">{jtbd}</div>}
              {!metodoAtual && <p className="mini-note">Volte e escolha um método para ver o resultado aqui.</p>}
            </div>
          </div>
          <div className="brief-quote" style={{marginTop:'16px'}}><span className="lbl" style={{display:'block',fontSize:'11px',textTransform:'uppercase',color:'var(--accent)',fontWeight:700,marginBottom:'4px'}}>Diagnóstico</span>{s.diagnostico||'Ainda não escrito.'}</div>
        </CanvasFrame>
        <CopyButton text={txt} />
      </SummaryShell>
    );
  }
  return <Screen title={meta.title} n={meta.n} stepIndex={s.step} setStepIndex={i=>patch({step:i})} steps={steps} onDone={()=>setShowSummary(true)} canAdvance={s.step!==1 || !!s.metodoEscolhido} />;
}

/* =======================================================================
   1.4 — REFERÊNCIAS DE PESQUISA
   ======================================================================= */
function ArtReferenciasPesquisa({data,setData,goHome}){
  const defaults = {fontesConsultadas:[],referencias:[{id:uid(),fonte:'',ano:'',tipo:'',achado:'',relevancia:'',ods:''},{id:uid(),fonte:'',ano:'',tipo:'',achado:'',relevancia:'',ods:''}],paragrafoFinal:'',step:0,done:false};
  const [s,patch] = useSlice(data,setData,'referenciasPesquisa',defaults);
  const [showSummary,setShowSummary] = useState(!!s.done);
  const meta = ARTIFACTS.find(a=>a.id==='referenciasPesquisa');
  function setRef(i,field,val){ const next=[...s.referencias]; next[i]={...next[i],[field]:val}; patch({referencias:next}); }
  function addRef(){ patch({referencias:[...s.referencias,{id:uid(),fonte:'',ano:'',tipo:'',achado:'',relevancia:'',ods:''}]}); }
  function removeRef(i){ const next=s.referencias.filter((_,idx)=>idx!==i); patch({referencias:next.length?next:[{id:uid(),fonte:'',ano:'',tipo:'',achado:'',relevancia:'',ods:''}]}); }

  const steps = [
    {label:'Onde buscar informações',
     book:<>
       <p>Definir o problema é apenas o primeiro passo. Para transformá-lo em algo <strong>relevante e convincente</strong>, precisamos fundamentar o que descobrimos em <strong>dados concretos</strong>. As referências de pesquisa mostram que o problema não é apenas uma percepção individual, mas uma questão real, validada e documentada — aumentando a credibilidade do projeto e preparando terreno para a escolha de indicadores de impacto.</p>
       <p><strong>Organizações internacionais:</strong> ONU, PNUD, UNICEF, Banco Mundial. <strong>Fontes nacionais:</strong> IBGE, IPEA, ministérios e secretarias. <strong>Fontes acadêmicas:</strong> artigos científicos, Scielo, Google Scholar. <strong>ONGs e organizações locais:</strong> relatórios de impacto social, pesquisas de campo locais.</p>
     </>,
     teach:{
       why:"Os dados validam que o problema existe em escala e não é um caso isolado, dão credibilidade perante professores, empresas ou investidores, ajudam a ver se é urgente, permitem comparar contextos (nacional, regional, local) e oferecem números que servirão de linha de base para medir resultados.",
       how:["Organizações internacionais: ONU (relatórios sobre os ODS), PNUD (desenvolvimento humano, desigualdade, pobreza), UNICEF (educação, infância), Banco Mundial.","Fontes nacionais: IBGE (censos, PNAD contínua), IPEA (políticas públicas), ministérios e secretarias.","Fontes acadêmicas: artigos científicos, Scielo, Google Scholar, repositórios de universidades.","ONGs e organizações locais: relatórios de impacto social e pesquisas de campo locais."]
     },
     render:()=><CheckGroup label="Quais dessas fontes você já consultou (ou pretende consultar)?" options={['Organizações internacionais (ONU, PNUD, UNICEF, Banco Mundial)','Fontes nacionais (IBGE, IPEA, ministérios)','Fontes acadêmicas (artigos, Scielo, Google Scholar)','ONGs e organizações locais']} values={s.fontesConsultadas} onChange={v=>patch({fontesConsultadas:v})} />
    },
    {label:'Registrar referências',
     book:<>
       <p>Para cada referência, busque <strong>números claros</strong> (porcentagens, índices, totais), <strong>conecte aos ODS</strong> (um dado pode se relacionar a mais de um objetivo), <strong>compare diferentes fontes</strong> para evitar viés, e <strong>traga para o contexto local</strong>.</p>
       <p>Busque ao menos <strong>duas referências confiáveis</strong> que comprovem a relevância do seu problema.</p>
     </>,
     teach:{
       why:"Registrar fonte, ano, tipo, achado e relevância mostra que o problema é uma questão real, validada e documentada, e não só uma percepção individual.",
       how:["Busque duas referências confiáveis que comprovem a relevância do problema.","Preencha fonte, ano, tipo, achado principal e relevância para o problema.","Relacione cada dado a pelo menos um ODS: um dado pode se ligar a mais de um.","Use a norma ABNT para referenciar corretamente."],
       example:"IBGE, 2022: 37% dos brasileiros gastam mais de 1h30 por dia em deslocamentos. Relevância: valida soluções de mobilidade urbana que reduzam tempo e custo de transporte (ODS 11).",
       mistakes:["Usar apenas uma fonte, sem comparar com outras (comparar ajuda a evitar viés).","Ficar só em dados globais, sem trazer números locais que mostram proximidade e impacto direto."]
     },
     render:()=>(
       <div>
         {s.referencias.map((r,i)=>(
           <div className="summary-block" key={r.id}>
             <div className="toolbar-top"><span className="mini-note">Referência {i+1}</span><button className="icon-btn" onClick={()=>removeRef(i)}>×</button></div>
             <div className="grid-3">
               <Field label="Fonte" value={r.fonte} onChange={v=>setRef(i,'fonte',v)} placeholder="Ex.: IBGE" />
               <Field label="Ano" value={r.ano} onChange={v=>setRef(i,'ano',v)} placeholder="Ex.: 2023" />
               <Field label="Tipo" value={r.tipo} onChange={v=>setRef(i,'tipo',v)} placeholder="Censo, relatório, artigo…" />
             </div>
             <Field type="textarea" rows={2} label="Achado principal" value={r.achado} onChange={v=>setRef(i,'achado',v)} placeholder="Ex.: 33 milhões de brasileiros vivem em insegurança alimentar." />
             <Field type="textarea" rows={2} label="Relevância para o problema" value={r.relevancia} onChange={v=>setRef(i,'relevancia',v)} />
             <SelectField label="ODS relacionado" value={r.ods} onChange={v=>setRef(i,'ods',v)} options={odsOptions()} />
           </div>
         ))}
         <button className="add-row-btn" onClick={addRef}>+ adicionar referência</button>
       </div>
     )
    },
    {label:'Por que esses dados são incontornáveis',
     book:<p>Prepare um pequeno parágrafo (5–6 linhas) explicando por que esses dados tornam seu problema incontornável — ou seja, por que ele não pode ser ignorado.</p>,
     teach:{
       why:"As referências são a ponte entre a percepção inicial do problema e sua validação científica e social, e aumentam a credibilidade do projeto.",
       how:["Reúna os achados registrados.","Escreva um parágrafo de 5 a 6 linhas explicando por que esses dados tornam o problema incontornável."],
       example:"ODS 2, ONU Brasil 2023: 33 milhões de brasileiros vivem em insegurança alimentar, o que fundamenta projetos que redistribuam alimentos ou conectem agricultores a consumidores."
     },
     render:()=><Field type="textarea" label="Parágrafo final" value={s.paragrafoFinal} onChange={v=>patch({paragrafoFinal:v})} rows={5} />
    },
  ];

  if(showSummary){
    const txt = `REFERÊNCIAS DE PESQUISA\n\n`+s.referencias.filter(r=>r.fonte).map(r=>`Fonte: ${r.fonte} (${r.ano}) — ${r.tipo}\nAchado: ${r.achado}\nRelevância: ${r.relevancia}\nODS: ${r.ods?odsLabel(r.ods):'—'}`).join('\n\n')+`\n\nPor que são incontornáveis:\n${s.paragrafoFinal||'—'}`;
    return (
      <SummaryShell title={meta.title} n={meta.n} id={meta.id} summaryText={txt} onEdit={()=>setShowSummary(false)} onHome={()=>{patch({done:true});goHome();}}>
        <CanvasFrame label="Dossiê de Referências" filename="dossie-de-referencias">
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Fonte</th><th>Ano</th><th>Tipo</th><th>Achado</th><th>ODS</th></tr></thead>
              <tbody>{s.referencias.filter(r=>r.fonte).map(r=>(<tr key={r.id}><td>{r.fonte}</td><td>{r.ano}</td><td>{r.tipo}</td><td>{r.achado}</td><td>{r.ods?('ODS '+r.ods):'—'}</td></tr>))}</tbody>
            </table>
          </div>
          <div className="brief-quote" style={{marginTop:'16px'}}>{s.paragrafoFinal||'Parágrafo final ainda não escrito.'}</div>
        </CanvasFrame>
        <CopyButton text={txt} />
      </SummaryShell>
    );
  }
  return <Screen title={meta.title} n={meta.n} stepIndex={s.step} setStepIndex={i=>patch({step:i})} steps={steps} onDone={()=>setShowSummary(true)} />;
}
