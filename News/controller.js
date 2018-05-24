//News Post Script made by Lylac_SYS
//Assistance provided by: sickhippie, Miroware
//window.postMessage(console.log('Hello'),'https://mspfa.com');

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
  if (event.origin !== "https://mspfa.com") {
    return;
  } else {
    console.log('Hello');
  }
}