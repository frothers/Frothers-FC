import type { TinaField } from "tinacms";

let squadList = ["", "Mathew Salt", "Jack Apperley", "Yash Rosario", "Yarride Rosario", "Evan Doube", "Ian Rayns", "Farshid Shokoohi", "OG", "Ring-In", "Charles Daily",  "Milan Mrdalj", "Evan Hanson", "Ryan Kindell", "Lance Molyneaux", "Chris Chester", "Patrick Cameron", "Patrick Moore", "Jack Apperley","Pratik Das","James Wilson", "Hugo Lawrence", "Declan Ward", "Sol Barris"];

export function generic_pageFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
  ] as TinaField[];
}
export function next_matchFields() {
  return [] as TinaField[];
}
export function squadFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "string",
      name: "players",
      label: "Players",
      list: true,
    },
  ] as TinaField[];
}
export function postFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "title",
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "description",
      ui: {
        component: "textarea",
      },
      required: true,
    },
    {
      type: "string",
      name: "author",
      label: "author",
      required: true,
    },
    {
      type: "datetime",
      name: "date",
      label: "date",
      required: true,
    },
    {
      type: "string",
      name: "type",
      options: ["post"],
      label: "type",
      defaultItem: "post",
    },
    {
      type: "image",
      name: "images",
      label: "Title Image",
      list: true,
    },
    {
      type: "string",
      name: "categories",
      label: "categories",
      list: true,
      defaultItem: ["match"],
    },
    {
      type: "boolean",
      name: "draft",
      label: "Prevent posting on Site? (Draft)",
      defaultItem: true,
    },
    {
      type: "boolean",
      name: "match",
      label: "For a match?",
      defaultItem: true,
    },
    {
      type: "boolean",
      name: "friendly",
      label: "Friendly?",
    },
    {
      type: "string",
      name: "team",
      label: "Team",
      options: ["OG Frothers", "Foam Generators"],
      defaultItem: "OG Frothers",
      required: true,
    },
    {
      type: "string",
      name: "opponent",
      label: "Opponent",
      required: true,
    },
    {
      type: "string",
      name: "season",
      label: "Season",
      options: ["summer", "winter"],
      defaultItem: "winter",
      required: true,
    },
    {
      type: "string",
      name: "result",
      label: "Result",
      options: ["Win", "Loss", "Draw"],
      required: true,
    },
    {
      type: "object",
      name: "scorers",
      label: "Scorers",
      list: true,
      ui: {
        itemProps: (item) => {
          // Field values are accessed by item?.<Field name>
          return { label: item?.scorer };
        },
      },
      fields: [
        {
          component: "select",
          type: "string",
          name: "scorer",
          label: "Scorer",
          options: squadList,
        },
        {
          type: "number",
          name: "goals",
          label: "Goals",
        },
      ],
    },
    {
      type: "number",
      name: "frother_goals",
      label: "Frother Goals",
      required: true,
    },
    {
      type: "number",
      name: "opponent_goals",
      label: "Opponent Goals",
      required: true,
    },
    {
    //   type: "select",
      type: "string",
      name: "xi_and_subs",
      label: "XI and Subs",
      component: 'list',
      field: {
        component: 'select',
        options: squadList,
      },
      list: true,
    },
    {
      component: "select",
      type: "string",
      name: "motm",
      label: "Man of the Match",
      options: squadList,
    },
    {
      component: "select",
      type: "string",
      name: "dotd",
      label: "Dick of the Day",
      options: squadList,
    },
  ] as TinaField[];
}
export function squad_memberFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "Name",
      required: true,
    },
    {
      type: "image",
      name: "mug_shot",
      label: "Mug shot",
    },
    {
      type: "number",
      name: "kit_number",
      label: "Kit Number",
    },
    {
      type: "string",
      name: "blurb",
      label: "Blurb",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      name: "year_joined",
      label: "Year Joined",
      required: true,
    },
    {
      type: "boolean",
      name: "active",
      label: "Active",
    },
    {
      type: "image",
      name: "photos",
      label: "Photos",
      list: true,
    },
    {
      type: "string",
      name: "position",
      label: "Position",
      options: ["Forward", "Defender", "Midfielder", "Goal Keeper"],
      required: true,
    },
    {
      type: "image",
      name: "fut_card",
      label: "FUT Card",
    },
    {
      type: "string",
      name: "teams",
      label: "Team",
      list: true,
      options: ["Foam Generators", "OG Frothers"],
    },
  ] as TinaField[];
}
