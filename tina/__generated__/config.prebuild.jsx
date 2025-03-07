// tina/config.ts
import { defineConfig } from "tinacms";

// tina/templates.ts
var squadList = [
  "",
  "Yarride Rosario",
  "Mathew Salt",
  "Yash Rosario",
  "Patrick Moore",
  "Patrick Cameron",
  "Ian Rayns",
  "Farshid Shokoohi",
  "Jacob Williamson",
  "Jamie Bunting",
  "OG",
  "Ring-In",
  "Charles Daily",
  "Jarrod Murray",
  "Milan Mrdalj",
  "Evan Hanson",
  "Ryan Kindell",
  "Lance Molyneaux",
  "Chris Chester",
  "Pratik Das",
  "James Wilson",
  "Hugo Lawrence",
  "Declan Ward",
  "Dylan Watts",
  "Stu Escott",
  "Angus Hay-Chapman",
  "Josh Shand",
  "Jacob Williamson",
  "Oli Spicer",
  "Jordan Young",
  "Finn Harland"
];
function squadFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "Title"
    },
    {
      type: "string",
      name: "players",
      label: "Players",
      list: true
    }
  ];
}
function postFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "title",
      required: true
    },
    {
      type: "string",
      name: "description",
      label: "description",
      ui: {
        component: "textarea"
      },
      required: true
    },
    {
      type: "string",
      name: "author",
      label: "author",
      required: true
    },
    {
      type: "datetime",
      name: "date",
      label: "date",
      required: true
    },
    {
      type: "string",
      name: "type",
      options: ["post"],
      label: "type",
      defaultItem: "post"
    },
    {
      type: "image",
      name: "images",
      label: "Title Image",
      list: true
    },
    {
      type: "string",
      name: "categories",
      label: "categories",
      list: true,
      defaultItem: ["match"]
    },
    {
      type: "boolean",
      name: "draft",
      label: "Prevent posting on Site? (Draft)",
      defaultItem: true
    },
    {
      type: "boolean",
      name: "match",
      label: "For a match?",
      defaultItem: true
    },
    {
      type: "boolean",
      name: "friendly",
      label: "Friendly?"
    },
    {
      type: "string",
      name: "team",
      label: "Team",
      options: ["OG Frothers", "Foam Generators"],
      defaultItem: "OG Frothers",
      required: true
    },
    {
      type: "string",
      name: "opponent",
      label: "Opponent",
      required: true
    },
    {
      type: "string",
      name: "season",
      label: "Season",
      options: ["summer", "winter"],
      defaultItem: "winter",
      required: true
    },
    {
      type: "string",
      name: "result",
      label: "Result",
      options: ["Win", "Loss", "Draw"],
      required: true
    },
    {
      type: "object",
      name: "scorers",
      label: "Scorers",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.scorer };
        }
      },
      fields: [
        {
          component: "select",
          type: "string",
          name: "scorer",
          label: "Scorer",
          options: squadList
        },
        {
          type: "number",
          name: "goals",
          label: "Goals"
        }
      ]
    },
    {
      type: "number",
      name: "frother_goals",
      label: "Frother Goals",
      required: true
    },
    {
      type: "number",
      name: "opponent_goals",
      label: "Opponent Goals",
      required: true
    },
    {
      //   type: "select",
      type: "string",
      name: "xi_and_subs",
      label: "XI and Subs",
      component: "list",
      field: {
        component: "select",
        options: squadList
      },
      list: true
    },
    {
      component: "select",
      type: "string",
      name: "motm",
      label: "Man of the Match",
      options: squadList
    },
    {
      component: "select",
      type: "string",
      name: "dotd",
      label: "Dick of the Day",
      options: squadList
    }
  ];
}
function squad_memberFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "Name",
      required: true
    },
    {
      type: "image",
      name: "mug_shot",
      label: "Mug shot"
    },
    {
      type: "number",
      name: "kit_number",
      label: "Kit Number"
    },
    {
      type: "string",
      name: "blurb",
      label: "Blurb",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      name: "year_joined",
      label: "Year Joined",
      required: true
    },
    {
      type: "boolean",
      name: "active",
      label: "Active"
    },
    {
      type: "image",
      name: "photos",
      label: "Photos",
      list: true
    },
    {
      type: "string",
      name: "position",
      label: "Position",
      options: ["Forward", "Defender", "Midfielder", "Goal Keeper"],
      required: true
    },
    {
      type: "image",
      name: "fut_card",
      label: "FUT Card"
    },
    {
      type: "string",
      name: "teams",
      label: "Team",
      list: true,
      options: ["Foam Generators", "OG Frothers"]
    }
  ];
}

// tina/config.ts
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  client: { skip: true },
  build: {
    outputFolder: "admin",
    publicFolder: "static"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static"
    }
  },
  schema: {
    collections: [
      {
        format: "md",
        label: "Posts",
        name: "posts",
        path: "content/posts",
        frontmatterFormat: "toml",
        frontmatterDelimiters: "+++",
        match: {
          include: "**/*"
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true
          },
          ...postFields()
        ]
      },
      {
        format: "md",
        label: "Squad Members",
        name: "squad_members",
        path: "content/squad-members",
        frontmatterFormat: "toml",
        frontmatterDelimiters: "+++",
        match: {
          include: "**/*"
        },
        fields: squad_memberFields()
      },
      {
        format: "md",
        label: "Squad",
        name: "squad",
        path: "content/squad",
        frontmatterFormat: "toml",
        frontmatterDelimiters: "+++",
        match: {
          include: "**/*"
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true
          },
          ...squadFields()
        ]
      },
      {
        format: "json",
        label: "Stats",
        name: "stats",
        path: "data/stats",
        frontmatterFormat: "toml",
        frontmatterDelimiters: "+++",
        match: {
          include: "*"
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true
          }
        ]
      },
      {
        format: "json",
        label: "Next Match Info",
        name: "next_match_info",
        path: "data",
        frontmatterFormat: "toml",
        frontmatterDelimiters: "+++",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        match: {
          include: "nextMatch"
        },
        fields: [
          {
            name: "dummy",
            label: "Dummy field",
            type: "string",
            description: "This is a dummy field, please replace it with the fields you want to edit. See https://tina.io/docs/schema/ for more info"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
