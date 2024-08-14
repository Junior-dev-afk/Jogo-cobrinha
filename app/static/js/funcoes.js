class Funcoes {

    constructor () {
        this.dificuldade = 5
        this.acelerar = true
        this.timer = false
        this.gerarTimer()
    }

    gerarTimer () {

        if ( this.timer ) {
            clearInterval(this.timer)
            this.timer = false
        }

        this.timer = setInterval(()=>{

            cobra.andar()

            if ( cobra.comeu ) {

                if (this.acelerar){

                    cobra.velocidade = cobra.velocidade - this.dificuldade

                }

                cobra.comeu = false
                this.gerarTimer()

            }

        }, cobra.velocidade)

    }

}

const funcoes = new Funcoes()


const keys = {
    "w" : ["up" , "down"],
    "s" : ["down", "up"],
    "a" : ["left", "right"],
    "d" : ["right", "left"],

    "ArrowUp" : ["up", "down"],
    "ArrowDown" : ["down", "up"],
    "ArrowLeft" : ["left", "right"],
    "ArrowRight" : ["right", "left"]
}

window.addEventListener("keydown", (e) => {

    if ( cobra.movendo ) {
        return false
    }

    if ( e.key in keys && keys[e.key][1] != cobra.direction ) {
        
        cobra.movendo = true

        cobra.direction = keys[e.key][0]

    }

})