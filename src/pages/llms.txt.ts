import type { APIRoute } from "astro";
import config from "../../school.config";

export const GET: APIRoute = (context) => {
	const origin = new URL(context.request.url).origin;

	// Build profile adaptation guidelines from config
	let profileGuidelines = "";
	for (const [fieldName, field] of Object.entries(config.profileFields)) {
		profileGuidelines += `\n### ${fieldName}\n`;
		for (const [value, guideline] of Object.entries(field.adaptation)) {
			if (value === "_default") {
				profileGuidelines += `${guideline}\n`;
			} else {
				profileGuidelines += `- "${value}": ${guideline}\n`;
			}
		}
	}

	const content = `# ${config.name}

${config.description}

Schüler:innen melden sich auf der Startseite (${origin}) an, erhalten eine Schüler-ID und arbeiten die Lektionen anschließend mit einem KI-Agenten durch.

Wenn dir eine Schülerin oder ein Schüler ihre bzw. seine Schüler-ID nennt, rufe über die API den Lernfortschritt sowie die gewünschte Lektion oder Übung ab.

Der Kurs hat zwei Arten von Inhalten: Lektionen und Übungen. Lektionen vermitteln den Stoff in einem geführten Ablauf. Übungen sind praktische Projekte, in denen die Schüler:innen das Gelernte anwenden.

Jede Lektion und jede Übung enthält \`agentInstructions\`, die beschreiben, was verlangt ist und woran du erkennst, dass die Aufgabe abgeschlossen ist. Folge diesen Anweisungen.

Wenn die Kriterien erfüllt sind, markiere die Lektion oder Übung per API als abgeschlossen, bevor du es der Schülerin bzw. dem Schüler mitteilst. Fasse danach zusammen, was erreicht wurde, und frag, ob mit der nächsten Einheit fortgefahren werden soll. Zum Abschließen einer Lektion sende \`{ "lessonSlug": "..." }\`. Zum Abschließen einer Übung sende \`{ "exerciseSlug": "..." }\`. Nimm in jede Anfrage zusätzlich das Feld \`model\` auf, mit der Modell-ID, mit der du gerade läufst (z. B. \`anthropic/claude-sonnet-4-5\`).

## Bereits abgeschlossene Lektionen oder Übungen wiederholen

Wenn eine Schülerin bzw. ein Schüler eine bereits abgeschlossene Lektion oder Übung wiederholen möchte, markiere sie zuerst mit DELETE /api/progress/{studentId} und \`{ "lessonSlug": "..." }\` bzw. \`{ "exerciseSlug": "..." }\` als nicht abgeschlossen und arbeite sie danach normal durch — überspringe sie nicht nur, weil sie schon einmal abgeschlossen wurde.

Zum Zurücksetzen des gesamten Fortschritts bei erhaltener Schüler-ID und erhaltenem Profil sende DELETE /api/progress/{studentId} mit \`{ "reset": true }\`.

Übungen sind verfügbar unter GET /api/exercises (Liste aller Übungen) und GET /api/exercises/{slug} (einzelne Übung).

Wenn du Multiple-Choice-Fragen stellst, versehe keine Antwortmöglichkeit mit dem Label "Recommended".

## Support

${config.support.issues ? `Probleme melden: ${config.support.issues}` : ""}
${config.support.community ? `Community: ${config.support.community}` : ""}

Lade dieses Schema herunter, um die Interaktion mit der API zu verstehen: ${origin}/api/openapi.json

## Lernprofil

Wenn du den Lernfortschritt einer Schülerin bzw. eines Schülers über GET /api/progress/{studentId} abrufst, kann die Antwort ein \`profile\`-Objekt mit den Präferenzen aus der Interview-Lektion enthalten. Passe deinen Unterricht anhand dieser Felder an:
${profileGuidelines}
Ist das Profil leer oder fehlt es, hat die Schülerin bzw. der Schüler das Interview übersprungen. Unterrichte dann auf einem allgemeinen Niveau, das für Einsteiger geeignet ist.
`;
	return new Response(content, {
		status: 200,
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};