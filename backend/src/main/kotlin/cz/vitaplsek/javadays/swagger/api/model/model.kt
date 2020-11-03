import cz.vitaplsek.javadays.swagger.api.model.Hole
import java.time.LocalDateTime

data class Court(var name: String, var holes: List<Hole>)

data class ScoredPlayer(var name: String, var score: List<Int>)
data class ScoredGame(var court: Court, var players: List<ScoredPlayer>, var date: LocalDateTime = LocalDateTime.now())

data class Player(var name: String, var points: List<Int>)
data class Game(var court: Court, var players: List<Player>)
