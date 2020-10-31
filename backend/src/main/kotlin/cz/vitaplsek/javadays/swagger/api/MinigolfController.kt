package cz.vitaplsek.javadays.swagger.api

import cz.vitaplsek.javadays.swagger.domain.MinigolfService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*


@RestController()
class MinigolfController(private val minigolfService: MinigolfService) {


    @GetMapping("game/{id}")
    fun getWords(@PathVariable id: Int) = minigolfService.getGame(id)

}
