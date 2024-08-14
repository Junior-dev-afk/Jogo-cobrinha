class Mapa {

    constructor () {
        this.tamanhoContainer = 70
        this.tamanho = 40
        this.morrerNaParede = true
        this.maca = false
        this.pontos = -1
        this.construir()
    }

    construir() {

        const container = document.querySelector(".container-jogo")

        const height = window.innerHeight

        const containerHeigth = height * (this.tamanhoContainer / 100)
        const tamanhoItem =  containerHeigth / this.tamanho

        container.style.cssText += `
            width: ${containerHeigth}px;
            height: ${containerHeigth}px;
        `

        for (let i = 0; i < this.tamanho; i++) {

            const linha = document.createElement("div")

            for ( let v = 0; v < this.tamanho; v++ ) {

                const item = document.createElement("div")

                item.id = `[${i},${v}]`
                item.className = "item"
                item.style.cssText += `
                    width: ${tamanhoItem}px;
                    height: ${tamanhoItem}px;
                `

                linha.appendChild(item)

            }

            container.appendChild(linha)

        }

        if ( !this.morrerNaParede ) {
            container.style["outline"] = "green 1px solid"
        }

    }
    
    removeMaca () {

        if ( !this.maca ) {
            return false
        }

        const x = this.maca[0]
        const y = this.maca[1]

        const item = document.getElementById(`[${x},${y}]`)

        item.classList.remove("maca")

    }

    gerarMaca () {

        this.pontos ++

        document.querySelector(".pontos").innerHTML = this.pontos

        this.removeMaca()

        const x = Math.floor(Math.random() * this.tamanho)

        const y =  Math.floor(Math.random() * this.tamanho)

        this.maca = [x, y]

        for (let index = 0; index < cobra.caminho.length; index++) {

            const elementX = cobra.caminho[index][0];
            const elementY = cobra.caminho[index][1];

            if ( elementX == x && elementY == y ) {

                return this.gerarMaca()

            }

        }

        const item = document.getElementById(`[${x},${y}]`)

        item.classList.add("maca")

    }

}

const mapa = new Mapa()