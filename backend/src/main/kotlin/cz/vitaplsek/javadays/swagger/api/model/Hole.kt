package cz.vitaplsek.javadays.swagger.api.model

import io.swagger.v3.oas.annotations.media.Schema

@Schema(enumAsRef = true)
enum class Hole {
    Prima,
    Pyramidy,
    Plosina,
    Uhel,
    Looping,
    Pricky,
    Plozene,
    Kosoctverec,
    OknoNaKl,
    Labyrint,
    Diablo,
    Trubka,
    V,
    Okno,
    Blesk,
    Ledvina,
    Salzburg
}
