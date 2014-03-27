# mixapp.be

Site die online zal draaien als de mensen toch via 3G/Edge naar mixapp.be surfen

## Werking

Als ze naar mixlab.be surfen, dan krijgen de genodigden de boodschap dat ze zich met het wifi-netwerk moeten verbinden.

Als ze met het wifi-netwerk verbonden zijn, zullen ze langs onze lokale DNS-server passeren die hen zal vertellen dat mixapp.be een lokaal ip-adres is. De lokale DNS-server staat namelijk binnen het AB-netwerk.


Mochten ze **via de wifi** voor één of andere reden toch op de online versie van mixapp.be terechtkomen (door DNS caching), dan wordt online toch nog eens gecheckt of ze niet met het IP van de AB aan het surfen zijn. In dat geval worden ze geredirect naar ab.mixlab.be, die sowieso naar het lokaal ip-adres binnen de AB verwijst.

### TTL's op Amazon Route 53
Ik stel voor om de TTL's op Amazon Route 53 zo laag mogelijk te zetten. Zo blijft het ip adres niet te lang in hun lokale DNS cache zitten en komen ze, na het verbinden met de wifi, mooi op de lokale versie van mixapp.be terecht.

### Dummy pagina
Momenteel zit hier een dummypagina in die de lokale mixapp.be (alsook ab.mixapp.be) moet voorstellen.Dat is nu gewoon om te testen.



