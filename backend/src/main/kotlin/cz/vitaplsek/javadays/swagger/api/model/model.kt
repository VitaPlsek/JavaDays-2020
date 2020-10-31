import cz.vitaplsek.javadays.swagger.api.model.Hole

data class Court (var name: String, var holes: List<Hole>)

data class Player (var name: String, var points: List<Int>)

data class Game (var court: Court, var players: List<Player>)
