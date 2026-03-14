const PRUEFUNGS_FAELLE = [
  {
    id: 'hypertonie-patient',
    name: 'Bluthochdruck-Patient',
    icon: '🫀',
    difficulty: 'mittel',
    description: 'Ein 58-jähriger Mann mit erhöhtem Blutdruck und Kopfschmerzen.',
    patient: {
      name: 'Herr Müller',
      alter: 58,
      geschlecht: 'männlich',
      avatar: '👨‍🦳'
    },
    scenario: 'Herr Müller, 58 Jahre, kommt in Ihre Praxis. Er berichtet von morgendlichen Kopfschmerzen und gelegentlichem Schwindel.',
    phases: [
      {
        id: 'begruessung',
        title: 'Begrüßung',
        pruefer: 'Guten Tag! Bitte stellen Sie sich kurz vor und beginnen Sie mit der Anamnese des Patienten.',
        patientAntworten: [
          { trigger: 'name', antwort: 'Müller, Thomas Müller.' },
          { trigger: 'alter|geboren|jahrgang', antwort: 'Ich bin 58 Jahre alt, geboren 1968.' },
          { trigger: 'beruf|arbeit|tätig', antwort: 'Ich bin Buchhalter, sitze viel am Schreibtisch.' }
        ],
        aufgabe: 'Führen Sie die Anamnese durch. Was möchten Sie vom Patienten wissen?',
        frageTyp: 'freetext',
        bewertungskriterien: [
          { keyword: 'beschwerden|symptome|problem|führt sie', punkte: 2, feedback: 'Aktuelle Beschwerden erfragt' },
          { keyword: 'kopfschmerzen|schmerz', punkte: 2, feedback: 'Schmerzanamnese' },
          { keyword: 'seit wann|dauer|beginn', punkte: 2, feedback: 'Zeitlicher Verlauf' },
          { keyword: 'medikamente|einnahme', punkte: 2, feedback: 'Medikamentenanamnese' },
          { keyword: 'vorerkrankung|krankheit|früher', punkte: 2, feedback: 'Vorerkrankungen erfragt' },
          { keyword: 'familie|eltern|erblich', punkte: 1, feedback: 'Familienanamnese' },
          { keyword: 'rauchen|alkohol|genussmittel', punkte: 1, feedback: 'Genussmittelanamnese' },
          { keyword: 'gewicht|ernährung|sport|bewegung', punkte: 1, feedback: 'Lebensstil erfragt' }
        ],
        maxPunkte: 13,
        patientInfo: {
          beschwerden: 'Seit etwa 3 Monaten habe ich morgens immer Kopfschmerzen, besonders im Hinterkopf. Manchmal wird mir auch schwindelig, wenn ich schnell aufstehe.',
          medikamente: 'Nein, ich nehme keine Medikamente regelmäßig. Ab und zu eine Ibuprofen gegen die Kopfschmerzen.',
          vorerkrankungen: 'Vor 5 Jahren hatte ich erhöhte Cholesterinwerte, aber ich habe nie etwas dagegen genommen.',
          familie: 'Mein Vater hatte einen Herzinfarkt mit 62, meine Mutter hat auch Bluthochdruck.',
          lebensstil: 'Ich rauche etwa 10 Zigaretten am Tag, trinke abends gern ein Bier. Sport... naja, dafür fehlt mir die Zeit.'
        }
      },
      {
        id: 'symptome',
        title: 'Symptomerfassung',
        pruefer: 'Der Patient hat Ihnen seine Beschwerden geschildert. Welche weiteren Symptome oder Befunde würden Sie erwarten oder erfragen?',
        aufgabe: 'Wählen Sie die typischen Symptome und Befunde bei Hypertonie:',
        frageTyp: 'multiple',
        optionen: [
          { text: 'Morgendliche Kopfschmerzen (okzipital)', correct: true },
          { text: 'Schwindel, besonders bei Lagewechsel', correct: true },
          { text: 'Nasenbluten', correct: true },
          { text: 'Ohrensausen (Tinnitus)', correct: true },
          { text: 'Sehstörungen/Flimmern', correct: true },
          { text: 'Herzrasen/Palpitationen', correct: true },
          { text: 'Stark erhöhter Appetit', correct: false },
          { text: 'Gelbfärbung der Haut', correct: false },
          { text: 'Haarausfall', correct: false },
          { text: 'Dyspnoe bei Belastung', correct: true }
        ],
        feedback: 'Die arterielle Hypertonie ist oft symptomarm ("stiller Killer"). Typische Symptome sind morgendliche okzipitale Kopfschmerzen, Schwindel, Nasenbluten und Sehstörungen. Bei fortgeschrittener Erkrankung kann Belastungsdyspnoe auftreten.'
      },
      {
        id: 'untersuchung',
        title: 'Körperliche Untersuchung',
        pruefer: 'Welche körperlichen Untersuchungen führen Sie durch? Bitte erklären Sie Ihr Vorgehen nach dem IPPAF-Schema.',
        aufgabe: 'Wählen Sie die relevanten Untersuchungen:',
        frageTyp: 'multiple',
        optionen: [
          { text: 'Blutdruckmessung an beiden Armen', correct: true },
          { text: 'Pulsmessung und -qualität', correct: true },
          { text: 'Herzauskultation', correct: true },
          { text: 'Auskultation der Karotiden (Strömungsgeräusche)', correct: true },
          { text: 'Fundoskopie (Augenhintergrund)', correct: true },
          { text: 'Inspektion auf Ödeme', correct: true },
          { text: 'Palpation der peripheren Pulse', correct: true },
          { text: 'Lungenperkussion', correct: false },
          { text: 'Untersuchung der Schilddrüse', correct: true },
          { text: 'Abdomenpalpation (Aortenaneurysma, Nierenvergrößerung)', correct: true }
        ],
        befunde: 'RR 165/100 mmHg rechts, 160/98 mmHg links. Puls 78/min, regelmäßig. Herztöne rein, keine Geräusche. Keine Strömungsgeräusche über den Karotiden. Keine peripheren Ödeme.',
        feedback: 'Die Blutdruckmessung sollte immer an beiden Armen erfolgen. Eine Seitendifferenz >20 mmHg ist abklärungsbedürftig. Die Fundoskopie kann hypertensive Retinopathie zeigen.'
      },
      {
        id: 'differentialdiagnose',
        title: 'Differentialdiagnosen',
        pruefer: 'Welche Differentialdiagnosen ziehen Sie in Betracht? Unterscheiden Sie primäre und sekundäre Ursachen.',
        aufgabe: 'Ordnen Sie die Differentialdiagnosen richtig zu:',
        frageTyp: 'multiple',
        optionen: [
          { text: 'Primäre (essentielle) Hypertonie - häufigste Form (>90%)', correct: true },
          { text: 'Nierenarterienstenose', correct: true },
          { text: 'Phäochromozytom', correct: true },
          { text: 'Conn-Syndrom (Hyperaldosteronismus)', correct: true },
          { text: 'Cushing-Syndrom', correct: true },
          { text: 'Schlafapnoe-Syndrom', correct: true },
          { text: 'Schilddrüsenüberfunktion', correct: true },
          { text: 'Coarctatio aortae', correct: true },
          { text: 'Migräne', correct: false },
          { text: 'Depression', correct: false }
        ],
        feedback: 'Bei >90% liegt eine primäre (essentielle) Hypertonie vor. Sekundäre Ursachen müssen v.a. bei jungen Patienten, therapieresistenter Hypertonie oder plötzlichem Beginn ausgeschlossen werden.'
      },
      {
        id: 'diagnostik',
        title: 'Weiterführende Diagnostik',
        pruefer: 'Welche weiterführenden Untersuchungen veranlassen Sie?',
        aufgabe: 'Wählen Sie die sinnvollen diagnostischen Maßnahmen:',
        frageTyp: 'multiple',
        optionen: [
          { text: 'Labordiagnostik: Blutbild, Kreatinin, Elektrolyte', correct: true },
          { text: 'Nüchtern-Blutzucker, HbA1c', correct: true },
          { text: 'Lipidprofil (Cholesterin, Triglyceride)', correct: true },
          { text: 'Urinuntersuchung (Eiweiß, Glukose)', correct: true },
          { text: 'EKG', correct: true },
          { text: '24-Stunden-Blutdruckmessung', correct: true },
          { text: 'Echokardiographie', correct: true },
          { text: 'MRT des Kopfes', correct: false },
          { text: 'Schilddrüsenwerte (TSH)', correct: true },
          { text: 'Abdomensonographie (Nieren, Aorta)', correct: true }
        ],
        feedback: 'Die Basisdiagnostik umfasst Labor (Organfunktionen, kardiovaskuläre Risikofaktoren), EKG und Urin. Die 24h-RR-Messung objektiviert den Blutdruck. Echokardiographie zeigt Endorganschäden.'
      },
      {
        id: 'aufklaerung',
        title: 'Patientenaufklärung',
        pruefer: 'Wie klären Sie den Patienten über seine Erkrankung und die Risiken auf?',
        aufgabe: 'Über welche Aspekte müssen Sie den Patienten aufklären?',
        frageTyp: 'freetext',
        bewertungskriterien: [
          { keyword: 'diagnose|bluthochdruck|hypertonie', punkte: 2, feedback: 'Diagnose erklärt' },
          { keyword: 'schlaganfall|apoplex|hirn', punkte: 2, feedback: 'Schlaganfallrisiko genannt' },
          { keyword: 'herzinfarkt|herzerkrankung|koronar', punkte: 2, feedback: 'Herzinfarktrisiko genannt' },
          { keyword: 'niere|niereninsuffizienz', punkte: 1, feedback: 'Nierenschädigung erwähnt' },
          { keyword: 'auge|retinopathie|sehstörung', punkte: 1, feedback: 'Augenschäden erwähnt' },
          { keyword: 'lebensstil|rauchen aufhören|sport|ernährung|abnehmen', punkte: 2, feedback: 'Lebensstiländerung empfohlen' },
          { keyword: 'salz|kochsalz|natriumarm', punkte: 1, feedback: 'Salzreduktion erwähnt' },
          { keyword: 'medikament|therapie|behandlung', punkte: 1, feedback: 'Medikamentöse Therapie angesprochen' }
        ],
        maxPunkte: 12,
        musterklaerung: 'Herr Müller, Sie haben einen erhöhten Blutdruck - eine arterielle Hypertonie. Dies ist eine ernst zu nehmende Erkrankung, die unbehandelt zu schwerwiegenden Komplikationen führen kann: Schlaganfall, Herzinfarkt, Nierenversagen und Sehstörungen. Die gute Nachricht: Mit Lebensstiländerungen und ggf. Medikamenten lässt sich das Risiko deutlich senken.'
      },
      {
        id: 'therapie',
        title: 'Therapieempfehlung',
        pruefer: 'Welche Therapieempfehlungen geben Sie dem Patienten? Beachten Sie, dass Sie als Heilpraktiker bestimmte Grenzen haben.',
        aufgabe: 'Wählen Sie die für Heilpraktiker zulässigen Empfehlungen:',
        frageTyp: 'multiple',
        optionen: [
          { text: 'Überweisung zum Arzt zur medikamentösen Einstellung', correct: true },
          { text: 'Lebensstilberatung: Rauchstopp empfehlen', correct: true },
          { text: 'Ernährungsberatung: salzarme, mediterrane Kost', correct: true },
          { text: 'Bewegungsempfehlung: moderates Ausdauertraining', correct: true },
          { text: 'Gewichtsreduktion bei Übergewicht', correct: true },
          { text: 'Stressreduktion, Entspannungsverfahren', correct: true },
          { text: 'Alkoholreduktion empfehlen', correct: true },
          { text: 'Selbst Blutdruckmedikamente verschreiben', correct: false },
          { text: 'Regelmäßige Blutdruckkontrollen anbieten', correct: true },
          { text: 'Naturheilkundliche Begleittherapie anbieten (z.B. Mistel, Weißdorn)', correct: true }
        ],
        feedback: 'Als Heilpraktiker dürfen Sie keine verschreibungspflichtigen Medikamente verordnen. Ihre Stärke liegt in der Lebensstilberatung und naturheilkundlichen Begleitung. Bei Hypertonie ist eine ärztliche Abklärung und ggf. medikamentöse Einstellung zwingend erforderlich.'
      },
      {
        id: 'recht',
        title: 'Rechtliche Aspekte',
        pruefer: 'Zum Abschluss: Welche rechtlichen Aspekte müssen Sie als Heilpraktiker beachten?',
        aufgabe: 'Welche Aussagen sind korrekt?',
        frageTyp: 'multiple',
        optionen: [
          { text: 'Dokumentationspflicht jeder Behandlung', correct: true },
          { text: 'Aufklärungspflicht über Diagnose und Behandlung', correct: true },
          { text: 'Verweis an Arzt bei Verdacht auf schwere Erkrankung', correct: true },
          { text: 'Hypertonie ist eine meldepflichtige Erkrankung', correct: false },
          { text: 'Keine Verordnung verschreibungspflichtiger Medikamente', correct: true },
          { text: 'Schweigepflicht gegenüber Dritten', correct: true },
          { text: 'Informationspflicht über Grenzen der HP-Tätigkeit', correct: true }
        ],
        feedback: 'Die Dokumentations- und Aufklärungspflicht sind zentrale rechtliche Anforderungen. Bei V.a. schwerwiegende Erkrankungen muss an einen Arzt verwiesen werden. Hypertonie ist KEINE meldepflichtige Erkrankung nach IfSG.'
      }
    ]
  },
  {
    id: 'akutes-abdomen',
    name: 'Akutes Abdomen',
    icon: '🤕',
    difficulty: 'schwer',
    description: 'Notfallsimulation: Patientin mit akuten Bauchschmerzen.',
    patient: {
      name: 'Frau Schmidt',
      alter: 45,
      geschlecht: 'weiblich',
      avatar: '👩'
    },
    scenario: 'Frau Schmidt, 45 Jahre, kommt mit starken Bauchschmerzen in Ihre Praxis. Sie ist blass und hält sich den Bauch.',
    phases: [
      {
        id: 'ersteinschaetzung',
        title: 'Ersteinschätzung',
        pruefer: 'Die Patientin kommt offensichtlich mit starken Schmerzen. Was ist Ihr erster Gedanke und wie gehen Sie vor?',
        aufgabe: 'Welche Maßnahmen ergreifen Sie zuerst?',
        frageTyp: 'multiple',
        optionen: [
          { text: 'Vitalzeichen erfassen (Puls, Blutdruck, Temperatur)', correct: true },
          { text: 'Allgemeinzustand beurteilen (Bewusstsein, Hautfarbe)', correct: true },
          { text: 'Kurze Schmerzanamnese (Lokalisation, Beginn, Charakter)', correct: true },
          { text: 'Sofort Rettungsdienst rufen ohne weitere Diagnostik', correct: false },
          { text: 'Abwehrspannung prüfen (Défense musculaire)', correct: true },
          { text: 'Patient beruhigen und hinlegen', correct: true },
          { text: 'Erstmal Schmerzmittel verabreichen', correct: false },
          { text: 'Notfall-Checkliste im Kopf durchgehen', correct: true }
        ],
        feedback: 'Bei akutem Abdomen ist eine schnelle, aber strukturierte Ersteinschätzung wichtig. Vitalzeichen und Allgemeinzustand geben erste Hinweise auf die Dringlichkeit. Nie Schmerzmittel geben ohne Diagnose - das kann Symptome verschleiern!'
      },
      {
        id: 'anamnese-notfall',
        title: 'Notfallanamnese',
        pruefer: 'Der Patient ist ansprechbar, aber leidet unter Schmerzen. Welche gezielten Fragen stellen Sie?',
        aufgabe: 'Beschreiben Sie Ihre Notfallanamnese:',
        frageTyp: 'freetext',
        bewertungskriterien: [
          { keyword: 'wo|lokalisation|stelle', punkte: 2, feedback: 'Schmerzlokalisation erfragt' },
          { keyword: 'wann|seit|beginn|plötzlich', punkte: 2, feedback: 'Zeitlicher Beginn erfragt' },
          { keyword: 'wie|charakter|art|kolik|stechend|dumpf', punkte: 2, feedback: 'Schmerzcharakter erfragt' },
          { keyword: 'ausstrahlung|wohin', punkte: 1, feedback: 'Ausstrahlung erfragt' },
          { keyword: 'übelkeit|erbrechen', punkte: 2, feedback: 'Begleitsymptome erfragt' },
          { keyword: 'stuhlgang|durchfall|verstopfung|blut', punkte: 2, feedback: 'Stuhlgang erfragt' },
          { keyword: 'fieber|temperatur', punkte: 1, feedback: 'Fieber erfragt' },
          { keyword: 'letzte periode|schwanger|menstruation', punkte: 2, feedback: 'Gynäkologische Anamnese (wichtig bei Frauen!)' },
          { keyword: 'operation|vorerkrankung', punkte: 1, feedback: 'Vorgeschichte erfragt' }
        ],
        maxPunkte: 15,
        patientInfo: {
          beschwerden: 'Es hat vor etwa 4 Stunden angefangen, erst um den Nabel herum, jetzt ist es rechts unten am schlimmsten. Der Schmerz ist stechend geworden.',
          begleitsymptome: 'Mir ist übel, ich habe einmal erbrochen. Fieber weiß ich nicht genau, ich fühle mich aber heiß.',
          stuhlgang: 'Ich hatte seit gestern keinen Stuhlgang mehr, normalerweise ist das regelmäßig.',
          gynaekologisch: 'Meine letzte Periode war vor 2 Wochen, ganz normal. Schwanger bin ich nicht.',
          vorgeschichte: 'Ich wurde noch nie am Bauch operiert.'
        }
      },
      {
        id: 'verdachtsdiagnose',
        title: 'Verdachtsdiagnose',
        pruefer: 'Basierend auf den Informationen: Welche Verdachtsdiagnosen haben Sie? Was ist Ihre Hauptverdachtsdiagnose?',
        aufgabe: 'Wählen Sie mögliche Differentialdiagnosen:',
        frageTyp: 'multiple',
        optionen: [
          { text: 'Akute Appendizitis (Hauptverdacht!)', correct: true },
          { text: 'Ovarialzyste/Stieldrehung', correct: true },
          { text: 'Extrauteringravidität', correct: true },
          { text: 'Sigmadivertikulitis', correct: true },
          { text: 'Meckel-Divertikel', correct: true },
          { text: 'Reizdarmsyndrom', correct: false },
          { text: 'Nierenstein/Nierenkolik', correct: true },
          { text: 'Lebensmittelvergiftung', correct: false },
          { text: 'Mesenterialischämie', correct: true }
        ],
        feedback: 'Die klassische Symptomwanderung von periumbilikal nach rechts unten (McBurney-Punkt) ist pathognomonisch für Appendizitis. Bei Frauen im gebärfähigen Alter immer gynäkologische Ursachen bedenken!'
      },
      {
        id: 'untersuchung-abdomen',
        title: 'Körperliche Untersuchung',
        pruefer: 'Beschreiben Sie Ihre körperliche Untersuchung des Abdomens systematisch.',
        aufgabe: 'Welche Untersuchungsschritte führen Sie durch?',
        frageTyp: 'multiple',
        optionen: [
          { text: 'Inspektion: Vorwölbung, Verfärbung, Narben', correct: true },
          { text: 'Auskultation: Darmgeräusche (vor Palpation!)', correct: true },
          { text: 'Perkussion: Dämpfung, Tympanie', correct: true },
          { text: 'Palpation: oberflächlich, dann tief', correct: true },
          { text: 'Prüfung auf Abwehrspannung (Défense)', correct: true },
          { text: 'Loslassschmerz (Blumberg-Zeichen)', correct: true },
          { text: 'McBurney- und Lanz-Punkt prüfen', correct: true },
          { text: 'Psoaszeichen prüfen', correct: true },
          { text: 'Rovsing-Zeichen', correct: true },
          { text: 'Rektale Untersuchung (Douglas-Schmerz)', correct: true }
        ],
        befunde: 'Abdomen leicht aufgetrieben. Spärliche Darmgeräusche. Druckschmerz rechter Unterbauch maximal am McBurney-Punkt. Loslassschmerz positiv. Lokale Abwehrspannung rechts. Temperatur axillär 37,8°C, rektal 38,6°C.',
        feedback: 'Die axillär-rektale Temperaturdifferenz >1°C ist typisch für Appendizitis. Loslassschmerz und Abwehrspannung zeigen peritoneale Reizung an - ein Warnsignal!'
      },
      {
        id: 'entscheidung',
        title: 'Ihre Entscheidung',
        pruefer: 'Welche Konsequenzen ziehen Sie aus Ihren Befunden?',
        aufgabe: 'Was tun Sie jetzt?',
        frageTyp: 'single',
        optionen: [
          { text: 'Rettungsdienst rufen - V.a. akute Appendizitis, OP-Indikation', correct: true },
          { text: 'Hausarzt einbestellen für Blutabnahme morgen', correct: false },
          { text: 'Schmerzmedikament geben und beobachten', correct: false },
          { text: 'Naturheilkundliche Behandlung beginnen', correct: false },
          { text: 'Patientin nach Hause schicken mit Wärmflasche', correct: false }
        ],
        feedback: 'Bei V.a. akute Appendizitis mit Peritonitis-Zeichen ist sofortige Einweisung in eine Klinik erforderlich! Dies ist ein chirurgischer Notfall. Als Heilpraktiker MÜSSEN Sie hier an den Rettungsdienst übergeben.'
      },
      {
        id: 'recht-notfall',
        title: 'Rechtliche Pflichten',
        pruefer: 'Welche rechtlichen Pflichten haben Sie als Heilpraktiker in dieser Notfallsituation?',
        aufgabe: 'Wählen Sie die korrekten Aussagen:',
        frageTyp: 'multiple',
        optionen: [
          { text: 'Pflicht zur Hilfeleistung (unterlassene Hilfeleistung ist strafbar)', correct: true },
          { text: 'Sofortige Überweisung/Einweisung bei lebensbedrohlichen Zuständen', correct: true },
          { text: 'Patienten nicht allein lassen bis Rettungsdienst da ist', correct: true },
          { text: 'Dokumentation der Befunde und Maßnahmen', correct: true },
          { text: 'Ich darf den Patienten auch behalten wenn er ablehnt', correct: false },
          { text: 'Übergabe an Rettungsdienst mit allen relevanten Infos', correct: true },
          { text: 'Bei Ablehnung: Aufklärung dokumentieren und unterschreiben lassen', correct: true }
        ],
        feedback: 'Bei Notfällen gilt: Grenzen erkennen, schnell handeln, professionell übergeben. Die Dokumentation schützt Sie rechtlich. Wenn ein Patient Behandlung ablehnt, ist diese Ablehnung nach Aufklärung zu dokumentieren.'
      }
    ]
  },
  {
    id: 'depression-patient',
    name: 'Depressiver Patient',
    icon: '😔',
    difficulty: 'mittel',
    description: 'Psychisches Fallbeispiel: Patient mit depressiven Symptomen.',
    patient: {
      name: 'Herr Weber',
      alter: 42,
      geschlecht: 'männlich',
      avatar: '👨'
    },
    scenario: 'Herr Weber, 42 Jahre, wird von seiner Frau gebracht. Er wirkt antriebslos und berichtet von Schlafstörungen.',
    phases: [
      {
        id: 'erstgespraech',
        title: 'Erstgespräch',
        pruefer: 'Der Patient sitzt vor Ihnen, wirkt bedrückt und spricht leise. Wie beginnen Sie das Gespräch?',
        aufgabe: 'Welche Gesprächstechniken wenden Sie an?',
        frageTyp: 'multiple',
        optionen: [
          { text: 'Offene Fragen stellen ("Wie geht es Ihnen?")', correct: true },
          { text: 'Aktives Zuhören, Pausen aushalten', correct: true },
          { text: 'Empathie zeigen, Gefühle spiegeln', correct: true },
          { text: 'Ruhige, entspannte Atmosphäre schaffen', correct: true },
          { text: 'Sofort nach Suizidgedanken fragen', correct: false },
          { text: 'Direkte Fragen vermeiden, nur zuhören', correct: false },
          { text: 'Blickkontakt halten, zugewandte Körperhaltung', correct: true },
          { text: 'Ratschläge wie "Kopf hoch" geben', correct: false }
        ],
        feedback: 'Bei depressiven Patienten ist eine empathische, geduldige Gesprächsführung wichtig. "Kopf hoch"-Ratschläge bagatellisieren das Leiden. Die Suizid-Frage ist wichtig, kommt aber meist nicht ganz am Anfang.'
      },
      {
        id: 'symptomerfassung-psych',
        title: 'Symptomerfassung',
        pruefer: 'Welche Symptome erfragen Sie systematisch bei V.a. Depression?',
        aufgabe: 'Wählen Sie die Hauptsymptome einer Depression:',
        frageTyp: 'multiple',
        optionen: [
          { text: 'Gedrückte Stimmung', correct: true },
          { text: 'Interessenverlust / Freudlosigkeit', correct: true },
          { text: 'Antriebsmangel / erhöhte Ermüdbarkeit', correct: true },
          { text: 'Schlafstörungen', correct: true },
          { text: 'Appetit- und Gewichtsveränderungen', correct: true },
          { text: 'Konzentrationsstörungen', correct: true },
          { text: 'Schuldgefühle / Wertlosigkeit', correct: true },
          { text: 'Suizidgedanken', correct: true },
          { text: 'Halluzinationen (immer vorhanden)', correct: false },
          { text: 'Motorische Unruhe', correct: false }
        ],
        feedback: 'Die drei Hauptsymptome sind: gedrückte Stimmung, Interessenverlust und Antriebsmangel. Für die Diagnose "Depressive Episode" müssen mindestens 2 Hauptsymptome + 2 Nebensymptome für mindestens 2 Wochen vorliegen.'
      },
      {
        id: 'suizidalitaet',
        title: 'Suizidalität',
        pruefer: 'Sie müssen das Thema Suizidalität ansprechen. Wie gehen Sie vor?',
        aufgabe: 'Wie erfragen Sie Suizidgedanken angemessen?',
        frageTyp: 'freetext',
        bewertungskriterien: [
          { keyword: 'direkt|offen|ansprechen', punkte: 2, feedback: 'Direktes Ansprechen - richtig!' },
          { keyword: 'lebensmüde|nicht mehr leben|aufhören|gedanken', punkte: 2, feedback: 'Konkrete Formulierung' },
          { keyword: 'plan|vorhaben|wie|methode', punkte: 2, feedback: 'Nach konkreten Plänen fragen' },
          { keyword: 'ernst nehmen|nicht bagatellisieren', punkte: 1, feedback: 'Ernstnehmen betont' },
          { keyword: 'hilfe|unterstützung|nicht allein', punkte: 1, feedback: 'Hilfsangebot' },
          { keyword: 'fachmann|psychiater|einweisung', punkte: 2, feedback: 'Professionelle Hilfe ansprechen' }
        ],
        maxPunkte: 10,
        musterantwort: '"Herr Weber, manchmal sind Menschen in so einer Situation so verzweifelt, dass sie nicht mehr leben möchten. Kennen Sie solche Gedanken?" Bei Ja: "Haben Sie schon mal darüber nachgedacht, wie Sie das tun würden?"'
      },
      {
        id: 'behandlungsgrenzen',
        title: 'Behandlungsgrenzen HP',
        pruefer: 'Welche Patienten dürfen Sie als Heilpraktiker NICHT behandeln?',
        aufgabe: 'Wählen Sie die Ausschlusskriterien für HP-Behandlung:',
        frageTyp: 'multiple',
        optionen: [
          { text: 'Akute Suizidalität mit konkreten Plänen', correct: true },
          { text: 'Psychotische Symptome (Wahn, Halluzinationen)', correct: true },
          { text: 'Schwere depressive Episode mit Stupor', correct: true },
          { text: 'Leichte depressive Episode', correct: false },
          { text: 'Anpassungsstörung nach Lebensereignis', correct: false },
          { text: 'Wahnhafte Depression', correct: true },
          { text: 'Bipolare Störung in akuter Manie', correct: true },
          { text: 'Burnout-Syndrom im Frühstadium', correct: false }
        ],
        feedback: 'Bei akuter Suizidalität, Psychosen und schwerer Depression mit psychotischen Symptomen ist eine psychiatrische Behandlung zwingend. Der Heilpraktiker kann begleitend oder bei leichten Formen selbstständig behandeln.'
      },
      {
        id: 'therapieoptionen',
        title: 'Therapieempfehlungen',
        pruefer: 'Welche Therapieoptionen können Sie als Heilpraktiker anbieten oder empfehlen?',
        aufgabe: 'Wählen Sie die korrekten Optionen:',
        frageTyp: 'multiple',
        optionen: [
          { text: 'Verweis an Psychiater/Psychotherapeuten', correct: true },
          { text: 'Psychotherapeutische Gespräche (supportiv)', correct: true },
          { text: 'Entspannungsverfahren anbieten', correct: true },
          { text: 'Antidepressiva verschreiben', correct: false },
          { text: 'Johanniskraut empfehlen (Wechselwirkungen beachten!)', correct: true },
          { text: 'Bewegung und Lichttherapie empfehlen', correct: true },
          { text: 'Soziales Netzwerk stärken', correct: true },
          { text: 'Zwangseinweisung durchführen', correct: false },
          { text: 'Stationäre Einweisung empfehlen bei Suizidalität', correct: true }
        ],
        feedback: 'Heilpraktiker können supportive Gespräche führen und naturheilkundliche Verfahren anwenden. Bei Johanniskraut auf Wechselwirkungen (Pille, andere Medikamente) hinweisen! Bei Suizidalität: sofortige psychiatrische Vorstellung.'
      }
    ]
  }
];

// Prüfungstrainer State
let currentPruefungsfall = null;
