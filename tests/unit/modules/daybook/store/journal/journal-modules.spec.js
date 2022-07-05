import { createStore } from "vuex";
import journal from "@/modules/daybook/store/journal";
import { journalState } from "../../../../../mock-data/test-journal-state";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

describe("Vuex - Pruebas en el Journal module", () => {
  //======  BASICAS ========= //
  test("este es el estado inicial, debe tener el State", () => {
    const store = createVuexStore(journalState);
    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  //Mutations=====
  test("mutations: setEntries", () => {
    const store = createVuexStore({
      isLoading: true,
      entries: [],
    });

    store.commit("journal/setEntries", journalState.entries);
    expect(store.state.journal.entries.length).toBe(3);

    store.commit("journal/setEntries", journalState.entries);
    expect(store.state.journal.entries.length).toBe(6);

    expect(store.state.journal.isLoading).toBeFalsy();
  });

  test("mutation: updateEntry", () => {
    //create Store con entries
    const store = createVuexStore(journalState);

    //updateEntry
    const updatedEntry = {
      id: "-N2vEMQTba2rGRl11IO2",
      date: 1653482538965,
      text: "Estoy aprendiendo MongoDB",
    };

    // commit de la mutations

    store.commit("journal/updateEntry", updatedEntry);

    const storeEntries = store.state.journal.entries;

    //expects
    //entries.length = 3
    expect(storeEntries.length).toBe(3);
    //entries tiene que existir updateEntry toEqual
    expect(storeEntries.find((e) => e.id === updatedEntry.id)).toEqual(
      updatedEntry
    );
  });

  test("mutation: addEntry deleteEntry", () => {
    //crear Store
    const store = createVuexStore(journalState);
    const addedEntry = {
      id: "ABC-123",
      text: "Hola Mundo",
    };
    // commit addEntry {id: 'ABC-123', text: 'Hola Mundo'}
    store.commit("journal/addEntry", addedEntry);
    //Expects
    // entradas sean 4
    let storeEntries = store.state.journal.entries;
    expect(storeEntries.length).toBe(4);
    // entrada con el id ABC-123 exista
    expect(storeEntries.find((e) => e.id === addedEntry.id)).toBeTruthy();
    //commit deleteEntry 'ABC-123'
    store.commit("journal/deleteEntry", addedEntry.id);
    //Expects
    //Entradas deben ser 3
    expect(store.state.journal.entries.length).toBe(3);
    //Entrada con el id ABC-123 no debe existir
    expect(
      store.state.journal.entries.find((e) => e.id === addedEntry.id)
    ).toBeFalsy();
  });

  //======  GETTERS ========= //
  test("getters: getEntriesByTerm getEntryById", () => {
    const store = createVuexStore(journalState);

    const [entry1, entry2, entry3] = journalState.entries;

    expect(store.getters["journal/getEntriesByTerm"]("").length).toBe(3);
    expect(store.getters["journal/getEntriesByTerm"]("gimnasio").length).toBe(
      1
    );
    expect(store.getters["journal/getEntriesByTerm"]("MongoDB")).toEqual([
      entry1,
    ]);
    expect(store.getters["journal/getEntriesByTerm"]("Vue")).toEqual([entry2]);
    expect(store.getters["journal/getEntriesByTerm"]("gimnasio")).toEqual([
      entry3,
    ]);

    expect(
      store.getters["journal/getEntryById"]("-N2vEJNC2Ppp3TN-8AYF")
    ).toEqual(entry2);
  });

  //======  ACTIONS ========= //
  test("actions: loadEntries", async () => {
    const store = createVuexStore({
      isLoading: true,
      entries: [],
    });

    await store.dispatch("journal/loadEntries");

    expect(store.state.journal.entries.length).toBe(3);
  });

  test("actions: updateEntry", async () => {
    const store = createVuexStore(journalState);

    const updatedEntry = {
      id: "-N2vEMQTba2rGRl11IO2",
      date: 1653482538965,
      text: "Estoy aprendiendo Redux",
      project: "chatme",
      type: "MERN",
    };

    await store.dispatch("journal/updateEntry", updatedEntry);

    expect(store.state.journal.entries.length).toBe(3);
    expect(
      store.state.journal.entries.find((e) => e.id === updatedEntry.id)
    ).toEqual({
      id: "-N2vEMQTba2rGRl11IO2",
      date: 1653482538965,
      text: "Estoy aprendiendo Redux",
    });
  });

  test("actions: createEntry deleteEntry", async () => {
    const store = createVuexStore(journalState);

    const newEntry = {
      date: "",
      text: "Nueva entrada desde las pruebas",
    };

    const id = await store.dispatch("journal/createEntry", newEntry);

    expect(typeof id).toBe("string");

    expect(store.state.journal.entries.find((e) => e.id === id)).toBeTruthy();

    await store.dispatch("journal/deleteEntry", id);
    expect(store.state.journal.entries.find((e) => e.id === id)).toBeFalsy();
  });
});
