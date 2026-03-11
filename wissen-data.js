const WISSEN_TOPICS = [
  { id: 'zelle-gewebe', name: '🔬 Zelle & Gewebe', render: renderZelleGewebe },
  { id: 'blut',         name: '🩸 Blut', render: renderBlut },
  // Weitere Themen hier ergänzen
];

// ─── Lernkontrolle: Fragen pro Thema ────────────────────────────
const LERNKONTROLLE = {
  'zelle-gewebe': [
    // ── Grundlagen Zelle ──
    { q: 'Was unterscheidet Prokaryoten von Eukaryoten?',
      a: ['Prokaryoten haben keinen echten Zellkern; ihre DNA liegt frei im Zytoplasma', 'Prokaryoten sind immer vielzellig', 'Eukaryoten haben keine Mitochondrien', 'Prokaryoten besitzen eine Kernhülle'],
      c: 0, e: 'Prokaryoten (z. B. Bakterien) besitzen KEINEN membranumhüllten Zellkern – die DNA liegt frei als Nukleoid vor. Eukaryoten (Tier, Pflanze, Pilze) haben einen echten Zellkern mit Doppelmembran.' },
    { q: 'Welche Aufgabe haben Mitochondrien?',
      a: ['Proteinsynthese', 'Energiegewinnung (ATP) durch Zellatmung', 'Fettabbau im Lysosom', 'Zellkommunikation über gap junctions'],
      c: 1, e: 'Mitochondrien sind die „Kraftwerke der Zelle". Sie produzieren durch oxidative Phosphorylierung ATP – den universellen Energieträger des Körpers. Sie besitzen eigene DNA (Hinweis auf symbiotischen Ursprung).' },
    { q: 'Welche Aufgabe hat der Golgi-Apparat?',
      a: ['Energiegewinnung durch Oxidation', 'Verpacken, Modifizieren und Weiterleiten von Proteinen und Lipiden', 'Abbau körperfremder Substanzen', 'Synthese von ribosomaler RNA'],
      c: 1, e: 'Der Golgi-Apparat ist die „Versandabteilung" der Zelle: Er modifiziert Proteine aus dem rauem ER, verpackt sie in Vesikel und schickt sie ans Ziel (Sekretionsprodukte, Lysosomen, Zellmembran).' },
    { q: 'Was sind Lysosomen und was passiert wenn sie platzen?',
      a: ['Energiespeicher; beim Platzen wird ATP freigesetzt', 'Membranumhüllte Organellen mit Verdauungsenzymen; beim Platzen → Autolyse (Selbstverdauung der Zelle)', 'Ribosomen-Cluster; beim Platzen stoppt die Proteinsynthese', 'Zellkernfragmente; beim Platzen kommt es zur Mitose'],
      c: 1, e: 'Lysosomen enthalten saure Hydrolasen (Verdauungsenzyme). Sie bauen zelleigenes Material (Autophagie) und phagozytierten Fremdmaterial ab. Wenn Lysosomen platzen, verdauen ihre Enzyme die eigene Zelle = Autolyse.' },
    { q: 'Was ist der Unterschied zwischen rauem und glattem endoplasmatischem Retikulum?',
      a: ['Raues ER produziert Lipide; glattes ER synthetisiert Proteine', 'Raues ER trägt Ribosomen und ist für Proteinsynthese/-transport zuständig; glattes ER ist ohne Ribosomen und zuständig für Lipidsynthese und Entgiftung', 'Raues ER ist nur in Nervenzellen; glattes ER in allen anderen Zellen', 'Kein funktioneller Unterschied, nur morphologisch'],
      c: 1, e: 'Raues ER (mit Ribosomen): Synthese und Transport von Proteinen, v. a. Sekretions- und Membranproteine. Glattes ER (ohne Ribosomen): Lipid- und Steroidhormonsynthese, Entgiftung (besonders in Leberzellen), Ca²⁺-Speicherung in Muskelzellen.' },
    { q: 'Was versteht man unter Apoptose?',
      a: ['Unkontrollierter Zelltod durch äußere Schädigung (Nekrose)', 'Programmierter, kontrollierter Zelltod – physiologischer Vorgang zur Gewebshomöostase', 'Zellteilung bei Mangel an Nährstoffen', 'Fusion zweier Zellen zu einer Riesenzelle'],
      c: 1, e: 'Apoptose = programmierter Zelltod: Die Zelle „begeht geordneten Selbstmord" ohne Entzündung (z. B. beim Abbau der Schwimmhäute, bei Immunselektion). Im Gegensatz dazu: Nekrose = ungeordneter Zelltod durch Schädigung mit Entzündungsreaktion.' },
    // ── Zellteilung & DNA ──
    { q: 'Was versteht man unter Mitose?',
      a: ['Redukteilung zur Bildung von Keimzellen mit haploidem Chromosomensatz', 'Gewöhnliche Zellteilung → 2 genetisch identische diploide Tochterzellen', 'Zelltod durch äußere Einwirkung', 'Fusion zweier haploider Zellen'],
      c: 1, e: 'Die Mitose ist die normale Zellteilung: eine diploide (2n) Mutterzelle teilt sich in 2 diploide Tochterzellen mit identischem Erbgut. Phasen: Prophase, Metaphase, Anaphase, Telophase, Zytokinese. Gegenteil: Meiose = Keimzellenreifung (Ergebnis: haploid, 1n).' },
    { q: 'Wie viele Chromosomenpaare hat der Mensch und was bestimmt das Geschlecht?',
      a: ['46 Paare; Geschlecht durch das 23. Paar der Mutter', '23 Paare (46 Chromosomen); Geschlecht durch das Y-Chromosom des Vaters (XX = ♀, XY = ♂)', '46 Paare; Geschlecht durch Autosomen', '23 Paare; Geschlecht durch das X-Chromosom der Mutter'],
      c: 1, e: 'Der Mensch hat 23 Chromosomenpaare (46 Chromosomen). 22 Paare = Autosomen, 1 Paar = Gonosomen (Geschlechtschromosomen). XX = weiblich, XY = männlich. Das Geschlecht wird durch das Spermium des Vaters (X oder Y) bestimmt.' },
    { q: 'Was ist der Unterschied zwischen DNA und RNA?',
      a: ['DNA ist einzelsträngig und kurzlebig; RNA ist doppelsträngig und stabil', 'DNA ist doppelsträngig, stabil, im Zellkern; RNA ist einzelsträngig, kurzlebig, überträgt Erbinformation zur Proteinsynthese', 'Beide sind identisch aufgebaut, nur DNA enthält Uracil', 'RNA befindet sich ausschließlich im Zellkern'],
      c: 1, e: 'DNA (Desoxyribonukleinsäure): doppelsträngige Doppelhelix, Basen A-T-G-C, stabil, im Zellkern (Träger der Erbinformation). RNA (Ribonukleinsäure): einzelsträngig, Basen A-U-G-C (Uracil statt Thymin), überträgt die Information aus dem Kern zu den Ribosomen (mRNA, tRNA, rRNA).' },
    // ── Gewebe ──
    { q: 'In welche 4 Grundgewebe wird der menschliche Körper eingeteilt?',
      a: ['Epithel-, Binde-/Stütz-, Muskel- und Nervengewebe', 'Epithel-, Fett-, Blut- und Knochengewebe', 'Knorpel-, Muskel-, Nerven- und Drüsengewebe', 'Epithel-, Lymph-, Muskel- und Organgewebe'],
      c: 0, e: 'Die 4 Grundgewebe: 1. Epithelgewebe (Oberflächen & Drüsen), 2. Binde- und Stützgewebe (Bindegewebe, Knorpel, Knochen, Blut), 3. Muskelgewebe (quer gestreift, glatt, Herz), 4. Nervengewebe (Neuronen, Gliazellen).' },
    { q: 'Was ist der Unterschied zwischen einschichtigem und mehrschichtigem Epithel?',
      a: ['Einschichtiges Epithel hat mehr Schichten als mehrschichtiges', 'Einschichtig: alle Zellen berühren die Basalmembran (Resorption/Filtration/Sekretion); mehrschichtig: nur unterste Schicht berührt Basalmembran (Schutzfunktion, z. B. Haut)', 'Mehrschichtiges Epithel kommt nur im Darm vor', 'Kein funktioneller Unterschied'],
      c: 1, e: 'Einschichtiges Epithel: eine Zellschicht, alle Zellen auf Basalmembran → Resorption (Darm), Filtration (Niere), Sekretion (Drüsen). Mehrschichtiges Epithel: mehrere Zelllagen, nur unterste Schicht auf Basalmembran → mechanischer Schutz (Plattenepithel der Haut, Mundschleimhaut).' },
    { q: 'Welche 3 Arten von Knorpelgewebe gibt es und wo kommen sie vor?',
      a: ['Weich-, Hart- und Faserknorpel', 'Hyalin- (Gelenkflächen, Rippen), Faser- (Bandscheiben, Symphyse) und elastischer Knorpel (Ohrmuschel, Epiglottis)', 'Roten, weißen und gelben Knorpel', 'Kompakt-, Spongiosa- und Epiphysenknorpel'],
      c: 1, e: 'Hyalinknorpel: glashell, wenig Fasern, an Gelenkflächen, Rippenknorpel, Trachea. Faserknorpel: viele Kollagenfasern, hohe Druckfestigkeit, in Bandscheiben und Schambeinfuge. Elastischer Knorpel: elastische Fasern, biegsam, in Ohrmuschel und Kehldeckel (Epiglottis).' },
    { q: 'Was unterscheidet Osteoblasten von Osteoklasten?',
      a: ['Osteoblasten bauen Knochen ab; Osteoklasten bauen auf', 'Osteoblasten bilden neue Knochensubstanz; Osteoklasten resorbieren (bauen ab) Knochen – beide sind für das Knochenremodeling verantwortlich', 'Osteoblasten sind nur im Embryo aktiv', 'Osteoklasten sind Knorpelzellen'],
      c: 1, e: 'Osteoblasten = knochenbildende Zellen (synthetisieren Kollagen und mineralisieren die Matrix). Osteoklasten = knochenabbauende Zellen (mehrkernige Riesenzellen, resorbieren Knochenmatrix durch Säuren und Enzyme). Das dynamische Gleichgewicht beider ermöglicht Knochenremodeling.' },
    { q: 'Was versteht man unter Hyalinknorpel und wo kommt er vor?',
      a: ['Faserknorpel in Bandscheiben und Symphyse', 'Glasheller Knorpel an Gelenkflächen, Rippenknorpel und Trachea', 'Elastischer Knorpel in Ohrmuschel und Kehldeckel', 'Knochenartiger Knorpel in der Schilddrüse'],
      c: 1, e: 'Hyalinknorpel = glashell, glatt, wenig sichtbare Fasern, mit Chondrozyten in Lakunen. Vorkommen: Gelenkflächen, Rippenknorpel, Nasen- und Trachealknorpel, Wachstumsfugen. Er ist der häufigste Knorpeltyp.' },
    // ── Muskelgewebe ──
    { q: 'Was unterscheidet quergestreiften vom glatten Muskel?',
      a: ['Quergestreifte Muskeln sind unwillkürlich; glatte Muskeln willkürlich steuerbar', 'Quergestreifte Muskeln (Skelettmuskel) sind willkürlich, schnell; glatte Muskeln arbeiten unwillkürlich in Hohlorganen (Darm, Blutgefäße)', 'Beide Typen sind willkürlich steuerbar', 'Glatter Muskel hat mehr Mitochondrien'],
      c: 1, e: 'Quergestreifter Skelettmuskel: willkürlich, viele Mitochondrien, schnell ermüdend. Glatter Muskel: unwillkürlich (vegetativ), in Hohlorganen (Darm, Uterus, Blutgefäßwände), ausdauernd. Herzmuskel: quergestreift aber unwillkürlich – autonomer Rhythmus.' },
    { q: 'Welche Besonderheit hat der Herzmuskel im Vergleich zu Skelett- und glattem Muskel?',
      a: ['Der Herzmuskel ist glatt und willkürlich steuerbar', 'Der Herzmuskel ist quergestreift wie Skelettmuskel, aber unwillkürlich und besitzt Glanzstreifen (Disci intercalares) für elektrische Kopplung', 'Der Herzmuskel hat keine Mitochondrien', 'Der Herzmuskel regeneriert vollständig nach Verletzung'],
      c: 1, e: 'Herzmuskel: quergestreift (wie Skelettmuskel) aber UNWILLKÜRLICH. Besonderheit: Glanzstreifen (Disci intercalares) = Zell-Zell-Verbindungen mit Gap Junctions → elektrische Kopplung → alle Herzmuskelzellen kontrahieren synchron (funktionelles Syncytium).' },
    // ── Nervengewebe ──
    { q: 'Was ist ein Neuron und welche Teile hat es?',
      a: ['Muskelzelle mit T-Tubuli und Sarkomeren', 'Nervenzelle mit Perikaryon (Zellkörper), Dendriten (Eingang) und Axon/Neurit (Ausgang)', 'Bindegewebszelle mit Kollagenfasern und Fibroblasten', 'Epithelzelle mit Mikrovilli und Basalmembran'],
      c: 1, e: 'Das Neuron = funktionelle Einheit des Nervengewebes. Perikaryon = Zellkörper mit Kern und Nissl-Körperchen. Dendriten = baumartige Fortsätze, empfangen Impulse. Axon (Neurit) = langer Fortsatz, leitet Impulse vom Perikaryon weg. Terminal = Synapse.' },
    { q: 'Was ist saltatorische Erregungsleitung?',
      a: ['Langsame, kontinuierliche Weiterleitung entlang markloser Fasern', 'Sprunghafte Weiterleitung von Ranvierschem Schnürring zu Schnürring bei markhaltigen Fasern – sehr schnell', 'Chemische Übertragung über die Synapse mittels Neurotransmitter', 'Rückwärtsleitung eines Impulses zum Zellkörper'],
      c: 1, e: 'Markhaltige (myelinisierte) Nervenfasern leiten den Impuls saltatorisch = springend von Ranvierschem Schnürring zu Schnürring (die Stellen ohne Myelinscheide). Dadurch ist die Leitung bis zu 100× schneller als bei marklosen Fasern (kontinuierliche Leitung).' },
    { q: 'Was ist eine Synapse und wie funktioniert die Signalübertragung?',
      a: ['Direkter Zell-Zell-Kontakt ohne chemische Botenstoffe', 'Kontaktstelle zwischen zwei Neuronen: elektrischer Impuls → Vesikel setzen Neurotransmitter frei → binden an Rezeptoren der Nachbarzelle → neues elektrisches Signal', 'Mechanische Verbindung zwischen Nerv und Muskel ohne Chemikalien', 'Synapse leitet nur von Muskel zum Nerv (retrograd)'],
      c: 1, e: 'Synapse: präsynaptische Membran (Endknöpfchen mit Vesikeln) → synaptischer Spalt → postsynaptische Membran. Ablauf: Aktionspotential → Ca²⁺-Einstrom → Vesikelfusion → Neurotransmitter-Ausschüttung (z. B. Acetylcholin) → Bindung an Rezeptoren → Depolarisation der Zielzelle.' },
    { q: 'Was unterscheidet afferente von efferenten Nervenfasern?',
      a: ['Afferent = vom Gehirn zur Peripherie; efferent = von der Peripherie zum Gehirn', 'Afferent = sensorisch, leiten Reize VON der Peripherie ZUM ZNS; efferent = motorisch, leiten Impulse VOM ZNS zur Peripherie', 'Kein Unterschied, nur verschiedene Bezeichnungen', 'Afferent sind nur im Rückenmark; efferent nur im Gehirn'],
      c: 1, e: 'Merkhilfe: Afferent = „Ankommen" (kommen im ZNS an) = sensorisch/sensibel. Efferent = „Entlassen" (verlassen das ZNS) = motorisch. Afferente Fasern: Sinnesorgane, Haut, Propriozeptoren → Gehirn. Efferente Fasern: Gehirn/Rückenmark → Muskeln, Drüsen.' },
    // ── Vertiefung ──
    { q: 'Was ist Phagozytose und welche Zellen sind dazu besonders fähig?',
      a: ['Aufnahme kleiner Moleküle durch die Zellmembran; alle Körperzellen', 'Aktive Aufnahme großer Partikel (Bakterien, Zelltrümmer) durch Umfließen; v. a. neutrophile Granulozyten und Makrophagen', 'Ausschleusung von Substanzen; Epithelzellen', 'Signalübertragung zwischen Zellen; Nervenzellen'],
      c: 1, e: 'Phagozytose = „Zellfressen": Die Zelle umfließt den Partikel mit Pseudopodien → bildet ein Phagosom → Fusion mit Lysosom → enzymatischer Abbau. Hauptphagozytoren: neutrophile Granulozyten (erste Linie bei Bakterien) und Makrophagen (entstehen aus Monozyten).' },
    { q: 'Was versteht man unter Zellmembran-Permeabilität und was ist der Unterschied zwischen aktiver und passiver Transport?',
      a: ['Beide Transportarten benötigen ATP', 'Passiver Transport: Konzentrationsgefälle, kein ATP nötig (z. B. Diffusion, Osmose); aktiver Transport: gegen das Konzentrationsgefälle, benötigt ATP (z. B. Na⁺/K⁺-Pumpe)', 'Aktiver Transport läuft immer schneller als passiver', 'Osmose ist ein aktiver Transportvorgang'],
      c: 1, e: 'Passiver Transport: entlang dem Konzentrationsgefälle, kein Energieverbrauch. Arten: einfache Diffusion (lipophile Moleküle), erleichterte Diffusion (Kanalproteine), Osmose (Wasser). Aktiver Transport: gegen das Konzentrationsgefälle, benötigt ATP. Wichtigstes Beispiel: Na⁺/K⁺-ATPase (hält Ruhemembranpotential aufrecht).' },
    { q: 'Was sind Gliazellen und welche Funktion haben sie?',
      a: ['Sie sind identisch mit Neuronen und leiten Impulse', 'Stützzellen des Nervensystems: ernähren, stützen und isolieren Neuronen; bilden die Myelinscheide (Oligodendrozyten/Schwann-Zellen)', 'Sie sind nur im peripheren Nervensystem vorhanden', 'Sie sind Immunzellen des Blutes'],
      c: 1, e: 'Gliazellen = Stütz- und Versorgungszellen des Nervensystems (10× häufiger als Neuronen). Oligodendrozyten (ZNS) und Schwann-Zellen (PNS) bilden die Myelinscheide. Astrozyten: Stütz- und Stoffwechselfunktion. Mikroglia: Immunzellen des ZNS (phagozytierende Funktion).' },
    { q: 'Was versteht man unter Gewebe-Regeneration und welches Gewebe regeneriert schlecht?',
      a: ['Alle Gewebe regenerieren gleich gut', 'Epithelien und Bindegewebe regenerieren gut; Herzmuskel- und Nervengewebe regenerieren kaum oder gar nicht', 'Nervengewebe regeneriert am besten', 'Knochengewebe kann sich nicht regenerieren'],
      c: 1, e: 'Regenerationsfähigkeit: Sehr gut: Epithel (Haut, Darm), Knochenmark, Leber. Mäßig: Knochen, Bindegewebe. Schlecht bis keine: Herzmuskelzellen (kaum Teilungsfähigkeit) und Neuronen des ZNS (praktisch keine Regeneration → daher bleibende Schäden nach Schlaganfall/Rückenmarksverletzung).' },
    { q: 'Was sind Mikrovilli und Zilien und wo kommen sie vor?',
      a: ['Mikrovilli und Zilien sind dasselbe', 'Mikrovilli: fingerförmige Ausstülpungen zur Oberflächenvergrößerung (Dünndarm, Niere); Zilien: bewegliche Fortsätze zum Antransport von Substanzen (Atemwege, Eileiter)', 'Mikrovilli kommen nur in Muskelzellen vor', 'Zilien produzieren Enzyme'],
      c: 1, e: 'Mikrovilli (= Bürstensaum): unbewegliche, fingerförmige Ausstülpungen der Zellmembran → Oberflächenvergrößerung für Resorption (Dünndarm: 600-fache Vergrößerung, Nierentubuli). Zilien (Kinozilien): bewegliche Fortsätze mit Axonem (9+2 Mikrotubuli-Muster) → schlagen rhythmisch → Schleim/Eizell-Transport (Bronchien, Eileiter).' },
  ],
  'blut': [
    // ── Grundlagen ──
    { q: 'Wie viel Prozent des Körpergewichts macht das Blut aus und wie viel Liter sind das?',
      a: ['3–4 %, ca. 2–3 Liter', '7–8 %, ca. 4–6 Liter', '10–12 %, ca. 7–9 Liter', '5–6 %, ca. 3–4 Liter'],
      c: 1, e: 'Das Blut macht ca. 7–8 % des Körpergewichts aus – beim Erwachsenen etwa 4–6 Liter. 80 % zirkulieren im großen Körperkreislauf, 20 % im kleinen Lungenkreislauf.' },
    { q: 'Welche 5 Hauptaufgaben hat das Blut?',
      a: ['Atmung, Verdauung, Hormonproduktion, Immunabwehr, Blutdruck', 'Transportfunktion, Abwehrfunktion, Wärmeregulation, Blutgerinnung/-stillung, Pufferfunktion', 'Nährstoffproduktion, Enzymbildung, Knochenbildung, Nervenleitung, Zellteilung', 'Sauerstoffproduktion, Antikörperbildung, Blutdruckregulation, Entgiftung, Wachstum'],
      c: 1, e: '5 Aufgaben des Blutes: 1. Transport (O₂/CO₂, Nährstoffe, Hormone, Abbauprodukte), 2. Abwehr (Leukozyten, Immunglobuline), 3. Wärmeregulation (konstant 36,5°C), 4. Blutgerinnung/-stillung (Thrombozyten, Gerinnungsfaktoren), 5. Pufferfunktion (pH 7,38–7,42).' },
    { q: 'Wo werden alle Blutzellen beim Erwachsenen gebildet?',
      a: ['In der Leber und Milz', 'Im roten Knochenmark der kurzen und platten Knochen sowie in den Epiphysen der Röhrenknochen, aus der pluripotenten Stammzelle', 'Im Thymus und den Lymphknoten', 'Im Dottersack und der Plazenta'],
      c: 1, e: 'Bildungsort: pluripotente Stammzelle im ROTEN Knochenmark der kurzen und platten Knochen (Sternum, Becken, Schulterblatt) sowie in den Epiphysen der Röhrenknochen. Beim Fetus: zuerst Dottersack, dann Leber und Milz, ab 5. SSM Knochenmark.' },
    // ── Erythrozyten ──
    { q: 'Welches Hormon regt das Knochenmark zur Bildung von Erythrozyten an und wo wird es gebildet?',
      a: ['Insulin, in der Bauchspeicheldrüse', 'Erythropoetin, in der Niere', 'Thrombopoietin, in der Leber', 'Cortisol, in der Nebenniere'],
      c: 1, e: 'Bei O₂-Mangel im Gewebe schüttet die Niere das Hormon Erythropoetin aus. Dieses regt das Knochenmark zur verstärkten Erythropoese an. Daher bilden Menschen im Hochgebirge mehr Erythrozyten (Polyglobulie).' },
    { q: 'Welche 4 Stoffe benötigt der Körper für die Erythropoese?',
      a: ['Kalzium, Magnesium, Vitamin D, Protein', 'Vitamin B12, Folsäure, Eisen (Fe) und Erythropoetin', 'Vitamin C, Zink, Kupfer und Selen', 'Thyroxin, Cortisol, Testosteron und Insulin'],
      c: 1, e: 'Für die Bildung ausreichend funktionsfähiger Erythrozyten benötigt der Körper: Vitamin B12 (Zellteilung/-reifung, Intrinsic Factor nötig), Folsäure (Zellteilung/-reifung, im Jejunum resorbiert), Eisen/Fe (O₂-Bindung, im Duodenum resorbiert) und Erythropoetin (Stimulation der Knochenmarksproduktion).' },
    { q: 'Wo wird Vitamin B12 resorbiert und was ist dafür nötig?',
      a: ['Im Magen, mit Hilfe von Pepsin', 'Im terminalen Ileum, nur mit Hilfe des Intrinsic Factors (gebildet von Belegzellen des Magens)', 'Im Duodenum, unabhängig von anderen Faktoren', 'Im Jejunum, mit Hilfe von Gallensäuren'],
      c: 1, e: 'Vitamin B12 wird im terminalen Ileum resorbiert – aber NUR mit Hilfe des Intrinsic Factors (= ein Glykoprotein, das von den Belegzellen der Magenschleimhaut produziert wird). Fehlt der Intrinsic Factor (z. B. nach Magenresektion, Autoimmungastritis) → perniziöse Anämie.' },
    { q: 'Was sagt der MCV-Wert aus und welche Anämieform zeigt ein makrozytärer MCV?',
      a: ['Mittlerer Hb-Gehalt; makrozytär → Eisenmangel', 'Mittleres Zellvolumen eines Erythrozyten; makrozytär (>98 fl) → Hinweis auf B12- oder Folsäuremangel-Anämie', 'Gesamthämoglobinmenge; makrozytär → hämolytische Anämie', 'Blutkörperchensenkung; makrozytär → chronische Entzündung'],
      c: 1, e: 'MCV = mittleres korpuskuläres Zellvolumen. Normozytär: 78–98 fl. Makrozytär (zu groß, >98 fl) → megaloblastäre Anämie durch B12- oder Folsäuremangel (Zellen können sich nicht richtig teilen → zu groß). Mikrozytär (zu klein, <78 fl) → Eisenmangel-Anämie.' },
    { q: 'Was sagt der MCH-Wert aus und welche Anämieform zeigt ein hypochromer MCH?',
      a: ['Gesamthämoglobinmenge; hypochrom → B12-Mangel', 'Mittlerer Hb-Gehalt eines einzelnen Erythrozyten; hypochrom (<26 pg) → Hinweis auf Eisenmangel-Anämie', 'Mittleres Zellvolumen; hypochrom → megaloblastäre Anämie', 'Senkungsgeschwindigkeit; hypochrom → hämolytische Anämie'],
      c: 1, e: 'MCH = mittlerer korpuskulärer Hämoglobingehalt. Normochrom: 26–32 pg. Hypochrom (zu wenig Hb geladen, <26 pg) → Hinweis auf Eisenmangel-Anämie. Hyperchrom (zu viel Hb, >32 pg) → Hinweis auf B12-Mangel-Anämie.' },
    { q: 'Was passiert beim Abbau der Erythrozyten in der Milz mit dem Hämoglobin?',
      a: ['Hämoglobin wird komplett im Urin ausgeschieden', 'Häm und Globin werden getrennt: Fe wird recycelt; eisenfreies Häm → Biliverdin → Bilirubin → Gallenwege/Leber oder Urobilinogen über Niere', 'Hämoglobin wird direkt zu neuen Erythrozyten recycelt', 'Hämoglobin wird in der Leber zu Glykogen umgewandelt'],
      c: 1, e: 'Blutmauserung (Milz): Erythrozyten → Häm + Globin getrennt. Fe wird sofort von Transferrin aufgenommen (Recycling). Eisenfreies Häm → Biliverdin → Bilirubin → Galle/Leber → Stuhlfarbe (Sterkobilin). Teil davon → Urobilinogen → Niere → Urinfarbe.' },
    // ── Leukozyten ──
    { q: 'Was sind neutrophile Granulozyten und wofür sind sie bekannt?',
      a: ['Seltene Zellen bei Parasitenbefall und Allergien', 'Häufigste Immunzellen (50–70 %); unspezifische Abwehr bei bakteriellen Infekten; phagozytieren Bakterien und zerfallen zu Eiter', 'Zellen der spezifischen humoralen Abwehr', 'Zellen die Histamin und Heparin enthalten'],
      c: 1, e: 'Neutrophile Granulozyten: 50–70 % der Leukozyten, häufigste Immunzellen. Phagozytieren Bakterien, Antigen-Antikörper-Komplexe und tote Zellen. Sterben danach ab → Eiter (Gewebstrümmer + Granulozytenreste). Linksverschiebung = viele junge Stabkernige → akute Bakterieninfektion.' },
    { q: 'Wann sind eosinophile Granulozyten erhöht und was ist die „Morgenröte der Genesung"?',
      a: ['Bei bakteriellen Infekten; Morgenröte = Beginn der Infektion', 'Bei Parasitenbefall und Allergien Typ I; am Ende einer bakteriellen Erkrankung erhöht = „Morgenröte der Genesung"', 'Bei viralen Infekten; Morgenröte = Beginn der Genesung nach Viren', 'Bei Autoimmunerkrankungen; Morgenröte = Remission'],
      c: 1, e: 'Eosinophile Granulozyten (1–5 %): rot einfärbbar. Erhöht bei Parasitenbefall (Würmer) und Allergien Typ I sowie bei chronischen Hauterkrankungen. Wichtig: Am Ende einer bakteriellen Erkrankung steigen sie an → Signal, dass die Bakterien besiegt sind = „Morgenröte der Genesung".' },
    { q: 'Was sind basophile Granulozyten und welche Substanzen enthalten sie?',
      a: ['Häufigste Granulozyten; enthalten Lysozym und Peroxidase', 'Seltenste Granulozyten (0–1 %); enthalten Heparin, Histamin und Serotonin; nach Diapedese = Mastzellen; beteiligt an Allergie Typ I', 'Bilden nach Antigenkontakt Antikörper', 'Phagozytieren hauptsächlich Viren'],
      c: 1, e: 'Basophile Granulozyten (0–1 %): blau einfärbbar, seltenste Granulozyten. Enthalten Heparin (antikoagulatorisch), Histamin (vasodilatierend) und Serotonin. Nach Diapedese ins Gewebe: Mastzellen. Beteiligt an allergischen Reaktionen Typ I (Soforttyp, z. B. Anaphylaxie).' },
    { q: 'Was ist der Unterschied zwischen B- und T-Lymphozyten?',
      a: ['B-Lymphozyten werden im Thymus geprägt; T-Lymphozyten im Knochenmark', 'B-Lymphozyten: Prägung im Knochenmark → humorale spezifische Abwehr (Antikörper). T-Lymphozyten: Prägung im Thymus → zelluläre spezifische Abwehr', 'Beide für unspezifische Abwehr', 'B bekämpfen Viren; T Bakterien'],
      c: 1, e: 'B-Lymphozyten (bone = Knochenmark): humorale Abwehr → werden zu Plasmazellen (produzieren Antikörper) und Gedächtniszellen. T-Lymphozyten (Thymus): zelluläre Abwehr → T-Killer-, T-Helfer-, T-Suppressor-, T-Gedächtniszellen. Wichtig bei Viren, Tumoren, Transplantatabstoßung.' },
    { q: 'Welche Immunglobulinklasse ist für den Nestschutz des Neugeborenen verantwortlich?',
      a: ['IgM – als Frühantikörper plazentagängig', 'IgG – ab 18. SSW plazentagängig, schützt Neugeborenes ca. 6 Monate', 'IgA – schützt Schleimhäute und kommt in der Muttermilch vor', 'IgE – löst allergische Reaktionen aus'],
      c: 1, e: 'IgG: 75 % aller Immunglobuline, einzige Klasse die die Plazenta durchquert (ab 18. SSW) → Nestschutz 6 Monate. IgA: Schleimhautschutz und in der Muttermilch (passiver Schutz durch Stillen). IgM: Frühantikörper. IgE: Allergie Typ I.' },
    { q: 'Was ist die Rolle von Monozyten/Makrophagen im Immunsystem?',
      a: ['Nur spezifische humorale Abwehr durch Antikörperproduktion', 'Bindeglied zwischen unspezifischer und spezifischer Abwehr: phagozytieren Erreger UND präsentieren Antigene den T-Lymphozyten (Antigenpräsentation)', 'Nur Blutstillung und Gerinnung', 'Nur Wärmeregulation'],
      c: 1, e: 'Monozyten (größte Leukozyten): verlassen nach 20–30 Stunden die Blutbahn → werden im Gewebe zu Makrophagen. Makrophagen: phagozytieren Bakterien, Pilze, Parasiten, Zellfragmente UND präsentieren Antigene den T-Lymphozyten → Bindeglied zwischen unspezifischer und spezifischer Abwehr. Im Gewebe: Histiozyten (Bindegewebe), Kupffersche Sternzellen (Leber).' },
    // ── Thrombozyten & Gerinnung ──
    { q: 'Aus was entstehen Thrombozyten und wie lange leben sie?',
      a: ['Aus Lymphoblasten; Lebensdauer 120 Tage', 'Aus Megakaryozyten (im Knochenmark); Lebensdauer 5–10 Tage, Abbau in der Milz', 'Aus Monozyten; Lebensdauer 20–30 Stunden', 'Aus Erythroblasten; Lebensdauer 30 Tage'],
      c: 1, e: 'Thrombozyten entstehen durch Zerfall von Megakaryozyten (= Riesenzellen im Knochenmark). Sie sind kernlos, ca. 1–4 µm groß, leben 5–10 Tage und werden dann in der Milz abgebaut. Normalwert: 150.000–400.000/µl.' },
    { q: 'Welche Phasen der Hämostase gibt es?',
      a: ['Nur Vasokonstriktion, dann direkt Fibrinbildung', 'Primäre Hämostase (1–3 Min): Vasokonstriktion → Thrombozytenaggregation → instabiler Propf; Sekundäre Hämostase (5–7 Min): Gerinnungskaskade → Fibrin → stabiler Thrombus', 'Primär: Fibrinolyse; Sekundär: Thrombozytenaggregation', 'Nur Thrombozytenanlagerung'],
      c: 1, e: 'Primäre Hämostase (Blutstillung, 1–3 Min): Verletzung → Vasokonstriktion → Thrombozyten lagern sich an → Thrombozytenaggregation = instabiler Propf + Einleitung der Kaskade. Sekundäre Hämostase (Blutgerinnung, 5–7 Min): 13 Gerinnungsfaktoren → Prothrombin→Thrombin→Fibrinogen→Fibrin → stabiler Thrombus.' },
    { q: 'Was ist der Unterschied zwischen dem intrinsischen und dem extrinsischen Gerinnungsweg?',
      a: ['Intrinsisch = außerhalb des Gefäßes; extrinsisch = innerhalb', 'Intrinsisch: Kontakt mit Fremdoberfläche (innerhalb der Gefäße, Faktoren XII→XI→IX→VIII); Extrinsisch: Gewebsverletzung mit Freisetzung von Gewebsthromboplastin (Faktor III/VII)', 'Beide Wege sind identisch', 'Intrinsisch wird durch Vitamin K gesteuert; extrinsisch durch Calcium'],
      c: 1, e: 'Intrinsisches System (endogener Weg): Aktivierung durch Kontakt mit Fremdoberfläche (z. B. Kollagen) innerhalb von Minuten. Faktoren: XII→XI→IX→VIII. Extrinsisches System (exogener Weg): Aktivierung durch Freisetzung von Gewebsthromboplastin (Faktor III) bei Gewebsverletzung. Beide münden im gemeinsamen Weg: Faktor X→V→Thrombin→Fibrin.' },
    { q: 'Wie wirkt Heparin als Gerinnungshemmer?',
      a: ['Heparin bindet Calcium-Ionen und verhindert so Faktor X', 'Heparin hemmt die Umwandlung von Fibrinogen zu Fibrin (und aktiviert Antithrombin III)', 'Heparin ist ein Vitamin-K-Antagonist', 'Heparin verhindert die Thrombozytenaggregation'],
      c: 1, e: 'Heparin hemmt die Gerinnung, indem es Antithrombin III aktiviert, das dann Thrombin und andere Gerinnungsfaktoren inaktiviert → Fibrinogen wird nicht zu Fibrin. Heparin wird auch natürlich von basophilen Granulozyten/Mastzellen produziert. Klinisch: sofort wirksam (parenteral), zur Thromboseprophylaxe/-therapie.' },
    // ── Blutgruppen ──
    { q: 'Was bedeutet "Blutgruppe 0 ist Universalspender"?',
      a: ['Blutgruppe 0 hat Anti-A und Anti-B, daher kann sie an alle spenden', 'Blutgruppe 0 hat keine A- oder B-Antigene auf den Erythrozyten → keine Antigen-Antikörper-Reaktion beim Empfänger möglich → kann an alle spenden', 'Blutgruppe 0 hat keine Antikörper im Plasma', 'Blutgruppe 0 ist in Europa am häufigsten'],
      c: 1, e: 'Blutgruppe 0: Keine Antigene A oder B auf den Erythrozyten → der Empfänger hat keine passenden Antikörper dagegen → keine Agglutination → kann an alle Blutgruppen gespendet werden. Blutgruppe AB: keine Antikörper im Plasma → Universalempfänger. In Europa sind A und 0 mit je 40 % am häufigsten.' },
    { q: 'Was ist der Morbus haemolyticus neonatorum und wie wird er verhindert?',
      a: ['ABO-Unverträglichkeit; verhindert durch Transfusion beim Kind', 'Rh-Inkompatibilität: Rh-negative Mutter bildet nach 1. Geburt Anti-D (IgG); bei 2. Schwangerschaft greift IgG das Rh-positive Kind an → Hämolyse; Prophylaxe: Anti-D-Immunglobuline nach jeder Geburt/Abbruch', 'Infektionskrankheit; verhindert durch Antibiotika', 'Eisenmangelanämie in der Schwangerschaft'],
      c: 1, e: 'Rh-negative Mutter + Rh-positives Kind: Bei der Geburt gelangen kindliche Erys ins Mutterblut → 1. Kontakt → Mutter bildet Anti-D-AK (IgG). Bei 2. Schwangerschaft: IgG ist plazentagängig → greift kindliche Erys an → Hämolyse → schwere fetale Anämie (oft tödlich). Prophylaxe: Anti-D-Immunglobuline (Anti-D-Prophylaxe) innerhalb von 72 h nach Geburt/Abbruch.' },
    { q: 'Was ist der Unterschied zwischen Blutplasma und Blutserum?',
      a: ['Blutserum enthält Fibrinogen; Blutplasma nicht', 'Blutplasma = Blutserum + Fibrinogen; Blutserum = Blutplasma ohne Fibrinogen (nach abgelaufener Gerinnung)', 'Blutplasma ist der zelluläre Anteil', 'Blutserum und Blutplasma sind identisch'],
      c: 1, e: 'Merksatz: Blut-PLASMA = Blutserum PLUS Fibrinogen. Wenn das Blut gerinnt, wird Fibrinogen zu Fibrin verbraucht → übrig bleibt das Serum (ohne Gerinnungsproteine). Serum enthält noch alle anderen Plasmaproteine (Albumine, Globuline, Antikörper) und wird z. B. für serologische Tests verwendet.' },
    { q: 'Was sind die Puffersysteme des Blutes und welchen pH-Wert muss das Blut konstant halten?',
      a: ['Phosphat und Chlorid; pH 7,0–7,2', 'Hydrogencarbonat (Bicarbonat) und Phosphat; pH 7,38–7,42; CO₂ wird über die Lunge abgeatmet, H⁺ über die Niere ausgeschieden', 'Albumine und Globuline; pH 6,8–7,0', 'Nur Hämoglobin; pH 7,5–8,0'],
      c: 1, e: 'Der pH des Blutes liegt streng bei 7,38–7,42. Puffersysteme: Bicarbonatpuffer (HCO₃⁻/H₂CO₃), Phosphatpuffer, Hämoglobin. Regulation: Lunge (CO₂-Abatmung bei Azidose) und Niere (H⁺-Ausscheidung, HCO₃⁻-Rückresorption). Azidose = pH↓ (<7,38); Alkalose = pH↑ (>7,42).' },
    { q: 'Wie wirkt Acetylsalicylsäure (ASS) auf die Gerinnung und wann ist es geeignet?',
      a: ['ASS aktiviert die Thrombozytenaggregation; geeignet bei Thrombosen', 'ASS hemmt irreversibel die Thrombozytenaggregation → verhindert Blutstillung; geeignet zur Behandlung arterieller Verschlüsse (Herzinfarkt, Schlaganfall), NICHT bei venösen Thrombosen', 'ASS ist ein Vitamin-K-Antagonist wie Marcumar', 'ASS aktiviert die Fibrinolyse direkt'],
      c: 1, e: 'ASS hemmt die Cyclooxygenase (COX) → irreversible Hemmung der Thromboxan-A₂-Synthese → Thrombozyten können nicht mehr aggregieren → Blutstillung gestört. Daher nur für ARTERIELLE Erkrankungen geeignet (Herzinfarkt, TIA/Schlaganfallprophylaxe). NW: Magenblutungen, Asthma, Allergien. NICHT geeignet für venöse Thrombosen (dafür: Heparin/Marcumar).' },
    { q: 'Was ist die BSG (Blutkörperchensenkungsgeschwindigkeit) und welche Normwerte gelten?',
      a: ['Test auf Gerinnungszeit; Männer 1–3 Min, Frauen 1–2 Min', 'Unspezifischer Suchtest: Erythrozyten sinken im verdünnten Blut ab; Normwert Männer 3–15 mm/h, Frauen 6–20 mm/h; erhöht bei Entzündungen, Infektionen, Tumoren', 'Messung des Hämoglobingehalts; Männer >13 g/dl, Frauen >12 g/dl', 'Bestimmung der Thrombozytenzahl; Normwert 150.000–400.000/µl'],
      c: 1, e: 'Die BSG (Westergren-Methode) ist ein unspezifischer Entzündungsmarker: Blut 1:4 mit Natriumcitrat verdünnen → in Pipette senkrecht aufstellen → nach 1 h und 2 h Plasmaüberstand ablesen. Normwert: Männer 3–15 mm, Frauen 6–20 mm/h. Erhöht bei Entzündungen, Infektionen, Autoimmunerkrankungen, Tumoren.' },
  ],
};

// ─── Lernfortschritt (localStorage) ────────────────────────────
const STORAGE_KEY = 'hp_lernfortschritt_v1';

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
}
function saveProgress(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}
function getTopicScore(id) {
  const p = loadProgress();
  return p[id] || { correct: 0, total: 0, lastPct: 0 };
}
function setTopicScore(id, correct, total) {
  const p = loadProgress();
  p[id] = { correct, total, lastPct: total ? Math.round(correct / total * 100) : 0 };
  saveProgress(p);
}

// ─── Wissen Navigation ──────────────────────────────────────────
let wissenInitialized = false;
let activeWissenTopic = 'zelle-gewebe';

function initWissen() {
  if (wissenInitialized) return;
  wissenInitialized = true;
  const nav = document.getElementById('wissen-nav');
  WISSEN_TOPICS.forEach(t => {
    const btn = document.createElement('button');
    btn.id = 'tab-btn-' + t.id;
    btn.className = 'wissen-tab' + (t.id === activeWissenTopic ? ' active' : '');
    btn.onclick = () => showWissenTopic(t.id);
    nav.appendChild(btn);
    renderTabLabel(btn, t.id, t.name);
  });
  showWissenTopic(activeWissenTopic);
}

function renderTabLabel(btn, id, name) {
  const score = getTopicScore(id);
  const questions = LERNKONTROLLE[id] || [];
  const total = questions.length;
  if (!total || score.total === 0) {
    btn.innerHTML = `<span class="tab-name">${name}</span>`;
    return;
  }
  const pct = score.lastPct;
  const deg = Math.round(pct / 100 * 360);
  const color = pct >= 80 ? '#27ae60' : pct >= 50 ? '#b8860b' : '#9b2335';
  btn.innerHTML = `
    <span class="tab-name">${name}</span>
    <span class="tab-progress">
      <span class="tab-pie" style="background:conic-gradient(${color} ${deg}deg, rgba(200,190,175,0.4) ${deg}deg);"></span>
      <span class="tab-pct" style="color:${color}">${pct}%</span>
    </span>`;
}

function refreshAllTabLabels() {
  WISSEN_TOPICS.forEach(t => {
    const btn = document.getElementById('tab-btn-' + t.id);
    if (btn) renderTabLabel(btn, t.id, t.name);
  });
}

function showWissenTopic(id) {
  activeWissenTopic = id;
  WISSEN_TOPICS.forEach(t => {
    const btn = document.getElementById('tab-btn-' + t.id);
    if (btn) btn.classList.toggle('active', t.id === id);
  });
  const topic = WISSEN_TOPICS.find(t => t.id === id);
  const container = document.getElementById('wissen-content');
  container.innerHTML = '';
  topic.render(container);
  // Append Lernkontrolle button at bottom
  const questions = LERNKONTROLLE[id];
  if (questions && questions.length) {
    const score = getTopicScore(id);
    const badgeText = score.total > 0 ? score.lastPct + ' % zuletzt' : questions.length + ' Fragen';
    const btn = document.createElement('button');
    btn.className = 'lernkontrolle-btn';
    btn.innerHTML = `✏️ Lernkontrolle starten <span class="btn-badge">${badgeText}</span>`;
    btn.onclick = () => startLernkontrolle(id);
    container.appendChild(btn);
  }
}

// ─── Lernkontrolle Quiz Engine ──────────────────────────────────
function startLernkontrolle(topicId) {
  const questions = [...LERNKONTROLLE[topicId]];
  // Shuffle
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  let current = 0;
  let correct = 0;
  let answered = false;

  // Build overlay
  const overlay = document.createElement('div');
  overlay.className = 'lk-overlay';
  overlay.innerHTML = `
    <div class="lk-modal">
      <div class="lk-header">
        <h3>✏️ Lernkontrolle</h3>
        <button class="lk-close" onclick="this.closest('.lk-overlay').remove()">✕</button>
      </div>
      <div class="lk-body" id="lk-body"></div>
    </div>`;
  document.body.appendChild(overlay);

  function renderQuestion() {
    answered = false;
    const q = questions[current];
    const body = document.getElementById('lk-body');
    const pct = Math.round(current / questions.length * 100);
    // Shuffle answer order
    const indices = q.a.map((_,i)=>i);
    for (let i = indices.length-1; i>0; i--) {
      const j = Math.floor(Math.random()*(i+1));
      [indices[i],indices[j]] = [indices[j],indices[i]];
    }
    const correctShuffledIdx = indices.indexOf(q.c);

    body.innerHTML = `
      <div class="lk-progress-bar"><div class="lk-progress-fill" style="width:${pct}%"></div></div>
      <div class="lk-q-num">Frage ${current + 1} von ${questions.length}</div>
      <div class="lk-question">${q.q}</div>
      <div class="lk-answers" id="lk-answers">
        ${indices.map((origIdx, si) => `
          <button class="lk-answer" data-shuffled="${si}" data-correct="${si === correctShuffledIdx}"
            onclick="lkAnswer(this, ${si === correctShuffledIdx}, '${escHtml(q.e)}', ${correctShuffledIdx})">
            ${q.a[origIdx]}
          </button>`).join('')}
      </div>
      <div id="lk-expl" style="display:none" class="lk-explanation"></div>
      <button class="lk-next-btn" id="lk-next" style="display:none"
        onclick="lkNext()">
        ${current + 1 < questions.length ? 'Nächste Frage →' : 'Ergebnis anzeigen →'}
      </button>`;
  }

  // Make functions accessible on window for inline handlers
  window.lkAnswer = function(btn, isCorrect, explanation, correctIdx) {
    if (answered) return;
    answered = true;
    if (isCorrect) correct++;
    // Mark all answers
    document.querySelectorAll('.lk-answer').forEach((b, si) => {
      b.classList.add('answered');
      if (parseInt(b.dataset.shuffled) === correctIdx) b.classList.add('show-correct');
    });
    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    // Show explanation
    const expl = document.getElementById('lk-expl');
    expl.innerHTML = `<strong>${isCorrect ? '✅ Richtig!' : '❌ Leider falsch.'}</strong> ${explanation}`;
    expl.style.display = 'block';
    document.getElementById('lk-next').style.display = 'block';
  };

  window.lkNext = function() {
    current++;
    if (current < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  };

  function showResult() {
    const pct = Math.round(correct / questions.length * 100);
    setTopicScore(topicId, correct, questions.length);
    refreshAllTabLabels();
    // Update button in content
    const contentBtn = document.querySelector('.lernkontrolle-btn');
    if (contentBtn) {
      contentBtn.querySelector('.btn-badge').textContent = pct + ' % zuletzt';
    }
    const colorClass = pct >= 80 ? 'great' : pct >= 50 ? 'mid' : 'low';
    const emoji = pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '📚';
    const msg = pct >= 80
      ? 'Ausgezeichnet! Du beherrschst dieses Thema sehr gut.'
      : pct >= 50
      ? 'Gut gemacht! Einzelne Bereiche noch vertiefen.'
      : 'Weitermachen! Lies das Thema nochmal durch und starte neu.';
    const body = document.getElementById('lk-body');
    body.innerHTML = `
      <div class="lk-result">
        <div class="lk-result-circle ${colorClass}">${pct}<span style="font-size:0.6em">%</span></div>
        <h3>${emoji} ${correct} von ${questions.length} richtig</h3>
        <p>${msg}</p>
        <div class="lk-result-btns">
          <button class="lk-btn-retry" onclick="this.closest('.lk-overlay').remove(); startLernkontrolle('${topicId}')">
            🔄 Nochmal
          </button>
          <button class="lk-btn-close" onclick="this.closest('.lk-overlay').remove()">
            Schließen
          </button>
        </div>
      </div>`;
  }

  renderQuestion();
}

function escHtml(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ─── Helper builders ───────────────────────────────────────────
function section(title, icon, content) {
  return `<div class="wissen-section">
    <div class="wissen-section-title">${icon} ${title}</div>
    ${content}
  </div>`;
}

function defList(items) {
  return '<ul class="def-list">' +
    items.map(([term, desc]) => `<li><span class="def-term">${term}</span><span class="def-desc">${desc}</span></li>`).join('') +
    '</ul>';
}

function cards(items) {
  return '<div class="cards-grid">' +
    items.map(({label, title, body}) =>
      `<div class="info-card"><div class="card-label">${label}</div><div class="card-title">${title}</div><div class="card-body">${body}</div></div>`
    ).join('') + '</div>';
}

function callout(html) { return `<div class="callout">${html}</div>`; }
function merke(text)   { return `<div class="merke-box">${text}</div>`; }

// ─── THEMA: ZELLE & GEWEBE ──────────────────────────────────────
function renderZelleGewebe(container) {
  container.innerHTML = `
    <div class="topic-header">
      <h2>Zelle &amp; Gewebe</h2>
      <p>Unterrichtsskript · Einführung in die Grundlagen des menschlichen Körpers</p>
    </div>

    ${section('Die Zelle – Grundbaustein des Lebens', '🧫', `
      <p class="wissen-prose">
        Zellen sind die kleinsten Bau- und Funktionseinheiten des Organismus.
        Der menschliche Körper besteht aus rund <strong>100 Billionen Zellen</strong>.
        Sie können Stoffe aufnehmen, umbauen und freisetzen (Stoffwechsel), wachsen, sich teilen
        und auf Reize reagieren.
      </p>
      <br>
      ${defList([
        ['Protozoen', 'Einzeller (Urtierchen) – bestehen aus nur einer Zelle'],
        ['Metazoen', 'Vielzeller – bestehen aus einer Vielzahl spezialisierter Zellen'],
        ['Prokaryoten', 'Zellen <em>ohne</em> Zellkern (z.B. Bakterien)'],
        ['Eukaryoten', 'Zellen <em>mit</em> Zellkern und Zellorganellen – alle menschlichen Zellen'],
      ])}
      ${callout('<strong>Funktionelle Differenzierung:</strong> Aus der Spezialisierung der Zellen ergeben sich unterschiedliche Form, Gestalt und Größe je nach Aufgabe im Organismus.')}
    `)}

    ${section('Zellbestandteile', '🔩', `
      ${cards([
        { label: 'Hülle', title: 'Zellmembran', body: 'Hauchdünne, flexible Hülle. Schützt den Zellinhalt, grenzt die Zelle ab. Reguliert den Stoffdurchtritt → <strong>Semipermeabilität</strong>.' },
        { label: 'Grundsubstanz', title: 'Zytoplasma', body: 'Hauptmasse der Zelle. Arbeits- und Speichergebiet. Enthält alle Zellorganellen.' },
        { label: 'Organell', title: 'Endoplasmatisches Retikulum', body: 'Hohlraumsystem im Zellinneren. Zuständig für den Transport gelöster Stoffe.' },
        { label: 'Organell', title: 'Ribosomen', body: 'Kleine Kügelchen aus Proteinen und rRNA. Wichtig für die Herstellung körpereigener Eiweiße (Translation der mRNA).' },
        { label: 'Organell', title: 'Mitochondrien', body: '„Kraftwerk der Zelle." Energiegewinnung durch Zellatmung. Energie wird als <strong>ATP</strong> gespeichert und abgegeben. Herzmuskelzellen sind besonders reich an Mitochondrien.' },
        { label: 'Organell', title: 'Zentrosomen (Zentriolen)', body: 'Steuern Zellteilungsvorgänge und regulieren Bewegungsprozesse in der Zelle.' },
        { label: 'Organell', title: 'Lysosomen', body: 'Zellorganellen mit Verdauungsenzymen. Lösen überflüssiges oder schadhaftes Material auf (Lysis = Lösung). Salopp: <em>„Die Polizei der Zelle"</em>.' },
        { label: 'Organell', title: 'Cytosomen', body: 'Kleine Speicherorgane. Speichern Stoffe wie Eisen, Melanin (Farbstoff) oder Fremdstoffe.' },
        { label: 'Steuerzentrale', title: 'Zellkern (Nukleus)', body: 'Gesamte Zellinformation (DNA) ist hier gespeichert. Steuert Zellteilung und Erbinformationsübertragung. <strong>Ausnahme ohne Zellkern: Erythrozyten (rote Blutkörperchen)</strong>.' },
      ])}
      ${merke('Alle menschlichen Zellen besitzen einen Zellkern – <strong>außer den Erythrozyten (roten Blutkörperchen)</strong>, die ihn bei ihrer Reifung abwerfen.')}
    `)}

    ${section('Chromosomen & Vererbung', '🧬', `
      <div class="wissen-prose">
        <p>Chromosomen sind die Träger der Erbanlagen und wichtigster Bestandteil des Zellkerns.</p>
      </div>
      <br>
      ${defList([
        ['46 Chromosomen', '23 Chromosomenpaare in jeder menschlichen Körperzelle'],
        ['22 Autosome', 'Körperchromosomen (nicht geschlechtsbestimmend)'],
        ['1 Paar Heterosome', 'Geschlechtschromosomen: <strong>XX = Mädchen · XY = Junge</strong>'],
      ])}
      <br>
      ${callout('<strong>Nukleinsäuren – Schlüssel der Vererbung:</strong><br>'
        + '<strong>DNA</strong> (Doppelhelix, zwei Stränge) = Träger der Erbinformation, enthält die Gene.<br>'
        + '<strong>RNA</strong> (Einzelstrang) = transportiert und übersetzt die in der DNA gespeicherten Informationen.<br>'
        + 'RNA-Typen: mRNA (Messenger), tRNA (Transfer), rRNA (ribosomal)')}
    `)}

    ${section('Zellteilung', '🔄', `
      <div class="wissen-prose">
        <p>Neue Zellen entstehen ausschließlich durch Zellteilung. Die Erbinformation der Mutterzelle muss dabei fehlerfrei auf die Tochterzellen übertragen werden.</p>
      </div>
      <br>
      <div class="wissen-section-title" style="font-size:0.95rem; border:none; margin-bottom:0.5rem;">Mitose (körperliche Zellteilung)</div>
      <p class="wissen-prose" style="margin-bottom:0.7rem;">Tochterzellen sind mit der Mutterzelle identisch (gleicher Chromosomensatz). Läuft in 5 Phasen ab:</p>
      <div class="phase-list">
        <span class="phase-badge">Interphase</span>
        <span class="phase-badge">Prophase</span>
        <span class="phase-badge">Metaphase</span>
        <span class="phase-badge">Anaphase</span>
        <span class="phase-badge">Telophase</span>
      </div>
      <br>
      <div class="wissen-section-title" style="font-size:0.95rem; border:none; margin-bottom:0.5rem;">Meiose (geschlechtliche Zellteilung = Reduktionsteilung)</div>
      <p class="wissen-prose">Aus Zellen mit <strong>doppeltem Chromosomensatz (46)</strong> entstehen Keimzellen mit <strong>einfachem Chromosomensatz (23)</strong>. Findet statt bei Eizelle und Samenzelle.</p>
      ${merke('Muskelzellen können sich <strong>nicht</strong> durch Zellteilung vermehren. Verlorene Muskelzellen werden durch minderwertiges Narbengewebe ersetzt.')}
    `)}

    ${section('Die vier Grundgewebe', '🏗️', `
      <p class="wissen-prose">Alle Organe des Menschen sind aus mehreren Gewebearten zusammengesetzt. Die 4 Grundgewebe entstanden in der embryonalen Entwicklung aus den 3 Keimblättern (Ektoderm · Mesoderm · Endoderm).</p>
      <br>
      <div class="tissue-chips">
        <span class="tissue-chip" style="background:rgba(30,58,95,0.12); color:#1e3a5f;">🏠 Epithelgewebe</span>
        <span class="tissue-chip" style="background:rgba(74,103,65,0.12); color:#4a6741;">🔗 Binde- & Stützgewebe</span>
        <span class="tissue-chip" style="background:rgba(139,69,19,0.12); color:#8b4513;">💪 Muskelgewebe</span>
        <span class="tissue-chip" style="background:rgba(107,58,125,0.12); color:#6b3a7d;">⚡ Nervengewebe</span>
      </div>
    `)}

    ${section('Epithelgewebe', '🏠', `
      <p class="wissen-prose">
        <em>griech. epi = auf, thelos = Hülle</em><br>
        Überall dort, wo eine Oberfläche abzudecken ist: Außenhaut, Schleimhäute, Magen-Darm-Kanal, Harnwege.
        Wird von darunter liegendem Bindegewebe durch die <strong>Basalmembran</strong> getrennt.
      </p>
      <br>
      ${defList([
        ['Mesothel', 'Epitheliale Auskleidung der Leibeshöhlen (Bauchfell/Peritoneum, Lungen-/Rippenfell/Pleura, Herzbeutel/Perikard)'],
        ['Endothel', 'Auskleidung von Blut- und Lymphgefäßen sowie der Herzinnenhaut'],
      ])}
      <br>
      ${cards([
        { label: 'Funktion', title: 'Deckepithel', body: 'Schutzfunktion und Stoffaustausch. Kann einschichtig oder mehrschichtig vorkommen.' },
        { label: 'Funktion', title: 'Drüsenepithel', body: 'Dient der Sekretion. Produziert Gallensaft, Magensaft, Speichel, Schleim. Unterteilung in <strong>exokrine</strong> (Ausführungsgang nach außen) und <strong>endokrine</strong> Drüsen (Abgabe direkt ans Blut).' },
        { label: 'Funktion', title: 'Sinnesepithel', body: 'Reizaufnahme, z.B. Sinneshaarzellen im Ohr.' },
      ])}
      <br>
      <div class="sketch-container">
        <div class="sketch-card">
          <div class="sketch-title">Einschichtiges Deckepithel</div>
          <div class="sketch-row"><div class="sketch-cell flat"></div> Plattenepithel – flache Zellen</div>
          <div class="sketch-row"><div class="sketch-cell"></div> Kubisches Epithel – würfelförmig</div>
          <div class="sketch-row"><div class="sketch-cell tall"></div> Zylinderepithel – säulenförmig</div>
          <div class="sketch-row"><div class="sketch-cell round" style="background:#eee"></div><div class="sketch-cell round"></div><div class="sketch-cell round"></div> Mehrreihiges Epithel</div>
          <p style="margin-top:0.7rem; font-size:0.78rem; color:#888; font-style:italic;">→ Alle Zellen sitzen <em>einschichtig</em> auf der Basalmembran</p>
        </div>
        <div class="sketch-card">
          <div class="sketch-title">Mehrschichtiges Deckepithel</div>
          <div style="display:flex; flex-direction:column; gap:3px; margin:0.5rem 0;">
            <div style="display:flex; gap:4px;">
              <div class="sketch-cell" style="background:#e8e0d0;"></div><div class="sketch-cell" style="background:#e8e0d0;"></div><div class="sketch-cell" style="background:#e8e0d0; background: repeating-linear-gradient(45deg, #e8e0d0, #e8e0d0 2px, #ccc 2px, #ccc 4px);"></div>
              <span style="font-size:0.75rem; margin-left:0.3rem; color:#888;">← verhorntes Epithel</span>
            </div>
            <div style="display:flex; gap:4px;"><div class="sketch-cell"></div><div class="sketch-cell"></div><div class="sketch-cell"></div></div>
            <div style="display:flex; gap:4px;"><div class="sketch-cell"></div><div class="sketch-cell"></div><div class="sketch-cell"></div></div>
          </div>
          <p style="font-size:0.8rem; color:#555; margin-top:0.3rem;">Mehrschichtiges Plattenepithel (verhornt/unverhornt)</p>
          <div style="margin-top:0.7rem;">
            <div style="display:flex; gap:4px; flex-wrap:wrap; margin-bottom:4px;"><div class="sketch-cell"></div><div class="sketch-cell"></div><div class="sketch-cell"></div></div>
            <div style="display:flex; gap:4px; flex-wrap:wrap;"><div class="sketch-cell"></div><div class="sketch-cell"></div></div>
            <p style="font-size:0.78rem; color:#888; font-style:italic; margin-top:0.4rem;">Übergangsepithel – dehnbar (Harnblase)</p>
          </div>
          <p style="margin-top:0.7rem; font-size:0.78rem; color:#888; font-style:italic;">→ Zellen in <em>mehreren Schichten</em> auf der Basalmembran</p>
        </div>
      </div>
    `)}

    ${section('Binde- & Stützgewebe', '🔗', `
      <p class="wissen-prose">Das am häufigsten vorkommende Gewebe. Verbindet Gewebe, Organe und Systeme. Besteht aus <strong>Zellen, Fasern und einer Grundsubstanz</strong>.</p>
      <br>
      ${defList([
        ['Fibroblasten', 'Fixe BG-Zellen. Beteiligen sich an der Regeneration vieler Gewebe.'],
        ['Fibrozyten', 'Fixe BG-Zellen. Bilden die eigentliche Grundsubstanz des BG.'],
        ['Mobile BG-Zellen', 'Histiozyten, Monozyten, Lymphozyten, Granulozyten, Plasmazellen – Immunabwehr.'],
        ['Kollagenfasern', 'Zugfestigkeit + Elastizität. Vorkommen: Menisken, Bandscheiben.'],
        ['Elastische Fasern', 'Stark dehnbar. Vorkommen: Knorpel Ohr + Nase.'],
      ])}
      <br>
      ${cards([
        { label: 'Form', title: 'Lockeres BG', body: 'Füllt Lücken aus, umhüllt Nerven/Gefäße, verbindet Organe. Dient als Füllgewebe und Verschiebeschicht. Reich an freien Zellen → wichtige Immunabwehrfunktion.' },
        { label: 'Form', title: 'Straffes BG', body: 'Aus zugfesten kollagenen Fasern. Hohe mechanische Beanspruchbarkeit. <strong>Sehnen, Aponeurosen (Hohlhandsehne), Faszien (Muskelumhüllungen), Bänder</strong>.' },
        { label: 'Form', title: 'Fettgewebe', body: '<strong>Baufett:</strong> Polster & Organhalterung (Nieren, Fußsohlen).<br><strong>Speicherfett:</strong> Energiereserve im Unterhautfettgewebe.' },
        { label: 'Stützgewebe', title: 'Hyaliner Knorpel', body: 'Häufigster Knorpel. Rippenknorpel, Gelenkenden, Nasenscheidewand, Kehlkopf, Luftröhre, Bronchien.' },
        { label: 'Stützgewebe', title: 'Elastischer Knorpel', body: 'Leicht verformbar. Nasenspitze, Ohrmuschel, Kehldeckel.' },
        { label: 'Stützgewebe', title: 'Faserknorpel', body: 'Sehr robust. Bandscheiben, Menisken.' },
      ])}
      <br>
      <div class="wissen-section-title" style="font-size:0.95rem; border:none; margin-bottom:0.6rem;">Knochengewebe</div>
      ${defList([
        ['Osteoblasten', 'Für den Knochenaufbau verantwortlich (Einlagerung von Calcium).'],
        ['Osteozyten', 'Ausdifferenzierte Knochenzellen, in der Grundsubstanz eingemauert.'],
        ['Osteoklasten', 'Für den Knochenabbau verantwortlich (Entzug von Calcium).'],
        ['Haverssche Kanäle', 'Versorgen den Knochen mit Blut und Nährstoffen.'],
        ['Desmale Ossifikation', 'Bindegewebige Verknöcherung (z.B. Schädelknochen, Schlüsselbein).'],
        ['Chondrale Ossifikation', 'Knorpelige Verknöcherung über Epiphysenfugen (z.B. Röhrenknochen).'],
      ])}
    `)}

    ${section('Muskelgewebe', '💪', `
      ${cards([
        { label: 'Typ 1', title: 'Glatte Muskulatur', body: '<strong>Unwillkürlich</strong> – vegetatives Nervensystem. Arbeitet langsam, rhythmisch, <em>nicht ermüdbar</em>. Vorkommen: Magen-Darm-Trakt, Blutgefäße, Atemwege, Uro-Genitaltrakt.' },
        { label: 'Typ 2', title: 'Quergestreifte Muskulatur', body: '<strong>Willkürlich</strong> – willkürliches Nervensystem. Arbeitet rasch, nicht rhythmisch, <em>ermüdbar</em>. Vorkommen: Skelettmuskulatur, Gesichtsmuskeln, Zunge, Zwerchfell.' },
        { label: 'Sonderform', title: 'Herzmuskulatur', body: 'Aufbau wie quergestreifte Muskulatur, arbeitet aber wie glatte (rhythmisch, unermüdbar, unwillkürlich). Gesteuert durch Sympathikus / Parasympathikus.' },
      ])}
      ${merke('Muskelzellen können sich <strong>nicht</strong> durch Zellteilung vermehren. Muskelfasern können sich zwar regenerieren (benötigen viel Sauerstoff), aber verlorene Zellen werden durch Narbengewebe ersetzt.')}
    `)}

    ${section('Nervengewebe', '⚡', `
      <p class="wissen-prose">
        Das höchstentwickelte Gewebe. Besteht aus <strong>Neuronen</strong> (Nervenzellen) und <strong>Gliazellen</strong> (Stützzellen).
        Gliazellen ernähren, stützen und schützen die Neuronen.
      </p>
      <br>
      <div class="wissen-section-title" style="font-size:0.95rem; border:none; margin-bottom:0.6rem;">Aufbau des Neurons</div>
      <div class="nerve-parts">
        <div class="nerve-part"><strong>Dendriten</strong>Mehrere kurze Fortsätze. Nehmen Reize auf und leiten sie zum Zellkörper.</div>
        <div class="nerve-part"><strong>Neurit / Axon</strong>Ein langer Fortsatz (bis 1 m!). Leitet Reize vom Zellkörper zu anderen Nervenzellen oder Organen.</div>
        <div class="nerve-part"><strong>Synapse</strong>Verbindungsstelle zwischen Neurit und Dendriten einer anderen Nervenzelle oder Sinneszelle.</div>
        <div class="nerve-part"><strong>Motorische Endplatte</strong>Verbindungsstelle zwischen Neurit und Erfolgsorgan (Muskel).</div>
        <div class="nerve-part"><strong>Neurotransmitter</strong>Chemische Botenstoffe in Synapsen (z.B. Acetylcholin, Noradrenalin, Serotonin, Dopamin). Wandeln elektrische in chemische Signale um.</div>
        <div class="nerve-part"><strong>Nissl-Körperchen</strong>Strukturen im Perikaryon (Zellkörper), enthalten rER + Ribosomen.</div>
      </div>
      <br>
      <div class="wissen-section-title" style="font-size:0.95rem; border:none; margin-bottom:0.6rem;">Nervenfasertypen</div>
      ${defList([
        ['Marklose Nervenfaser', 'Keine Myelinschicht. Schwann-Zellen sitzen direkt auf dem Neurit. Reizleitung <strong>kontinuierlich und langsam</strong>.'],
        ['Markhaltige Nervenfaser', 'Neurit von Myelinschicht (Markscheide) umgeben. Schwann-Zellen bilden Ranviersche Schnürringe. Reizleitung <strong>saltatorisch (springend) und sehr schnell</strong>.'],
        ['Afferente Fasern', 'Sensorisch – leiten Reize von Sinnesorganen ZUM Gehirn (empfangen).'],
        ['Efferente Fasern', 'Motorisch – leiten Impulse vom Gehirn zur Peripherie (agieren).'],
      ])}
      ${callout('<strong>Zentrales NS:</strong> Gehirn + Rückenmark<br><strong>Peripheres NS:</strong> Nerven, Nervengeflechte, Ganglien')}
    `)}

    ${section('Wichtig für Prüfung – Kompaktzusammenfassung', '📚', `
      <div class="pruefungswichtig-toolbar">
        <button class="pruefungswichtig-add-btn" onclick="addPruefungswichtigSection('zelle-gewebe')">+ Neue Sektion hinzufügen</button>
      </div>
      <div id="pruefungswichtig-container-zelle-gewebe">
        <p style="color:#666; text-align:center; padding:1rem;">Lade Prüfungsinhalte...</p>
      </div>
      <script>
        (async function() {
          const container = document.getElementById('pruefungswichtig-container-zelle-gewebe');
          if (container) {
            container.innerHTML = await renderPruefungswichtigFromJSON('zelle-gewebe');
          }
        })();
      </script>

      ${renderPruefungsNotizenEditor('zelle-gewebe')}
    `)}

    ${section('Karteikarten lernen', '🎴', `
      <p class="wissen-prose" style="margin-bottom: 1rem;">Lerne die wichtigsten Fakten zu Zelle & Gewebe mit <strong>interaktiven Karteikarten</strong>. Perfekt zum Wiederholen und für die Prüfungsvorbereitung!</p>
      ${renderKarteikartenButton('zelle-gewebe')}
    `)}

    ${renderVideosSection('zelle-gewebe')}

    ${renderAnhaengeSection('zelle-gewebe')}
  `;
}

// ─── THEMA: BLUT ────────────────────────────────────────────────
function renderBlut(container) {
  container.innerHTML = `
    <div class="topic-header">
      <h2>Blut – Anatomie &amp; Physiologie</h2>
      <p>Skript nach HP A. Beck · Paracelsus-Schulen · Blutbestandteile, Funktion, Gerinnung &amp; Blutgruppen</p>
    </div>

    ${section('Überblick: Das Blut', '🩸', `
      <p class="wissen-prose">
        Das Blut ist ein <strong>flüssiges Körpergewebe</strong>, das innerhalb der Blutgefäße fließt.
        Seine Interzellularsubstanz ist das Blutplasma. Die gesamte Blutmenge beträgt ca. <strong>7–8 % des Körpergewichts</strong> (ca. 4–6 Liter).
        80 % zirkulieren im großen Körperkreislauf, 20 % im kleinen Lungenkreislauf.
      </p>
      <br>
      <div class="cards-grid">
        <div class="info-card">
          <div class="card-label">Zusammensetzung</div>
          <div class="card-title">Zelluläre Anteile (~45 %)</div>
          <div class="card-body">
            <strong style="color:#c0392b;">Erythrozyten</strong> – Normwert 4,5–5,5 Mio/µl · Sauerstoffversorgung<br>
            <strong style="color:#2980b9;">Leukozyten</strong> – Normwert 4.000–10.000/µl · Abwehr<br>
            <strong style="color:#8e44ad;">Thrombozyten</strong> – Normwert 150.000–400.000/µl · Blutstillung
          </div>
        </div>
        <div class="info-card">
          <div class="card-label">Zusammensetzung</div>
          <div class="card-title">Blutplasma (~55 %)</div>
          <div class="card-body">
            Wasser · Nährstoffe · Mineralien &amp; Vitamine · Spurenelemente · Enzyme · Hormone · Abbauprodukte · <strong>Plasmaproteine</strong> (Albumine, Globuline)
          </div>
        </div>
      </div>
      <br>
      ${defList([
        ['Transportfunktion', 'O₂/CO₂ (zellulär), Nährstoffe, Hormone, Abbauprodukte (humoral)'],
        ['Abwehrfunktion', 'Leukozyten (zellulär) + Immunglobuline (humoral)'],
        ['Wärmeregulation', 'Konstante Körpertemperatur 36,5 °C durch kontinuierliche Zirkulation'],
        ['Blutgerinnung/-stillung', 'Thrombozyten (zellulär) + Gerinnungsfaktoren (humoral)'],
        ['Pufferfunktion', 'Regulation des Säure-Basen-Haushalts · pH-Wert konstant 7,38–7,42'],
      ])}
    `)}

    ${section('Hämatopoese – Blutbildung', '🏭', `
      <p class="wissen-prose">
        <strong>Hämatopoese</strong> = Bildung und Reifung aller Blutzellen aus der <strong>pluripotenten Stammzelle im roten Knochenmark</strong> der kurzen und platten Knochen (Schulterblatt, Becken, Sternum) sowie in den Epiphysen der Röhrenknochen.
      </p>
      ${callout('<strong>Beim Fetus:</strong> zuerst Dottersack → bis 6./7. Monat Leber + Milz → ab 5. SSM rotes Knochenmark.')}
      <br>
      ${defList([
        ['Erythropoese', 'Bildung von Erythrozyten (Sauerstofftransport)'],
        ['Leukopoese', 'Bildung von Leukozyten (Abwehr) → Vorläufer: Granulozyten, Lymphozyten, Monozyten'],
        ['Thrombopoese', 'Bildung von Thrombozyten (Blutstillung) → aus Megakaryozyten'],
      ])}
    `)}

    ${section('Erythrozyten – Rote Blutkörperchen', '🔴', `
      ${cards([
        { label: 'Morphologie', title: 'Aufbau', body: 'Kernlose, bikonkave Scheiben · Ø ca. 7,5 µm · <strong>kein Zellkern, keine Mitochondrien</strong> · können sich nicht teilen · Lebensdauer 120 Tage · Abbau vorwiegend in der <strong>Milz</strong> (Blutmauserung)' },
        { label: 'Funktion', title: 'Aufgaben', body: 'O₂-Transport · CO₂-Transport · Pufferung des Blutes · stellen <strong>98 %</strong> des Hämatokrit' },
        { label: 'Hauptbestandteil', title: 'Hämoglobin', body: '<strong>Häm</strong> = roter Blutfarbstoff, enthält Eisen (Fe), bindet O₂ und CO₂<br><strong>Globin</strong> = Eiweißanteil' },
        { label: 'Regulation', title: 'Erythropoese-Steuerung', body: 'Reiz = O₂-Mangel im Gewebe → Niere schüttet <strong>Erythropoetin</strong> aus → Knochenmark bildet neue Erythrozyten' },
      ])}
      <br>
      <div class="wissen-section-title" style="font-size:0.95rem; border:none; margin-bottom:0.6rem;">Abbauweg der Erythrozyten</div>
      <div style="display:flex; align-items:center; flex-wrap:wrap; gap:0.4rem; font-size:0.85rem; margin-bottom:1rem;">
        <span class="phase-badge" style="background:#c0392b;">Häm + Globin</span>
        <span style="color:#888;">→ Fe freigesetzt → Transportprotein → Wiederverwendung</span>
        <br style="width:100%;">
        <span class="phase-badge" style="background:#7f8c8d; margin-top:0.4rem;">eisenfreies Häm</span>
        <span style="color:#888; margin-top:0.4rem;">→ Biliverdin → <strong>Bilirubin</strong> → Gallenweg/Leber → Urobilinogen → Niere</span>
      </div>
      <div class="wissen-section-title" style="font-size:0.95rem; border:none; margin-bottom:0.6rem;">Für die Erythropoese benötigt der Körper</div>
      ${defList([
        ['Vitamin B12', 'Resorption im terminalen Ileum, nur mit <strong>Intrinsic Factor</strong> (Belegzellen des Magens). Speicherung in Leber (~5 Jahre). Fördert Zellteilung/-reifung. Wichtig für Nerven.'],
        ['Folsäure', 'Resorption im Jejunum. Wie B12 in Leber gespeichert. Fördert Zellteilung/-reifung. <strong>Nicht</strong> für Nervenernährung zuständig.'],
        ['Eisen (Fe)', 'Resorption im Duodenum. Leber (Speicher ~3 Monate). Bindet Sauerstoff.'],
        ['Erythropoetin', 'Wird in der Niere gebildet. Stimuliert bei O₂-Mangel die Erythropoese.'],
      ])}
      <br>
      <div class="wissen-section-title" style="font-size:0.95rem; border:none; margin-bottom:0.6rem;">Laborwerte Erythrozyten</div>
      ${defList([
        ['Hämatokrit (Hkt)', 'Prozentualer Anteil aller Blutzellen am Gesamtvolumen. Männer 42–52 % · Frauen 37–47 %'],
        ['Hämoglobin (Hb)', 'Männer 13,5–17 g/dl · Frauen 12–16 g/dl'],
        ['MCH', 'Mittlerer Hb-Gehalt eines Erythrozyten · normochrom 26–32 pg · hyperchrom → B12-Mangel · hypochrom → Fe-Mangel'],
        ['MCV', 'Mittleres Zellvolumen · normozytär 78–98 fl · makrozytär → B12-Mangel · mikrozytär → Fe-Mangel'],
        ['BSG', 'Blutkörperchensenkungsgeschwindigkeit (unspezifischer Suchtest) · Männer 3–15 mm/h · Frauen 6–20 mm/h'],
        ['Retikulozyten', 'Wichtiger Parameter für die Neubildungsrate der Erythrozyten'],
      ])}
      ${merke('Anämie (Blutarmut) entsteht häufig durch <strong>Eisenmangel, Vitamin-B12-Mangel oder Folsäuremangel</strong>. In großer Höhe steigt die Erythrozytenzahl kompensatorisch an = <strong>Polyglobulie</strong>.')}
    `)}

    ${section('Leukozyten – Weiße Blutkörperchen', '⚪', `
      <p class="wissen-prose">
        Leukozyten sind nur zu <strong>5–10 % im Blut</strong> nachweisbar. Das Blut ist für sie nur ein Transportweg.
        40 % befinden sich im Knochenmark, 55 % in blutgefäßnahen Bindegewebsräumen.
      </p>
      <br>
      ${callout('<strong>Diapedese</strong> = Durchtritt der amöboiden Leukozyten durch die Gefäßwand ins Gewebe.<br><strong>Chemotaxis</strong> = durch chemische Stoffe bewirkte Phagozytendiapedese aus dem Blutgefäßsystem in das Bindegewebe.')}
      <br>

      <div class="wissen-section-title" style="font-size:1rem; border:none; margin-bottom:0.6rem;">🔶 Granulozyten (~60 % der Leukozyten) · Größe 10–17 µm</div>
      <p class="wissen-prose" style="margin-bottom:0.8rem;">Aufgabe: <strong>sofortige, unspezifische zelluläre Abwehr</strong></p>
      ${cards([
        { label: 'Granulozyten 50–70 %', title: 'Neutrophile (schwach einfärbbar)', body: 'Häufigste Immunzellen. Treten besonders bei <strong>bakteriellen Infekten</strong> auf. Phagozytieren Bakterien + Antigen-Antikörper-Komplexe → zerfallen zu <strong>Eiter</strong>.<br><strong>Linksverschiebung</strong> = viele junge Stabkernige → akuter Infekt<br><strong>Rechtsverschiebung</strong> = viele übersegmentierte → überaltert/B12-Mangel' },
        { label: 'Granulozyten 1–5 %', title: 'Eosinophile (rot einfärbbar)', body: 'Erhöht bei <strong>Parasitenbefall</strong> und <strong>Allergien Typ I</strong>. Bei chronischen Hauterkrankungen erhöht. Am Ende einer bakteriellen Erkrankung erhöht = <em>„Morgenröte der Genesung"</em>' },
        { label: 'Granulozyten 0–1 %', title: 'Basophile (blau einfärbbar)', body: 'Nach Diapedese = <strong>Mastzellen</strong>. Enthalten <strong>Heparin, Histamin, Serotonin</strong>. Abwehr gegen Parasiten. Beteiligt an <strong>allergischen Reaktionen Typ I</strong> (Anaphylaxie).' },
      ])}

      <br>
      <div class="wissen-section-title" style="font-size:1rem; border:none; margin-bottom:0.6rem;">🔵 Lymphozyten (~20–30 % der Leukozyten)</div>
      <p class="wissen-prose" style="margin-bottom:0.8rem;">Aufgabe: <strong>spezifische Abwehr</strong> · Lebensdauer 8 Tage bis mehrere 100 Tage</p>
      ${cards([
        { label: 'B-Lymphozyten', title: 'Prägung im Knochenmark (bone)', body: '<strong>Humorale spezifische Abwehr</strong>. Nach Antigenkontakt → Plasmazellen (bilden Antikörper/Immunglobuline) + Gedächtniszellen (Memory-B-Zellen). Schlüssel-Schloss-Prinzip.' },
        { label: 'T-Lymphozyten', title: 'Prägung im Thymus', body: '<strong>Zelluläre spezifische Abwehr</strong>. Unterscheiden körpereigen von körperfremd. Wichtig bei: viralen Infekten, Tumorabwehr, Transplantationsabstoßung, Allergien (verzögert).' },
      ])}
      <br>
      <div class="wissen-section-title" style="font-size:0.9rem; border:none; margin-bottom:0.5rem;">T-Lymphozyten Unterarten</div>
      ${defList([
        ['T-Killerzellen', 'Greifen Antigen direkt an → Tumorabwehr, virusinfizierte Zellen, Transplantationsabstoßung'],
        ['T-Helferzellen', 'Fördern Antikörperbildung, aktivieren T-Killerzellen'],
        ['T-Suppressorzellen', 'Hemmen überschießende Immunreaktionen'],
        ['T-Gedächtniszellen', 'Verantwortlich für Immunität (wandern in lymphatisches Gewebe, jahrzehntelange Zirkulation)'],
      ])}
      <br>
      <div class="wissen-section-title" style="font-size:0.9rem; border:none; margin-bottom:0.5rem;">Immunglobuline (Antikörper-Klassen)</div>
      ${defList([
        ['IgA', 'Schleimhautoberflächen. In Speichel, Schweiß, Tränen, Muttermilch.'],
        ['IgD', 'Nur in Spuren nachweisbar. Funktion nicht vollständig geklärt.'],
        ['IgE', 'Geringste Konzentration. Erhöht bei Allergie + Parasitenbefall. Andocken an Mastzellen → Histaminausschüttung → <strong>Anaphylaxie (Allergie Typ I)</strong>.'],
        ['IgG', 'Häufigste (75 % aller Ig). Ab 18. SSW <strong>plazentagängig</strong> → Nestschutz 6 Monate. Erscheint 2–4 Wochen nach Infektion (<em>„Spätantikörper"</em>).'],
        ['IgM', '<em>„Frühantikörper"</em> – erscheint als 1. Immunglobulin nach Antigenkontakt. Kurz beständig.'],
      ])}
      <br>
      <div class="wissen-section-title" style="font-size:1rem; border:none; margin-bottom:0.6rem;">🟤 Monozyten (größte Leukozyten)</div>
      <p class="wissen-prose">Verbleiben nur ~20–30 Stunden im Blut → wandern dann ins Gewebe → werden zu <strong>Makrophagen</strong>. Je nach Ort: <strong>Histiozyten</strong> (Bindegewebe) oder <strong>Kupffersche Sternzellen</strong> (Leber).</p>
      ${callout('Makrophagen = Bindeglied zwischen unspezifischer und spezifischer Abwehr: phagozytieren Erreger <strong>und</strong> präsentieren Antigene den T-Lymphozyten (<strong>Antigenpräsentation</strong>).')}
      <br>
      <div class="cards-grid">
        <div class="info-card">
          <div class="card-label">Unspezifische Abwehr</div>
          <div class="card-title">Zelluläre Abwehr</div>
          <div class="card-body">Neutrophile Granulozyten · Monozyten · Makrophagen</div>
        </div>
        <div class="info-card">
          <div class="card-label">Unspezifische Abwehr</div>
          <div class="card-title">Humorale Abwehr</div>
          <div class="card-body">Monozyten · Makrophagen</div>
        </div>
        <div class="info-card">
          <div class="card-label">Spezifische Abwehr</div>
          <div class="card-title">Zelluläre Abwehr</div>
          <div class="card-body">Antigenpräsentation durch Makrophagen · T-Lymphozyten (Helper, Suppressor, Killer)</div>
        </div>
        <div class="info-card">
          <div class="card-label">Spezifische Abwehr</div>
          <div class="card-title">Humorale &amp; zelluläre Abwehr</div>
          <div class="card-body">B-Lymphozyten → Plasmazellen → Immunglobuline (Antikörper)</div>
        </div>
      </div>
      <br>
      ${callout('<strong>Aktive Immunisierung:</strong> Körper bildet AK selbst (Infektion oder Schutzimpfung mit abgeschwächten Erregern) → langanhaltende Immunität.<br><strong>Passive Immunisierung:</strong> Fertige AK werden zugeführt → kurze Schutzwirkung (wenige Wochen).')}
    `)}

    ${section('Thrombozyten – Blutplättchen', '🔷', `
      <p class="wissen-prose">Normwert: <strong>150.000 – 400.000 / µl</strong> · ca. 1–4 µm groß · kernlos · Lebensdauer 5–10 Tage · Abbau in der Milz. Entstehen aus <strong>Megakaryozyten</strong> im Knochenmark.</p>
      <br>
      ${defList([
        ['Primäre Hämostase (Blutstillung)', 'Dauer 1–3 Min. Verletzung → Vasokonstriktion → Thrombozytenanlagerung → Thrombozytenaggregation → instabiler Wundverschluss. Freisetzung von Thrombozytenfaktor → Einleitung der Gerinnung.'],
        ['Sekundäre Hämostase (Blutgerinnung)', 'Dauer 5–7 Min. Stabile Festigung durch 13 Gerinnungsfaktoren (Gerinnungskaskade). Ergebnis: Prothrombin → Thrombin → Fibrinogen → Fibrin + Blutzellen = stabiler Thrombus.'],
        ['Fibrinolyse', 'Auflösung des Thrombus: Plasminogen → Plasmin (durch Aktivatoren in Blut/Gewebe) → Fibrin wird aufgelöst.'],
      ])}
      <br>
      <div class="wissen-section-title" style="font-size:0.95rem; border:none; margin-bottom:0.6rem;">Gerinnungskaskade – zwei Auslösewege</div>
      <div class="nerve-parts">
        <div class="nerve-part"><strong>Intrinsisches System</strong>Kontakt zu einer Fremdoberfläche innerhalb von Minuten aktiviert. Beteiligte Faktoren: XII → XI → IX → VIII</div>
        <div class="nerve-part"><strong>Extrinsisches System</strong>Verletzung von Gewebe mit Freisetzung von Gewebsthromboplastin (Faktor III). Beteiligter Faktor: VII</div>
      </div>
      <div style="text-align:center; font-size:0.85rem; color:#888; margin:0.5rem 0 1rem;">↓ Gemeinsamer Weg: Faktor X → V → Thrombin → Fibrin</div>
      <br>
      <div class="wissen-section-title" style="font-size:0.95rem; border:none; margin-bottom:0.6rem;">Hemmstoffe der Gerinnung</div>
      ${defList([
        ['Natriumcitrat / EDTA', 'Bindet Ca²⁺-Ionen → Faktor X wird nicht aktiviert → Gerinnung gehemmt (Laborröhrchen)'],
        ['Heparin', 'Hemmt die Aktivierung von Fibrinogen zu Fibrin'],
        ['Cumarine (Marcumar)', 'Vitamin-K-Antagonist. Vitamin K wird zur Bildung der meisten Gerinnungsfaktoren in der Leber benötigt. Kontrolle: Quick-Test (PTT)'],
        ['Acetylsalicylsäure (ASS)', 'Verhindert Thrombozytenaggregation → nur für arterielle Blutungen geeignet. NW: Magenblutungen, Asthma, Allergien'],
      ])}
    `)}

    ${section('Blutgruppen – ABO-System & Rhesus', '🔰', `
      <p class="wissen-prose">
        Es gibt <strong>4 Blutgruppen</strong> im ABO-System: A, B, AB, O. Die Blutgruppenstrukturen (Antigene) befinden sich auf der Zellmembran der Erythrozyten. Im Plasma befinden sich <strong>Antikörper gegen das jeweils fehlende Antigen</strong> (als IgM).
      </p>
      <br>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:0.86rem; margin-bottom:1rem;">
          <thead>
            <tr style="background:var(--ink); color:var(--parchment);">
              <th style="padding:0.5rem 0.8rem; text-align:left;">Blutgruppe</th>
              <th style="padding:0.5rem 0.8rem;">Antigen auf Ery</th>
              <th style="padding:0.5rem 0.8rem;">Antikörper im Plasma</th>
              <th style="padding:0.5rem 0.8rem;">Häufigkeit Europa</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background:#fff;">
              <td style="padding:0.5rem 0.8rem; font-weight:700; color:var(--terracotta);">A</td>
              <td style="padding:0.5rem 0.8rem; text-align:center;">A</td>
              <td style="padding:0.5rem 0.8rem; text-align:center;">Anti-B</td>
              <td style="padding:0.5rem 0.8rem; text-align:center;">40 %</td>
            </tr>
            <tr style="background:#f9f6f0;">
              <td style="padding:0.5rem 0.8rem; font-weight:700; color:var(--blue-dark);">B</td>
              <td style="padding:0.5rem 0.8rem; text-align:center;">B</td>
              <td style="padding:0.5rem 0.8rem; text-align:center;">Anti-A</td>
              <td style="padding:0.5rem 0.8rem; text-align:center;">10 %</td>
            </tr>
            <tr style="background:#fff;">
              <td style="padding:0.5rem 0.8rem; font-weight:700; color:var(--sage);">AB</td>
              <td style="padding:0.5rem 0.8rem; text-align:center;">A + B</td>
              <td style="padding:0.5rem 0.8rem; text-align:center;">Keiner</td>
              <td style="padding:0.5rem 0.8rem; text-align:center;">6 %</td>
            </tr>
            <tr style="background:#f9f6f0;">
              <td style="padding:0.5rem 0.8rem; font-weight:700;">0</td>
              <td style="padding:0.5rem 0.8rem; text-align:center;">Keines</td>
              <td style="padding:0.5rem 0.8rem; text-align:center;">Anti-A + Anti-B</td>
              <td style="padding:0.5rem 0.8rem; text-align:center;">40 %</td>
            </tr>
          </tbody>
        </table>
      </div>
      ${callout('<strong>Blutgruppe 0 = Universalspender</strong> (keine Antigene auf Ery) · <strong>Blutgruppe AB = Universalempfänger</strong> (keine Antikörper im Plasma)')}
      <br>
      ${defList([
        ['Kreuzprobe', 'Vor jeder Transfusion: Ery Spender + Serum Empfänger (Major-Test) und Serum Spender + Ery Empfänger (Minor-Test).'],
        ['Bedside-Test', 'Gesetzlich vorgeschriebener Test unmittelbar vor jeder Bluttransfusion.'],
        ['Transfusionsunfall', 'Schüttelfrost + Fieberanstieg + Herz-Kreislauf-Komplikationen → Transfusion SOFORT stoppen · Nadel als Zugang lassen · Notarzt rufen.'],
        ['Agglutination', 'Verklumpung der Erythrozyten durch Antigen-Antikörper-Reaktion → Hämolyse'],
      ])}
      <br>
      <div class="wissen-section-title" style="font-size:0.95rem; border:none; margin-bottom:0.6rem;">Rhesusfaktor</div>
      <p class="wissen-prose" style="margin-bottom:0.8rem;">Das Rhesussystem besteht aus 3 Antigenen (C, D, E). Antikörper entstehen <strong>nur nach Sensibilisierung</strong> (anders als beim ABO-System).</p>
      ${cards([
        { label: 'Rh-positiv', title: 'ca. 85 % der Bevölkerung', body: 'Erythrozyten tragen das Rhesus-D-Antigen auf ihrer Oberfläche.' },
        { label: 'Problem', title: 'Morbus haemolyticus neonatorum', body: 'Rh-negative Mutter + Rh-positives Kind: Bei Geburt gelangen kindliche Ery in mütterliches Blut → 1. Kontakt → Mutter bildet Anti-D (IgG). Bei 2. Schwangerschaft: IgG plazentagängig → kindliche Ery werden agglutiniert → schwere <strong>fetale Anämie</strong>, oft tödlich.' },
        { label: 'Prophylaxe', title: 'Anti-D-Prophylaxe', body: 'Rh-negative Mütter erhalten nach 1. Schwangerschaft Anti-D-Immunglobuline → kindliche Rh-pos. Ery werden neutralisiert, bevor Sensibilisierung eintritt.' },
      ])}
    `)}

    ${section('Blutplasma & Säure-Basen-Haushalt', '⚗️', `
      ${callout('<strong>Blutplasma</strong> = Blutserum <em>plus</em> Fibrinogen<br><strong>Blutserum</strong> = Blutplasma <em>ohne</em> Fibrinogen')}
      <br>
      <div class="wissen-section-title" style="font-size:0.95rem; border:none; margin-bottom:0.6rem;">Plasmaproteine</div>
      ${defList([
        ['Albumine', 'Transport wasserunlöslicher Stoffe · Aufrechterhaltung des kolloidosmotischen Drucks · Nahrungsreserve bei Eiweißmangel'],
        ['α/β-Globuline', 'Transport wasserunlöslicher Stoffe · Blutgerinnung'],
        ['γ-Globuline', 'Abwehrfunktion (= Immunglobuline)'],
      ])}
      <br>
      <div class="wissen-section-title" style="font-size:0.95rem; border:none; margin-bottom:0.6rem;">pH-Regulation</div>
      <p class="wissen-prose">Der pH-Wert des Blutes liegt konstant bei <strong>7,38–7,42</strong>. CO₂ entsteht als Stoffwechselendprodukt in den Körperzellen → gelangt ins Blut → verbindet sich mit H₂O → Kohlensäure (H₂CO₃) → zerfällt zu HCO₃⁻ (Bicarbonat) + H⁺ → wird in der Lunge abgeatmet.</p>
      <br>
      ${defList([
        ['Azidose', 'Ansäuerung des Gewebes = Anstieg der Wasserstoffionenkonzentration (pH-Abfall unter 7,38)'],
        ['Alkalose', 'Alkalisierung = Abfall der Wasserstoffionenkonzentration (pH-Anstieg über 7,42)'],
        ['Puffersysteme', 'Hydrogencarbonat (Bicarbonat) + Phosphat im Blut · Regulation über Lunge (CO₂-Abatmung) + Niere (Bicarbonat-Resorption im Tubulussystem)'],
      ])}
      ${merke('Niere: In der Tubuluszelle verbindet sich CO₂ mit H₂O zu H₂CO₃ → zerfällt zu HCO₃⁻ + H⁺. H⁺ wird ausgeschieden, HCO₃⁻ im Körper zurückgehalten → Pufferung der Azidose.')}
    `)}

    ${section('Wichtig für Prüfung – Kompaktzusammenfassung', '📚', `
      <div class="pruefungswichtig-toolbar">
        <button class="pruefungswichtig-add-btn" onclick="addPruefungswichtigSection('blut')">+ Neue Sektion hinzufügen</button>
      </div>
      <div id="pruefungswichtig-container-blut">
        <p style="color:#666; text-align:center; padding:1rem;">Lade Prüfungsinhalte...</p>
      </div>
      <script>
        (async function() {
          const container = document.getElementById('pruefungswichtig-container-blut');
          if (container) {
            container.innerHTML = await renderPruefungswichtigFromJSON('blut');
          }
        })();
      </script>

      ${renderPruefungsNotizenEditor('blut')}
    `)}

    ${section('Karteikarten lernen', '🎴', `
      <p class="wissen-prose" style="margin-bottom: 1rem;">Lerne die wichtigsten Fakten zum Blut mit <strong>interaktiven Karteikarten</strong>. Perfekt zum Wiederholen und für die Prüfungsvorbereitung!</p>
      ${renderKarteikartenButton('blut')}
    `)}

    ${renderVideosSection('blut')}

    ${renderAnhaengeSection('blut')}
  `;
}

