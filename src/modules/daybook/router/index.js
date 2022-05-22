export default {
  name: "daybook",
  component: () =>
    import(
      /* webpackChunkName: "about" */ "@/modules/daybook/layout/DayBookLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "no-entry",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "@/modules/daybook/views/NoEntrySelected.vue"
        ),
    },
    {
      path: ":id",
      name: "entry",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "@/modules/daybook/views/EntryView.vue"
        ),
    },
  ],
};
