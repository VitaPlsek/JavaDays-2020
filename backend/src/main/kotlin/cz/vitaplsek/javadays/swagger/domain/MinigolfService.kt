package cz.vitaplsek.javadays.swagger.domain

import Court
import Game
import Player
import cz.vitaplsek.javadays.swagger.api.model.Hole
import org.springframework.stereotype.Component

@Component
class MinigolfService() {


    val games = listOf(
            Game(
                    Court("Brno Kr.pole - Hala",
                            listOf(
                                    Hole.Prima,
                                    Hole.Pyramidy,
                                    Hole.Plosina,
                                    Hole.Uhel,
                                    Hole.Looping,
                                    Hole.Pricky,
                                    Hole.Plozene,
                                    Hole.Kosoctverec,
                                    Hole.OknoNaKl,
                                    Hole.Labyrint,
                                    Hole.Diablo,
                                    Hole.Trubka,
                                    Hole.V,
                                    Hole.Okno,
                                    Hole.Blesk,
                                    Hole.Ledvina,
                                    Hole.Salzburg)),
                    listOf(
                            Player("VP", listOf(1, 1, 2, 2, 3, 2, 4, 1, 1, 2, 3, 2, 1, 1, 2, 2, 2, 1)),
                            Player("TJ", listOf(2, 1, 2, 3, 1, 2, 3, 3, 2, 1, 2, 2, 1, 1, 3, 1, 2, 3))
                    )
            ))

    fun getGame(id: Int) = games.get(id)

}
