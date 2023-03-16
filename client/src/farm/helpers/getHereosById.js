import { heroes } from "../data/heroes"

export const getHereosById = (id) => {
    return heroes.find(hero => hero.id == id)
    
}
