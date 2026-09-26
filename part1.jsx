
const { useState, useEffect, useMemo, useRef } = React;

function uid(){ return Math.random().toString(36).slice(2,9); }

/* ---------- persistence ---------- */
const STORAGE_KEY = 'atelier-ods-vol1';
function loadStore(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){ return {}; }
}
function saveStore(data){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }catch(e){}
}

/* ---------- shared UI atoms ---------- */
function Field({label,value,onChange,placeholder,hint,type='text',rows}){
  return (
    <div className="field">
      {label && <label className="field-label">{label}</label>}
      {type==='textarea' ? (
        <textarea value={value||''} placeholder={placeholder} rows={rows||3} onChange={e=>onChange(e.target.value)} />
      ) : (
        <input type={type} value={value||''} placeholder={placeholder} onChange={e=>onChange(e.target.value)} />
      )}
      {hint && <div className="field-hint">{hint}</div>}
    </div>
  );
}

function SelectField({label,value,onChange,options,hint}){
  return (
    <div className="field">
      {label && <label className="field-label">{label}</label>}
      <select value={value||''} onChange={e=>onChange(e.target.value)}>
        <option value="" disabled>Escolha…</option>
        {options.map(o=> typeof o==='string' ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {hint && <div className="field-hint">{hint}</div>}
    </div>
  );
}

function ListField({label,items,onChange,placeholder,hint,minRows=0}){
  const list = items && items.length ? items : (minRows>0 ? Array.from({length:minRows},()=>'') : ['']);
  function set(i,val){ const next=[...list]; next[i]=val; onChange(next); }
  function add(){ onChange([...list,'']); }
  function remove(i){ const next=list.filter((_,idx)=>idx!==i); onChange(next.length?next:['']); }
  return (
    <div className="field list-editor">
      {label && <label className="field-label">{label}</label>}
      {list.map((val,i)=>(
        <div className="row" key={i}>
          <input value={val} placeholder={placeholder} onChange={e=>set(i,e.target.value)} />
          <button type="button" className="icon-btn" onClick={()=>remove(i)} aria-label="Remover">×</button>
        </div>
      ))}
      <button type="button" className="add-row-btn" onClick={add}>+ adicionar item</button>
      {hint && <div className="field-hint">{hint}</div>}
    </div>
  );
}

function CheckGroup({label,options,values,onChange,hint}){
  const vals = values || [];
  function toggle(opt){
    if(vals.includes(opt)) onChange(vals.filter(v=>v!==opt));
    else onChange([...vals,opt]);
  }
  return (
    <div className="field">
      {label && <label className="field-label">{label}</label>}
      <div className="check-grid">
        {options.map(opt=>(
          <label className="check-item" key={opt}>
            <input type="checkbox" checked={vals.includes(opt)} onChange={()=>toggle(opt)} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      {hint && <div className="field-hint">{hint}</div>}
    </div>
  );
}

function YesNo({label,value,onChange}){
  return (
    <div className="field">
      {label && <label className="field-label">{label}</label>}
      <div className="btn-row">
        <button type="button" className={"btn"+(value===true?' primary':'')} onClick={()=>onChange(true)}>Sim</button>
        <button type="button" className={"btn"+(value===false?' primary':'')} onClick={()=>onChange(false)}>Não</button>
      </div>
    </div>
  );
}

function BookNote({children}){
  return (
    <div className="book-note">
      <div className="tag">📖 Como o livro explica</div>
      {children}
    </div>
  );
}

function CopyButton({text,label}){
  const [copied,setCopied]=useState(false);
  function doCopy(){
    const done=()=>{ setCopied(true); setTimeout(()=>setCopied(false),1600); };
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(done).catch(()=>{
        try{
          const ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select();
          document.execCommand('copy'); document.body.removeChild(ta); done();
        }catch(e){}
      });
    } else {
      try{
        const ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta); done();
      }catch(e){}
    }
  }
  return <button type="button" className="copy-btn" onClick={doCopy}>{copied? '✓ Copiado' : (label||'Copiar')}</button>;
}

/* ---------- ODS data (Capítulo 0 do livro + Apêndice A) ---------- */
const EIXO_META = {
  1:{label:'Pessoas', sub:'Foco no Bem-Estar Humano', color:'var(--error)', bg:'var(--error-bg)'},
  2:{label:'Planeta', sub:'Foco na Sustentabilidade Ambiental', color:'var(--success)', bg:'var(--success-bg)'},
  3:{label:'Prosperidade', sub:'Foco no Desenvolvimento Econômico e Inclusivo', color:'var(--accent-2)', bg:'var(--warning-bg)'},
  4:{label:'Paz e Parcerias', sub:'Foco na Governança e Colaboração', color:'var(--info)', bg:'var(--info-bg)'},
};

const ODS_LIST = [
  {num:1, eixo:1, title:'Erradicação da Pobreza',
   desc:'Busca acabar com a pobreza em todas as suas formas e em todos os lugares. Isso significa garantir que todas as pessoas tenham acesso a recursos básicos como alimentação, moradia, saneamento e serviços essenciais, além de proteção social em momentos de vulnerabilidade.',
   penseEm:'Soluções de microcrédito, plataformas de educação financeira acessível, sistemas de alerta e assistência em desastres naturais.',
   apendice:{contexto:'A pobreza envolve renda, moradia, educação e acesso a oportunidades. Soluções digitais aproximam oferta e demanda de serviços locais.', problema:'Baixa visibilidade de trabalhadores informais.', impacto:'Exclusão econômica; baixa mobilidade social.', grupos:'Pessoas desempregadas ou que sobrevivem de trabalhos informais.', solucao:'Marketplace hiperlocal de serviços. Receita: comissão por transação + destaque de perfil.'}},
  {num:2, eixo:1, title:'Fome Zero e Agricultura Sustentável',
   desc:'Visa acabar com a fome, alcançar a segurança alimentar, melhorar a nutrição e promover a agricultura sustentável. O foco é garantir que todos tenham acesso a alimentos nutritivos e suficientes, produzidos de forma que não esgote os recursos naturais.',
   penseEm:'Aplicativos para otimização de colheitas, plataformas de conexão entre pequenos produtores e consumidores, sistemas de rastreabilidade de alimentos.',
   apendice:{contexto:'Fome urbana convive com desperdício. Conectar excedentes reduz perdas e insegurança alimentar.', problema:'Baixa visibilidade de pequenos produtores e excedentes não escoados.', impacto:'Insegurança alimentar; perda de renda; emissões por descarte.', grupos:'Famílias em vulnerabilidade alimentar e pequenos agricultores familiares.', solucao:'App de troca/doação geolocalizada. Receita: plano premium para estabelecimentos + anúncios locais.'}},
  {num:3, eixo:1, title:'Saúde e Bem-Estar',
   desc:'Garante o acesso à saúde de qualidade e promove o bem-estar para todas as pessoas em todas as idades. Isso abrange desde a redução da mortalidade infantil e materna até o combate a doenças transmissíveis e não transmissíveis, além da promoção da saúde mental.',
   penseEm:'Telemedicina, prontuários eletrônicos integrados, aplicativos de monitoramento de saúde, sistemas de gestão de vacinação.',
   apendice:{contexto:'Rotinas preventivas reduzem emergências; lembretes e metas simples aumentam adesão.', problema:'Esquecimento de medicação e hábitos saudáveis.', impacto:'Agravamento de doenças; custos hospitalares.', grupos:'Idosos e trabalhadores informais sem rotina de saúde organizada.', solucao:'App de rotina saudável (água, pausas, remédios). Receita: freemium + remoção de anúncios.'}},
  {num:4, eixo:1, title:'Educação de Qualidade',
   desc:'Assegura a educação inclusiva, equitativa e de qualidade, promovendo oportunidades de aprendizado ao longo da vida para todos. Isso vai da primeira infância até o ensino superior e a formação profissional, buscando eliminar barreiras de acesso e garantir o desenvolvimento de habilidades relevantes.',
   penseEm:'Plataformas de ensino a distância (EAD), recursos educacionais abertos (REAs), ferramentas de aprendizado adaptativo, gamificação na educação.',
   apendice:{contexto:'Aprendizagem melhora com feedback e engajamento; quizzes gamificados ajudam.', problema:'Acesso desigual e baixa motivação.', impacto:'Evasão; desempenho desigual.', grupos:'Estudantes com déficit educacional e professores de escolas públicas.', solucao:'Plataforma de quizzes com ranking. Receita: plano escola (relatórios) + patrocínio local.'}},
  {num:5, eixo:1, title:'Igualdade de Gênero',
   desc:'Busca alcançar a igualdade de gênero e empoderar todas as mulheres e meninas. Isso implica eliminar todas as formas de discriminação e violência contra elas, garantindo participação plena e efetiva em todas as esferas da sociedade.',
   penseEm:'Plataformas de denúncia de assédio e violência, ferramentas para promover a igualdade salarial, redes de apoio para mulheres empreendedoras.',
   apendice:{contexto:'Redes de apoio e visibilidade reduzem barreiras na carreira e aumentam segurança.', problema:'Barreiras de entrada e risco de violência.', impacto:'Misoginia; dependência econômica.', grupos:'Mulheres em situação de vulnerabilidade social ou profissional.', solucao:'Rede de mentoria e vagas para mulheres. Receita: vagas patrocinadas + cursos pagos.'}},
  {num:6, eixo:1, title:'Água Potável e Saneamento',
   desc:'Garante a disponibilidade e a gestão sustentável da água e saneamento para todos. O objetivo é assegurar o acesso à água potável, segura e acessível, e a serviços de saneamento adequados, combatendo a escassez e a poluição.',
   penseEm:'Sistemas de monitoramento de qualidade da água, aplicativos para gestão de consumo, tecnologias de tratamento e reutilização de água.',
   apendice:{contexto:'Metas e dicas reduzem consumo doméstico e contas.', problema:'Mal uso da água no mundo.', impacto:'Escassez; custos elevados.', grupos:'Famílias em comunidades com acesso limitado a saneamento.', solucao:'App de registro do hidrômetro com metas/alertas. Receita: premium + parceiros (encanadores/lojas).'}},
  {num:7, eixo:2, title:'Energia Limpa e Acessível',
   desc:'Assegura o acesso universal a fontes de energia confiáveis, sustentáveis e modernas, a preços acessíveis. Promove o uso de energias renováveis (solar, eólica, etc.) e a eficiência energética.',
   penseEm:'Plataformas de gestão de consumo de energia, aplicativos para otimização de sistemas solares, sistemas de monitoramento de redes inteligentes.',
   apendice:{contexto:'O acesso a energia confiável e limpa é essencial para qualidade de vida e desenvolvimento econômico. A eficiência energética reduz custos e o impacto ambiental.', problema:'Desperdício de energia por desconhecimento.', impacto:'Contas altas; emissões desnecessárias.', grupos:'Famílias de baixa renda e pequenos empreendedores.', solucao:'Calculadora de economia (LED/solar). Receita: afiliados + versão PRO com simulações.'}},
  {num:13, eixo:2, title:'Ação Contra a Mudança Global do Clima',
   desc:'Adota medidas urgentes para combater a mudança do clima e seus impactos. Isso envolve promover a adaptação, a mitigação dos efeitos do aquecimento global e a conscientização sobre os riscos climáticos.',
   penseEm:'Ferramentas de modelagem climática, plataformas de monitoramento de emissões de carbono, aplicativos de alerta de eventos climáticos extremos.',
   apendice:{contexto:'A mudança climática é o maior desafio do século. Ações locais podem reduzir emissões.', problema:'Desconhecimento da própria pegada de carbono.', impacto:'Emissões evitáveis; baixo engajamento.', grupos:'Jovens conscientes e trabalhadores urbanos.', solucao:'Calculadora de CO₂ com gamificação. Receita: plano PRO + parcerias com marcas verdes.'}},
  {num:14, eixo:2, title:'Vida na Água',
   desc:'Conserva e usa de forma sustentável os oceanos, os mares e os recursos marinhos para o desenvolvimento sustentável. O foco é combater a poluição marinha, proteger os ecossistemas aquáticos e promover o uso sustentável dos recursos pesqueiros.',
   penseEm:'Sistemas de monitoramento da poluição oceânica, aplicativos para rastreamento de embarcações, plataformas para gestão de áreas marinhas protegidas.',
   apendice:{contexto:'A saúde dos oceanos é vital para a biodiversidade e a economia.', problema:'Poluição plástica.', impacto:'Mortalidade marinha; risco à pesca.', grupos:'Comunidades ribeirinhas e pescadores.', solucao:'Jogo educativo + mapa de coleta. Receita: anúncios educativos + patrocínios.'}},
  {num:15, eixo:2, title:'Vida Terrestre',
   desc:'Protege, restaura e promove o uso sustentável dos ecossistemas terrestres. Isso inclui gerenciar florestas de forma sustentável, combater a desertificação, reverter a degradação da terra e interromper a perda de biodiversidade.',
   penseEm:'Sistemas de monitoramento de desmatamento por satélite, aplicativos para identificação de espécies, plataformas de gestão de áreas de conservação.',
   apendice:{contexto:'A preservação da biodiversidade protege o equilíbrio dos ecossistemas.', problema:'Baixo monitoramento do reflorestamento.', impacto:'Perda de biodiversidade; ilhas de calor.', grupos:'Moradores urbanos e estudantes de biologia.', solucao:'Registro geolocalizado de árvores. Receita: parcerias com viveiros + clube de apoiadores.'}},
  {num:8, eixo:3, title:'Trabalho Decente e Crescimento Econômico',
   desc:'Promove o crescimento econômico sustentado, inclusivo e sustentável, o emprego pleno e produtivo e o trabalho decente para todos. Busca proteger os direitos dos trabalhadores e garantir condições seguras e justas.',
   penseEm:'Plataformas de busca de emprego com foco em trabalho decente, sistemas de gestão de compliance trabalhista, ferramentas de educação profissional continuada.',
   apendice:{contexto:'A geração de renda digna exige inclusão produtiva. A digitalização de serviços permite maior alcance e oportunidades.', problema:'Baixa visibilidade de autônomos.', impacto:'Renda instável; desemprego.', grupos:'Trabalhadores autônomos e microempreendedores.', solucao:'Construtor de portfólios com templates. Receita: assinatura premium (domínio/analytics).'}},
  {num:9, eixo:3, title:'Indústria, Inovação e Infraestrutura',
   desc:'Constrói infraestruturas resilientes, promove a industrialização inclusiva e sustentável e fomenta a inovação. O objetivo é desenvolver infraestruturas de qualidade, confiáveis e sustentáveis que apoiem o desenvolvimento econômico e o bem-estar humano.',
   penseEm:'Plataformas de gestão de projetos de infraestrutura, ferramentas para otimização de cadeias de suprimentos, ecossistemas de inovação aberta.',
   apendice:{contexto:'A inovação local precisa de vitrine e rede de colaboração. Plataformas digitais fortalecem o ecossistema.', problema:'Ideias sem conexão com parceiros.', impacto:'Baixa inovação aplicada; oportunidades perdidas.', grupos:'Estudantes e pequenos inventores locais.', solucao:'Rede de desafios/soluções com votação. Receita: destaque pago + parcerias locais.'}},
  {num:11, eixo:3, title:'Cidades e Comunidades Sustentáveis',
   desc:'Torna as cidades e os assentamentos humanos inclusivos, seguros, resilientes e sustentáveis. Garante acesso a moradia segura e acessível, transporte público eficiente e áreas verdes.',
   penseEm:'Aplicativos de mobilidade urbana, sistemas de gestão inteligente de tráfego, plataformas de participação cidadã em planejamento urbano.',
   apendice:{contexto:'Mobilidade urbana sustentável melhora a qualidade de vida e reduz emissões.', problema:'Transporte irregular e caro.', impacto:'Poluição; perda de tempo.', grupos:'Moradores de bairros periféricos.', solucao:'Caronas comunitárias com verificação local. Receita: plano premium para motoristas + anúncios do bairro.'}},
  {num:12, eixo:3, title:'Consumo e Produção Responsáveis',
   desc:'Garante padrões de produção e de consumo sustentáveis. Incentiva a eficiência no uso de recursos, a redução do desperdício, a reciclagem e a reutilização.',
   penseEm:'Aplicativos de gestão de resíduos, plataformas de economia circular, ferramentas de rastreabilidade de produtos para verificar sua origem sustentável.',
   apendice:{contexto:'O consumo consciente fortalece a sustentabilidade econômica e ambiental.', problema:'Itens pouco usados viram lixo.', impacto:'Aumento de resíduos; consumo excessivo.', grupos:'Famílias urbanas de classe média.', solucao:'App de empréstimo/troca entre vizinhos. Receita: assinatura premium + destaque de itens.'}},
  {num:10, eixo:4, title:'Redução das Desigualdades',
   desc:'Reduz a desigualdade dentro dos países e entre eles. Promove políticas inclusivas e equitativas que combatam a discriminação e garantam oportunidades iguais para todos, independentemente de raça, gênero, religião, orientação sexual ou condição socioeconômica.',
   penseEm:'Plataformas de inclusão digital, ferramentas de combate à discriminação, sistemas de monitoramento de disparidades sociais.',
   apendice:{contexto:'A desigualdade social e digital aumenta barreiras de acesso a serviços e direitos.', problema:'Informação dispersa sobre serviços acessíveis.', impacto:'Menor participação social; ampliação da exclusão.', grupos:'Pessoas com deficiência e populações periféricas.', solucao:'Guia de serviços inclusivos por região. Receita: anúncios segmentados + destaque para estabelecimentos.'}},
  {num:16, eixo:4, title:'Paz, Justiça e Instituições Eficazes',
   desc:'Promove sociedades pacíficas e inclusivas para o desenvolvimento sustentável. Proporciona acesso à justiça para todos e constrói instituições eficazes, responsáveis e inclusivas em todos os níveis, combatendo a corrupção e a violência.',
   penseEm:'Plataformas de transparência governamental, sistemas de acesso à informação pública, ferramentas para facilitar a participação cívica.',
   apendice:{contexto:'A participação cidadã fortalece a democracia e aumenta a confiança nas instituições.', problema:'Baixa participação comunitária.', impacto:'Desinformação; descrédito institucional.', grupos:'Moradores de comunidades locais.', solucao:'Plataforma de votação cidadã. Receita: planos para ONGs + destaque de propostas.'}},
  {num:17, eixo:4, title:'Parcerias e Meios de Implementação',
   desc:'Fortalece os meios de implementação e revitaliza a parceria global para o desenvolvimento sustentável. Promove a cooperação internacional, o financiamento, a transferência de tecnologia e o compartilhamento de conhecimento para alcançar todos os outros objetivos.',
   penseEm:'Plataformas de crowdfunding para projetos sociais, sistemas de gestão de parcerias público-privadas, redes de colaboração para o intercâmbio de conhecimento tecnológico.',
   apendice:{contexto:'A cooperação é a base para que todas as ODS sejam alcançadas. Plataformas digitais aproximam projetos, voluntários e empresas.', problema:'Iniciativas desconectadas e duplicadas.', impacto:'Perda de eficiência; baixa captação de apoio.', grupos:'ONGs, voluntários e pequenas empresas.', solucao:'Plataforma-ponte com matching por causa/competência. Receita: assinatura para ONGs/empresas + vitrines patrocinadas.'}},
];

function odsByNum(n){ return ODS_LIST.find(o=>String(o.num)===String(n)); }
function odsOptions(){ return ODS_LIST.map(o=>({value:String(o.num), label:'ODS '+o.num+' — '+o.title})); }
function odsLabel(n){ const o=odsByNum(n); return o? ('ODS '+o.num+' — '+o.title) : ''; }

function OdsCard({ods}){
  const meta = EIXO_META[ods.eixo];
  return (
    <div className="ods-card" style={{borderLeftColor:meta.color}}>
      <div className="ods-card-head">
        <div className="ods-num" style={{background:meta.color}}>{ods.num}</div>
        <div>
          <div className="mini-note" style={{color:meta.color,fontWeight:700,textTransform:'uppercase',letterSpacing:'.04em',fontSize:'11px'}}>{meta.label}</div>
          <h4 style={{margin:'2px 0 0'}}>{ods.title}</h4>
        </div>
      </div>
      <p style={{fontSize:'13.5px'}}>{ods.desc}</p>
      <p className="mini-note"><strong>Pense em:</strong> {ods.penseEm}</p>
      <div className="ods-apendice">
        <div className="mini-note" style={{fontWeight:700,color:'var(--ink)'}}>Exemplo de projeto (Apêndice A)</div>
        <p className="mini-note"><strong>Contexto:</strong> {ods.apendice.contexto}</p>
        <p className="mini-note"><strong>Problema:</strong> {ods.apendice.problema}</p>
        <p className="mini-note"><strong>Impacto:</strong> {ods.apendice.impacto}</p>
        <p className="mini-note"><strong>Grupos de interesse:</strong> {ods.apendice.grupos}</p>
        <p className="mini-note"><strong>Ex. de solução digital:</strong> {ods.apendice.solucao}</p>
      </div>
    </div>
  );
}

/* ---------- artifact registry ---------- */
const ARTIFACTS = [
  {id:'odsExplorer', chapter:0, n:'0.1–0.2', title:'Os 17 ODS e os 4 Eixos', icon:'🌍', blurb:'Explore os Objetivos de Desenvolvimento Sustentável da ONU e exemplos de projetos digitais para cada um.'},
  {id:'propositoSustentavel', chapter:0, n:'0.3–0.8', title:'Tecnologia com Propósito', icon:'🎯', blurb:'Escolha o ODS do seu projeto, pesquise dados reais e avalie se ele é sustentável, escalável e viável.'},
  {id:'investigarProblema', chapter:1, n:'1.1', title:'Investigar o Problema', icon:'🔍', blurb:'Contexto, atores, causas, impactos e indicadores até o enunciado do problema.'},
  {id:'riscosSolucao', chapter:1, n:'1.2', title:'Riscos de Criar Sem Entender', icon:'⚠️', blurb:'Um raio-x da sua ideia contra os 6 erros mais comuns de quem pula a problematização.'},
  {id:'levantamentoAgil', chapter:1, n:'1.3', title:'Levantamento Ágil do Problema', icon:'🏃', blurb:'Design Thinking, Lean Inception, User Story Mapping e JTBD aplicados ao seu problema.'},
  {id:'referenciasPesquisa', chapter:1, n:'1.4', title:'Referências de Pesquisa', icon:'📊', blurb:'Dados e estatísticas que comprovam que seu problema é real e relevante.'},
  {id:'analiseConcorrentes', chapter:1, n:'1.5', title:'Análise de Concorrentes', icon:'🕵️', blurb:'Benchmarking: quem já tentou resolver esse problema, e o que você pode aprender.'},
  {id:'mapaEmpatia', chapter:1, n:'1.6', title:'Mapa de Empatia', icon:'🧠', blurb:'O que seu usuário pensa, sente, ouve, vê, e quais são suas dores e ganhos.'},
  {id:'personas', chapter:1, n:'1.7', title:'Personas', icon:'👤', blurb:'Dê nome e rosto ao seu público-alvo, com base em dados reais.'},
  {id:'requisitosRegras', chapter:1, n:'1.8', title:'Requisitos e Regras de Negócio', icon:'📋', blurb:'Traduza a problematização em requisitos funcionais, não funcionais, normativos e regras de negócio.'},
];

function isArtifactStarted(slice){
  if(!slice) return false;
  return JSON.stringify(slice).length > 20;
}

/* ---------- Screen shell (stepper + book note + nav) ---------- */
function Screen({title,n,stepIndex,setStepIndex,steps,onDone,doneLabel}){
  const total = steps.length;
  const step = steps[stepIndex];
  return (
    <div>
      <div className="card">
        <div className="toolbar-top">
          <div>
            <div className="eyebrow">{n} · {title}</div>
            <h2 style={{fontSize:'22px',marginBottom:0}}>{step.label}</h2>
          </div>
          <div className="step-count">Passo {stepIndex+1} de {total}</div>
        </div>
        <div className="stepper">
          {steps.map((s,i)=>(
            <div key={i} className={"step-dot"+(i===stepIndex?' active':'')+(i<stepIndex?' done':'')} onClick={()=>setStepIndex(i)}>
              <span className="num">{i+1}</span>{s.label}
            </div>
          ))}
        </div>
        {step.book && <BookNote>{step.book}</BookNote>}
        <div>{step.render()}</div>
        <div className="nav-row">
          <button className="btn ghost" disabled={stepIndex===0} onClick={()=>setStepIndex(stepIndex-1)}>← Voltar</button>
          {stepIndex<total-1 ? (
            <button className="btn primary" onClick={()=>setStepIndex(stepIndex+1)}>Avançar →</button>
          ) : (
            <button className="btn primary" onClick={onDone}>{doneLabel||'Ver resumo'}</button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- slice helper ---------- */
function useSlice(data,setData,id,defaults){
  const slice = data[id] || defaults;
  function patch(p){
    setData(prev=>{
      const cur = prev[id] || defaults;
      const nextSlice = typeof p==='function' ? p(cur) : {...cur, ...p};
      return {...prev, [id]: nextSlice};
    });
  }
  return [slice, patch];
}

function SummaryShell({title,n,summaryText,onEdit,onHome,children}){
  return (
    <div className="card">
      <div className="toolbar-top">
        <div>
          <div className="eyebrow">{n} · {title}</div>
          <h2 style={{fontSize:'22px',marginBottom:0}}>Resumo do artefato</h2>
        </div>
        <div className="top-actions">
          <button className="btn" onClick={onEdit}>✎ Editar</button>
          <button className="btn primary" onClick={onHome}>Concluir e voltar</button>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
