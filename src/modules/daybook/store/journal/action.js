import journalApi from "@/api/journalApi";
// export const myAction = async({ commit }) => {

// };

export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get("/entries.json");
  if (!data) {
    return commit("setEntries", []);
  }

  const entries = [];
  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    });
  }

  //console.log(entries);
  commit("setEntries", entries);
};

export const updateEntry = async ({ commit }, entry) => {
  //Extraer solo lo que necesitan // -id
  const { date, picture, text } = entry;
  const dataTosave = { date, picture, text };
  //await journalApi.put(PATH.json, dataTosave)
  const resp = await journalApi.put(`/entries/${entry.id}.json`, dataTosave);
  console.log(resp);
  dataTosave.id = entry.id;
  //commit de una mutation -> updateEntry
  commit("updateEntry", { ...dataTosave });
};

export const createEntry = async ({ commit }, entry) => {
  //dataToSave
  const { date, picture, text } = entry;
  const dataTosave = { date, picture, text };
  const { data } = await journalApi.post(`entries.json`, dataTosave);
  // data = {"name": "-N2v13OqBEu9qVjPrzu1"}
  dataTosave.id = data.name;
  commit("addEntry", dataTosave);
  return data.name;
};

export const deleteEntry = async ({ commit }, id) => {
  await journalApi.delete(`/entries/${id}.json`);
  commit("deleteEntry", id);
  return id;
};
