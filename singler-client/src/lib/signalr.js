import * as signalr from '@microsoft/signalr'

const signal = new signalr.HubConnectionBuilder()
.withUrl('http://localhost:16045/commincatehub'
// ,{
//     skipNegotiation:true,
//     transport:signalr.HttpTransportType.WebSockets
// }
)
.build()

signal.install = function(app){
    signal.start().then(() => console.log('SignarlR Connected')).catch(err => console.log('SignalR Established : ' + err));
    app.config.globalProperties.$signalr = signal
}

export default signal