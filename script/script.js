// Lista que vai guardar os pedidos já calculados
let pedidosLista = [];

function calcularRes() {
    // 1. Pega os elementos do HTML através do ID
    let codigo = document.getElementById("codigo")
    let regiao = document.getElementById("regiao");
    let km = document.getElementById("km");
    let qt = document.getElementById("qt");
    let rast = document.getElementById("rast")
    let litro = document.getElementById("litro")

    // 2. Pega os valores digitados e converte para números
    let codigox = Number(codigo.value);
    let regiaox = Number(regiao.value);
    let kmx = Number(km.value);
    let qtx = Number(qt.value);
    let rasty = Number(rast.value);
    let litrox = Number(litro.value);

    // 3. Verifica se o código já existe na lista
    let codigoValido = 0
    while (codigoValido==0){
        let existe = pedidosLista.some(p => p.codigo == codigox)
        if (existe){
            let novoCodigo = prompt('Esse código já foi usado! Digite outro código:')
            codigox = Number(novoCodigo)
        } else {
            codigoValido = 1
        }
    }

    // 4. Faz o cálculo
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
    
    // CORREÇÃO: excedente é um DESCONTO, então precisa ser subtraído, não somado
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

    // NOVO: em vez de só mostrar o resultado, guarda o pedido na lista
    pedidosLista.push({
        codigo: codigox,
        regiao: regiaox,
        total: total
    });

    // Mostra confirmação do pedido adicionado
    textoResultado.innerText = "Pedido " + codigox + " adicionado! Valor total: R$ " + total.toFixed(2);

    // Atualiza a listinha visual de pedidos cadastrados
    let item = document.createElement("li");
    item.innerText = "Pedido " + codigox + " — R$ " + total.toFixed(2);
    listaPedidos.appendChild(item);

    // Limpa os campos para o próximo pedido
    codigo.value = "";
    regiao.value = "";
    km.value = "";
    qt.value = "";
    rast.value = "";
}

// NOVA FUNÇÃO: percorre a lista de pedidos e monta o relatório final
function gerarRelatorio() {
    if (pedidosLista.length === 0) {
        textoResultado.innerText = "Nenhum pedido foi cadastrado ainda.";
        return;
    }

    let totalPedidos = pedidosLista.length;
    let somaTotal = 0;
    let totalRegiao1 = 0;
    let totalRegiao2 = 0;
    let totalRegiao3 = 0;

    let pedidoMaisCaro = pedidosLista[0];
    let pedidoMaisBarato = pedidosLista[0];

    for (let i = 0; i < pedidosLista.length; i++) {
        let p = pedidosLista[i];
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