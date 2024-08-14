class Cobra {

    constructor () {
        this.direction = "up"
        this.caminho = []
        this.tamanho = 7
        this.velocidade = 100
        this.comeu = false
        this.morto = false
        this.movendo = false
        this.position = { x : mapa.tamanho / 2, y : mapa.tamanho /2 }
        this.gerar()
    }

    gerar () {

        for ( let t = 0; t < this.tamanho; t++ ) {

            const x = this.position.x - t
            const y = this.position.y

            this.drawPosition(x, y)

            this.caminho.push([x,y])

        }

    }

    isComeu() {

        const x = mapa.maca[0]
        const y = mapa.maca[1]

        if (x == this.position.x && y == this.position.y) {
            return true
        }

        return false

    }

    isMordeu () {

        const x = this.position.x
        const y = this.position.y

        for (const i of this.caminho) {
            
            if ( x == i[0] && y == i[1] ) {
                return true
            }

        }

        return false

    }

    morrer () {
        this.morto = true

        let tempo = 0

        for (const i of this.caminho) {

            setTimeout((tempo)=>{

                document.getElementById(`[${i[0]},${i[1]}]`).classList.add("explodindo")
                document.getElementById(`[${i[0]},${i[1]}]`).style.opacity = 0

                console.log(tempo, this.caminho.length -1 )
                if ( tempo == this.caminho.length -1 ) {
    
                    window.location.href = window.location.origin
                    
                }

            }, tempo * 300, tempo)
            
            tempo++
            
        }

    }

    comer () {

        this.tamanho = this.tamanho + 1

        mapa.gerarMaca()

        funcoes.gerarTimer()

    }

    andar () {

        if ( this.morto ) {
            return false
        }

        const cmds = {
            "up" : -1,
            "down" : 1,
            "left" : -1,
            "right" : 1
        }

        if ( this.direction == "up" || this.direction == "down" ) {
            this.position.y = this.position.y + cmds[this.direction]

            if ( mapa.morrerNaParede && ( this.position.y > mapa.tamanho -1 || this.position.y < 0 ) ) {
                return this.morrer()
            }

            if ( this.position.y > mapa.tamanho -1 ) {
                this.position.y = 0
            }

            if ( this.position.y < 0 ) {
                this.position.y = mapa.tamanho - 1
            }

        }

        if ( this.direction == "left" || this.direction == "right" ) {
            this.position.x = this.position.x + cmds[this.direction]

            if ( mapa.morrerNaParede && ( this.position.x > mapa.tamanho -1 || this.position.x < 0 ) ) {
                return this.morrer()
            }

            if ( this.position.x > mapa.tamanho -1 ) {
                this.position.x = 0
            }

            if ( this.position.x < 0 ) {
                this.position.x = mapa.tamanho - 1
            }
        }       
        
        if ( this.isMordeu() ) {
            this.morrer()
        }

        if ( this.isComeu() ) {
            this.comer()
            this.comeu = true
        }

        this.drawPosition(this.position.x, this.position.y)
        this.removeDrawPosition()

        this.caminho.unshift([this.position.x, this.position.y])

        if ( !this.comeu ) {
            this.caminho.pop()
        }

        this.comeu = false
        this.movendo = false

    }

    drawPosition ( x, y ) {

        const position = document.getElementById(`[${x},${y}]`)
        
        position.classList.add("cobra")

    }

    removeDrawPosition () {

        const index = this.caminho.length -1

        const x = this.caminho[index][0]
        const y = this.caminho[index][1]

        const antigo = document.getElementById(`[${x},${y}]`)

        antigo.classList.remove("cobra")

    }

}

const cobra = new Cobra()

mapa.gerarMaca()