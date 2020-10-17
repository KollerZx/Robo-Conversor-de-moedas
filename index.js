const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

console.log('Bem vindo ao Bot conversor');


/**Por padrão o puppeteer é desenvolvido pra rodar sem subir nem uma tela do navegador, ou seja,
 * rodar em segundo plano. Ao inserir o parâmetro headless: false, fazemos com que as abas sejam exibidas,
 * true = não exibe as abas (padrão) Para isso precisamos instala-lo 'npm install puppeteer'

 *O puppeteer possui um recurso chamado page.evaluate que permite que seja rodado um codigo Javascript
* como se estivesse acessando a pagina e rodando no console e pegue o retorno e jogue em uma variavel

* Existe uma lib chamada readline-sync que pode ser usada para pegar dados digitados pelo usuário,
* ela faz a requisição para que o usuário digite.
* Para isso precisamos instala-la 'npm install readline-sync'
*/

async function robo() {
  //Abre o Navegador
  const browser = await puppeteer.launch({ headless: true });
  //Abre uma nova aba
  const page = await browser.newPage();
  //Solicita ao usuário quais moedas deseja relacionar
  const moedaBase = readlineSync.question('Informe uma moeda base: ') || 'dolar';
  const moedaFinal = readlineSync.question('Informe uma moeda desejada: ') || 'real';
  /*Para construir o exemplo usamos moedaBase como dolar e Real como moedaFinal, após alteramos 
  * na url, onde for 'dolar' -> ${moedaBase} 
  * Onde for 'real'-> ${moedaFinal}
  * Com a inserção da lib readline-sync, os valores na url são substituidos pelos fornecidos pelo usuário*/
  const acessaUrl = `https://www.google.com/search?source=hp&ei=6iGKX6ziB4LL5OUPyPC-0AM&q=${moedaBase}+para+${moedaFinal}&oq=${moedaBase}+para+${moedaFinal}&gs_lcp=CgZwc3ktYWIQAzIKCAAQsQMQRhCCAjICCAAyAggAMgIIADICCAAyAggAMgIIADIECAAQCjICCAAyAggAOgUIABCxAzoICAAQsQMQgwE6AgguOggILhCxAxCDAToFCC4QsQM6BwgAELEDEApQ4xdYviNgnSZoAHAAeAGAAY4CiAHxDZIBBjMuMTEuMZgBAKABAaoBB2d3cy13aXo&sclient=psy-ab&ved=0ahUKEwis__rfl7rsAhWCJbkGHUi4DzoQ4dUDCAc&uact=5`;
  //Acessa a pagina indicada
  await page.goto(acessaUrl);

  //Tira um print da tela e salva
  //await page.screenshot({ path: 'example.png' });

  /*
 Não conseguimos rodar direto o código abaixo como no console
 const resultado = document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value
*/
  const resultado = await page.evaluate(() => {
    return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
  });
  console.log(`O valor ${moedaBase} em ${moedaFinal} é ${resultado}`);
  //fecha o navegador
  await browser.close();
}
robo();