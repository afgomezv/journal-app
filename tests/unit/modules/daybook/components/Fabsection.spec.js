import { shallowMount } from "@vue/test-utils";
import FabSection from "@/modules/daybook/components/FabSection";

describe("Pruebas en el FabSection component", () => {
  test("debe de mostrar el icono por defecto", () => {
    // fa-plus
    const wrapper = shallowMount(FabSection);
    const iTag = wrapper.find("i");

    expect(iTag.classes("fa-plus")).toBeTruthy();
  });

  test("debe de mostrar el icono por argumento: fa-circle", () => {
    // fa-circle
    const wrapper = shallowMount(FabSection, {
      props: {
        icon: "fa-circle",
      },
    });
    const iTag = wrapper.find("i");

    expect(iTag.classes("fa-circle")).toBeTruthy();
  });

  test("debe de emitir el evento on:click cuando se hace click", () => {
    //wrapper.emitted('on:click')
    const wrapper = shallowMount(FabSection);
    wrapper.find("button").trigger("click");
    //console.log(wrapper.emitted("on:click"));
    expect(wrapper.emitted("on:click")).toHaveLength(1);
  });
});
