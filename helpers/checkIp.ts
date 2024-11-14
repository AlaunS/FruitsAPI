
export const GenerateIP = async() => {
    try {
        const petition = await fetch('https://ipinfo.io/json?token=2dae2a1ef3168b');
        const data = await petition.json();

        return data.ip;
    } catch (error) {
        console.log("Fallo al obtener la IP");
        return "";
    }
}