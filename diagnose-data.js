const DEFAULT_DIAGNOSE_CASES = [
  {
    id: 'aortenstenose',
    name: 'Aortenstenose',
    subtitle: 'Einengung der Aortenklappe',
    icon: '🫀',
    category: 'Herz-Kreislauf',
    scenario: 'Ein 72-jähriger Patient kommt in Ihre Praxis. Er berichtet, dass er seit einigen Monaten bei körperlicher Anstrengung schneller außer Atem kommt und manchmal ein Engegefühl in der Brust verspürt. Früher konnte er problemlos zwei Stockwerke steigen, jetzt muss er nach einem Stockwerk pausieren.',
    phases: [
      {
        id: 'anamnese',
        title: 'Anamnese',
        question: 'Welche Symptome könnten auf eine Aortenstenose hinweisen? (Mehrfachauswahl)',
        type: 'multiple',
        options: [
          { text: 'Dyspnoe (Atemnot)', correct: true },
          { text: 'Verminderte Leistungsfähigkeit', correct: true },
          { text: 'Erst Blässe, später Zyanose', correct: true },
          { text: 'Symptome der Linksherzinsuffizienz', correct: true },
          { text: 'Herzrhythmusstörungen', correct: true },
          { text: 'Kleine Blutdruckamplitude', correct: true },
          { text: 'Angina pectoris', correct: true },
          { text: 'Starke Gewichtszunahme', correct: false },
          { text: 'Hämaturie (Blut im Urin)', correct: false },
          { text: 'Lange Zeit asymptomatisch', correct: true }
        ],
        feedback: 'Die Aortenstenose bleibt oft lange asymptomatisch und wird durch einen kräftigen Herzschlag kompensiert. Typische Spätsymptome sind Dyspnoe, Angina pectoris, Synkopen und Zeichen der Linksherzinsuffizienz.'
      },
      {
        id: 'ursachen',
        title: 'Ursachen & Risikofaktoren',
        question: 'Welche Ursachen und Risikofaktoren gibt es für eine Aortenstenose? (Mehrfachauswahl)',
        type: 'multiple',
        options: [
          { text: 'Rheumatisches Fieber', correct: true },
          { text: 'Verkalkung (altersbedingt)', correct: true },
          { text: 'Herzinfarkt', correct: true },
          { text: 'Koronare Herzkrankheit (KHK)', correct: true },
          { text: 'Angeborene Fehlbildung', correct: true },
          { text: 'Virale Infektion der Atemwege', correct: false },
          { text: 'Eisenmangel', correct: false },
          { text: 'Hyperthyreose', correct: false }
        ],
        feedback: 'Die häufigste Ursache im Alter ist die degenerative Verkalkung der Klappe. Bei jüngeren Patienten kann eine bikuspide Aortenklappe (angeboren) oder rheumatisches Fieber ursächlich sein.'
      },
      {
        id: 'komplikationen',
        title: 'Komplikationen',
        question: 'Welche Komplikationen können bei einer Aortenstenose auftreten? (Mehrfachauswahl)',
        type: 'multiple',
        options: [
          { text: 'Herzinsuffizienz', correct: true },
          { text: 'Asthma cardiale', correct: true },
          { text: 'Rhythmusstörungen', correct: true },
          { text: 'Plötzlicher Herztod', correct: true },
          { text: 'Thrombenbildung', correct: true },
          { text: 'Koronare Herzkrankheit (KHK)', correct: true },
          { text: 'Nierenversagen', correct: false },
          { text: 'Leberzhirrose', correct: false }
        ],
        feedback: 'Die Aortenstenose führt zu einer chronischen Druckbelastung des linken Ventrikels. Komplikationen sind Herzinsuffizienz, Rhythmusstörungen und im schlimmsten Fall der plötzliche Herztod.'
      },
      {
        id: 'diagnostik',
        title: 'Diagnostik',
        question: 'Welche diagnostischen Befunde sind typisch für eine Aortenstenose? (Mehrfachauswahl)',
        type: 'multiple',
        options: [
          { text: 'Auskultation: Systolikum', correct: true },
          { text: '2. Herzton gespalten', correct: true },
          { text: 'Schwirren über Aorta und Karotiden', correct: true },
          { text: 'Punctum maximum: 2. ICR parasternal rechts', correct: true },
          { text: 'Feuchte Rasselgeräusche über beiden Lungen', correct: false },
          { text: 'Hepatomegalie', correct: false },
          { text: 'Pulsus paradoxus', correct: false }
        ],
        feedback: 'Typisch ist ein raues Systolikum mit Punctum maximum im 2. ICR parasternal rechts. Das Geräusch strahlt in die Karotiden aus. Der 2. Herzton kann gespalten oder abgeschwächt sein.'
      },
      {
        id: 'massnahmen',
        title: 'Maßnahmen',
        question: 'Welche Maßnahmen sind bei einer Aortenstenose indiziert? (Mehrfachauswahl)',
        type: 'multiple',
        options: [
          { text: 'Operative Klappenersatz/TAVI', correct: true },
          { text: 'Antikoagulanzien', correct: true },
          { text: 'Regelmäßige kardiologische Kontrolle', correct: true },
          { text: 'Körperliche Schonung bei Symptomen', correct: true },
          { text: 'Aggressive Ausdauersporttherapie', correct: false },
          { text: 'Abwarten ohne Therapie', correct: false }
        ],
        feedback: 'Bei symptomatischer Aortenstenose ist der Klappenersatz (chirurgisch oder TAVI) die Therapie der Wahl. Antikoagulanzien können bei mechanischen Klappen oder Vorhofflimmern notwendig sein.'
      }
    ],
    hints: [
      'Die Aortenstenose kann oft über Jahre durch einen kräftigen Herzschlag kompensiert werden.',
      'Die kleine Blutdruckamplitude (Differenz zwischen Systole und Diastole) entsteht dadurch, dass der systolische Wert durch den verminderten Blutauswurf niedriger ist, der diastolische Wert durch die Erkrankung jedoch nicht beeinflusst wird.'
    ]
  }
];

// Dynamische Fallverwaltung
const DIAGNOSE_STORAGE_KEY = 'heilpraktiker_diagnose_cases';
