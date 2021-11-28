import Drake from './drake'
import Halasz from './halasz'
import Hemo from './hemo'
import Sorarium from './sorarium'

const providers = {
    'drake': new Drake(),
    'halasz': new Halasz(),
    'hemo': new Hemo(),
    'sorarium': new Sorarium()
}

export const getProvider = (name) => {
    const provider = providers[name.toLowerCase()]
    if (!provider) {
        return null
    }

    return provider
}