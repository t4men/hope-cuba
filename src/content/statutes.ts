import type { Lang } from "@/app/routes-map";
import pdfDe from "@/assets/satzung-v1.4-de.pdf.asset.json";
import pdfEn from "@/assets/articles-of-association-v1.4-en.pdf.asset.json";
import pdfEs from "@/assets/estatutos-v1.4-es.pdf.asset.json";

export type StatuteSection = { title: string; paras: string[]; list?: string[]; after?: string[] };
export type StatuteDoc = {
  heading: string;
  subtitle: string;
  header: string;
  disclaimer?: string;
  pdfUrl: string;
  sections: StatuteSection[];
};

// Texts transcribed from the uploaded statute documents, version 1.4 (03.11.2026).
export const statutes: Record<Lang, StatuteDoc> = {
  de: {
    heading: "Satzung des Vereins „Hope Cuba“",
    subtitle: "Gründungs- und Vorprüfungsentwurf | Version 1.4 | Stand: 03.11.2026",
    header:
      "Vorgesehener Name nach Eintragung: Hope Cuba e.V. | Sitz: Messel, Deutschland | Geschäftsanschrift: Markstr. 27, 64409 Messel | Kontakt: +49 6159 9199799, hope-cuba@outlook.com",
    pdfUrl: pdfDe.url,
    sections: [
      { title: "§ 1 Name, Sitz, Geschäftsjahr", paras: ["Der Verein führt den Namen „Hope Cuba“. Er soll in das Vereinsregister eingetragen werden und führt nach Eintragung den Zusatz „e.V.“.", "Der Verein hat seinen Sitz in Messel.", "Das Geschäftsjahr ist das Kalenderjahr. Das erste Geschäftsjahr ist ein Rumpfgeschäftsjahr und endet am 31. Dezember des Gründungsjahres."] },
      {
        title: "§ 2 Steuerbegünstigte Zwecke",
        paras: ["Der Verein mit Sitz in Messel verfolgt ausschließlich und unmittelbar gemeinnützige und mildtätige Zwecke im Sinne des Abschnitts „Steuerbegünstigte Zwecke“ der Abgabenordnung.", "Zwecke des Vereins sind:"],
        list: [
          "a) Förderung des öffentlichen Gesundheitswesens (§ 52 Abs. 2 Satz 1 Nr. 3 AO);",
          "b) Förderung der Erziehung, Volks- und Berufsbildung (§ 52 Abs. 2 Satz 1 Nr. 7 AO);",
          "c) Förderung des Wohlfahrtswesens (§ 52 Abs. 2 Satz 1 Nr. 9 AO);",
          "d) Förderung der Hilfe für Flüchtlinge sowie politisch/rassistisch/religiös Verfolgte (§ 52 Abs. 2 Satz 1 Nr. 10 AO);",
          "e) Förderung der Entwicklungszusammenarbeit (§ 52 Abs. 2 Satz 1 Nr. 15 AO);",
          "f) Unterstützung hilfsbedürftiger Personen (§ 53 AO).",
        ],
        after: ["Der Verein verwirklicht seine Zwecke schwerpunktmäßig in Kuba. Er kann seine steuerbegünstigten Zwecke auch in Deutschland sowie in anderen Ländern verfolgen."],
      },
      { title: "§ 3 Selbstlosigkeit", paras: ["Der Verein ist selbstlos tätig; er verfolgt nicht in erster Linie eigenwirtschaftliche Zwecke. Mittel des Vereins dürfen nur für die satzungsmäßigen Zwecke verwendet werden. Die Mitglieder erhalten keine Zuwendungen aus Mitteln des Vereins."] },
      { title: "§ 4 Mitgliedschaft", paras: ["Der Verein hat ordentliche Mitglieder und Fördermitglieder. Natürliche und juristische Personen können Mitglied werden, sofern sie die Vereinszwecke unterstützen. Ordentliche Mitglieder haben ein Stimmrecht; Fördermitglieder besitzen kein Stimmrecht."] },
      { title: "§ 5 Organe", paras: ["Organe des Vereins sind: 1. die Mitgliederversammlung; 2. der Vorstand im Sinne des § 26 BGB."] },
      { title: "§ 6 Vorstand, Vertretung und Amtszeit", paras: ["Der Vorstand im Sinne des § 26 BGB besteht aus mindestens zwei und höchstens drei natürlichen Personen (Vorsitzende/r, Stellvertretende/r Vorsitzende/r, Schatzmeister/in). Er wird von der Mitgliederversammlung für vier Jahre gewählt. Der Verein wird gerichtlich und außergerichtlich durch zwei verschiedene Vorstandsmitglieder gemeinsam vertreten."] },
      { title: "§ 7 Geschäftsführung und besondere Befugnisse des/der Vorsitzenden", paras: ["Der/die Vorsitzende führt die laufenden Geschäfte des Vereins, koordiniert die humanitären Projekte und verantwortet die Umsetzung der vom Vorstand beschlossenen Strategie und des Haushaltsplans."] },
      { title: "§ 8 Vorstandssitzungen und Beschlüsse", paras: ["Der Vorstand hält mindestens zwei Sitzungen pro Kalenderjahr ab. Zwischen den Sitzungen sind Beschlüsse im Umlaufverfahren in Textform zulässig."] },
      { title: "§ 9 Mitgliederversammlung", paras: ["Die ordentliche Mitgliederversammlung findet mindestens einmal jährlich statt. Satzungsänderungen bedürfen einer Mehrheit von drei Vierteln der abgegebenen gültigen Stimmen."] },
      { title: "§ 10 Rechnungswesen, Auslandshilfe und Kontrolle", paras: ["Der Vorstand sorgt für ordnungsgemäße Buchführung. Bei Auslandszwecken werden Bedarf, Auswahl der Begünstigten, Mittelherkunft, Zahlungswege und Verwendung belegbar dokumentiert."] },
      { title: "§ 11 Auflösung und Vermögensbindung", paras: ["Bei Auflösung oder Aufhebung des Vereins fällt das Vermögen an eine juristische Person des öffentlichen Rechts oder eine andere steuerbegünstigte Körperschaft für steuerbegünstigte Zwecke."] },
      { title: "§ 12 Inkrafttreten und Gründungsbeschluss", paras: ["Diese Satzung wurde von der Gründungsversammlung am [Datum] in [Ort] beschlossen."] },
    ],
  },
  en: {
    heading: "Articles of Association of the Association “Hope Cuba”",
    subtitle: "Draft for Establishment and Preliminary Examination | Version 1.4 | As of: November 3, 2026",
    header:
      "Intended name upon registration: Hope Cuba e.V. | Registered Office: Messel, Germany | Business Address: Markstr. 27, 64409 Messel | Contact: +49 6159 9199799, hope-cuba@outlook.com",
    disclaimer:
      "This English translation of the Articles of Association is provided for convenience and information purposes only. In all legal matters, disputes, registration procedures, and official interpretations, ONLY the original German version (“Gründungssatzung”) is legally binding and valid.",
    pdfUrl: pdfEn.url,
    sections: [
      { title: "§ 1 Name, Registered Office, Financial Year", paras: ["1. The association bears the name “Hope Cuba”. It is to be entered into the register of associations (Vereinsregister) and shall carry the suffix “e.V.” upon registration.", "2. The association has its registered office in Messel, Germany.", "3. The financial year is the calendar year. The first financial year is a short financial year ending on December 31 of the founding year."] },
      {
        title: "§ 2 Tax-Exempt / Charitable Purposes",
        paras: ["1. The association with its registered office in Messel pursues exclusively and directly non-profit and charitable purposes within the meaning of the section “Tax-Exempt Purposes” of the German Fiscal Code (Abgabenordnung – AO).", "2. The purposes of the association are:"],
        list: [
          "a. Promotion of public healthcare and public health maintenance (§ 52 para. 2 sentence 1 no. 3 AO);",
          "b. Promotion of education, popular and vocational training, including student assistance (§ 52 para. 2 sentence 1 no. 7 AO);",
          "c. Promotion of public welfare (§ 52 para. 2 sentence 1 no. 9 AO);",
          "d. Promotion of assistance for refugees and politically, racially, or religiously persecuted persons (§ 52 para. 2 sentence 1 no. 10 AO);",
          "e. Promotion of development cooperation (§ 52 para. 2 sentence 1 no. 15 AO);",
          "f. Support of individuals in need of assistance (§ 53 AO).",
        ],
        after: ["3. The association fulfills its purposes primarily in Cuba. It may also pursue its tax-exempt purposes in Germany and other countries. Assistance is not restricted to persons of Cuban nationality."],
      },
      { title: "§ 3 Altruism / Selflessness", paras: ["1. The association operates selflessly; it does not primarily pursue its own economic interests.", "2. Funds of the association may only be used for statutory purposes. Members receive no financial disbursements or grants from association funds.", "3. No person may be favored through expenses alien to the purpose of the entity or through disproportionately high remuneration."] },
      { title: "§ 4 Membership", paras: ["1. The association consists of regular members (ordentliche Mitglieder) and supporting members (Fördermitglieder). Natural and legal persons may become members, provided they support the association's purposes.", "2. Regular members participate in association activities and decision-making. Each regular member has one vote in the General Assembly. Supporting members assist the association through regular financial contributions or ideal/material support; they possess no voting rights."] },
      { title: "§ 5 Executive Bodies", paras: ["Executive bodies of the association are:", "1. The General Assembly (Mitgliederversammlung);", "2. The Board of Directors (Vorstand) pursuant to § 26 BGB."] },
      { title: "§ 6 Board of Directors, Representation, Term of Office", paras: ["1. The Board of Directors pursuant to § 26 BGB consists of at least two and at most three natural persons, comprising three board functions: Chair (Vorsitzende/r), Vice Chair (Stellvertretende/r Vorsitzende/r), and Treasurer (Schatzmeister/in).", "2. The board functions must be held by at least two distinct natural persons. A single person may hold at most two board functions in personal union.", "3. The association is represented in and out of court jointly by two distinct board members.", "4. The Board of Directors is elected by the General Assembly for a term of four years. Re-election is permissible."] },
      { title: "§ 7 Management and Special Powers of the Chair", paras: ["1. The Chair manages the day-to-day business of the association, coordinates humanitarian projects, and is responsible for implementing the strategy and budget resolved by the Board.", "2. Further details regarding management and internal organization are regulated in the Rules of Procedure (Geschäftsordnung) adopted by the General Assembly and the Financial Regulations (Finanzordnung) adopted by the Board."] },
      { title: "§ 8 Board Meetings and Resolutions", paras: ["1. The Board holds at least two meetings per calendar year. Between meetings, resolutions may be adopted via written circular procedure (Umlaufverfahren in Textform)."] },
      { title: "§ 9 General Assembly (Mitgliederversammlung)", paras: ["1. The ordinary General Assembly takes place at least once a year. It may be conducted in person, hybrid, or fully virtually.", "2. Amendments to the Articles of Association require a majority of three-quarters of the valid votes cast by regular members."] },
      { title: "§ 10 Accounting, Overseas Aid, and Controls", paras: ["1. The Board ensures proper accounting and record keeping. For overseas activities, needs, beneficiary selection, source of funds, payment channels, and utilization must be fully documented."] },
      { title: "§ 11 Dissolution and Asset Binding", paras: ["1. Dissolution of the association requires a three-quarters majority of valid votes cast in a General Assembly specifically convened for this purpose.", "2. Upon dissolution, liquidation, or cessation of tax-exempt status, association assets shall transfer to a public entity or another tax-exempt corporation for charitable health or welfare purposes (§ 53 AO)."] },
      { title: "§ 12 Effective Date and Founding Resolution", paras: ["These Articles of Association were adopted by the founding assembly on [Date] in [Location]."] },
    ],
  },
  es: {
    heading: "Estatutos de la Asociación «Hope Cuba»",
    subtitle: "Borrador de Constitución y Examen Previo | Versión 1.4 | A fecha de: 3 de noviembre de 2026",
    header:
      "Nombre previsto tras la inscripción: Hope Cuba e.V. | Sede: Messel, Alemania | Dirección comercial: Markstr. 27, 64409 Messel | Contacto: +49 6159 9199799, hope-cuba@outlook.com",
    disclaimer:
      "Esta traducción al español de los Estatutos se ofrece exclusivamente con fines informativos y de cortesía. En todos los asuntos legales, disputas, trámites de registro e interpretaciones oficiales, ÚNICAMENTE la versión original en alemán («Gründungssatzung») es legalmente vinculante y válida.",
    pdfUrl: pdfEs.url,
    sections: [
      { title: "§ 1 Nombre, Sede, Año Fiscal", paras: ["1. La asociación lleva el nombre «Hope Cuba». Se inscribirá en el registro de asociaciones (Vereinsregister) y llevará la mención «e.V.» tras su inscripción.", "2. La asociación tiene su sede en Messel, Alemania.", "3. El año fiscal es el año natural. El primer año fiscal es un año fiscal corto que finaliza el 31 de diciembre del año de constitución."] },
      {
        title: "§ 2 Fines de Utilidad Pública y Benéficos",
        paras: ["1. La asociación con sede en Messel persigue exclusiva y directamente fines de utilidad pública y benéficos en el sentido de la sección «Fines exentos de impuestos» del Código Fiscal Alemán (Abgabenordnung – AO).", "2. Los fines de la asociación son:"],
        list: [
          "a. Fomento de la sanidad pública y la atención médica general (§ 52 párr. 2 frase 1 n.º 3 AO);",
          "b. Fomento de la educación, formación general y profesional, incluida la ayuda estudiantil (§ 52 párr. 2 frase 1 n.º 7 AO);",
          "c. Fomento del bienestar social y la asistencia pública (§ 52 párr. 2 frase 1 n.º 9 AO);",
          "d. Fomento de la ayuda a refugiados y perseguidos políticos, raciales o religiosos (§ 52 párr. 2 frase 1 n.º 10 AO);",
          "e. Fomento de la cooperación al desarrollo (§ 52 párr. 2 frase 1 n.º 15 AO);",
          "f. Apoyo a personas en situación de necesidad (§ 53 AO).",
        ],
        after: ["3. La asociación cumple sus fines prioritariamente en Cuba, comenzando en la provincia de Holguín. También puede perseguir sus fines exentos de impuestos en Alemania y otros países. La ayuda no está limitada a personas de nacionalidad cubana."],
      },
      { title: "§ 3 Altruismo / Desinterés", paras: ["1. La asociación actúa de manera desinteresada; no persigue primordialmente fines económicos propios.", "2. Los fondos de la asociación solo pueden utilizarse para los fines estatutarios. Los miembros no reciben asignaciones económicamente procedentes de los fondos de la asociación.", "3. Ninguna persona podrá ser favorecida mediante gastos ajenos al fin de la entidad o mediante remuneraciones desproporcionadamente altas."] },
      { title: "§ 4 Membresía", paras: ["1. La asociación consta de miembros ordinarios (ordentliche Mitglieder) y miembros colaboradores/patrocinadores (Fördermitglieder). Las personas físicas y jurídicas pueden ser miembros siempre que apoyen los fines de la asociación.", "2. Los miembros ordinarios participan en las actividades y la toma de decisiones de la asociación. Cada miembro ordinario tiene un voto en la Asamblea General. Los miembros colaboradores apoyan a la asociación mediante contribuciones periódicas o apoyo material/moral, sin derecho a voto."] },
      { title: "§ 5 Órganos Ejecutivos", paras: ["Los órganos ejecutivos de la asociación son:", "1. La Asamblea General (Mitgliederversammlung);", "2. La Junta Directiva (Vorstand) según el § 26 BGB."] },
      { title: "§ 6 Junta Directiva, Representación, Mandato", paras: ["1. La Junta Directiva según el § 26 BGB se compone de al menos dos y como máximo tres personas físicas, abarcando tres funciones: Presidente/a (Vorsitzende/r), Vicepresidente/a (Stellvertretende/r Vorsitzende/r) y Tesorero/a (Schatzmeister/in).", "2. Las funciones de la junta deben ser ejercidas por al menos dos personas físicas distintas. Una misma persona puede asumir como máximo dos funciones en unión personal.", "3. La asociación está representada judicial y extrajudicialmente de forma conjunta por dos miembros distintos de la Junta Directiva.", "4. La Junta Directiva es elegida por la Asamblea General por un mandato de cuatro años. La reelección es admisible."] },
      { title: "§ 7 Gestión y Facultades Especiales del/de la Presidente/a", paras: ["1. El/la Presidente/a dirige los asuntos corrientes de la asociación, coordina los proyectos humanitarios y es responsable de ejecutar la estrategia y el presupuesto aprobados por la Junta.", "2. Los detalles sobre la gestión y la organización interna se regulan en el Reglamento Interno (Geschäftsordnung) aprobado por la Asamblea General y en el Reglamento Financiero (Finanzordnung) aprobado por la Junta Directiva."] },
      { title: "§ 8 Reuniones de la Junta y Acuerdos", paras: ["1. La Junta Directiva celebra al menos dos reuniones por año natural. Entre reuniones, los acuerdos pueden adoptarse mediante procedimiento escrito (Umlaufverfahren in Textform)."] },
      { title: "§ 9 Asamblea General (Mitgliederversammlung)", paras: ["1. La Asamblea General ordinaria se celebra al menos una vez al año. Puede realizarse de forma presencial, híbrida o totalmente virtual.", "2. Las modificaciones de los Estatutos requieren una mayoría de tres cuartas partes de los votos válidos emitidos por los miembros ordinarios."] },
      { title: "§ 10 Contabilidad, Ayuda en el Exterior y Controles", paras: ["1. La Junta Directiva garantiza una contabilidad adecuada. Para las actividades en el exterior, la necesidad, la selección de beneficiarios, el origen de los fondos, las vías de pago y su uso deben quedar documentalmente registrados."] },
      { title: "§ 11 Disolución y Destino de los Bienes", paras: ["1. La disolución de la asociación requiere una mayoría de tres cuartas partes de los votos válidos emitidos en una Asamblea General convocada expresamente para este fin.", "2. En caso de disolución o pérdida del estatus de exención fiscal, el patrimonio de la asociación se transferirá a una entidad pública o a otra corporación exenta de impuestos para fines benéficos de sanidad o bienestar social (§ 53 AO)."] },
      { title: "§ 12 Fecha de Entrada en Vigor y Acuerdo de Constitución", paras: ["Estos Estatutos fueron aprobados por la asamblea constituyente el [Fecha] en [Lugar]."] },
    ],
  },
};
