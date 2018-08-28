var socket = io.connect('http://localhost:1337');


function creerID() {
    var _nom = document.getElementById("nom").value;
    var _bit_1 = document.getElementById("bit_1").value;

    if (_nom != "" && _bit_1 != "") {
        socket.emit('creer', {
            nom: _nom,
            bit_1: _bit_1,
        });
    } else {
        //afficher un message
        document.getElementById('msg').style.display = "block";
    }    
}

socket.on('cree', (data) => {
    var ligne = document.createElement("tr");

    var clnom = document.createElement("td");
    var clvaleur = document.createElement("td");

    clnom.innerHTML = data.nom
    clvaleur.id = data.nom

    clnom.classList.add("w3-center");
    clvaleur.classList.add("w3-center"); clvaleur.classList.add("w3-circle"); clvaleur.classList.add("w3-red");

    ligne.appendChild(clnom);
    ligne.appendChild(clvaleur);

    document.getElementById('listDesID').appendChild(ligne);    
});

socket.on('mja', (data) => {
    document.getElementById(data.nom).innerHTML = valeurID(data.valeur);
    console.log("hello");
});

function valeurID(valeurBin) {
    var valeurText;
    switch (valeurBin) {
        case '000000': valeurText = "";         break;// 0
        case '000001': valeurText = "ZD";       break;// 1
        case '000010': valeurText = "Q1";       break;// 2
        case '000011': valeurText = "Q2";       break;// 3
        case '000100': valeurText = "Q3";       break;// 4
        case '000101': valeurText = "Q4";       break;// 5
        case '000110': valeurText = "Q5";       break;// 6
        case '000111': valeurText = "Q6";       break;// 7
        case '001000': valeurText = "V1";       break;// 8
        case '001001': valeurText = "V2";       break;// 9
        case '001010': valeurText = "VA";       break;// 10
        case '001011': valeurText = "VC";       break;// 11
        case '001100': valeurText = "VI";       break;// 12
        case '001101': valeurText = "VG";       break;// 13
        case '001110': valeurText = "VL";       break;// 14
        case '001111': valeurText = "VT";       break;// 15
        case '010000': valeurText = "VR";       break;// 16
        case '010001': valeurText = "VS";       break;// 17
        case '010010': valeurText = "VU";       break;// 18
        case '010011': valeurText = "M";        break;// 19
        case '010100': valeurText = "ML";       break;// 20
        case '010101': valeurText = "SS";       break;// 21
        case '010110': valeurText = "1";        break;// 22
        case '010111': valeurText = "2";        break;// 23
        case '011000': valeurText = "3";        break;// 24
        case '011001': valeurText = "4";        break;// 25
        case '011010': valeurText = "5";        break;// 26
        case '011011': valeurText = "6";        break;// 27
        case '011100': valeurText = "7";        break;// 28
        case '011101': valeurText = "8";        break;// 29
        case '011110': valeurText = "9";        break;// 30
        case '011111': valeurText = "10";       break;// 31
        case '100000': valeurText = "11";       break;// 32
        case '100001': valeurText = "12";       break;// 33
        case '100010': valeurText = "13";       break;// 34
        case '100011': valeurText = "14";       break;// 35
        case '100100': valeurText = "15";       break;// 36
        case '100101': valeurText = "21";       break;// 37
        case '100110': valeurText = "22";       break;// 38
        case '100111': valeurText = "23";       break;// 39
        case '101000': valeurText = "24";       break;// 40
        case '101001': valeurText = "25";       break;// 41
        case '101010': valeurText = "26";       break;// 42
        case '101011': valeurText = "27";       break;// 43
        case '101100': valeurText = "28";       break;// 44
        case '101101': valeurText = "29";       break;// 45
        case '101110': valeurText = "30";       break;// 46
        case '101111': valeurText = "G1";       break;// 47
        case '110000': valeurText = "G2";       break;// 48
        case '110001': valeurText = "G3";       break;// 49
        case '110010': valeurText = "G4";       break;// 50
        case '110011': valeurText = "PS";       break;// 51
        case '110100': valeurText = "GN";       break;// 52
        case '110101': valeurText = "HM";       break;// 53
        case '110110': valeurText = "HD";       break;// 54
        case '110111': valeurText = "RP";       break;// 55
        case '111000': valeurText = "EP";       break;// 56
        case '111001': valeurText = "TF";       break;// 57
        case '111010': valeurText = "2B";       break;// 58
        case '111011': valeurText = "16";       break;// 59
        case '111100': valeurText = "18";       break;// 60
        case '111101': valeurText = "AB";       break;// 61
        case '111110': valeurText = "";         break;// 62
        case '111111': valeurText = "";         break;// 63 
    }
    return valeurText;
}