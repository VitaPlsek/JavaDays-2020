package cz.vitaplsek.javadays.swagger.api

import Game
import ScoredGame
import cz.vitaplsek.javadays.swagger.domain.MinigolfService
import org.springframework.web.bind.annotation.*


@RestController()
class MinigolfController(private val minigolfService: MinigolfService) {

    @GetMapping("game/{id}")
    fun getGame(@PathVariable id: Int) = minigolfService.getGame(id)

    @GetMapping("league")
    fun getLive() = listOf<Game>();

}
