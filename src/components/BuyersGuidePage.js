import { Box, Container } from "@mui/material";

export default function BuyersGuidePage() {

  return(
    <div className="buyers-guide">
      <Container>
        <img src="/images/shopping-advice.jpg" alt="cars gallery" width="100%"/>
        <div className="buyers-guide-title">
          <h2>Saveti pri kupovini</h2>
          <p>Izaberite pravi automobil, odlučite se između iznajmljivanja ili kupovine i pripremite se za pregovaranje sa prodavcem koristeći ovaj praktični vodič.</p>
        </div>
        <Box py={5}>
          <h2>Kako da kupite ili iznajmite nov auto?</h2>
          <p>Bilo da kupujete svoj prvi automobil ili zamenjujete stari, proces kupovine ili iznajmljivanja novog vozila često može biti zastrašujuć. Ne samo da je velika kupovina stresna, već je proces kupovine automobila pun prilika za potrošače da naprave greške u proceni ili da budu prevareni od strane napornog prodavca. Ne brinite! Tim iz Car and Driver-ovog Vodiča za kupce je ovde da vas opremi svim informacijama koje su vam potrebne kako biste ušli u ovaj proces s poverenjem—i da izađete iz njega osećajući se dobro zbog odluka koje ste doneli kada vam budu uručeni ključevi za vaš novi automobil, kamion, SUV ili kombi.</p>
          <h2>Kako izabrati auto koji je bas za tebe?</h2>
          <p>Prvi korak u svakom procesu kupovine automobila je odlučivanje koji tip vozila je pravi za vas. SUV-ovi su popularni, ali dolaze sa kompromisima poput niže potrošnje goriva, a mogu biti teži za parkiranje u odnosu na limuzine ili hatchback modele. Električna vozila su u trendu i mnogi kupci ih razmatraju kao način smanjenja svog ugljeničnog otiska, ali potrošači sa dužim putovanjima ili aspiracijama za dugim putovanjima mogu otkriti da domet baterije još uvek nije dovoljno dug za takve potrebe.</p>
          <h2>Kupovina ili iznajmljivanje. Kako odlučiti?</h2>
          <p> Ima mnogo toga što treba razmotriti. Iznajmljivanje automobila može vam doneti manju mesečnu ratu, ali vaš način života može biti ograničen kilometrima koji su dozvoljeni ugovorom o najmu. Uzimanje auto kredita može vam pružiti priliku da postanete vlasnik automobila nakon što otplatite finansiranje, ali ako nemate dovoljno visoku akontaciju, mogli biste doživeti šok zbog visine rate kada pokušate da je uklopite u svoj budžet.</p>
          <h2>Pregovaranje i kupovina od dilera</h2>
          <p>Bilo da vam se sviđa ili ne, auto diler će verovatno igrati ključnu ulogu u vašoj sledećoj kupovini novog vozila. Njihovi prodajni profesionalci mogu biti od velike pomoći u procesu, ali je važno imati na umu da je njihov primarni cilj ostvarivanje profita. Pametni pregovarači savetuju da znate koje su vaše prednosti i da ih iskoristite u svoju korist.</p>
        </Box>
      </Container>
    </div>
  )
}