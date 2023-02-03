const fs = require("fs");
const readline = require("readline");

// Cria uma interface de leitura a partir do terminal
const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Inicializa um array para armazenar propriedades de CSS
let propriedadesCSS = [];

// Função para carregar as propriedades de CSS a partir de um arquivo
const carregarPropriedadesCSS = () => {
  try {
    // Lê o conteúdo do arquivo e separa-o em linhas
    const dados = fs.readFileSync("propriedadesCSS.txt", "utf-8");
    propriedadesCSS = dados.split("\n");
  } catch (erro) {
    // Emite uma mensagem de erro caso o arquivo não exista
    console.error(`\nAinda não existem propriedades CSS salvas no diretório.`);
  }
};

// Função para salvar as propriedades de CSS em um arquivo
const salvarPropriedadesCSS = () => {
  try {
    // Grava as propriedades de CSS em um arquivo, separadas por linhas
    fs.writeFileSync("propriedadesCSS.txt", propriedadesCSS.join("\n"));
  } catch (erro) {
    // Emite uma mensagem de erro caso ocorra um erro ao salvar as propriedades
    console.error(`\nErro ao salvar propriedades CSS: ${erro}`);
  }
};

// Função para ler a entrada do usuário a partir do terminal
const lerEntradaUsuario = () => {
  // Retorna uma nova Promise que resolve com a entrada do usuário
  return new Promise((resolve, reject) => {
    // Imprime uma mensagem solicitando uma entrada do usuário
    terminal.question("\nInsira uma propriedade de CSS ou digite 'SAIR' para visualizar todas as propriedades já cadastradas: ", (entrada) => {
      // Converte a entrada para maiúsculas e resolve a Promise com a entrada
      resolve(entrada.toUpperCase());
    });
  });
};

// Função para adicionar propriedades de CSS

const adicionarPropriedadeCSS = async () => {
  // Lê a entrada do usuário
  const entrada = await lerEntradaUsuario();

  // Verifica se a entrada é válida
  if (!entrada) {
    console.log("\nEntrada inválida. Insira uma propriedade válida.");
    // Se a entrada for inválida, a função é chamada recursivamente
    adicionarPropriedadeCSS();
  } else if (entrada === "SAIR") {
    // Ordena as propriedades CSS em ordem alfabética
    propriedadesCSS.sort();
    console.log("\nLista de propriedades de CSS ordenadas de A-Z:");
    // Imprime cada propriedade da lista
    propriedadesCSS.forEach((propriedade) => {
      console.log(propriedade);
    });
    // Salva as propriedades em algum lugar (não especificado no código)
    salvarPropriedadesCSS();

    // Pergunta ao usuário se ele deseja adicionar mais propriedades
    terminal.question("\nDeseja adicionar mais propriedades? (S/N) ", (resposta) => {
      if (resposta.toUpperCase() === "S") {
        // Se sim, a função é chamada novamente
        adicionarPropriedadeCSS();
      } else {
        // Caso contrário, o terminal é fechado
        terminal.close();
      }
    });
  } else {
    // Adiciona a entrada à lista de propriedades CSS
    propriedadesCSS.push(entrada);
    // A função é chamada recursivamente
    adicionarPropriedadeCSS();
  }
};

carregarPropriedadesCSS();
adicionarPropriedadeCSS();