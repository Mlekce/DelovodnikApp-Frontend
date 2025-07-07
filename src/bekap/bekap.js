function posaljiPodatke(e) {
    e.preventDefault();

    const forma = document.getElementById("unosForma");
    const formData = new FormData(forma);
    const stranka = formData.get("stranka");
    const brPredmeta = formData.get("brpredmeta");
    const dPodnosenja = datumPodnosenja
      ? format(datumPodnosenja, "yyyy-MM-dd")
      : "";
    const referent = formData.get("referent");
    const d8 = formData.get("pravosnaznost8");
    const d30 = formData.get("pravosnaznost30");
    let dPravosnaznosti = "";

    if (d8 && d30) {
      setPoruka("Korisnička greška: Obrisite jedno od polja pravosnažnosti!");
      return;}
    else if (d8) {
      dPravosnaznosti = format(d8, "yyyy-MM-dd");
    } else if (d30) {
      dPravosnaznosti = format(d30, "yyyy-MM-dd");
    }  
    else {
      setPoruka("Morate uneti bar jedan datum pravosnažnosti!");
      return;
    }

    if (!stranka || !brPredmeta || !dPodnosenja || !referent || !dPravosnaznosti) {
      setPoruka("Korisnička greška: Sva polja moraju biti popunjena!");
      return;
    }

    async function posaljiNaBackend() {
      const url = "http://localhost:4000/api/predmet";
      const opcije = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          user: JSON.parse(localStorage.getItem("korisnik")),
          predmet: {
            stranka,
            broj_predmeta: brPredmeta,
            referent,
            datum_podnosenja: dPodnosenja,
            datum_pravosnaznosti: dPravosnaznosti,
            napomena: null,
            status: "u_izradi"
          }
        })
      };

      try {
        const rezultat = await fetch(url, opcije);
        const podaci = await rezultat.json();
        console.log(podaci)
        if (rezultat.status === 400) {
          setPoruka(podaci.poruka);
          return;
        }

        if (rezultat.status === 201) {
          setPoruka("Predmet uspešno dodat.");
          forma.reset();
          setDatumPodnosenja(null);
          setPravosnaznost8("");
          setPravosnaznost30("");
        }
      } catch (error) {
        console.error(error.message);
        setPoruka("Aplikativna greška: predmet nije dodat!");
      }
    }
    posaljiNaBackend(stranka, brPredmeta, referent, dPodnosenja, dPravosnaznosti);
  }