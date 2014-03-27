# mixapp.be

Site die online zal draaien als de mensen toch via 3G/Edge naar mixapp.be surfen

## Werking

Als ze naar mixlab.be surfen, dan krijgen de genodigden de boodschap dat ze zich met het wifi-netwerk moeten verbinden.

Als ze met het wifi-netwerk verbonden zijn, zullen ze langs onze lokale DNS-forwarder passeren die hen zal vertellen dat mixapp.be een lokaal ip-adres is. De lokale DNS-forwarder staat namelijk binnen het AB-netwerk.


Mochten ze **via de wifi** voor één of andere reden toch op de online versie van mixapp.be terechtkomen (door DNS caching), dan wordt online toch nog eens gecheckt of ze niet met het IP van de AB aan het surfen zijn. In dat geval worden ze geredirect naar ab.mixlab.be, die sowieso naar het lokaal ip-adres binnen de AB verwijst.

### TTL's op Amazon Route 53
Ik stel voor om de TTL's op Amazon Route 53 zo laag mogelijk te zetten. Zo blijft het ip adres niet te lang in hun lokale DNS cache zitten en komen ze, na het verbinden met de wifi, mooi op de lokale versie van mixapp.be terecht.

### Dummy pagina
Momenteel zit hier een dummypagina in die de lokale mixapp.be (alsook ab.mixapp.be) moet voorstellen.Dat is nu gewoon om te testen.

## TODO op 1 april:
* ```ipAB``` aanpassen in ```app/config.js``` naar het IP-adres waarmee het gesurft wordt als je vanuit de AB, via onze wifi surft.

* Op Amazon Route 53: A-record voor ```ab.mixapp.be``` aanpassen naar lokaal IP-adres (machine waar regie-app op draait) binnen AB.

* Op AB zelf: lokale DNS-forwarder opzetten waarbij ```www.mixapp.be```, ```mixapp.be``` en ```ab.mixapp.be``` naar dat lokaal-IP adres verwijzen

* Onze DNS-forwarder instellen op de Ruckus ZoneDirector van Ward van InAnyEvent. Ward zal daar zelf ook zijn.

