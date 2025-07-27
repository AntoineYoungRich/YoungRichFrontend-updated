const contractAddress = "0x4Dc5F32826292Fa33B9A3c5c5d2F2D8f2958969d";
const abi = [{
    "inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"
},{
    "inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],
    "name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"
},{
    "inputs":[{"internalType":"address","name":"user","type":"address"}],
    "name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view","type":"function"
},{
    "inputs":[],"name":"getReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view","type":"function"
}];

let userAddress;
let contract;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        userAddress = accounts[0];
        document.getElementById("wallet-address").innerText = "Wallet: " + userAddress;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);
    } else {
        alert("Please install MetaMask!");
    }
});

async function getBalance() {
    const balance = await contract.getBalance(userAddress);
    alert("Balance: " + ethers.utils.formatEther(balance) + " MATIC");
}

async function getReserve() {
    const reserve = await contract.getReserve();
    alert("Reserve: " + ethers.utils.formatEther(reserve) + " MATIC");
}

async function deposit() {
    const amount = prompt("Enter amount to deposit in MATIC:");
    if (!amount) return;
    const tx = await contract.deposit({ value: ethers.utils.parseEther(amount) });
    await tx.wait();
    alert("Deposit successful!");
}

async function withdraw() {
    const amount = document.getElementById("withdrawAmount").value;
    if (!amount) return;
    const tx = await contract.withdraw(ethers.utils.parseEther(amount));
    await tx.wait();
    alert("Withdraw successful!");
}