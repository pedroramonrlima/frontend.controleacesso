export const acessos = [
  {
    id: 1,
    name: "REDE_DEVICE_ALL",
    dn: "ou=grupos/deviceall"
  },
  {
    id: 2, 
    name: "VPN", 
    dn: "ou=grupos/VPN"
  }, 
  { 
    id: 3, 
    name: "Internet Lista Branca", 
    dn: "ou=grupos/internetbranca" 
  }, 
  { 
    id: 4, 
    name: "VPN-TI", 
    dn: "ou=grupos/internetbranca" 
  }, 
  { 
    id: 5, 
    name: "Pasta Compartilhada RH", 
    dn: "ou=grupos/internetbranca" 
  }, 
  { 
    id: 6, 
    name: "Pasta Compartilhada Contabilidade", 
    dn: "ou=grupos/internetbranca" 
  }, 
  { 
    id: 7, 
    name: "Pasta Compartilhada TI", 
    dn: "ou=grupos/internetbranca" 
  }, 
  { 
    id: 8, 
    name: "Pasta Compartilhada Administrativo", 
    dn: "ou=grupos/internetbranca" 
  }, 
  { 
    id: 9, 
    name: "Pasta Compartilhada Financeiro", 
    dn: "ou=grupos/internetbranca" 
  }
]


function gerarDadosAleatorios() {
  const nomes = ['Ana', 'Bruno', 'Carlos', 'Daniela', 'Eduardo', 'Fernanda', 'Gabriel', 'Helena', "Pedro", "Rodrigo", "Pedro", "Ramon"];
  const sobrenomes = ['Silva', 'Costa', 'Santos', 'Oliveira', 'Pereira', 'Lima', 'Fernandes', 'Souza', "Ramon"];
  const dados = [];

  function nomeAleatorio() {
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    return `${nome} ${sobrenome}`;
  }

  for (let i = 0; i < 20; i++) {
    dados.push({
      nome: nomeAleatorio(),
      cpf: `${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}-00`,
      rg: `${Math.floor(100000000 + Math.random() * 900000000)}`
    });
  }
  return dados;
}

const dadosAleatorios = gerarDadosAleatorios();

export default dadosAleatorios;

