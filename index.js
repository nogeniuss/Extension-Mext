//obriga a padronização do js
'use strict';



async function init() {
    //busca o preço, caso nãoo consiga retorna 0
  const price =
    document.querySelector(
        'span.andes-money-amount__fraction'
      )?.innerText.replace('.', '') || '0';
      //busca os centavos
  const cents =document.querySelector(
      'span.andes-money-amount__cents andes-money-amount__cents--superscript-36'
    )?.innerText || '0';
    //busca o total de vendas
  const sold = Number(document.querySelector('.ui-pdp-header__subtitle')?.innerText.split(' ')[4]);  
    //busca o container
  const container = document.querySelector('.ui-pdp-header__title-container');
    //calcula receita total bruta
  const total = Number(price + '.' + cents) * sold;
    //busca a quantidade em estoque
  const estoque = document.querySelector('span.ui-pdp-buybox__quantity__available').innerText;
  const estoqueformatado = FormatEstoque(estoque);


  setTimeout(() => {
    container?.insertAdjacentHTML(
      'beforebegin',
      `
        <div class='mlext-div'>
        <ul>
          <li>Receita bruta: <span>${FormatMoney(total)}</span></li>
          <li>Estoque: <span>${estoqueformatado}</span></li>
        </ul>
        <div>
        <input type='number' class='mlext-input' placeholder = 'Informe um numero'/>
        </div>
        <div>
        <button class='mlext-btn'>Monitorar</button>
        <a href="https://mlext.bubbleapps.io/version-test/cadastro?">Acessar Painel</a>
        </div>
        </div>
    `
    );
  }, 1500);

  
};


//formata os valores na moeda local
function FormatMoney(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

//formata o numero ----> verificar com o bruno
function FormatEstoque(value) {
  // Expressão regular para extrair números com até duas casas decimais entre parênteses
  const regex = /\((\d+\.?\d{1,2})\)/;
  const match = String(value).match(regex);
  console.log(match);
  return match ? parseFloat(match[1]) : null;

  

};



init();