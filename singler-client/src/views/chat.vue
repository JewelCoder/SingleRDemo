<template>
    <div>
        <span>{{message}}</span>
    </div>
</template>
<script>
import * as signalr from '@microsoft/signalr'
export default{
    name:'chart',
    data(){
        return {
            message:'Hello, this is chart component.'
        }
    },
    methods:{
        start(){
           this.$signalr.start().then(() => console.log('SignarlR Connected')).catch(err => console.log('SignalR Established : ' + err));
        },
        changeMsg(msg){
            this.message = msg
        }
    },
    created(){
        if(this.$signalr.state != signalr.HubConnectionState.Disconnected)
            this.start()
        this.$signalr.off('ChangeMessage')
        // 此为本地方法，用于服务端调用
        this.$signalr.on('ChangeMessage',this.changeMsg)
    },
    mounted(){
        if(this.$signalr.state == signalr.HubConnectionState.Disconnected)
            this.start()
    }
}
</script>
<style scoped>

</style>
