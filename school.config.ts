import type { SchoolConfig } from "./src/lib/school";

const config: SchoolConfig = {
	name: "Telekolleg ISTQB Certified Tester",
	description:
		"Interaktiver Vorbereitungskurs für die ISTQB® Certified Tester Foundation-Level-Prüfung.",
	adjectives: [
		"scharf",
		"gruendlich",
		"methodisch",
		"skeptisch",
		"genau",
		"hartnaeckig",
		"analytisch",
		"wachsam",
		"praezise",
		"systematisch",
		"erfahren",
		"pruefend",
	],
	nouns: [
		"tester",
		"pruefer",
		"sucher",
		"jaeger",
		"pruefstein",
		"kriterium",
		"fall",
		"kante",
		"quellenforscher",
		"pfadfinder",
		"befuerworter",
		"schuetzer",
	],
	colors: [
		"red",
		"orange",
		"amber",
		"yellow",
		"lime",
		"green",
		"emerald",
		"teal",
		"cyan",
		"sky",
		"blue",
		"indigo",
		"violet",
		"purple",
		"fuchsia",
		"pink",
		"rose",
		"slate",
	],
	profileFields: {
		testErfahrung: {
			question: "Wie viel Erfahrung hast du mit dem Testen von Software?",
			type: "single",
			options: [
				{
					value: "noch-keine",
					label: "Noch keine Test-Erfahrung",
					description: "Ich bin völlig neu im Softwaretesten",
				},
				{
					value: "manuell",
					label: "Manuelles Testen",
					description: "Ich teste manuell im Arbeitsalltag",
				},
				{
					value: "automatisiert",
					label: "Automatisiertes Testen",
					description:
						"Ich schreibe Testskripte oder arbeite in einer QA-Rolle",
				},
				{
					value: "entwickler",
					label: "Entwickler mit Testaufgaben",
					description: "Ich bin Entwickler und teste im Rahmen meiner Arbeit",
				},
				{
					value: "testmanager",
					label: "Testleitung/Testmanagement",
					description: "Ich plane und steuere Tests oder Teams",
				},
			],
			adaptation: {
				"noch-keine":
					"Starte bei den Grundlagen. Erkläre Begriffe wie Testfall, Fehler und Testprozess immer mit Alltagsbeispielen, ohne Fachterminologie vorauszusetzen.",
				manuell:
					"Verbinde die Konzepte mit manueller Testpraxis. Betone, wie die ISTQB-Begriffe das decken, was du schon tagtäglich machst, und nenne Werkzeuge für Exploratives Testen.",
				automatisiert:
					"Setze Schwerpunkte auf testtechnik-unabhängiges Wissen, Risikoanalyse und Testdesign. Querbezüge zur Automatisierung sind willkommen, aber der Prüfungsstoff gilt für manuelles wie automatisiertes Testen.",
				entwickler:
					"Bringe Querbezüge aus der Entwicklung ein (Unit-Tests, Code-Review, CI/CD). Erkläre, wo Entwickler-Tests aufhören und das unabhängige Testteam beginnt.",
				testmanager:
					"Biete Management-Perspektive: Teststrategie, Risikobasiertes Testen, Aufwandschätzung und Testabschlussbericht stärker gewichten, Detailfragen straffer halten.",
			},
		},
		lernziel: {
			question: "Was ist dein Ziel mit diesem Kurs?",
			type: "single",
			options: [
				{
					value: "zertifizierung",
					label: "Prüfung bestehen",
					description: "Ich will die ISTQB Foundation-Level-Prüfung bestehen",
				},
				{
					value: "praxis",
					label: "Praxiskenntnisse aufbauen",
					description:
						"Ich will besseres Testen im Alltag, Zertifikat ist zweitrangig",
				},
				{
					value: "karriere",
					label: "Karrierewechsel",
					description:
						"Ich orientiere mich beruflich neu in Richtung Softwaretesten",
				},
				{
					value: "auffrischen",
					label: "Wissen auffrischen",
					description:
						"Ich habe bereits Testing-Wissen und will es strukturieren",
				},
			],
			adaptation: {
				zertifizierung:
					"Orientiere dich strikt am Foundation-Level-Syllabus. Übe prüfungsrelevante Definitionen und multiple-choice-taugliche Formulierungen. Betone, wie die Prüfungsfragen typischerweise gestellt werden.",
				praxis:
					"Fokussiere auf anwendbare Praxis: Testplanung, Testfallentwurf und Testarten. Formale Syllabus-Details nur so weit, wie sie im Alltag helfen.",
				karriere:
					"Verankere die Konzepte in beruflichen Szenarien. Nenne typische Einstiegsrollen, erwartete Fähigkeiten und wie das Zertifikat im Lebenslauf wahrgenommen wird.",
				auffrischen:
					"Kompakt halten, auf bereits vorhandenes Wissen aufbauen. Voller Klassifikationen sparsam sein, stattdessen gezielt vertiefen, wo Lücken bestehen.",
			},
		},
		lernstil: {
			question: "Wie lernst du am liebsten?",
			type: "single",
			options: [
				{
					value: "konzepte-zuerst",
					label: "Konzepte zuerst",
					description: "Zuerst die Idee verstehen, dann Beispiele ansehen",
				},
				{
					value: "hands-on",
					label: "Praxis sofort",
					description: "Gleich anwenden und dabei lernen",
				},
				{
					value: "beispiele",
					label: "Mit Beispielen lernen",
					description: "Konkrete Beispiele zuerst, Muster daraus ableiten",
				},
			],
			adaptation: {
				"konzepte-zuerst":
					"Erkläre den theoretischen Rahmen zuerst (z. B. warum es Äquivalenzklassen gibt), dann illustriere mit Beispielen.",
				"hands-on":
					"Springe direkt zu Aufgaben und Fallbeispielen, erkläre das Konzept anhand der Lösung nachträglich.",
				beispiele:
					"Beginne jede Einheit mit einem konkreten Beispiel, verallgemeinere danach zum zugrunde liegenden Prinzip.",
			},
		},
	},
	support: {
		issues: "https://github.com/your-org/your-school/issues",
	},
};

export default config;
