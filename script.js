function calcularConsumo() {
    const alunos = Number(document.getElementById("alunos").value);
    const funcionarios = Number(document.getElementById("funcionarios").value);
    const diasUso = Number(document.getElementById("diasUso").value);
    const horas = Number(document.getElementById("horasPermanencia").value);
    const torneiras = Number(document.getElementById("torneiras").value);
    const bebedouros = Number(document.getElementById("qtdBebedouros").value);
    const tipoBebedouro = document.getElementById("tipoBebedouro").value;
    const vasos = Number(document.getElementById("vasos").value);
    const limpezas = Number(document.getElementById("limpezas").value);
    const lavagem = document.getElementById("lavagem").value;
    const jardim = document.getElementById("jardim").value;
  
    const vazamentos = document.getElementById("vazamentos").checked;
    const reuso = document.getElementById("reuso").value;
    const campanha = document.getElementById("campanha").value;
  
    let consumo = 0;
  
    consumo += torneiras * alunos * 1.5; // Estimativa de consumo das torneiras
    consumo += funcionarios * 8; // Estimativa de consumo dos funcionários
    consumo += vasos * 4; // Estimativa de consumo dos vasos sanitários
    consumo += limpezas * (lavagem === "mangueira" ? 200 : (lavagem === "balde" ? 60 : 130)); // Estimativa de consumo de água para lavagem do pátio
  
    // Estimativa de consumo dos bebedouros
    if (tipoBebedouro === "fluxo") consumo += bebedouros * alunos * 0.6;
    else if (tipoBebedouro === "botao") consumo += bebedouros * alunos * 0.3;
    else consumo += bebedouros * alunos * 0.2;
  
    // Adiciona o consumo da irrigação se a escola possui jardim
    if (jardim === "sim") consumo += 150; // Consumo estimado de água para irrigação
  
    // Economia de água com base em medidas implementadas
    let economia = 0;
    if (reuso === "sim") economia += 8; // Economia com reaproveitamento de água
    if (campanha === "sim") economia += 5; // Economia com campanhas educativas
    if (vazamentos) economia -= 10; // Penalidade se houver vazamentos
  
    // Calcula o total de consumo após as economias
    let total = consumo - (consumo * economia / 100);
  
    // Exibe o resultado numérico
    document.getElementById("resultado").innerHTML = `
      <h3>Consumo estimado semanal de água:</h3>
      <p><strong>${total.toFixed(2)} litros</strong></p>
    `;
  
    // Exibe recomendações para redução de consumo
    document.getElementById("recomendacoes").innerHTML = `
      <h3>Recomendações para reduzir o consumo:</h3>
      <ul>
        <li>Verifique e conserte vazamentos com frequência.</li>
        <li>Adote campanhas educativas sobre economia de água.</li>
        <li>Instale sistemas de reaproveitamento de água da chuva.</li>
        <li>Prefira baldes ao lavar áreas externas.</li>
        <li>Mantenha a manutenção regular de bebedouros e sanitários.</li>
      </ul>
    `;
  
    // Gerando gráfico
    gerarGrafico(consumo, total);
  }
  
  function gerarGrafico(consumoOriginal, consumoFinal) {
    const ctx = document.getElementById('graficoConsumo').getContext('2d');
    const grafico = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Consumo Original', 'Consumo Final'],
        datasets: [{
          label: 'Consumo de Água (litros)',
          data: [consumoOriginal, consumoFinal],
          backgroundColor: ['#ff6384', '#36a2eb'],
          borderColor: ['#ff6384', '#36a2eb'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 50
            }
          }
        }
      }
    });
  }