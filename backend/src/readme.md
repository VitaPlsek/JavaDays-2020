# Good data example

## Popis architektury a řešení

Aplikace je psaná v Kotlinu a používá Spring Boot

Pro načítání proměnných z yaml konfigurace používám `@ConfigurationProperties` 

Pro logování https://github.com/MicroUtils/kotlin-logging

### Build

Pro definici používám gradle a Kotlin dsl.   

Před kompilací Kotlinu se spouští povyšovací scripty `flywayMigrate` a generování Jooq objektů `jooq-codegen-primary`. Pro build je používána oddělená databáze uložená v `tmp`

### DB
Jako DB jsem pro toto použití zvolil h2.

Pro DB migrační scripty využíbám FlywayDB https://flywaydb.org/ a pro přístup k databázi JooQ https://www.jooq.org/, který mi také generuje Pojo, která používám jako model a základní DAO třídy pro práci s nimy.
`JooqDaoConfiguration` vytváří beany pro použití ve springu. U Jooq a generovaných objektů je k diskusi zda pojmenovávat tabulky v množném nebo jednotném číslu, protože shodně se jmenují i objekty - `Sentences` / `Words`.  

Získání náhodných slov jsem přenesl na databázi, kdy rovnou vracím jen jedno náhodné slovo

```kotlin
fun getRandomWord(category: WordsCategory) =
            DSL.using(wordsDao.configuration())
                    .selectFrom(WORDS)
                    .where(WORDS.CATEGORY.eq(category))
                    .orderBy(DSL.field("RAND()"))
                    .limit(1)
                    .fetchOneInto(Words::class.java)
```
### Rest API
Použil jsem Spring boot a jeho jednoduchý přístup k restu. 

Pro řešení návratových stavů u vlastních výjimek používám dekorování anotací `@ResponseStatus` a potomka `ResponseStatusException` pro možnost nastavit specifickou message.
Pro zachycení výjímek třetí strany pak potomka `ResponseEntityExceptionHandler` s `@ExceptionHandler`.
Objekty mapuju rovnou do restu, dto bych vytvářel až ve chvíli, kdy by jim požadovaný vstup / výstup přestal odpovídat.

Nepoužil jsem zapouzdření do dalšího objektu, ale vracím rovnou objekty / pole.

#### GET /words

```
[
  {
    "word": "adjective",
    "category": "adjective"
  },
  {
    "word": "noun",
    "category": "noun"
  },
  {
    "word": "verb",
    "category": "verb"
  }
]
```

#### GET /words/noun

```
{
  "word": "noun",
  "category": "noun"
}
```

##### Chyby
Při neexistujícím slově:

```
{
  "timestamp": "2020-05-08T12:53:46.932+0000",
  "status": 404,
  "error": "Not Found",
  "message": "Entity not found",
  "path": "/words/nounX"
}
```

#### POST /words

Request:
```
{
	"word": "verb",
	"category": "verb"
}
```

Response : 201 Created

##### Chyby
Duplicitní slovo: 

```
{
  "timestamp": "2020-05-08T14:55:25.312",
  "status": 400,
  "error": "Bad request",
  "message": "Duplicate key identifier"
}
```

Zakázané slovo

```
{
  "timestamp": "2020-05-08T12:55:50.948+0000",
  "status": 403,
  "error": "Forbidden",
  "message": "Forbidden word",
  "path": "/words"
}
```

#### POST /sentences/generate

```
{
  "id": 9,
  "sentence": "noun vord adjective",
  "viewCount": 0
}
```

#### GET /sentences

```
[
  {
    "id": 1,
    "sentence": "a b c",
    "viewCount": 0
  },
  {
    "id": 2,
    "sentence": "a b c",
    "viewCount": 0
  },
  {
    "id": 3,
    "sentence": "c b a",
    "viewCount": 0
  }
]
```

#### GET /sentences/1

```
{
  "id": 1,
  "sentence": "a b c",
  "viewCount": 1
}
```

##### Chyby 

Neexistující entita: 

```
{
  "timestamp": "2020-05-08T12:58:54.061+0000",
  "status": 404,
  "error": "Not Found",
  "message": "Entity not found",
  "path": "/sentences/42"
}
```

#### GET /sentences/9/yodaTalk

```
{
  "id": 9,
  "yodaSentence": "adjective noun zakazane-slovo",
  "viewCount": 3
}
```

##### Chyby

```
{
  "timestamp": "2020-05-08T13:00:46.126+0000",
  "status": 404,
  "error": "Not Found",
  "message": "Entity not found",
  "path": "/sentences/42/yodaTalk"
}
```

#### GET /sentences/duplicates

```
[
  {
    "sentence": "a b c",
    "ids": [
      1,
      2
    ]
  },
  {
    "sentence": "noun verb adjective",
    "ids": [
      4,
      5,
      6,
      7,
      8
    ]
  }
]
```

### Testy

Pro testy rest rozhraní jsem využil podporu Spring boot, tam kde není nutné pracovat s daty jsem pro asserce vracených dat, chtěl jsem také vyzkoušet zmiňovaný `assertJson`. 

V testech testuju jak prosté získání dat a chybové stavy, tak posloupnosti, kdy se má vytvořené slovo / věta objevit v seznamu. 
Obvykle stylem `generating sentence should create sentence` v `SentencesControllerTest` kdy nechám deserializaci na Springu. 
Většinou průběžně při tvorbě aplikace vytvářím DSL pro testy, s pomocnými metodami pro zakládání objektů volání endpointů a vyhodnocování dat. 
V abstraktním předku testů pro endpointy mám i zde předdefinovány metody pro provádění dotazů, jak ve variantě získání Json / deserializovaného objektu nebo celé Response.  

## Optional úkoly

### Zakázaná slova

Načítám ze souboru při startu aplikace, složku načítám z yaml konfigurace. Také pokryto testy

### View count

Při vytvoření je ve vráceném objektu počet shlédnutí 0, před získávání detailu je pak volán sql dotaz, který provede update, následně je teprve načítán objekt z databáze.  
 
### Duplicitní věty

Duplicity počítám až při volání `/sentences/duplicates`, mám v oblibě metody pro práci s kolekcemi v Kotlinu, sem se mi hodily. 
Základní Jooq Dao zde vrací všechna data z DB jako kolekci, v případě většího množství dat bych upravil na získání streamu a nebo uvažoval o existenci samostatné tabulky agregující data o duplicitách. 

```kotlin    
fun getDuplicateSentences() =
   getSentences()
      .groupBy { it.sentence }
      .filterValues { it.size > 1 }
      .mapValues { (_,value) -> value.map { it.id }.toSet()}
      .map { (key, value)  -> DuplicateSentence(key, value) }
```            

### YodaTalk

Větu získávám stejně jako ve standardním případě, převod na jiný druh objektu jsem udělal pomocí kotliní extension funkce datového objektu. Samotný převod řeší obyčejná funkce, které Kotlin podporuje.

```kotlin
fun Sentences.toYodaSentence() = YodaSentence(this.id, this.sentence.toYodaTalk(), this.viewCount)

fun String.toYodaTalk() = this
        .split(" ")
        .let { (noun, verb, adjective) -> "$noun $adjective $verb" }

```
