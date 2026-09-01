// EXERCÍCIO 1 – Frete com múltiplos pedidos
let pedidosListaEx1 = [];

function calcularResEx1() {
    let codigo = document.getElementById("codigo")
    let regiao = document.getElementById("regiao");
    let km = document.getElementById("km");
    let qt = document.getElementById("qt");
    let rast = document.getElementById("rast")
    let litro = document.getElementById("litro")

    let codigox = Number(codigo.value);
    let regiaox = Number(regiao.value);
    let kmx = Number(km.value);
    let qtx = Number(qt.value);
    let rasty = Number(rast.value);
    let litrox = Number(litro.value);

    let codigoValido = 0
    while (codigoValido==0){
        let existe = pedidosListaEx1.some(p => p.codigo == codigox)
        if (existe){
            let novoCodigo = prompt('Esse código já foi usado! Digite outro código:')
            codigox = Number(novoCodigo)
        } else {
            codigoValido = 1
        }
    }

    let preco=0
    let valida = 0
    while (valida==0){
        switch (regiaox){
            case 1:
                preco = qtx * 1.20
                valida = 1
                break;
            case 2:
                preco = qtx * 1.30
                valida = 1
                break;
            case 3:
                preco = qtx * 1.5
                valida = 1
                break;
            default:
                let novaRegiao = prompt('DIGITE UM NUMERO CORRESPONDENTE (1, 2 ou 3)')
                regiaox = Number(novaRegiao)
        }
    }
    
    let gasolina = kmx * litrox;
    let excedente = 0
    if (qtx > 1000){
        excedente = (((qtx - 1000) * (preco/qtx)) / 100) * 12
    }
    
    let total = preco - excedente + gasolina

    let rastValido = 0
    while (rastValido==0){
        switch (rasty){
            case 1:
                total += 200
                rastValido = 1
                break;
            case 2:
                total = total
                rastValido = 1
                break;
            default:
                let novoRast = prompt('DIGITE UM NUMERO CORRESPONDENTE (1 ou 2)')
                rasty = Number(novoRast)
        }
    }

    pedidosListaEx1.push({
        codigo: codigox,
        regiao: regiaox,
        total: total
    });

    textoResultado.innerText = "Pedido " + codigox + " adicionado! Valor total: R$ " + total.toFixed(2);

    let item = document.createElement("li");
    item.innerText = "Pedido " + codigox + " — R$ " + total.toFixed(2);
    listaPedidos.appendChild(item);

    codigo.value = "";
    regiao.value = "";
    km.value = "";
    qt.value = "";
    rast.value = "";
}

function gerarRelatorioEx1() {
    if (pedidosListaEx1.length === 0) {
        textoResultado.innerText = "Nenhum pedido foi cadastrado ainda.";
        return;
    }

    let totalPedidos = pedidosListaEx1.length;
    let somaTotal = 0;
    let totalRegiao1 = 0;
    let totalRegiao2 = 0;
    let totalRegiao3 = 0;

    let pedidoMaisCaro = pedidosListaEx1[0];
    let pedidoMaisBarato = pedidosListaEx1[0];

    for (let i = 0; i < pedidosListaEx1.length; i++) {
        let p = pedidosListaEx1[i];
        somaTotal += p.total;

        if (p.regiao == 1) totalRegiao1 += p.total;
        if (p.regiao == 2) totalRegiao2 += p.total;
        if (p.regiao == 3) totalRegiao3 += p.total;

        if (p.total > pedidoMaisCaro.total) pedidoMaisCaro = p;
        if (p.total < pedidoMaisBarato.total) pedidoMaisBarato = p;
    }

    let valorMedio = somaTotal / totalPedidos;

    textoResultado.innerHTML = `
        <h3>Relatório Final</h3>
        <p><span>Número total de pedidos:</span> ${totalPedidos}</p>
        <p><span>Valor médio pago por pedido:</span> R$ ${valorMedio.toFixed(2)}</p>
        <p><span>Total acumulado - Sudeste:</span> R$ ${totalRegiao1.toFixed(2)}</p>
        <p><span>Total acumulado - Sul:</span> R$ ${totalRegiao2.toFixed(2)}</p>
        <p><span>Total acumulado - Centro-Oeste:</span> R$ ${totalRegiao3.toFixed(2)}</p>
        <p><span>Pedido mais caro:</span> código ${pedidoMaisCaro.codigo} — R$ ${pedidoMaisCaro.total.toFixed(2)}</p>
        <p><span>Pedido mais barato:</span> código ${pedidoMaisBarato.codigo} — R$ ${pedidoMaisBarato.total.toFixed(2)}</p>
    `;
}


// EXERCÍCIO 2 – Folha de pagamento com bônus de desempenho
let funcionariosListaEx2 = [];

function calcularResEx2() {
    let codigo = document.getElementById("codigo")
    let horas = document.getElementById("horas")
    let categoria = document.getElementById("categoria")
    let turno = document.getElementById("turno")
    let nota = document.getElementById("nota")
    let salMin = document.getElementById("salMin")

    let codigox = Number(codigo.value);
    let horasx = Number(horas.value);
    let categoriax = categoria.value.trim().toUpperCase();
    let turnox = turno.value.trim().toUpperCase();
    let notax = Number(nota.value);
    let salMinx = Number(salMin.value);

    let codigoValido = 0
    while (codigoValido==0){
        let existe = funcionariosListaEx2.some(f => f.codigo == codigox)
        if (existe){
            let novoCodigo = prompt('Esse código já foi usado! Digite outro código:')
            codigox = Number(novoCodigo)
        } else {
            codigoValido = 1
        }
    }

    let categoriaValida = 0
    while (categoriaValida==0){
        switch (categoriax){
            case 'F':
                categoriaValida = 1
                break;
            case 'G':
                categoriaValida = 1
                break;
            default:
                let novaCategoria = prompt('DIGITE UMA CATEGORIA VÁLIDA (F - Operacional ou G - Gerente)')
                categoriax = novaCategoria.trim().toUpperCase()
        }
    }

    let turnoValido = 0
    while (turnoValido==0){
        switch (turnox){
            case 'M':
                turnoValido = 1
                break;
            case 'V':
                turnoValido = 1
                break;
            case 'N':
                turnoValido = 1
                break;
            default:
                let novoTurno = prompt('DIGITE UM TURNO VÁLIDO (M - Matutino, V - Vespertino, N - Noturno)')
                turnox = novoTurno.trim().toUpperCase()
        }
    }

    let notaValida = 0
    while (notaValida==0){
        if (notax >= 0 && notax <= 10){
            notaValida = 1
        } else {
            let novaNota = prompt('DIGITE UMA NOTA VÁLIDA (entre 0 e 10)')
            notax = Number(novaNota)
        }
    }

    let percHora = 0
    switch (categoriax){
        case 'F':
            switch (turnox){
                case 'M': percHora = 0.10; break;
                case 'V': percHora = 0.15; break;
                case 'N': percHora = 0.20; break;
            }
            break;
        case 'G':
            switch (turnox){
                case 'M': percHora = 0.30; break;
                case 'V': percHora = 0.35; break;
                case 'N': percHora = 0.40; break;
            }
            break;
    }

    let valorHora = percHora * salMinx
    let salarioInicial = horasx * valorHora

    let auxilio = 0
    if (salarioInicial <= 800){
        auxilio = salarioInicial * 0.25
    } else if (salarioInicial <= 1200){
        auxilio = salarioInicial * 0.20
    } else {
        auxilio = salarioInicial * 0.15
    }

    let bonus = 0
    let faixaBonus = "0%"
    if (notax >= 9){
        bonus = salarioInicial * 0.10
        faixaBonus = "10%"
    } else if (notax >= 7){
        bonus = salarioInicial * 0.05
        faixaBonus = "5%"
    } else if (notax >= 5){
        bonus = salarioInicial * 0.02
        faixaBonus = "2%"
    } else {
        bonus = 0
        faixaBonus = "0%"
    }

    let salarioFinal = salarioInicial + auxilio + bonus

    funcionariosListaEx2.push({
        codigo: codigox,
        categoria: categoriax,
        turno: turnox,
        nota: notax,
        salarioFinal: salarioFinal,
        faixaBonus: faixaBonus
    });

    textoResultado.innerText = "Funcionário " + codigox + " adicionado! Salário final: R$ " + salarioFinal.toFixed(2);

    let item = document.createElement("li");
    item.innerText = "Funcionário " + codigox + " (" + categoriax + "/" + turnox + ") — R$ " + salarioFinal.toFixed(2);
    listaPedidos.appendChild(item);

    codigo.value = "";
    horas.value = "";
    categoria.value = "";
    turno.value = "";
    nota.value = "";
}

function gerarRelatorioEx2() {
    if (funcionariosListaEx2.length === 0) {
        textoResultado.innerText = "Nenhum funcionário foi cadastrado ainda.";
        return;
    }

    let totalFuncionarios = funcionariosListaEx2.length;
    let somaTotal = 0;
    let somaF = 0, qtdF = 0;
    let somaG = 0, qtdG = 0;
    let qtdBonus10 = 0, qtdBonus5 = 0, qtdBonus2 = 0, qtdBonus0 = 0;

    let maiorSalario = funcionariosListaEx2[0];
    let menorSalario = funcionariosListaEx2[0];

    for (let i = 0; i < funcionariosListaEx2.length; i++) {
        let f = funcionariosListaEx2[i];
        somaTotal += f.salarioFinal;

        if (f.categoria == 'F'){ somaF += f.salarioFinal; qtdF++; }
        if (f.categoria == 'G'){ somaG += f.salarioFinal; qtdG++; }

        if (f.faixaBonus == "10%") qtdBonus10++;
        if (f.faixaBonus == "5%") qtdBonus5++;
        if (f.faixaBonus == "2%") qtdBonus2++;
        if (f.faixaBonus == "0%") qtdBonus0++;

        if (f.salarioFinal > maiorSalario.salarioFinal) maiorSalario = f;
        if (f.salarioFinal < menorSalario.salarioFinal) menorSalario = f;
    }

    let mediaGeral = somaTotal / totalFuncionarios;
    let mediaF = qtdF > 0 ? somaF / qtdF : 0;
    let mediaG = qtdG > 0 ? somaG / qtdG : 0;

    textoResultado.innerHTML = `
        <h3>Relatório Final</h3>
        <p><span>Total de funcionários cadastrados:</span> ${totalFuncionarios}</p>
        <p><span>Média salarial geral:</span> R$ ${mediaGeral.toFixed(2)}</p>
        <p><span>Média salarial - Operacionais (F):</span> R$ ${mediaF.toFixed(2)}</p>
        <p><span>Média salarial - Gerentes (G):</span> R$ ${mediaG.toFixed(2)}</p>
        <p><span>Maior salário final:</span> código ${maiorSalario.codigo} (${maiorSalario.categoria}/${maiorSalario.turno}) — R$ ${maiorSalario.salarioFinal.toFixed(2)}</p>
        <p><span>Menor salário final:</span> código ${menorSalario.codigo} (${menorSalario.categoria}/${menorSalario.turno}) — R$ ${menorSalario.salarioFinal.toFixed(2)}</p>
        <h4>Distribuição de bônus</h4>
        <p><span>Bônus de 10%:</span> ${qtdBonus10} funcionário(s)</p>
        <p><span>Bônus de 5%:</span> ${qtdBonus5} funcionário(s)</p>
        <p><span>Bônus de 2%:</span> ${qtdBonus2} funcionário(s)</p>
        <p><span>Sem bônus:</span> ${qtdBonus0} funcionário(s)</p>
    `;
}



// EXERCÍCIO 3 – Controle de produção e estoque
let ordensListaEx3 = [];

function calcularResEx3() {
    let codigo = document.getElementById("codigo")
    let codProduto = document.getElementById("codProduto")
    let tipo = document.getElementById("tipo");
    let qt = document.getElementById("qt")
    let custoBase = document.getElementById("custoBase")
    let estoqueInicial = document.getElementById("estoqueInicial")

    let codigox = Number(codigo.value);
    let codProdutox = codProduto.value.trim();
    let tipox = Number(tipo.value);
    let qtx = Number(qt.value);
    let custoBasex = Number(custoBase.value);
    let estoqueInicialx = Number(estoqueInicial.value);

    let codigoValido = 0
    while (codigoValido==0){
        let existe = ordensListaEx3.some(o => o.codigo == codigox)
        if (existe){
            let novoCodigo = prompt('Esse código de ordem já foi usado! Digite outro código:')
            codigox = Number(novoCodigo)
        } else {
            codigoValido = 1
        }
    }

    let custoUnitario = 0
    let nomeTipo = ""
    let valida = 0
    while (valida==0){
        switch (tipox){
            case 1:
                custoUnitario = custoBasex
                nomeTipo = "Padrão"
                valida = 1
                break;
            case 2:
                custoUnitario = custoBasex * 1.10
                nomeTipo = "Premium"
                valida = 1
                break;
            case 3:
                custoUnitario = custoBasex * 1.20
                nomeTipo = "Sob encomenda"
                valida = 1
                break;
            default:
                let novoTipo = prompt('DIGITE UM TIPO VÁLIDO (1-Padrão, 2-Premium, 3-Sob encomenda)')
                tipox = Number(novoTipo)
        }
    }

    let estoqueFinal = estoqueInicialx + qtx
    let custoTotal = qtx * custoUnitario

    let alerta = "Normal"
    if (estoqueFinal > 5000){
        alerta = "Alto"
    } else if (estoqueFinal < 500){
        alerta = "Crítico"
    }

    ordensListaEx3.push({
        codigo: codigox,
        codProduto: codProdutox,
        tipo: nomeTipo,
        estoqueFinal: estoqueFinal,
        custoTotal: custoTotal,
        alerta: alerta
    });

    textoResultado.innerText = "Ordem " + codigox + " adicionada! Custo total: R$ " + custoTotal.toFixed(2);

    let item = document.createElement("li");
    let alertaTexto = alerta == "Normal" ? "" : (" — ⚠ Estoque " + alerta);
    item.innerText = "Ordem " + codigox + " (Produto " + codProdutox + ", " + nomeTipo + ") — R$ " + custoTotal.toFixed(2) + alertaTexto;
    listaPedidos.appendChild(item);

    codigo.value = "";
    codProduto.value = "";
    tipo.value = "";
    qt.value = "";
    custoBase.value = "";
    estoqueInicial.value = "";
}

function gerarRelatorioEx3() {
    if (ordensListaEx3.length === 0) {
        textoResultado.innerText = "Nenhuma ordem foi cadastrada ainda.";
        return;
    }

    let totalOrdens = ordensListaEx3.length;
    let somaCustoTotal = 0;
    let estoquePorTipo = { "Padrão": 0, "Premium": 0, "Sob encomenda": 0 };
    let qtdAlertaAlto = 0;
    let qtdAlertaCritico = 0;

    let ordemMaiorCusto = ordensListaEx3[0];
    let ordemMenorCusto = ordensListaEx3[0];

    let produtos = {};

    for (let i = 0; i < ordensListaEx3.length; i++) {
        let o = ordensListaEx3[i];
        somaCustoTotal += o.custoTotal;
        estoquePorTipo[o.tipo] += o.estoqueFinal;

        if (o.alerta == "Alto") qtdAlertaAlto++;
        if (o.alerta == "Crítico") qtdAlertaCritico++;

        if (o.custoTotal > ordemMaiorCusto.custoTotal) ordemMaiorCusto = o;
        if (o.custoTotal < ordemMenorCusto.custoTotal) ordemMenorCusto = o;

        if (!produtos[o.codProduto]) {
            produtos[o.codProduto] = { estoque: 0, investido: 0 };
        }
        produtos[o.codProduto].estoque += o.estoqueFinal;
        produtos[o.codProduto].investido += o.custoTotal;
    }

    let mediaCusto = somaCustoTotal / totalOrdens;

    let htmlProdutos = "";
    for (let codProd in produtos) {
        htmlProdutos += `<p><span>Produto ${codProd}:</span> estoque ${produtos[codProd].estoque} — R$ ${produtos[codProd].investido.toFixed(2)} investido</p>`;
    }

    textoResultado.innerHTML = `
        <h3>Relatório Final</h3>
        <p><span>Total de ordens registradas:</span> ${totalOrdens}</p>
        <p><span>Estoque final - Padrão:</span> ${estoquePorTipo["Padrão"]}</p>
        <p><span>Estoque final - Premium:</span> ${estoquePorTipo["Premium"]}</p>
        <p><span>Estoque final - Sob encomenda:</span> ${estoquePorTipo["Sob encomenda"]}</p>
        <p><span>Média de custo total por ordem:</span> R$ ${mediaCusto.toFixed(2)}</p>
        <p><span>Ordem com maior custo total:</span> código ${ordemMaiorCusto.codigo} — R$ ${ordemMaiorCusto.custoTotal.toFixed(2)}</p>
        <p><span>Ordem com menor custo total:</span> código ${ordemMenorCusto.codigo} — R$ ${ordemMenorCusto.custoTotal.toFixed(2)}</p>
        <p><span class="alerta-alto">Ordens com alerta de estoque alto:</span> ${qtdAlertaAlto}</p>
        <p><span class="alerta-critico">Ordens com alerta de estoque crítico:</span> ${qtdAlertaCritico}</p>
        <h4>Consolidado por produto</h4>
        ${htmlProdutos}
    `;
}



// EXERCÍCIO 4 – Reservas de hotel com tarifas dinâmicas

let reservasListaEx4 = [];

function calcularResEx4() {
    let codigo = document.getElementById("codigo")
    let tipoQuarto = document.getElementById("tipoQuarto")
    let temporada = document.getElementById("temporada")
    let diarias = document.getElementById("diarias")
    let hospedes = document.getElementById("hospedes")
    let cafe = document.getElementById("cafe")
    let valorBase = document.getElementById("valorBase")
    let valorCafe = document.getElementById("valorCafe")

    let codigox = Number(codigo.value);
    let tipoQuartox = tipoQuarto.value.trim().toUpperCase();
    let temporadax = temporada.value.trim().toUpperCase();
    let diariasx = Number(diarias.value);
    let hospedesx = Number(hospedes.value);
    let cafex = cafe.value.trim().toUpperCase();
    let valorBasex = Number(valorBase.value);
    let valorCafex = Number(valorCafe.value);

    let codigoValido = 0
    while (codigoValido==0){
        let existe = reservasListaEx4.some(r => r.codigo == codigox)
        if (existe){
            let novoCodigo = prompt('Esse código de reserva já foi usado! Digite outro código:')
            codigox = Number(novoCodigo)
        } else {
            codigoValido = 1
        }
    }

    let multiplicadorQuarto = 0
    let quartoValido = 0
    while (quartoValido==0){
        switch (tipoQuartox){
            case 'S':
                multiplicadorQuarto = 1.00
                quartoValido = 1
                break;
            case 'L':
                multiplicadorQuarto = 1.50
                quartoValido = 1
                break;
            case 'P':
                multiplicadorQuarto = 2.00
                quartoValido = 1
                break;
            default:
                let novoTipo = prompt('DIGITE UM TIPO DE QUARTO VÁLIDO (S-Standard, L-Luxo, P-Premium)')
                tipoQuartox = novoTipo.trim().toUpperCase()
        }
    }

    let ajusteTemporada = 0
    let temporadaValida = 0
    while (temporadaValida==0){
        switch (temporadax){
            case 'B':
                ajusteTemporada = 0
                temporadaValida = 1
                break;
            case 'A':
                ajusteTemporada = 0.25
                temporadaValida = 1
                break;
            case 'F':
                ajusteTemporada = 0.40
                temporadaValida = 1
                break;
            default:
                let novaTemporada = prompt('DIGITE UMA TEMPORADA VÁLIDA (B-Baixa, A-Alta, F-Feriado)')
                temporadax = novaTemporada.trim().toUpperCase()
        }
    }

    let cafeIncluso = 0
    let cafeValido = 0
    while (cafeValido==0){
        switch (cafex){
            case 'S':
                cafeIncluso = 1
                cafeValido = 1
                break;
            case 'N':
                cafeIncluso = 0
                cafeValido = 1
                break;
            default:
                let novoCafe = prompt('DIGITE S OU N (café da manhã incluso?)')
                cafex = novoCafe.trim().toUpperCase()
        }
    }

    let diariaAjustada = valorBasex * multiplicadorQuarto
    let valorDiariaFinal = diariaAjustada * (1 + ajusteTemporada)

    let cafeTotal = cafeIncluso == 1 ? (valorCafex * hospedesx * diariasx) : 0

    let valorTotal = (valorDiariaFinal * diariasx) + cafeTotal

    reservasListaEx4.push({
        codigo: codigox,
        tipoQuarto: tipoQuartox,
        temporada: temporadax,
        diarias: diariasx,
        hospedes: hospedesx,
        cafeIncluso: cafeIncluso,
        valorTotal: valorTotal
    });

    textoResultado.innerText = "Reserva " + codigox + " adicionada! Valor total: R$ " + valorTotal.toFixed(2);

    let item = document.createElement("li");
    item.innerText = "Reserva " + codigox + " (" + tipoQuartox + "/" + temporadax + ") — R$ " + valorTotal.toFixed(2);
    listaPedidos.appendChild(item);

    codigo.value = "";
    tipoQuarto.value = "";
    temporada.value = "";
    diarias.value = "";
    hospedes.value = "";
    cafe.value = "";
}

function gerarRelatorioEx4() {
    if (reservasListaEx4.length === 0) {
        textoResultado.innerText = "Nenhuma reserva foi cadastrada ainda.";
        return;
    }

    let totalReservas = reservasListaEx4.length;
    let somaTotal = 0;
    let totalPorQuarto = { S: 0, L: 0, P: 0 };
    let totalPorTemporada = { B: 0, A: 0, F: 0 };
    let qtdComCafe = 0, qtdSemCafe = 0;
    let somaOcupacao = 0;
    let somaHospedes = 0;

    let reservaMaisCara = reservasListaEx4[0];
    let reservaMaisBarata = reservasListaEx4[0];

    for (let i = 0; i < reservasListaEx4.length; i++) {
        let r = reservasListaEx4[i];
        somaTotal += r.valorTotal;
        totalPorQuarto[r.tipoQuarto] += r.valorTotal;
        totalPorTemporada[r.temporada] += r.valorTotal;

        if (r.cafeIncluso == 1) qtdComCafe++; else qtdSemCafe++;

        somaOcupacao += r.diarias * r.hospedes;
        somaHospedes += r.hospedes;

        if (r.valorTotal > reservaMaisCara.valorTotal) reservaMaisCara = r;
        if (r.valorTotal < reservaMaisBarata.valorTotal) reservaMaisBarata = r;
    }

    let valorMedio = somaTotal / totalReservas;
    let valorMedioHospede = somaHospedes > 0 ? somaTotal / somaHospedes : 0;

    textoResultado.innerHTML = `
        <h3>Relatório Final</h3>
        <p><span>Total de reservas cadastradas:</span> ${totalReservas}</p>
        <p><span>Valor médio por reserva:</span> R$ ${valorMedio.toFixed(2)}</p>
        <p><span>Total - Standard:</span> R$ ${totalPorQuarto.S.toFixed(2)}</p>
        <p><span>Total - Luxo:</span> R$ ${totalPorQuarto.L.toFixed(2)}</p>
        <p><span>Total - Premium:</span> R$ ${totalPorQuarto.P.toFixed(2)}</p>
        <p><span>Total - Baixa temporada:</span> R$ ${totalPorTemporada.B.toFixed(2)}</p>
        <p><span>Total - Alta temporada:</span> R$ ${totalPorTemporada.A.toFixed(2)}</p>
        <p><span>Total - Feriado:</span> R$ ${totalPorTemporada.F.toFixed(2)}</p>
        <p><span>Reserva mais cara:</span> código ${reservaMaisCara.codigo} (${reservaMaisCara.tipoQuarto}/${reservaMaisCara.temporada}, ${reservaMaisCara.hospedes} hóspedes) — R$ ${reservaMaisCara.valorTotal.toFixed(2)}</p>
        <p><span>Reserva mais barata:</span> código ${reservaMaisBarata.codigo} (${reservaMaisBarata.tipoQuarto}/${reservaMaisBarata.temporada}, ${reservaMaisBarata.hospedes} hóspedes) — R$ ${reservaMaisBarata.valorTotal.toFixed(2)}</p>
        <p><span>Reservas com café incluso:</span> ${qtdComCafe}</p>
        <p><span>Reservas sem café:</span> ${qtdSemCafe}</p>
        <p><span>Ocupação total (diárias × hóspedes):</span> ${somaOcupacao}</p>
        <p><span>Valor médio por hóspede:</span> R$ ${valorMedioHospede.toFixed(2)}</p>
    `;
}



// EXERCÍCIO 5 – Treinos esportivos e risco de lesão
let treinosListaEx5 = [];

function calcularResEx5() {
    let codigo = document.getElementById("codigo")
    let nome = document.getElementById("nome")
    let posicao = document.getElementById("posicao")
    let tipo = document.getElementById("tipo")
    let duracao = document.getElementById("duracao")
    let intensidade = document.getElementById("intensidade")
    let cargaMax = document.getElementById("cargaMax")

    let codigox = Number(codigo.value);
    let nomex = nome.value.trim();
    let posicaox = posicao.value.trim().toUpperCase();
    let tipox = tipo.value.trim().toUpperCase();
    let duracaox = Number(duracao.value);
    let intensidadex = Number(intensidade.value);
    let cargaMaxx = Number(cargaMax.value);

    let codigoValido = 0
    while (codigoValido==0){
        let existe = treinosListaEx5.some(t => t.codigo == codigox)
        if (existe){
            let novoCodigo = prompt('Esse código de treino já foi usado! Digite outro código:')
            codigox = Number(novoCodigo)
        } else {
            codigoValido = 1
        }
    }

    let posicaoValida = 0
    while (posicaoValida==0){
        switch (posicaox){
            case 'G': posicaoValida = 1; break;
            case 'Z': posicaoValida = 1; break;
            case 'M': posicaoValida = 1; break;
            case 'A': posicaoValida = 1; break;
            default:
                let novaPosicao = prompt('DIGITE UMA POSIÇÃO VÁLIDA (G-Goleiro, Z-Zagueiro, M-Meio-campo, A-Atacante)')
                posicaox = novaPosicao.trim().toUpperCase()
        }
    }

    let multiplicador = 0
    let tipoValido = 0
    while (tipoValido==0){
        switch (tipox){
            case 'F':
                multiplicador = 1.5
                tipoValido = 1
                break;
            case 'T':
                multiplicador = 1.2
                tipoValido = 1
                break;
            case 'E':
                multiplicador = 1.0
                tipoValido = 1
                break;
            default:
                let novoTipo = prompt('DIGITE UM TIPO VÁLIDO (F-Físico, T-Técnico, E-Estratégico)')
                tipox = novoTipo.trim().toUpperCase()
        }
    }

    let intensidadeValida = 0
    while (intensidadeValida==0){
        if (intensidadex >= 1 && intensidadex <= 10){
            intensidadeValida = 1
        } else {
            let novaIntensidade = prompt('DIGITE UMA INTENSIDADE VÁLIDA (entre 1 e 10)')
            intensidadex = Number(novaIntensidade)
        }
    }

    let carga = (duracaox / 10) * intensidadex * multiplicador

    treinosListaEx5.push({
        codigo: codigox,
        nome: nomex,
        posicao: posicaox,
        tipo: tipox,
        carga: carga
    });

    textoResultado.innerText = "Treino " + codigox + " adicionado! Carga: " + carga.toFixed(2) + " pontos";

    let item = document.createElement("li");
    item.innerText = "Treino " + codigox + " — " + nomex + " (" + tipox + ") — " + carga.toFixed(2) + " pts";
    listaPedidos.appendChild(item);

    codigo.value = "";
    nome.value = "";
    posicao.value = "";
    tipo.value = "";
    duracao.value = "";
    intensidade.value = "";
}

function gerarRelatorioEx5() {
    if (treinosListaEx5.length === 0) {
        textoResultado.innerText = "Nenhum treino foi cadastrado ainda.";
        return;
    }

    let cargaMaxx = Number(document.getElementById("cargaMax").value);

    let totalTreinos = treinosListaEx5.length;

    let jogadores = {};
    for (let i = 0; i < treinosListaEx5.length; i++) {
        let t = treinosListaEx5[i];
        if (!jogadores[t.nome]) {
            jogadores[t.nome] = { carga: 0, qtd: 0, posicao: t.posicao };
        }
        jogadores[t.nome].carga += t.carga;
        jogadores[t.nome].qtd += 1;
        jogadores[t.nome].posicao = t.posicao;
    }

    let nomes = Object.keys(jogadores);
    let maiorNome = nomes[0];
    let menorNome = nomes[0];
    let qtdRisco = 0;

    for (let i = 0; i < nomes.length; i++) {
        let nome = nomes[i];
        if (jogadores[nome].carga > jogadores[maiorNome].carga) maiorNome = nome;
        if (jogadores[nome].carga < jogadores[menorNome].carga) menorNome = nome;
        if (jogadores[nome].carga > cargaMaxx) qtdRisco++;
    }

    let somaF = 0, qtdF = 0, somaT = 0, qtdT = 0, somaE = 0, qtdE = 0;
    let posicoes = { G: { qtd: 0, carga: 0 }, Z: { qtd: 0, carga: 0 }, M: { qtd: 0, carga: 0 }, A: { qtd: 0, carga: 0 } };

    for (let i = 0; i < treinosListaEx5.length; i++) {
        let t = treinosListaEx5[i];
        if (t.tipo == 'F'){ somaF += t.carga; qtdF++; }
        if (t.tipo == 'T'){ somaT += t.carga; qtdT++; }
        if (t.tipo == 'E'){ somaE += t.carga; qtdE++; }

        posicoes[t.posicao].qtd++;
        posicoes[t.posicao].carga += t.carga;
    }

    let mediaF = qtdF > 0 ? somaF / qtdF : 0;
    let mediaT = qtdT > 0 ? somaT / qtdT : 0;
    let mediaE = qtdE > 0 ? somaE / qtdE : 0;

    let htmlJogadores = "";
    for (let i = 0; i < nomes.length; i++) {
        let nome = nomes[i];
        let j = jogadores[nome];
        let risco = j.carga > cargaMaxx ? ' <span class="alerta-critico">(risco de lesão)</span>' : "";
        htmlJogadores += `<p><span>${nome} (${j.posicao}):</span> ${j.carga.toFixed(2)} pts em ${j.qtd} treino(s)${risco}</p>`;
    }

    let htmlPosicoes = "";
    let nomesPosicao = { G: "Goleiro", Z: "Zagueiro", M: "Meio-campo", A: "Atacante" };
    for (let sigla in posicoes) {
        let p = posicoes[sigla];
        let media = p.qtd > 0 ? p.carga / p.qtd : 0;
        htmlPosicoes += `<p><span>${nomesPosicao[sigla]}:</span> ${p.qtd} treino(s), carga média ${media.toFixed(2)} pts</p>`;
    }

    textoResultado.innerHTML = `
        <h3>Relatório Final</h3>
        <p><span>Total de treinos cadastrados:</span> ${totalTreinos}</p>
        <h4>Carga por jogador</h4>
        ${htmlJogadores}
        <p><span>Jogador com maior carga:</span> ${maiorNome} (${jogadores[maiorNome].posicao}) — ${jogadores[maiorNome].qtd} treino(s)</p>
        <p><span>Jogador com menor carga:</span> ${menorNome} (${jogadores[menorNome].posicao}) — ${jogadores[menorNome].qtd} treino(s)</p>
        <p><span class="alerta-critico">Jogadores com risco de lesão:</span> ${qtdRisco}</p>
        <h4>Carga média por tipo de treino</h4>
        <p><span>Físico:</span> ${mediaF.toFixed(2)} pts</p>
        <p><span>Técnico:</span> ${mediaT.toFixed(2)} pts</p>
        <p><span>Estratégico:</span> ${mediaE.toFixed(2)} pts</p>
        <h4>Por posição</h4>
        ${htmlPosicoes}
    `;
}



// EXERCÍCIO 6 – Vendas com comissões, metas e performance
let vendasListaEx6 = [];

function calcularResEx6() {
    let codigo = document.getElementById("codigo")
    let codVendedor = document.getElementById("codVendedor")
    let regiao = document.getElementById("regiao")
    let valorVenda = document.getElementById("valorVenda")
    let tipoCliente = document.getElementById("tipoCliente")
    let percBase = document.getElementById("percBase")
    let meta = document.getElementById("meta")

    let codigox = Number(codigo.value);
    let codVendedorx = codVendedor.value.trim();
    let regiaox = Number(regiao.value);
    let valorVendax = Number(valorVenda.value);
    let tipoClientex = tipoCliente.value.trim().toUpperCase();
    let percBasex = Number(percBase.value);

    let codigoValido = 0
    while (codigoValido==0){
        let existe = vendasListaEx6.some(v => v.codigo == codigox)
        if (existe){
            let novoCodigo = prompt('Esse código de venda já foi usado! Digite outro código:')
            codigox = Number(novoCodigo)
        } else {
            codigoValido = 1
        }
    }

    let bonusRegiao = 0
    let regiaoValida = 0
    while (regiaoValida==0){
        switch (regiaox){
            case 1:
                bonusRegiao = 0.01
                regiaoValida = 1
                break;
            case 2:
                bonusRegiao = 0.01
                regiaoValida = 1
                break;
                bonusRegiao = 0
                regiaoValida = 1
                break;
            case 4:
                bonusRegiao = 0.005
                regiaoValida = 1
                break;
            default:
                let novaRegiao = prompt('DIGITE UMA REGIÃO VÁLIDA (1-Norte, 2-Nordeste, 3-Sudeste, 4-Sul)')
                regiaox = Number(novaRegiao)
        }
    }

    let bonusTipo = 0
    let tipoValido = 0
    while (tipoValido==0){
        switch (tipoClientex){
            case 'PF':
                bonusTipo = 0.02
                tipoValido = 1
                break;
            case 'PJ':
                bonusTipo = 0.03
                tipoValido = 1
                break;
            default:
                let novoTipo = prompt('DIGITE UM TIPO DE CLIENTE VÁLIDO (PF ou PJ)')
                tipoClientex = novoTipo.trim().toUpperCase()
        }
    }

    let comissaoBase = valorVendax * (percBasex / 100)
    let bonusTipoValor = valorVendax * bonusTipo
    let bonusRegiaoValor = valorVendax * bonusRegiao
    let comissaoTotal = comissaoBase + bonusTipoValor + bonusRegiaoValor

    vendasListaEx6.push({
        codigo: codigox,
        vendedor: codVendedorx,
        regiao: regiaox,
        valorVenda: valorVendax,
        tipoCliente: tipoClientex,
        comissao: comissaoTotal
    });

    textoResultado.innerText = "Venda " + codigox + " adicionada! Comissão: R$ " + comissaoTotal.toFixed(2);

    let item = document.createElement("li");
    item.innerText = "Venda " + codigox + " — Vendedor " + codVendedorx + " — R$ " + valorVendax.toFixed(2) + " (com. R$ " + comissaoTotal.toFixed(2) + ")";
    listaPedidos.appendChild(item);

    codigo.value = "";
    codVendedor.value = "";
    regiao.value = "";
    valorVenda.value = "";
    tipoCliente.value = "";
}

function gerarRelatorioEx6() {
    if (vendasListaEx6.length === 0) {
        textoResultado.innerText = "Nenhuma venda foi cadastrada ainda.";
        return;
    }

    let metax = Number(document.getElementById("meta").value);

    let totalVendas = vendasListaEx6.length;
    let totalPorRegiao = { 1: 0, 2: 0, 3: 0, 4: 0 };
    let totalPorTipo = { PF: 0, PJ: 0 };
    let somaComissao = 0;

    let vendedores = {};

    for (let i = 0; i < vendasListaEx6.length; i++) {
        let v = vendasListaEx6[i];
        totalPorRegiao[v.regiao] += v.valorVenda;
        totalPorTipo[v.tipoCliente] += v.valorVenda;
        somaComissao += v.comissao;

        if (!vendedores[v.vendedor]) {
            vendedores[v.vendedor] = { valorTotal: 0, comissaoTotal: 0 };
        }
        vendedores[v.vendedor].valorTotal += v.valorVenda;
        vendedores[v.vendedor].comissaoTotal += v.comissao;
    }

    let codsVendedores = Object.keys(vendedores);
    let maiorVendedorValor = codsVendedores[0];
    let maiorVendedorComissao = codsVendedores[0];
    let qtdBateuMeta = 0;

    for (let i = 0; i < codsVendedores.length; i++) {
        let cod = codsVendedores[i];
        if (vendedores[cod].valorTotal > vendedores[maiorVendedorValor].valorTotal) maiorVendedorValor = cod;
        if (vendedores[cod].comissaoTotal > vendedores[maiorVendedorComissao].comissaoTotal) maiorVendedorComissao = cod;
        if (vendedores[cod].valorTotal >= metax) qtdBateuMeta++;
    }

    let comissaoMediaGeral = somaComissao / totalVendas;

    let comissaoPorRegiaoSoma = { 1: 0, 2: 0, 3: 0, 4: 0 };
    let comissaoPorRegiaoQtd = { 1: 0, 2: 0, 3: 0, 4: 0 };
    for (let i = 0; i < vendasListaEx6.length; i++) {
        let v = vendasListaEx6[i];
        comissaoPorRegiaoSoma[v.regiao] += v.comissao;
        comissaoPorRegiaoQtd[v.regiao] += 1;
    }

    let nomesRegiao = { 1: "Norte", 2: "Nordeste", 3: "Sudeste", 4: "Sul" };
    let htmlComissaoRegiao = "";
    for (let r = 1; r <= 4; r++) {
        let media = comissaoPorRegiaoQtd[r] > 0 ? comissaoPorRegiaoSoma[r] / comissaoPorRegiaoQtd[r] : 0;
        htmlComissaoRegiao += `<p><span>${nomesRegiao[r]}:</span> R$ ${media.toFixed(2)}</p>`;
    }

    textoResultado.innerHTML = `
        <h3>Relatório Final</h3>
        <p><span>Total de vendas registradas:</span> ${totalVendas}</p>
        <p><span>Total vendido - Norte:</span> R$ ${totalPorRegiao[1].toFixed(2)}</p>
        <p><span>Total vendido - Nordeste:</span> R$ ${totalPorRegiao[2].toFixed(2)}</p>
        <p><span>Total vendido - Sudeste:</span> R$ ${totalPorRegiao[3].toFixed(2)}</p>
        <p><span>Total vendido - Sul:</span> R$ ${totalPorRegiao[4].toFixed(2)}</p>
        <p><span>Total vendido - PF:</span> R$ ${totalPorTipo.PF.toFixed(2)}</p>
        <p><span>Total vendido - PJ:</span> R$ ${totalPorTipo.PJ.toFixed(2)}</p>
        <p><span>Vendedor com maior valor vendido:</span> ${maiorVendedorValor} — R$ ${vendedores[maiorVendedorValor].valorTotal.toFixed(2)}</p>
        <p><span>Vendedor com maior comissão:</span> ${maiorVendedorComissao} — R$ ${vendedores[maiorVendedorComissao].comissaoTotal.toFixed(2)}</p>
        <p><span>Vendedores que bateram a meta:</span> ${qtdBateuMeta}</p>
        <p><span>Comissão média geral:</span> R$ ${comissaoMediaGeral.toFixed(2)}</p>
        <h4>Comissão média por região</h4>
        ${htmlComissaoRegiao}
    `;
}