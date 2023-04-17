async function riotAPI(NICKNAME) {
    const APIKEY = "RGAPI-42167f29-b814-4c48-b932-f5e209ed27db"
    const riotINFO = await fetch('https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + NICKNAME + '?api_key=' + APIKEY + ' ')
    const ACCOUNTDATA = await riotINFO.json();
    const id = ACCOUNTDATA.id
    const ranked = await fetch('https://la2.api.riotgames.com/lol/league/v4/entries/by-summoner/' + id + '?api_key=' + APIKEY + ' ')
    const datos = await ranked.json()
    return datos
}

const arrPlayers = []

async function damgg() {
    const datos = await riotAPI('t1 damGG');
    addToList(datos)
}

async function nytherax() {
    const datos = await riotAPI('Nytherax');
    addToList(datos)
}
async function smurfmage() {
    const datos = await riotAPI('smurfmage');
    addToList(datos)
}


async function zedoge() {
    const datos = await riotAPI('Zedoge');
    addToList(datos)
}

async function alphaphong() {
    const datos = await riotAPI('Ove Alphaphong');
    addToList(datos)
    updateTable();
}

async function ava() {
    const datos = await riotAPI('áva');
    addToList(datos);
    updateTable();
}

async function parawin() {
    const datos = await riotAPI('parawin');
    addToList(datos);
    updateTable();
}

async function drvenomancer() {
    const datos = await riotAPI('DR V3N0MANCER');
    addToList(datos);
    updateTable();
}
async function sharpy() {
    const datos = await riotAPI('sharpy');
    addToList(datos);
    updateTable();
}
async function polagg() {
    const datos = await riotAPI('PolaGEGE');
    addToList(datos);
    updateTable();
}
async function stifmaister() {
    const datos = await riotAPI('stiifmaister');
    addToList(datos);
    updateTable();
}
async function michiruso() {
    const datos = await riotAPI('AncientEvil');
    addToList(datos);
    updateTable();
}

async function alierdel() {
    const datos = await riotAPI('Alierdel');
    addToList(datos);
    updateTable();
}
async function bqolzt() {
    const datos = await riotAPI('bqolzt');
    addToList(datos);
    updateTable();
}
async function ROG_mysticknight() {
    const datos = await riotAPI('ROG mysticknight');
    addToList(datos);
    updateTable();
}
async function ymom_is_love() {
    const datos = await riotAPI('ymom is love');
    addToList(datos);
    updateTable();
}


function updateTable() {
    arrPlayers.sort((a, b) => {
        return b.points - a.points
    })

    // Get a reference to the table element
    const table = document.getElementById('tablaJugadores');

    // Clear any existing rows in the table
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }

    // Create a new row for each player and add it to the table
    arrPlayers.forEach((player, index) => {
        const row = table.insertRow(-1);
        const rankCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        const pointsCell = row.insertCell(2);

        // Set the cell values for the player
        rankCell.textContent = index + 1;
        nameCell.textContent = player.nick;
        pointsCell.textContent = player.points;
    });

    let html = '<tr><th>Nick</th><th>Rank</th><th>Division</th><th>LP</th><th>Winrate</th><th>Pakova Points</th></tr>';

    arrPlayers.forEach(player => {
        html += `<tr><td>${player.nick}</td><td>${player.rank}</td><td>${player.division}</td><td>${player.leaguePoints}</td><td>${player.winrate}%</td><td>${player.points}</td></tr>`;
    });

    table.innerHTML = html;
}

function addToList(datos) {

    const player = {
        nick: "",
        rank: "",
        division: "",
        leaguePoints: "",
        winrate: "",
        points: ""
    }

    player.nick = datos[0].summonerName
    player.leaguePoints = datos[0].leaguePoints
    player.winrate = (datos[0].wins / (datos[0].wins + datos[0].losses) * 100).toFixed(2)
    player.rank = datos[0].tier
    player.division = datos[0].rank
    player.points = calcularRankPoint(datos[0].tier, datos[0].rank, datos[0].leaguePoints)

    if (datos[0].queueType === "RANKED_FLEX_SR") {
        console.log(datos);
        player.nick = datos[1].summonerName
        player.leaguePoints = datos[1].leaguePoints
        player.winrate = (datos[1].wins / (datos[1].wins + datos[1].losses) * 100).toFixed(2)
        player.rank = datos[1].tier
        player.division = datos[1].rank
        player.points = calcularRankPoint(datos[1].tier, datos[1].rank, datos[1].leaguePoints)
    }

    arrPlayers.push(player)
}


function calcularRankPoint(rank, division, leaguePoints) {
    let points = 0

    switch (rank) {
        case "BRONZE":
            points = leaguePoints + divisionEvalue(division)
            break;
        case "SILVER":
            points = 500 + leaguePoints + divisionEvalue(division)
            break;
        case "GOLD":
            points = 1000 + leaguePoints + divisionEvalue(division)
            break;
        case "PLATINUM":
            points = 1500 + leaguePoints + divisionEvalue(division)
            break;
        case "DIAMOND":
            points = 2000 + leaguePoints + divisionEvalue(division)
            break;
        default:
            points = 999999999999
            break;
    }

    function divisionEvalue(division) {
        if (division === "I") {
            return 300
        } else if (division === "II") {
            return 200
        } else if (division === "III") {
            return 100
        } else if (division === "IV") {
            return 0
        }
    }
    return points
}

parawin()
ava()
zedoge()
nytherax()
damgg()
alphaphong()
updateTable()
drvenomancer()
sharpy()
polagg()
stifmaister()
michiruso()
alierdel()
smurfmage()
bqolzt()
ROG_mysticknight()
ymom_is_love()
console.log(arrPlayers);