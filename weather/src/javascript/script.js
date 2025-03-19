document.querySelector('#pesquisa').addEventListener('submit',async (Event)=> {
    Event.preventDefault();
    const nomecidade = document.querySelector('#nome_cidade').value;
    if(!nomecidade){
        document.querySelector("#clima").classList.remove('show')

         showAlert('Você precisa digitar uma cidade...');
         return;
    }
    const apiKey = '8066c2476b3224b800cc454ce5c0f334';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(nomecidade)}&appid=${apiKey}&units=metric&lang=pt_br`;

    //const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(nomecidade)}&appid=${apiKey}&units=metric&lang=pt_br'
    const results =  await fetch(apiUrl);
    const json = await results.json();

    if(json.cod === 200){
        showInfo({
            city : json.name,
            pais: json.sys.country,
            tempo: json.main.temp,
            tempomax: json.main.temp_max,
            tempomin: json.main.temp_min,
            description: json.weather[0].description,
            tempoIcone: json.weather[0].icon,
            vento: json.wind.speed,
            humidade:json.main.humidity,
        })
    } else{
        document.querySelector("#clima").classList.remove('show')

        showAlert(`
            Não foi Encontrado...
        <img src="src/img/no_found.png" />
        `);
    }

       // console.log(NomeCidade)
});
    function showInfo(json){
        showAlert('');
// antes do # tava . por algum motivo
        document.querySelector("#clima").classList.add('show')

        document.querySelector("#title").innerHTML = `${json.city},${json.pais}`;

        document.querySelector("#tempo_valor").innerHTML = `${json.tempo.toFixed(1).toString().replace('.' , ',')}<sup>C°</sup>`;

        document.querySelector("#desc").innerHTML = `${json.description}`;

        document.querySelector("#tempo_img").setAttribute('src', `https://openweathermap.org/img/wn/${json.tempoIcone}@2x.png`)

        document.querySelector("#temp_max").innerHTML = `${json.tempomax.toFixed(1).toString().replace('.' , ',')}<sup>C°</sup>`;

        document.querySelector("#temp_min").innerHTML = `${json.tempomin.toFixed(1).toString().replace('.' , ',')}<sup>C°</sup>`;

        document.querySelector("#humidade").innerHTML = `${json.humidade}%`;

        document.querySelector("#vento").innerHTML = `${json.vento.toFixed(1)}km/h`;

        changeBackgroundColor(json.description);
    }



    function showAlert(msg) {
        document.querySelector('#alerta').innerHTML = msg;

    }

    function changeBackgroundColor(description) {
    let backgroundColor = '#fbbf24'; // cor padrão para clima ensolarado (quente)

    // Defina as cores com base na descrição do clima
    if (description.includes('chuva') || description.includes('rain')) {
        backgroundColor = '#1e40af'; // Chuva: azul escuro
    } else if (description.includes('nuvens') || description.includes('clouds')) {
        backgroundColor = '#9ca3af'; // Nuvens: cinza suave
    } else if (description.includes('sol') || description.includes('clear')) {
        backgroundColor = '#fbbf24'; // Sol: amarelo vibrante
    } else if (description.includes('neblina') || description.includes('fog')) {
        backgroundColor = '#4b5563'; // Neblina: cinza escuro
    } else if (description.includes('neve') || description.includes('snow')) {
        backgroundColor = '#d1d5db'; // Neve: branco acinzentado ou azul claro
    } else if (description.includes('vento') || description.includes('wind')) {
        backgroundColor = '#7c3aed'; // Vento: roxo vibrante
    }

    // Mudando o fundo com transição
    document.body.style.background = `linear-gradient(180deg, ${backgroundColor}, #4a7dff)`;
}
       
    