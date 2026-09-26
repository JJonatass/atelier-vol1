/* =======================================================================
   1.5 — ANÁLISE DE CONCORRENTES
   ======================================================================= */
function ArtAnaliseConcorrentes({data,setData,goHome}){
  const blankC = ()=>({id:uid(),nome:'',tipo:'Direto',publicoAlvo:'',funcionalidades:'',pontosFortes:'',pontosFracos:'',oportunidades:'',notas:{usabilidade:0,confianca:0,preco:0,alcance:0}});
  const defaults = {concorrentes:[blankC(),blankC()],oportunidadeDiferencial:'',step:0,done:false};
  const [s,patch] = useSlice(data,setData,'analiseConcorrentes',defaults);
  const [showSummary,setShowSummary] = useState(!!s.done);
  const meta = ARTIFACTS.find(a=>a.id==='analiseConcorrentes');
  function setC(i,field,val){ const next=[...s.concorrentes]; next[i]={...next[i],[field]:val}; patch({concorrentes:next}); }
  function setNota(i,field,val){ const next=[...s.concorrentes]; next[i]={...next[i],notas:{...(next[i].notas||{}),[field]:val}}; patch({concorrentes:next}); }
  function addC(){ patch({concorrentes:[...s.concorrentes,blankC()]}); }
  function removeC(i){ const next=s.concorrentes.filter((_,idx)=>idx!==i); patch({concorrentes:next.length?next:[blankC()]}); }

  const steps = [
    {label:'Por que fazer análise de concorrentes',
     book:<>
       <p>Depois de definir e validar o problema, o próximo passo é <strong>analisar quem já tentou resolvê-lo</strong>. Esse processo é conhecido como <strong>benchmarking</strong>: observar soluções existentes, identificar o que funciona, reconhecer limitações e, principalmente, descobrir <strong>oportunidades de inovação</strong>.</p>
       <p>Ele evita retrabalho (não reinventar algo que já existe e funciona bem), ensina com erros alheios (cada limitação é uma chance de fazer diferente), identifica padrões de mercado, mapeia lacunas (o que ninguém está oferecendo) e inspira melhorias.</p>
     </>,
     render:()=>(<p className="mini-note">Avance para registrar seus concorrentes diretos e indiretos.</p>)
    },
    {label:'Identificar e comparar concorrentes',
     book:<>
       <p><strong>Passo 1 — Identificar:</strong> diretos resolvem o mesmo problema para o mesmo público; indiretos resolvem de forma diferente ou parcial. <strong>Passo 2 — Coletar informações:</strong> baixe o app, leia avaliações, teste as funcionalidades. <strong>Passo 3 — Comparar atributos:</strong> público-alvo, funcionalidades, pontos fortes e fracos, oportunidades de melhoria.</p>
       <p>Exemplo aplicado (ODS 11 – Mobilidade Urbana): "Caronas Comunitárias" (direto) oferece caronas locais, baixo custo e proximidade, mas tem baixa adesão e confiança — oportunidade: verificação local e gamificação.</p>
       <p>Compare pelo menos <strong>dois concorrentes reais</strong>.</p>
     </>,
     render:()=>(
       <div>
         {s.concorrentes.map((c,i)=>(
           <div className="summary-block" key={c.id}>
             <div className="toolbar-top"><Field label="Nome do concorrente" value={c.nome} onChange={v=>setC(i,'nome',v)} /><button className="icon-btn" onClick={()=>removeC(i)}>×</button></div>
             <div className="grid-2">
               <SelectField label="Tipo" value={c.tipo} onChange={v=>setC(i,'tipo',v)} options={['Direto','Indireto']} />
               <Field label="Público-alvo" value={c.publicoAlvo} onChange={v=>setC(i,'publicoAlvo',v)} />
             </div>
             <Field type="textarea" rows={2} label="Funcionalidades principais" value={c.funcionalidades} onChange={v=>setC(i,'funcionalidades',v)} />
             <div className="grid-2">
               <Field type="textarea" rows={2} label="Pontos fortes" value={c.pontosFortes} onChange={v=>setC(i,'pontosFortes',v)} />
               <Field type="textarea" rows={2} label="Pontos fracos" value={c.pontosFracos} onChange={v=>setC(i,'pontosFracos',v)} />
             </div>
             <Field type="textarea" rows={2} label="Oportunidades de melhoria" value={c.oportunidades} onChange={v=>setC(i,'oportunidades',v)} />
             <label className="field-label">Notas de 1 a 5 (para a matriz comparativa)</label>
             <div className="grid-3" style={{marginBottom:'8px'}}>
               <RatingField label="Usabilidade" value={c.notas.usabilidade} onChange={v=>setNota(i,'usabilidade',v)} />
               <RatingField label="Confiança/adesão" value={c.notas.confianca} onChange={v=>setNota(i,'confianca',v)} />
               <RatingField label="Preço/custo-benefício" value={c.notas.preco} onChange={v=>setNota(i,'preco',v)} />
             </div>
             <RatingField label="Alcance/escala" value={c.notas.alcance} onChange={v=>setNota(i,'alcance',v)} />
           </div>
         ))}
         <button className="add-row-btn" onClick={addC}>+ adicionar concorrente</button>
       </div>
     )
    },
    {label:'Sua oportunidade de diferenciação',
     book:<p><strong>Passo 4 — Sintetizar aprendizados:</strong> destaque quais pontos podem ser aproveitados no seu projeto e marque as lacunas como potenciais inovações.</p>,
     render:()=><Field type="textarea" label="Identifique uma oportunidade concreta que poderia diferenciar o seu projeto" value={s.oportunidadeDiferencial} onChange={v=>patch({oportunidadeDiferencial:v})} rows={3} />
    },
  ];

  if(showSummary){
    const txt = `ANÁLISE DE CONCORRENTES\n\n`+s.concorrentes.filter(c=>c.nome).map(c=>`${c.nome} (${c.tipo}) — público: ${c.publicoAlvo}\nFuncionalidades: ${c.funcionalidades}\nFortes: ${c.pontosFortes}\nFracos: ${c.pontosFracos}\nOportunidades: ${c.oportunidades}\nNotas (1-5) — usabilidade: ${c.notas.usabilidade||'—'}, confiança: ${c.notas.confianca||'—'}, preço: ${c.notas.preco||'—'}, alcance: ${c.notas.alcance||'—'}`).join('\n\n')+`\n\nOportunidade de diferenciação:\n${s.oportunidadeDiferencial||'—'}`;
    const comCriterios = s.concorrentes.filter(c=>c.nome);
    return (
      <SummaryShell title={meta.title} n={meta.n} id={meta.id} summaryText={txt} onEdit={()=>setShowSummary(false)} onHome={()=>{patch({done:true});goHome();}}>
        <CanvasFrame label="Matriz de Análise de Concorrentes" filename="matriz-de-concorrentes">
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Concorrente</th><th>Tipo</th><th>Usabilidade</th><th>Confiança</th><th>Preço</th><th>Alcance</th><th>Oportunidade</th></tr></thead>
              <tbody>{comCriterios.map(c=>(
                <tr key={c.id}>
                  <td><strong>{c.nome}</strong><br/><span className="mini-note">{c.publicoAlvo}</span></td>
                  <td>{c.tipo}</td>
                  <td><span className="score-cell" style={{background:scoreColor(c.notas.usabilidade)}}>{c.notas.usabilidade||'—'}</span></td>
                  <td><span className="score-cell" style={{background:scoreColor(c.notas.confianca)}}>{c.notas.confianca||'—'}</span></td>
                  <td><span className="score-cell" style={{background:scoreColor(c.notas.preco)}}>{c.notas.preco||'—'}</span></td>
                  <td><span className="score-cell" style={{background:scoreColor(c.notas.alcance)}}>{c.notas.alcance||'—'}</span></td>
                  <td style={{maxWidth:'220px'}}>{c.oportunidades}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className="brief-quote" style={{marginTop:'16px'}}><span style={{display:'block',fontSize:'11px',textTransform:'uppercase',color:'var(--accent)',fontWeight:700,marginBottom:'4px'}}>Sua oportunidade de diferenciação</span>{s.oportunidadeDiferencial||'Ainda não definida.'}</div>
        </CanvasFrame>
        <CopyButton text={txt} />
      </SummaryShell>
    );
  }
  return <Screen title={meta.title} n={meta.n} stepIndex={s.step} setStepIndex={i=>patch({step:i})} steps={steps} onDone={()=>setShowSummary(true)} />;
}

/* =======================================================================
   1.6 — MAPA DE EMPATIA
   ======================================================================= */
function ArtMapaEmpatia({data,setData,goHome}){
  const defaults = {usuario:'',pensaSente:'',ouveFala:'',veFaz:'',dores:'',ganhos:'',step:0,done:false};
  const [s,patch] = useSlice(data,setData,'mapaEmpatia',defaults);
  const [showSummary,setShowSummary] = useState(!!s.done);
  const meta = ARTIFACTS.find(a=>a.id==='mapaEmpatia');

  const steps = [
    {label:'O que é o Mapa de Empatia',
     book:<>
       <p>O <strong>Mapa de Empatia</strong> é uma ferramenta visual que ajuda equipes a <strong>compreender profundamente o usuário</strong>. Ele organiza percepções e sentimentos em quadrantes, permitindo enxergar não apenas o que a pessoa faz, mas também o que <strong>pensa, sente e deseja</strong>.</p>
       <p>Seu valor está em <strong>humanizar</strong> os dados: em vez de ver apenas números ou estatísticas, entendemos a experiência do usuário como ser humano completo, com dores, frustrações e aspirações. Tradicionalmente é dividido em seis quadrantes, mas pode ser simplificado em quatro grandes áreas para iniciantes.</p>
       <p>Sempre use <strong>histórias reais</strong> coletadas em entrevistas e observações — não invente características.</p>
     </>,
     render:()=><Field label="Quem é o usuário deste mapa? (nome/persona)" value={s.usuario} onChange={v=>patch({usuario:v})} placeholder="Ex.: mãe solo em comunidade urbana (ODS 2)" />
    },
    {label:'Pensa/Sente',
     book:<p><strong>Pergunta-chave:</strong> O que ocupa a mente do usuário? Quais são suas maiores preocupações, medos, aspirações? Exemplo (ODS 2): "Será que terei comida suficiente para meus filhos esta semana?"</p>,
     render:()=><Field type="textarea" label="Pensa/Sente" value={s.pensaSente} onChange={v=>patch({pensaSente:v})} rows={3} />
    },
    {label:'Ouve/Fala',
     book:<p><strong>Pergunta-chave:</strong> O que o usuário escuta de pessoas próximas (amigos, familiares, comunidade)? O que ele expressa em conversas, redes sociais, reclamações? Exemplo (ODS 11): ouve reclamações no ponto de ônibus; comenta atrasos no trabalho.</p>,
     render:()=><Field type="textarea" label="Ouve/Fala" value={s.ouveFala} onChange={v=>patch({ouveFala:v})} rows={3} />
    },
    {label:'Vê/Faz',
     book:<p><strong>Pergunta-chave:</strong> O que ele observa em seu ambiente? Quais comportamentos são frequentes no dia a dia? Exemplo (ODS 6): vê vizinhos pegando água em baldes; participa de mutirões para limpar a rua.</p>,
     render:()=><Field type="textarea" label="Vê/Faz" value={s.veFaz} onChange={v=>patch({veFaz:v})} rows={3} />
    },
    {label:'Dores/Ganhos',
     book:<p><strong>Dores:</strong> barreiras, frustrações, limitações que atrapalham sua vida. <strong>Ganhos:</strong> desejos, necessidades e resultados esperados de uma solução.</p>,
     render:()=>(<div className="grid-2"><Field type="textarea" label="Dores" value={s.dores} onChange={v=>patch({dores:v})} rows={3} /><Field type="textarea" label="Ganhos" value={s.ganhos} onChange={v=>patch({ganhos:v})} rows={3} /></div>)
    },
  ];

  if(showSummary){
    const txt = `MAPA DE EMPATIA\nUsuário: ${s.usuario||'—'}\n\nPensa/Sente: ${s.pensaSente||'—'}\nOuve/Fala: ${s.ouveFala||'—'}\nVê/Faz: ${s.veFaz||'—'}\nDores: ${s.dores||'—'}\nGanhos: ${s.ganhos||'—'}`;
    return (
      <SummaryShell title={meta.title} n={meta.n} id={meta.id} summaryText={txt} onEdit={()=>setShowSummary(false)} onHome={()=>{patch({done:true});goHome();}}>
        <CanvasFrame label="Mapa de Empatia" filename="mapa-de-empatia">
          <div className="empathy-banner">{s.usuario || 'Usuário do mapa'}</div>
          <div className="empathy-grid">
            <div className="empathy-quad q1"><h5>💭 Pensa/Sente</h5><p>{s.pensaSente||'—'}</p></div>
            <div className="empathy-quad q2"><h5>🗣️ Ouve/Fala</h5><p>{s.ouveFala||'—'}</p></div>
            <div className="empathy-quad q3"><h5>👁️ Vê/Faz</h5><p>{s.veFaz||'—'}</p></div>
            <div className="empathy-quad q4"><h5>⚖️ Dores/Ganhos</h5>
              <div className="split">
                <div><span className="d">Dores</span><p style={{margin:'2px 0 0'}}>{s.dores||'—'}</p></div>
                <div><span className="g">Ganhos</span><p style={{margin:'2px 0 0'}}>{s.ganhos||'—'}</p></div>
              </div>
            </div>
          </div>
        </CanvasFrame>
        <div style={{marginTop:'10px'}}><CopyButton text={txt} /></div>
      </SummaryShell>
    );
  }
  return <Screen title={meta.title} n={meta.n} stepIndex={s.step} setStepIndex={i=>patch({step:i})} steps={steps} onDone={()=>setShowSummary(true)} />;
}

/* =======================================================================
   1.7 — PERSONAS
   ======================================================================= */
function ArtPersonas({data,setData,goHome}){
  const defaults = {publicoAlvo:'',personas:[{id:uid(),nome:'',idade:'',profissao:'',contexto:'',sonhos:'',dores:'',necessidades:'',frase:'',ods:''}],validado:[],step:0,done:false};
  const [s,patch] = useSlice(data,setData,'personas',defaults);
  const [showSummary,setShowSummary] = useState(!!s.done);
  const meta = ARTIFACTS.find(a=>a.id==='personas');
  function setP(i,field,val){ const next=[...s.personas]; next[i]={...next[i],[field]:val}; patch({personas:next}); }
  function addP(){ patch({personas:[...s.personas,{id:uid(),nome:'',idade:'',profissao:'',contexto:'',sonhos:'',dores:'',necessidades:'',frase:'',ods:''}]}); }
  function removeP(i){ const next=s.personas.filter((_,idx)=>idx!==i); patch({personas:next.length?next:[{id:uid(),nome:'',idade:'',profissao:'',contexto:'',sonhos:'',dores:'',necessidades:'',frase:'',ods:''}]}); }

  const steps = [
    {label:'Público-alvo × persona',
     book:<>
       <p>Uma <strong>persona</strong> é uma representação fictícia de um usuário real, construída a partir de <strong>dados coletados</strong> sobre comportamentos, necessidades, objetivos e frustrações. Ela não é um "palpite criativo", mas sim um retrato elaborado com base em pesquisas, entrevistas e observações.</p>
       <p>Enquanto o <strong>público-alvo</strong> descreve um grupo amplo de pessoas (ex.: "mulheres entre 20 e 40 anos da zona urbana"), a <strong>persona</strong> dá rosto e voz a esse grupo (ex.: "Maria, 32 anos, professora de escola pública, mãe solo, preocupada com o preço dos alimentos e com o futuro dos filhos"). Público-alvo é sobre <em>quem</em>; persona é sobre <em>como vive e o que sente</em> esse "quem".</p>
     </>,
     render:()=><Field type="textarea" label="Descreva o público-alvo (grupo amplo) do seu projeto" value={s.publicoAlvo} onChange={v=>patch({publicoAlvo:v})} placeholder='Ex.: "Agricultores familiares do semiárido nordestino, com renda de até 2 salários mínimos."' rows={2} />
    },
    {label:'Criar personas',
     book:<>
       <p>Ao criar uma persona, inclua: <strong>nome fictício</strong> (para humanizar), <strong>idade e profissão/ocupação</strong>, <strong>contexto de vida</strong> (família, ambiente, renda, localização), <strong>sonhos e desejos</strong>, <strong>dores e frustrações</strong>, <strong>necessidades e desafios</strong>, e uma <strong>frase representativa</strong> (como se fosse uma citação real).</p>
       <p>Exemplo (ODS 2 – Fome Zero): José da Silva, 45 anos, agricultor familiar em Pernambuco, renda irregular; dores: dificuldade em vender excedentes, alimentos desperdiçados; necessidades: acesso a mercados locais, apps de conexão com consumidores; frase: "Se eu pudesse vender direto ao consumidor, teria menos perda e mais renda."</p>
     </>,
     render:()=>(
       <div>
         {s.personas.map((p,i)=>(
           <div className="summary-block" key={p.id}>
             <div className="toolbar-top"><Field label="Nome fictício" value={p.nome} onChange={v=>setP(i,'nome',v)} /><button className="icon-btn" onClick={()=>removeP(i)}>×</button></div>
             <div className="grid-3">
               <Field label="Idade" value={p.idade} onChange={v=>setP(i,'idade',v)} />
               <Field label="Profissão/ocupação" value={p.profissao} onChange={v=>setP(i,'profissao',v)} />
               <SelectField label="ODS relacionado" value={p.ods} onChange={v=>setP(i,'ods',v)} options={odsOptions()} />
             </div>
             <Field type="textarea" rows={2} label="Contexto de vida (família, ambiente, renda, localização)" value={p.contexto} onChange={v=>setP(i,'contexto',v)} />
             <div className="grid-2">
               <Field type="textarea" rows={2} label="Sonhos e desejos" value={p.sonhos} onChange={v=>setP(i,'sonhos',v)} />
               <Field type="textarea" rows={2} label="Dores e frustrações" value={p.dores} onChange={v=>setP(i,'dores',v)} />
             </div>
             <Field type="textarea" rows={2} label="Necessidades e desafios" value={p.necessidades} onChange={v=>setP(i,'necessidades',v)} />
             <Field label="Frase representativa" value={p.frase} onChange={v=>setP(i,'frase',v)} placeholder='"Se eu pudesse..."' />
           </div>
         ))}
         <button className="add-row-btn" onClick={addP}>+ adicionar persona</button>
       </div>
     )
    },
    {label:'Validação',
     book:<p>Personas não são fixas; devem ser revisadas conforme novos dados surgem. Revise com a equipe e stakeholders para garantir relevância.</p>,
     render:()=><CheckGroup label="Validação" options={['Revisado com a equipe','Baseado em entrevistas/observações reais','Compartilhado com stakeholders']} values={s.validado} onChange={v=>patch({validado:v})} />
    },
  ];

  if(showSummary){
    const txt = `PERSONAS\n\nPúblico-alvo: ${s.publicoAlvo||'—'}\n\n`+s.personas.filter(p=>p.nome).map(p=>`${p.nome}, ${p.idade} anos — ${p.profissao}\nContexto: ${p.contexto}\nSonhos: ${p.sonhos}\nDores: ${p.dores}\nNecessidades: ${p.necessidades}\nFrase: "${p.frase}"\nODS: ${p.ods?odsLabel(p.ods):'—'}`).join('\n\n')+`\n\nValidação: ${s.validado.join(', ')||'—'}`;
    return (
      <SummaryShell title={meta.title} n={meta.n} id={meta.id} summaryText={txt} onEdit={()=>setShowSummary(false)} onHome={()=>{patch({done:true});goHome();}}>
        <CanvasFrame label="Cartões de Persona" filename="cartoes-de-persona">
          <div className="home-grid">
            {s.personas.filter(p=>p.nome).map(p=>{
              const pods = odsByNum(p.ods);
              return (
                <div className="persona-card" key={p.id}>
                  <div className="persona-head">
                    <div className="persona-avatar" style={pods?{background:EIXO_META[pods.eixo].color}:undefined}>{p.nome.trim()[0]||'?'}</div>
                    <div>
                      <h4>{p.nome}{p.idade?(', '+p.idade+' anos'):''}</h4>
                      <div className="sub">{p.profissao||'—'}{pods?(' · ODS '+pods.num):''}</div>
                    </div>
                  </div>
                  <div className="persona-section"><span className="lbl">Contexto</span><p>{p.contexto||'—'}</p></div>
                  <div className="grid-2">
                    <div className="persona-section"><span className="lbl">Sonhos</span><p>{p.sonhos||'—'}</p></div>
                    <div className="persona-section"><span className="lbl">Dores</span><p>{p.dores||'—'}</p></div>
                  </div>
                  <div className="persona-section"><span className="lbl">Necessidades</span><p>{p.necessidades||'—'}</p></div>
                  {p.frase && <div className="persona-quote">"{p.frase}"</div>}
                </div>
              );
            })}
          </div>
        </CanvasFrame>
        <CopyButton text={txt} />
      </SummaryShell>
    );
  }
  return <Screen title={meta.title} n={meta.n} stepIndex={s.step} setStepIndex={i=>patch({step:i})} steps={steps} onDone={()=>setShowSummary(true)} />;
}

/* =======================================================================
   1.8 — REQUISITOS E REGRAS DE NEGÓCIO INICIAIS
   ======================================================================= */
function ArtRequisitosRegras({data,setData,goHome}){
  const defaults = {funcionais:['',''],naoFuncionais:[''],normativos:[''],regras:['',''],step:0,done:false};
  const [s,patch] = useSlice(data,setData,'requisitosRegras',defaults);
  const [showSummary,setShowSummary] = useState(!!s.done);
  const meta = ARTIFACTS.find(a=>a.id==='requisitosRegras');

  const steps = [
    {label:'Requisitos funcionais',
     book:<>
       <p>Ao final da problematização, quando o problema já está definido, validado e humanizado, chega o momento de começar a traduzir descobertas em <strong>requisitos e regras de negócio</strong> — a ponte entre a compreensão do problema e a futura ideação de soluções.</p>
       <p><strong>Requisitos funcionais</strong> descrevem <strong>o que o sistema deve fazer</strong>, suas funcionalidades centrais. Exemplo (ODS 2 – Fome Zero): "O sistema deve permitir que estabelecimentos cadastrem alimentos disponíveis"; "O sistema deve enviar notificações a famílias cadastradas quando houver doações próximas."</p>
     </>,
     render:()=><ListField label="Requisitos funcionais" items={s.funcionais} onChange={v=>patch({funcionais:v})} placeholder="O sistema deve..." minRows={2} />
    },
    {label:'Requisitos não funcionais',
     book:<p><strong>Requisitos não funcionais</strong> especificam <strong>como o sistema deve se comportar</strong> em termos de desempenho, usabilidade, segurança ou escalabilidade. Exemplo (ODS 11 – Cidades Sustentáveis): "O aplicativo deve estar disponível 24h por dia, 7 dias por semana"; "O tempo de resposta para consulta de linhas de ônibus não pode exceder 2 segundos."</p>,
     render:()=><ListField label="Requisitos não funcionais" items={s.naoFuncionais} onChange={v=>patch({naoFuncionais:v})} placeholder="O sistema deve se comportar de forma..." minRows={1} />
    },
    {label:'Requisitos normativos',
     book:<p><strong>Requisitos normativos (legais/regulatórios)</strong> descrevem obrigações impostas por leis, normas técnicas ou políticas de privacidade. Exemplo (ODS 3 – Saúde): "O sistema deve respeitar a LGPD (Lei Geral de Proteção de Dados) ao coletar informações de pacientes"; "Relatórios de vacinação devem ser compatíveis com exigências do Ministério da Saúde."</p>,
     render:()=><ListField label="Requisitos normativos" items={s.normativos} onChange={v=>patch({normativos:v})} placeholder="O sistema deve respeitar/cumprir..." minRows={1} />
    },
    {label:'Regras de negócio',
     book:<>
       <p>As <strong>regras de negócio</strong> definem condições e restrições específicas do domínio em que o problema está inserido. Diferente de requisitos técnicos, elas representam <strong>políticas, normas internas ou práticas acordadas</strong> com os usuários e stakeholders.</p>
       <p>Exemplo (ODS 2 – Fome Zero): "Não é permitido cadastrar alimentos vencidos"; "Cada família pode agendar no máximo duas coletas por semana." Exemplo (ODS 8 – Trabalho Decente): "Um microcrédito não pode ultrapassar 30% da renda mensal do solicitante."</p>
       <p>Você pode coletar requisitos e regras a partir da problematização (levantamento ágil, mapas de empatia e personas), com os stakeholders (oficinas, entrevistas, priorização por valor de negócio) e com base em normas (legislações vigentes, documentação interna).</p>
     </>,
     render:()=><ListField label="Regras de negócio" items={s.regras} onChange={v=>patch({regras:v})} placeholder="Não é permitido... / Cada usuário pode..." minRows={2} />
    },
  ];

  if(showSummary){
    const txt = `REQUISITOS E REGRAS DE NEGÓCIO\n\nFuncionais:\n${s.funcionais.filter(Boolean).map(f=>'- '+f).join('\n')||'—'}\n\nNão funcionais:\n${s.naoFuncionais.filter(Boolean).map(f=>'- '+f).join('\n')||'—'}\n\nNormativos:\n${s.normativos.filter(Boolean).map(f=>'- '+f).join('\n')||'—'}\n\nRegras de negócio:\n${s.regras.filter(Boolean).map(f=>'- '+f).join('\n')||'—'}`;
    const section = (label,code,items)=>(
      <div className="spec-section">
        <h4>{label}</h4>
        {items.filter(Boolean).length ? items.filter(Boolean).map((it,i)=>(
          <div className="spec-item" key={i}><span className="spec-code">{code}{String(i+1).padStart(2,'0')}</span><p>{it}</p></div>
        )) : <p className="mini-note">Nenhum item ainda.</p>}
      </div>
    );
    return (
      <SummaryShell title={meta.title} n={meta.n} id={meta.id} summaryText={txt} onEdit={()=>setShowSummary(false)} onHome={()=>{patch({done:true});goHome();}}>
        <CanvasFrame label="Especificação Inicial" filename="especificacao-inicial">
          {section('Requisitos Funcionais','RF',s.funcionais)}
          {section('Requisitos Não Funcionais','RNF',s.naoFuncionais)}
          {section('Requisitos Normativos','RN',s.normativos)}
          {section('Regras de Negócio','RGN',s.regras)}
        </CanvasFrame>
        <div style={{marginTop:'10px'}}><CopyButton text={txt} /></div>
      </SummaryShell>
    );
  }
  return <Screen title={meta.title} n={meta.n} stepIndex={s.step} setStepIndex={i=>patch({step:i})} steps={steps} onDone={()=>setShowSummary(true)} />;
}

/* =======================================================================
   APP SHELL
   ======================================================================= */
const COMPONENT_MAP = {
  odsExplorer: ArtOdsExplorer,
  propositoSustentavel: ArtPropositoSustentavel,
  investigarProblema: ArtInvestigarProblema,
  riscosSolucao: ArtRiscosSolucao,
  levantamentoAgil: ArtLevantamentoAgil,
  referenciasPesquisa: ArtReferenciasPesquisa,
  analiseConcorrentes: ArtAnaliseConcorrentes,
  mapaEmpatia: ArtMapaEmpatia,
  personas: ArtPersonas,
  requisitosRegras: ArtRequisitosRegras,
};

function BackupPanel({data,setData}){
  const [mode,setMode] = useState(null);
  const [importText,setImportText] = useState('');
  const [importError,setImportError] = useState('');
  const [importOk,setImportOk] = useState(false);
  const [confirmReset,setConfirmReset] = useState(false);
  const fileRef = useRef(null);
  const json = useMemo(()=>JSON.stringify(data,null,2),[data]);

  useEffect(()=>{
    if(!confirmReset) return;
    const t = setTimeout(()=>setConfirmReset(false), 4000);
    return ()=>clearTimeout(t);
  },[confirmReset]);

  function applyImport(text){
    setImportError(''); setImportOk(false);
    try{
      const parsed = JSON.parse(text);
      if(!parsed || typeof parsed!=='object' || Array.isArray(parsed)) throw new Error('formato inválido');
      setData(parsed);
      setImportOk(true);
      setImportText('');
    }catch(e){
      setImportError('Não consegui ler esse arquivo/texto como um backup válido (JSON). Confira se é o arquivo exportado por aqui.');
    }
  }
  function onFilePicked(ev){
    const file = ev.target.files && ev.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=>applyImport(String(reader.result||''));
    reader.onerror = ()=>setImportError('Não consegui ler o arquivo selecionado.');
    reader.readAsText(file);
    ev.target.value = '';
  }
  function doReset(){
    if(!confirmReset){ setConfirmReset(true); return; }
    setData({});
    setConfirmReset(false);
    setMode(null);
  }

  return (
    <div className="card" style={{marginTop:'22px'}}>
      <h4 style={{marginTop:0}}>Backup dos dados</h4>
      <p className="field-hint" style={{marginTop:'-4px'}}>Seus dados ficam salvos apenas neste navegador. Exporte um backup para guardar em outro lugar ou levar para outro computador — e importe para restaurar.</p>
      <div className="btn-row" style={{flexWrap:'wrap'}}>
        <button type="button" className={"btn"+(mode==='export'?' primary':'')} aria-pressed={mode==='export'} onClick={()=>setMode(mode==='export'?null:'export')}>Exportar backup</button>
        <button type="button" className={"btn"+(mode==='import'?' primary':'')} aria-pressed={mode==='import'} onClick={()=>{setMode(mode==='import'?null:'import'); setImportError(''); setImportOk(false);}}>Importar backup</button>
        <button type="button" className={"btn"+(confirmReset?' danger':'')} onClick={doReset}>
          {confirmReset ? 'Confirmar: apagar tudo?' : 'Reiniciar tudo'}
        </button>
      </div>
      {confirmReset && <p className="field-hint" style={{color:'var(--err, #AE3227)'}}>Clique de novo para apagar todos os artefatos preenchidos. Isso não pode ser desfeito. (cancela sozinho em alguns segundos)</p>}

      {mode==='export' && (
        <div style={{marginTop:'12px'}}>
          <p className="field-hint">Copie o texto abaixo e guarde em um arquivo de texto (.json) ou em um bloco de notas.</p>
          <textarea readOnly value={json} rows={8} style={{fontFamily:'monospace',fontSize:'12px'}} onClick={e=>e.target.select()} aria-label="Backup em JSON" />
          <div style={{marginTop:'8px'}}><CopyButton text={json} label="Copiar backup" /></div>
        </div>
      )}

      {mode==='import' && (
        <div style={{marginTop:'12px'}}>
          <p className="field-hint">Envie o arquivo exportado antes, ou cole o conteúdo do backup abaixo.</p>
          <div className="btn-row">
            <button type="button" className="btn" onClick={()=>fileRef.current&&fileRef.current.click()}>Escolher arquivo…</button>
            <input ref={fileRef} type="file" accept=".json,.txt,application/json" onChange={onFilePicked} style={{display:'none'}} />
          </div>
          <textarea value={importText} onChange={e=>setImportText(e.target.value)} rows={6} placeholder="Cole aqui o conteúdo do backup (JSON)…" style={{fontFamily:'monospace',fontSize:'12px',marginTop:'8px'}} aria-label="Colar backup" />
          <div className="btn-row" style={{marginTop:'8px'}}>
            <button type="button" className="btn primary" disabled={!importText.trim()} onClick={()=>applyImport(importText)}>Restaurar deste texto</button>
          </div>
          {importError && <p className="field-hint" style={{color:'var(--err, #AE3227)'}}>{importError}</p>}
          {importOk && <p className="field-hint" style={{color:'var(--ok, #2E7D4F)'}}>Backup restaurado com sucesso.</p>}
        </div>
      )}
    </div>
  );
}

function Home({data,onOpen,setData}){
  const cap0 = ARTIFACTS.filter(a=>a.chapter===0);
  const cap1 = ARTIFACTS.filter(a=>a.chapter===1);
  const doneCount = ARTIFACTS.filter(a=>data[a.id]&&data[a.id].done).length;
  return (
    <div>
      <div className="card welcome-hero">
        <div className="eyebrow">Livro Vol. 1 · Capítulos 0 e 1</div>
        <h1 style={{fontSize:'30px'}}>Soluções Digitais para um Futuro Sustentável</h1>
        <p style={{maxWidth:'62ch'}}>Uma oficina guiada pelos Objetivos de Desenvolvimento Sustentável (ODS) da ONU: conheça os 17 ODS, escolha o do seu projeto, e construa a problematização — do enunciado do problema aos requisitos iniciais — com a explicação do livro antes de cada campo. Seu progresso fica salvo neste navegador.</p>
        <span className="progress-pill">{doneCount} de {ARTIFACTS.length} artefatos concluídos</span>
      </div>
      <div className="chapter-label">Capítulo 0 — Tecnologia com Propósito: os ODS da ONU</div>
      <div className="home-grid">
        {cap0.map(a=>(
          <div className="art-card" key={a.id} onClick={()=>onOpen(a.id)}>
            <div className="n">{a.n}</div>
            <h4>{a.icon} {a.title}</h4>
            <p>{a.blurb}</p>
            {data[a.id]&&data[a.id].done && <span className="badge success" style={{marginTop:'8px'}}>Concluído</span>}
          </div>
        ))}
      </div>
      <div className="chapter-label">Capítulo 1 — Problematização no Design de Soluções Digitais</div>
      <div className="home-grid">
        {cap1.map(a=>(
          <div className="art-card" key={a.id} onClick={()=>onOpen(a.id)}>
            <div className="n">{a.n}</div>
            <h4>{a.icon} {a.title}</h4>
            <p>{a.blurb}</p>
            {data[a.id]&&data[a.id].done && <span className="badge success" style={{marginTop:'8px'}}>Concluído</span>}
          </div>
        ))}
      </div>
      <BackupPanel data={data} setData={setData} />
    </div>
  );
}

function Sidebar({current,onOpen,onHome,data,theme,setTheme}){
  const cap0 = ARTIFACTS.filter(a=>a.chapter===0);
  const cap1 = ARTIFACTS.filter(a=>a.chapter===1);
  const doneCount = ARTIFACTS.filter(a=>data[a.id]&&data[a.id].done).length;
  function renderItem(a){
    const started = isArtifactStarted(data[a.id]);
    const done = data[a.id]&&data[a.id].done;
    return (
      <div key={a.id} className={"nav-item"+(current===a.id?' active':'')} onClick={()=>onOpen(a.id)}>
        <span className={"nav-dot"+(done?' done':(started?' progress':''))}></span>
        <span className="lbl">{a.title}</span>
      </div>
    );
  }
  return (
    <div className="sidebar">
      <div className="brand" onClick={onHome} style={{cursor:'pointer'}}>
        <div className="brand-mark">S</div>
        <div className="brand-text"><div className="k">Soluções Digitais</div><div className="t">Futuro Sustentável</div></div>
      </div>
      <span className="progress-pill">{doneCount}/{ARTIFACTS.length} concluídos</span>
      <div className="chapter-label">Cap. 0 — Tecnologia com Propósito</div>
      {cap0.map(renderItem)}
      <div className="chapter-label">Cap. 1 — Problematização</div>
      {cap1.map(renderItem)}
      <div className="theme-toggle">
        <button className={theme==='light'?'on':''} onClick={()=>setTheme('light')}>Claro</button>
        <button className={theme==='dark'?'on':''} onClick={()=>setTheme('dark')}>Escuro</button>
        <button className={theme==='system'?'on':''} onClick={()=>setTheme('system')}>Sistema</button>
      </div>
    </div>
  );
}

function App(){
  const [data,setData] = useState(()=>loadStore());
  const [current,setCurrent] = useState(null);
  const [theme,setTheme] = useState(()=>{ try{ return localStorage.getItem('atelier-ods-theme')||'system'; }catch(e){ return 'system'; } });

  useEffect(()=>{ saveStore(data); },[data]);
  useEffect(()=>{
    const root = document.documentElement;
    if(theme==='system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme',theme);
    try{ localStorage.setItem('atelier-ods-theme',theme); }catch(e){}
  },[theme]);

  const goHome = ()=>setCurrent(null);
  const ActiveComponent = current ? COMPONENT_MAP[current] : null;

  return (
    <div className="app">
      <Sidebar current={current} onOpen={setCurrent} onHome={goHome} data={data} theme={theme} setTheme={setTheme} />
      <div className="main">
        {ActiveComponent ? <ActiveComponent data={data} setData={setData} goHome={goHome} /> : <Home data={data} onOpen={setCurrent} setData={setData} />}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
